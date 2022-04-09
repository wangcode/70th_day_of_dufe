import jquery from 'jquery';
import "slick-carousel";
import cssVars from 'css-vars-ponyfill';

window.$ = jquery;
window.jQuery = jquery;

cssVars({});



document.addEventListener('DOMContentLoaded', () => {
    // Header
    $(".header-mobile-menu").on("click", function () {
        $(".header-wrap").toggleClass("open");
        $("body").toggleClass("noscroll")
    })
    // Header
})

if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}