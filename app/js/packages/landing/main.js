function NianLun() {
    //创建应用
    var option = {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
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

function Guang() {
    //创建应用
    var option = {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
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

function Cloud(img) {
    // 创建一个 Pixi应用 需要的一些参数
    var option = {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
        transparent: true,
        // forceCanvas: false,
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

        // 创建置换图精灵
        cloudSprite[0] = PIXI.Sprite.fromImage('images/landing/cloud.png');
        cloudSprite[0].y = 1080 - 323;
        cloudSprite[1] = PIXI.Sprite.fromImage('images/landing/cloud2.png');
        cloudSprite[1].y = 80;
        cloudSprite[2] = PIXI.Sprite.fromImage('images/landing/cloud3.png');
        cloudSprite[2].y = 400;
        cloudSprite[2].x = -1172;
        cloudSprite[0] = PIXI.Sprite.fromImage('images/landing/cloud2.png');
        cloudSprite[0].y = 2000 - 323;
        // 添加 置换图精灵 到舞台
        cloudSprite.forEach(function (item) {
            stage.addChild(item)
        });

        // 把 stage 添加到根容器上
        app.stage.addChild(stage);
    }


    // 置换图精灵的移动速度
    var velocity = [1.2, 1.4, 1.6, 1.3];
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
    setScene(img);

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

function Water(img) {
    // 创建一个 Pixi应用
    var app = new PIXI.Application({
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
        transparent: true,
    });
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
    var playground = document.getElementById("water");

    function setScene(url) {
        // renderer.view 是 Pixi 创建的一个canvas
        // 把 Pixi 创建的 canvas 添加到页面上
        playground.appendChild(renderer.view);

        // 创建一个容器
        stage = new PIXI.Container();

        // 根据图片的 url，创建图片精灵
        preview = PIXI.Sprite.fromImage(url);

        // 创建置换图精灵，在创建置换滤镜时会用到这个精灵
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
    var velocity = .3;
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

function Sakura() {
    var width = window.innerWidth
    var height = window.innerHeight
    var app = new PIXI.Application({
        width: width,
        height: height,
        transparent: true,
    });
    document.getElementById('sakura').appendChild(app.view);

    function Petal() {
        this.play = function () {
            this.x = Math.floor(Math.random() * width);
            this.y = -10;
            this.drift = Math.random();
            this.speed = Math.floor(Math.random() * 2.5) + 1;
            this.width = Math.floor(Math.random() * 4) + 3;
            this.height = this.width + 3;
            this.theta = Math.floor(Math.random() * 100);
            this.radius = Math.floor(Math.random() * 10) + 3;

            this.draw();
        }
        this.draw = function () {
            this.petal = new PIXI.Graphics();
            this.petal.beginFill(0xf4c6f1, 1);
            this.petal.drawEllipse(0, 0, this.width, this.height);
            this.petal.endFill();

            this.petal.x = this.x;
            this.petal.y = this.y;

            app.stage.addChild(this.petal);

            this.fall();
        }
        this.fall = function () {
            this.ticker = new PIXI.ticker.Ticker();

            this.ticker.add(function () {
                this.x += this.drift;
                this.y += this.speed;
                this.theta += 0.1;

                if (this.x > width) this.x = 0;
                if (this.y > height) this.y = -5;

                this.petal.x = this.x + Math.cos(this.theta) * this.radius;
                this.petal.y = this.y;
                this.petal.rotation += 0.02;
            }.bind(this));
            this.ticker.start();
        }
    }

    var maxPetalNum = 50;
    let petalNum = 0;

    var addPetalTimer

    this.start = function () {
        this.addPetalTimer = setInterval(() => {
            var petal = new Petal();
            petal.play()
            petalNum++;
            if (petalNum > maxPetalNum) clearInterval(this.addPetalTimer);
        }, 300);
    };
    this.stop = function () {
        clearInterval(this.addPetalTimer)
    }

}

var water = new Water('/images/landing/page2.jpg')
water.start()

var cloud = new Cloud('images/landing/page4.jpg')
cloud.start()

var sakura = new Sakura()
sakura.start()
