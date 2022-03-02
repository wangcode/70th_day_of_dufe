// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'
// import {
//     Fireworks
// } from 'fireworks-js'
// import './pages/xqdt.js'
import Swiper from 'swiper';
// import 'swiper/css/bundle';


document.addEventListener('DOMContentLoaded', () => {

    // Header
    const header = document.querySelector('.header');
    $(".header-mobile-menu").on("click", function () {
        $(".header-wrap").toggle()
    })
    // Header

    // 校庆动态
    const swiper = new Swiper('.xqdt-swiper', {
        loop: true,
        pagination: {
            el: ".xqdt-swiper-pagination",
        }
    })
    // 校庆动态 end
})