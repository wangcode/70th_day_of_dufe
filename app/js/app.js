// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'
// import {
//     Fireworks
// } from 'fireworks-js'
// import './pages/xqdt.js'
import Swiper, {
    Pagination
} from 'swiper';
import {
    Fireworks
} from 'fireworks-js'

var config = {
    "hue": {
        "min": 77,
        "max": 345
    },
    "delay": {
        "min": 19,
        "max": 70
    },
    "rocketsPoint": {
        "min": 29,
        "max": 62
    },
    "opacity": 0.7000000000000001,
    "acceleration": 1.02,
    "friction": 0.96,
    "gravity": 0.5,
    "particles": 192,
    "trace": 1,
    "traceSpeed": 68,
    "explosion": 6,
    "intensity": 36.287374463171695,
    "flickering": 12,
    "lineStyle": "round",
    "lineWidth": {
        "explosion": {
            "min": 2,
            "max": 5.5
        },
        "trace": {
            "min": 0,
            "max": 0.1
        }
    },
    "autoresize": true,
    "brightness": {
        "min": 21,
        "max": 55,
        "decay": {
            "min": 0.015,
            "max": 0.03
        }
    },
    "mouse": {
        "click": true,
        "move": false,
        "max": 1
    }
}


document.addEventListener('DOMContentLoaded', () => {

    // Header
    $(".header-mobile-menu").on("click", function () {
        $(".header-wrap").toggleClass("open");
    })
    // Header

    // Welcome
    const WelcomeSwiper = new Swiper('.welcome-swiper', {
        loop: true
    });

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

    // 校庆标识
    new Swiper('.xqbs-postcard-swiper-el', {
        loop: true,
        modules: [Pagination],
        direction: "vertical",
        pagination: {
            el: ".xqbs-swiper-pagination-el",
            // bulletActiveClass: ".xqdt-swiper-pagination-active"
        }
    })
    // 校庆标识
})