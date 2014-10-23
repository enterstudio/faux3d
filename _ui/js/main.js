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

        self.mousePosition = {x:0,y:0};

        FAUX.renderer.init();

        for (i = 0, ii = 25; i < ii; i++) {
            self.spheres.push(Object.create(FAUX.Sphere));

            self.spheres[i].x = 0;
            self.spheres[i].y = 0;
            self.spheres[i].z = 0;
            self.spheres[i].radius = 25;

            self.moveSphere(self.spheres[i], FAUX.renderer.width / 2, FAUX.renderer.height / 2, 0);
        }


        self.animate();

        $(document).mousemove(function(e){
            self.mousePosition.x = e.pageX;
            self.mousePosition.y = e.pageY;
        });

        $('canvas').hover(function() {
            $('canvas').css('cursor', 'crosshair');
        });
    },
    events: {
        moveDone: function (sphere) {
            var self = this.parent,
                args = arguments;

            self.moveSphere(sphere,
                Math.floor(Math.random() * FAUX.renderer.width),
                Math.floor(Math.random() * FAUX.renderer.height),
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
                FAUX.renderer.clear();
                self.drawArcSkeleton();
                //self.drawSpheres();
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
    zRotate: function (centerX, centerY, radius, angle) {
        var self = this;

        return {
            x: Math.cos(angle) * radius + centerX,
            y: Math.sin(angle) * radius + centerY
        };
    },
    drawSpheres: function () {
        var self = this,
            i,
            ii,
            sphere;

        // Sort by z-depth
        self.spheres.sort(function (a, b) {
            return a.z > b.z;
        });

        for (i = 0, ii = self.spheres.length; i < ii; i++) {
            sphere = self.spheres[i];
            FAUX.renderer.drawSphere(sphere.x, sphere.y, sphere.z, sphere.radius);
        }
    },
    drawArcSkeleton: function () {
        var self = this,
            i,
            ii,
            j,
            jj,
            sphere1,
            sphere2;

        for (i = 0, ii = self.spheres.length; i < ii; i++) {
            for (j = 0, jj = self.spheres.length; j < jj; j += 1) {
                if (i !== j) {
                    FAUX.renderer.drawArc({
                        x: self.spheres[i].x,
                        y: self.spheres[i].y,
                        z: self.spheres[i].z
                    }, {
                        // Vanishing Point
                        x: self.mousePosition.x,
                        y: self.mousePosition.y,
                        z: 0
                    }, {
                        x: self.spheres[j].x,
                        y: self.spheres[j].y,
                        z: self.spheres[j].z
                    }, 10);
                }
            }
        }
    },
    drawLineSkeleton: function () {
        var self = this,
            i,
            ii,
            j,
            jj,
            sphere1,
            sphere2;

        for (i = 0, ii = self.spheres.length; i < ii; i++) {
            for (j = 0, jj = self.spheres.length; j < jj; j += 1) {
                if (i !== j) {
                    FAUX.renderer.drawLine({
                        x: self.spheres[i].x,
                        y: self.spheres[i].y,
                        z: self.spheres[i].z
                    }, {
                        x: self.spheres[j].x,
                        y: self.spheres[j].y,
                        z: self.spheres[j].z
                    }, 10);
                }
            }
        }
    }
};
