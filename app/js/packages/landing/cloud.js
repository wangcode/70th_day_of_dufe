function Cloud() {
    // 创建一个 Pixi应用 需要的一些参数
    var option = {
        width: 1920,
        height: 1080,
        transparent: false,
        forceCanvas: false,
    };

    // 创建一个 Pixi应用
    var app = new PIXI.Application(option);
    // 获取渲染器
    var renderer = app.renderer;
    // 图片精灵
    var preview;
    // 置换图精灵
    var cloudSprite = [];
    // 舞台（一个容器），这里面包括了图片精灵、置换图精灵
    var stage;
    var playground = document.getElementById('cloud');

    function setScene(url) {
        // renderer.view 是 Pixi 创建的一个canvas
        // 把 Pixi 创建的 canvas 添加到页面上
        playground.appendChild(renderer.view);

        // 创建一个容器
        stage = new PIXI.Container();

        // 根据图片的 url，创建图片精灵
        preview = PIXI.Sprite.fromImage(url);
        // 添加 图片精灵 到舞台
        stage.addChild(preview);

        // 创建置换图精灵
        cloudSprite[0] = PIXI.Sprite.fromImage('image/cloud.png');
        cloudSprite[0].y = 1080 - 323;
        cloudSprite[1] = PIXI.Sprite.fromImage('image/cloud2.png');
        cloudSprite[1].y = 80;
        cloudSprite[2] = PIXI.Sprite.fromImage('image/cloud3.png');
        cloudSprite[2].y = 400;
        cloudSprite[2].x = -1172;
        // 添加 置换图精灵 到舞台
        cloudSprite.forEach(function (item) {
            stage.addChild(item)
        });

        // 把 stage 添加到根容器上
        app.stage.addChild(stage);
    }


    // 置换图精灵的移动速度
    var velocity = [2, 1, 1.5];
    // raf 是调用 requestAnimationFrame方法的返回值，停止动画效果时需要用到
    var raf;

    function animate() {
        raf = requestAnimationFrame(animate);
        // 改变置换图精灵的位置
        cloudSprite.forEach(function (item, index) {
            item.x += velocity[index];
            if (item.x > 1920) {
                item.x = -item.width
            }
        })
    }
    setScene('image/banner-3.jpg');

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