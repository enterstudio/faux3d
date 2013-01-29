/*global $: false, console: false */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

var FAUX = FAUX || {};

window.FAUX.main = {
    init: function () {
        var self = this;

        FAUX.renderer.init();
    }
};

$(document).ready(function () {
    FAUX.main.init();
});