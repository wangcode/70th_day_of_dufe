
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

    this.share = function() {
        $("#wrap").show()
        if (isWechat) {
            $("#weixin").show()
        } else {
            $("#browser").css("display", "flex")
        }
    }

    this.closeModel = function() {
        $("#wrap").hide()
        $("#browser").hide()
        $("#weixin").hide()
    }

    const node = document.getElementById('capture')
    html2canvas(node, {
        backgroundColor: null
    }).then(async (canvas) => {
        let oImg = new Image();
        oImg.src = canvas.toDataURL(); // 导出图片
        $("#downloadImg").attr("href", oImg.src)
        node.innerHTML = oImg.outerHTML
    })

}