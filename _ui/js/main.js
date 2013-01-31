/*global $: false, console: false, requestAnimationFrame: false, TWEEN: false, createjs: false, stats: false */
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
        var self = this,
            i,
            ii;

        self.events.parent = self; // Bind root object reference for "events"

        self.isAnimating = false;

        self.spheres = [];

        for (i = 0, ii = 50; i < ii; i++) {
            self.spheres.push(Object.create(FAUX.Sphere));

            self.spheres[i].x = 0;
            self.spheres[i].y = 0;
            self.spheres[i].z = 0;
            self.spheres[i].radius = 25;

            self.moveSphere(self.spheres[i], 320, 240, 0);
        }

        FAUX.renderer.init();
        self.animate();
    },
    events: {
        moveDone: function (sphere) {
            var self = this.parent,
                args = arguments;

            //console.log(sphere, 'move done');

            self.moveSphere(sphere,
                Math.floor(Math.random() * 640),
                Math.floor(Math.random() * 480),
                Math.floor(Math.random() * -100),
                null,
                Math.floor(Math.random() * 1000 + 5000));
        }
    },
    animate: function () {
        var self = this;

        self.isAnimating = true;

        function draw() {
            if (self.isAnimating === true) {
                requestAnimationFrame(draw);
                TWEEN.update();
                stats.update();
                self.drawSpheres();
            }
        }

        requestAnimationFrame(draw);
    },
    stopAnimation: function () {
        var self = this;

        self.isAnimating = false;

        // TODO : Stop tweening engine
    },
    moveSphere: function (sphere, x, y, z, radius, duration) {
        var self = this,
            tweenTarget,
            tween;

        tweenTarget = {
            x: typeof x === 'number' ? x : sphere.x,
            y: typeof y === 'number' ? y : sphere.y,
            z: typeof z === 'number' ? z : sphere.z,
            radius: typeof radius === 'number' ? radius : sphere.radius
        };

        tween = new TWEEN.Tween(sphere).to(tweenTarget, duration || 1000);

        tween.easing(TWEEN.Easing.Back.Out);
        tween.onComplete(function () { self.events.moveDone(sphere); });
        tween.start();
    },
    drawSpheres: function () {
        var self = this,
            i,
            ii,
            sphere;

        FAUX.renderer.clear();

        // Sort by z-depth
        self.spheres.sort(function (a, b) {
            return a.z > b.z;
        });

        //console.log('group');

        for (i = 0, ii = self.spheres.length; i < ii; i++) {
            sphere = self.spheres[i];
            FAUX.renderer.drawSphere(sphere.x, sphere.y, sphere.z, sphere.radius);
            //console.log(i, ' z: ', sphere.z);
        }
    }
};