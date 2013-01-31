/*global $: false, console: false */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

/*

    Renderer
    VERSION 0.0.1
    AUTHOR gvn

    Renders things on a Canvas.

    DEPENDENCIES:

    - 

    TODO:

    - Determine scaledRadius value that feels realistic

*/

var FAUX = FAUX || {};

lastScaledRadius = undefined;

FAUX.renderer = {
    init: function () {
        var self = this,
            canvas = $('canvas')[0];

        self.ctx = canvas.getContext('2d');

        canvas.width = self.width = 640;
        canvas.height = self.height = 480;
    },
    clear: function () {
        var self = this;

        self.ctx.clearRect(0, 0, self.width, self.height);
    },
    drawSphere: function (x, y, z, radius) {
        var self = this,
            scaledRadius;

        // "camera" is fixed at z value of 0. 
        // Negative z value is in front of camera, positive is behind.

        if (z < 0) {
            scaledRadius = radius + z / 10;
        } else if (z > 0) {
            return; // The sphere is behind the camera and doesn't need rendering
        } else {
            scaledRadius = radius; // z === 0
        }

        if (scaledRadius !== lastScaledRadius) {
            console.log('z',z, 'scaledRadius',scaledRadius);    
        }

        lastScaledRadius = scaledRadius;
        
        
        self.ctx.beginPath();
        self.ctx.arc(x, y, scaledRadius, 0, 2 * Math.PI, false);
        self.ctx.fillStyle = 'black';
        self.ctx.fill();
        self.ctx.lineWidth = 1;
        self.ctx.strokeStyle = 'white';
        self.ctx.stroke();
    }
};