var dsjSwiper;
var showNum = 5;
var isMobile = screen.width <= 750;

function toggleWaterDrop(index, dir, min, max) {
    if (index >= min && index <= max) {
        $(dsjSwiper.slides[index]).removeClass("scale");
        if (dir === "left") {
            setTimeout(function() {
                toggleWaterDrop(index - 1, "left", min, max)
            }, 500);
        }
        if (dir === "right") {
            setTimeout(function() {
                toggleWaterDrop(index + 1, "right", min, max)
            }, 500);
        }
    }
}

function handleWaterDropClick(index) {
    // if(isInit) return;
    var max = dsjSwiper.activeIndex + showNum - 1;
    var min = dsjSwiper.activeIndex
    isInit = true
    $(dsjSwiper.slides[dsjSwiper.clickedIndex]).removeClass("scale");
    setTimeout(function() {
        toggleWaterDrop(dsjSwiper.clickedIndex - 1, "left", min, max);
        toggleWaterDrop(dsjSwiper.clickedIndex + 1, "right", min, max);
    }, 300);
}

function toggleClass(list, index) {
    for (var i = 0; i < list.length; i++) {
        if (i >= index && i <= index + showNum - 1) {
            $(list[i]).removeClass("scale")
        } else {
            $(list[i]).addClass("scale")
        }
    }
}


function dsjInit(num) {

    if (num) {
        showNum = num;
    }

    dsjSwiper = new Swiper('.dsj-list', {
        direction: isMobile ? "vertical" : "horizontal",
        loop: !isMobile,
        freeMode: isMobile,
        slidesPerView: isMobile ? "auto" : showNum,
        allowTouchMove: isMobile,
        navigation: {
            nextEl: '.dsj-swiper-next',
            prevEl: '.dsj-swiper-prev',
        },
        on: {
            init: function () {
                if (isMobile) {
                    toggleClass(this.slides, this.activeIndex)
                }
            },
            slideChange: function () {

                if (isMobile) {
                    toggleClass(this.slides, this.activeIndex)
                } else {
                    for (var i = 0; i < this.slides.length; i++) {
                        if(i< this.activeIndex || i > this.activeIndex + showNum - 1){
                            $(this.slides[i]).addClass("scale")
                        }
                    }
                }
            }
        }
        // autoplay: {
        //     delay: 1500,
        // },
    });
}