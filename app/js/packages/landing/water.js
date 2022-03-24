function Water(id, img) {
    // 创建一个 Pixi应用 需要的一些参数
    var option = {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
        transparent: true,
    };

    // 创建一个 Pixi应用
    var app = new PIXI.Application(option);
    // 获取渲染器
    var renderer = app.renderer;
    // 图片精灵
    var preview;
    // 置换图精灵
    var displacementSprite;
    // 滤镜
    var displacementFilter;
    // 舞台（一个容器），这里面包括了图片精灵、置换图精灵
    var stage;
    var playground = document.getElementById(id);

    function setScene(url) {
        // renderer.view 是 Pixi 创建的一个canvas
        // 把 Pixi 创建的 canvas 添加到页面上
        playground.appendChild(renderer.view);

        // 创建一个容器
        stage = new PIXI.Container();

        // 根据图片的 url，创建图片精灵
        // preview = PIXI.Sprite.fromImage(url);
        // preview = PIXI.Texture.from(url);

        // 创建置换图精灵，在创建置换滤镜时会用到这个精灵
        // displacementSprite = PIXI.Texture.from('/images/landing/water.jpg')
        displacementSprite = PIXI.Sprite.fromImage('/images/landing/water.jpg');

        // 设置置换图精灵为平铺模式
        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        // 创建一个置换滤镜
        displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

        // 添加 图片精灵 到舞台
        stage.addChild(preview);

        // 添加 置换图精灵 到舞台
        stage.addChild(displacementSprite);

        // 把 stage 添加到根容器上
        app.stage.addChild(stage);
    }


    // 置换图精灵的移动速度
    var velocity = .5;
    // raf 是调用 requestAnimationFrame方法的返回值，停止动画效果时需要用到
    var raf;

    function animate() {
        raf = requestAnimationFrame(animate);
        // 改变置换图精灵的位置
        displacementSprite.x += velocity;
        displacementSprite.y += velocity;
        if (displacementSprite.x > 200 || displacementSprite.x < -200) {
            velocity = -velocity
        }
    }
    setScene(img);

    // 设置舞台的滤镜
    stage.filters = [displacementFilter];
    this.start = function () {
        // 开始动画
        cancelAnimationFrame(raf);
        animate()
    };
    this.stop = function () {
        // 停止动画
        cancelAnimationFrame(raf)
    }
}