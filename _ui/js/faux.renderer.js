/*global $: false, console: false */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

/*

    Renderer
    VERSION 0.0.1
    AUTHOR gvn

    Renders things on a Canvas.

    DEPENDENCIES:

    - jQuery

    TODO:

    - Remove jQuery dependency
    - Determine scaledRadius value that feels realistic

*/

var FAUX = FAUX || {};

FAUX.renderer = {
    init: function () {
        var self = this,
            canvas = $('canvas')[0];

        self.ctx = canvas.getContext('2d');

        canvas.width = self.width = $('html').width();
        canvas.height = self.height = $('html').height();
    },
    clear: function () {
        var self = this;

        self.ctx.clearRect(0, 0, self.width, self.height);
    },
    depthToColor: function (z) {
        var self = this,
            colorValue;

        colorValue = (z > -255 ? -1 * Math.floor(z) : 255).toString(16); // convert base 10 to hexadecimal

        if (colorValue.length > 1) {
            colorValue = '#' + colorValue + colorValue + colorValue;
        } else {
            colorValue = '#0' + colorValue + '0' + colorValue + '0' + colorValue;
        }

        return colorValue;
    },
    drawSphere: function (x, y, z, radius) {
        var self = this,
            scaledRadius,
            colorValue;

        // "camera" is fixed at z value of 0.
        // Negative z value is in front of camera, positive is behind.

        if (z < 0) {
            scaledRadius = radius + z / 4;
        } else if (z > 0) {
            return; // The sphere is behind the camera and doesn't need rendering
        } else {
            scaledRadius = radius; // z === 0
        }

        if (scaledRadius < 0) {
            return; // Sphere is too small/"distant" to render
        }

        // Simulate "fog" by transitioning to white as distance increases

        colorValue = self.depthToColor(z);

        // Draw the circle

        self.ctx.beginPath();
        self.ctx.arc(x, y, scaledRadius, 0, 2 * Math.PI, false);
        self.ctx.fillStyle = colorValue;
        self.ctx.fill();

        // 1px white border
        self.ctx.lineWidth = 1;
        self.ctx.strokeStyle = 'white';
        self.ctx.stroke();
    },
    drawLine: function (vertex1, vertex2) {
        var self = this;

        self.ctx.lineWidth = 1;
        self.ctx.beginPath();
        self.ctx.moveTo(vertex1.x, vertex1.y);
        self.ctx.lineTo(vertex2.x, vertex2.y);
        self.ctx.strokeStyle = self.depthToColor(vertex1.z);
        self.ctx.stroke();
    },
    drawArc: function (vertex1, middleVertex, vertex2, radius) {
        var self = this;

        self.ctx.lineWidth = 0.25;
        self.ctx.beginPath();
        self.ctx.moveTo(vertex1.x, vertex1.y);
        self.ctx.arcTo(middleVertex.x, middleVertex.y, vertex2.x, vertex2.y, radius);
        self.ctx.strokeStyle = self.depthToColor(vertex1.z);
        self.ctx.stroke();
    }
};
