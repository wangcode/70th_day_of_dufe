// import {
//     Fireworks
// } from 'fireworks-js';
import jquery from 'jquery';
import "slick-carousel"

window.$ = jquery;
window.jQuery = jquery;


document.addEventListener('DOMContentLoaded', () => {

    // Header
    $(".header-mobile-menu").on("click", function () {
        $(".header-wrap").toggleClass("open");
    })
    // Header

    // Welcome
    // const WelcomeSwiper = new Swiper('.welcome-swiper', {
    //     loop: true
    // });

    // const container = document.querySelector('.welcome-fireworks')
    // const fireworks = new Fireworks(container, {
    //     trace: 1,
    //     lineWidth: {
    //         trace: {
    //             min: 0,
    //             max: 0.1
    //         }
    //     }
    // })
    // fireworks.start()
    // Welcome

    // 校庆动态
    // new Swiper('.xqdt-swiper', {
    //     loop: true,
    //     pagination: {
    //         el: ".xqdt-swiper-pagination-el",
    //     }
    // })
    // 校庆动态 end

    // 校庆标识
    // new Swiper('.xqbs-postcard-swiper-el', {
    //     loop: true,
    //     direction: "vertical",
    //     pagination: {
    //         el: ".xqbs-swiper-pagination-el",
    //     }
    // })
    // 校庆标识
})