function Guang() {
    //创建应用
    var option = {
        width: 1920,
        height: 1080,
        transparent: true,
    };
    var app = new PIXI.Application(option);
    //将应用放入页面
    app.renderer = new PIXI.CanvasRenderer(option); //使用canvas
    document.getElementById('guang').appendChild(app.view);
    var guang;

    //绘制方法
    draw();

    function draw() {
        var bgImg = createImg('guangBg');

        guang = createImg('guang');
        guang.anchor.set(.5, .5);
        guang.x = 960;
        guang.y = 540;
        guang.alpha = .5;
        guang.scale.set(.5);
        guang.blendMode = 1;

        var container = new PIXI.Container();
        container.addChild(bgImg, guang);
        app.stage.addChild(container)
    }
    //提取的PIXI生成图片公共方法
    function createImg(name) {
        return new PIXI.Sprite(loader.resources[name].texture)
    }

    var raf,
        alphaDirection = .01,
        alpha = .3,
        scaleDirection = .002,
        scale = .5,
        rotation = 0;

    function animate() {
        raf = requestAnimationFrame(animate);
        if (guang) {
            rotation += .01;
            guang.rotation = rotation;

            if (alpha > .6 || alpha < .3) {
                alphaDirection = -alphaDirection
            }
            alpha += alphaDirection;
            guang.alpha = alpha;

            if (scale > 1 || scale < .5) {
                scaleDirection = -scaleDirection
            }
            scale += scaleDirection;
            guang.scale = scale;
            guang.scale.set(scale)
        }
    }

    // 开始动画
    this.start = function () {
        cancelAnimationFrame(raf);
        animate()
    };
    // 停止动画
    this.stop = function () {
        cancelAnimationFrame(raf)
    }
}