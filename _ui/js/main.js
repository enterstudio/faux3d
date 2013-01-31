/*global $: false, console: false */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

/*

    Faux 3D
    VERSION 0.0.1
    AUTHOR gvn

    Extremely fake 3D rendering fun times.

    DEPENDENCIES:

    - All

    TODO:

    - Try: http://www.createjs.com/#!/TweenJS

*/

var FAUX = FAUX || {};

FAUX.main = {
    init: function () {
        var self = this;

        self.spheres = [];

        self.spheres.push(Object.create(FAUX.Sphere));
        
        self.spheres[0].x = 50;
        self.spheres[0].y = 50;
        self.spheres[0].z = 0;
        self.spheres[0].radius = 10;

        FAUX.renderer.init();
        FAUX.main.animate();
    },
    animate: function () {
        var self = this;

        function draw() {
            requestAnimationFrame(draw);
            TWEEN.update();
            self.drawSpheres();
        }

        requestAnimationFrame(draw);

    },
    moveSphere: function (sphere, x, y, z, radius) {
        var self = this,
            tween;

        tween = new TWEEN.Tween(self.spheres[0]).to({
            x: typeof x === 'number' ? x : sphere.x,
            y: typeof y === 'number' ? y : sphere.y,
            z: typeof z === 'number' ? z : sphere.z,
            radius: typeof radius === 'number' ? radius : sphere.radius
        }, 2000);

        tween.easing(TWEEN.Easing.Quadratic.In);
        tween.start();
    },
    drawSpheres: function () {
        var self = this,
            i,
            ii,
            sphere;

        FAUX.renderer.clear();

        for (i = 0, ii = self.spheres.length; i < ii; i++) {
            sphere = self.spheres[i];
            FAUX.renderer.drawSphere(sphere.x, sphere.y, sphere.z, sphere.radius);
        }
        
    }
};

$(document).ready(function () {
    FAUX.main.init();
});