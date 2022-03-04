// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'
// import {
//     Fireworks
// } from 'fireworks-js'
// import './pages/xqdt.js'
import Swiper, {
    Pagination
} from 'swiper';
// import 'swiper/css/bundle';


document.addEventListener('DOMContentLoaded', () => {

    // Header
    // const header = document.querySelector('.header');
    $(".header-mobile-menu").on("click", function () {
        $(".header-wrap").toggleClass("open");
    })
    // $(".header-mobile-menu").on("click", function () {
    //     $(".header-wrap").toggle()
    // })
    // Header

    // 校庆动态
    new Swiper('.xqdt-swiper', {
        loop: true,
        modules: [Pagination],
        pagination: {
            el: ".xqdt-swiper-pagination-el",
            // bulletActiveClass: ".xqdt-swiper-pagination-active"
        },
        on: {
            slideChange: console.log
        }
    })
    // 校庆动态 end
})