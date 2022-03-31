
function yzfInit(selector) {
    var mySwiper = new Swiper(selector, {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: "auto",
        direction: "vertical",
        loop: true,
        autoplay: {
            delay: 1500,
        },
    });
}

function yzfShareInit() {
    var isWechat = navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;

    $("#wrap").on("click", function () {
        $("#wrap").hide()
    })

    $("#picture").on("click", function(e) {
        $("#picture").hide()
    })

    this.share = function () {
        if (isWechat) {
            $("#wrap").show()
        } else {
            $("body").addClass("captureScreen")
            $("#picture").show()
            const node = document.getElementById('capture')
            html2canvas(node, {
                backgroundColor: null
            }).then(async (canvas) => {
                let oImg = new Image();
                oImg.src = canvas.toDataURL(); // 导出图片
                $("#downloadImg").attr("href", oImg.src)
                node.innerHTML = oImg.outerHTML
                $(".yxq-yzf-share-picture-loading").fadeOut()
                $("body").removeClass("captureScreen")
            })
        }
    }
}