import jquery from 'jquery';
import "slick-carousel";

window.$ = jquery;
window.jQuery = jquery;



document.addEventListener('DOMContentLoaded', () => {
    // Header
    $(".header-mobile-menu").on("click", function () {
        $(".header-wrap").toggleClass("open");
        $("body").toggleClass("noscroll")
    })
    // Header
})