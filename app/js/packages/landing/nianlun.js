function NianLun() {
    //创建应用
    var option = {
        width: 1920,
        height: 1080,
        transparent: true,
    };
    var app = new PIXI.Application(option);
    //将应用放入页面
    app.renderer = new PIXI.CanvasRenderer(option); //使用canvas
    document.getElementById('nianlun').appendChild(app.view);
    var nianlun;

    //绘制方法
    draw();

    function draw() {
        var bgImg = createImg('nianlunBg');

        nianlun = createImg('nianlun');
        nianlun.anchor.set(.5, .5);
        nianlun.x = 960;
        nianlun.y = 540;
        nianlun.alpha = .2;
        nianlun.scale.set(.5);
        nianlun.blendMode = 1;

        var container = new PIXI.Container();
        container.addChild(bgImg, nianlun);
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
        scale = .8,
        rotation = 0;

    function animate() {
        raf = requestAnimationFrame(animate);
        if (nianlun) {
            rotation += .01;
            nianlun.rotation = rotation;

            if (alpha > .3 || alpha < .1) {
                alphaDirection = -alphaDirection
            }
            alpha += alphaDirection;
            nianlun.alpha = alpha;

            /*if(scale > 1 || scale < .8){
                scaleDirection = -scaleDirection
            }
            scale += scaleDirection;
            nianlun.scale = scale;*/
            nianlun.scale.set(scale)
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