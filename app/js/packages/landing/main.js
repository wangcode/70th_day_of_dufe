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
        cloudSprite[0] = PIXI.Sprite.fromImage('images/landing/cloud.png');
        cloudSprite[0].y = 1080 - 323;
        cloudSprite[1] = PIXI.Sprite.fromImage('images/landing/cloud2.png');
        cloudSprite[1].y = 80;
        cloudSprite[2] = PIXI.Sprite.fromImage('images/landing/cloud3.png');
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
            this.speed = Math.floor(Math.random() * 5) + 1;
            this.width = Math.floor(Math.random() * 3) + 3;
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
                this.petal.rotation += 0.1;
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
        }, 200);
    };
    this.stop = function () {
        clearInterval(this.addPetalTimer)
    }

}

function Particles() {

    var end_panel = document.querySelector("#star");
    var end_cv = document.getElementById("star-dust");
    var end_ctx = end_cv.getContext("2d");
    var end_cvWidth = parseInt(document.body.offsetWidth, 10); // get width without "px"
    var end_cvHeight = parseInt(document.body.offsetHeight, 10); // get height without "px"
    var resolution = window.devicePixelRatio || 1;
    var sprites = [];
    var toRad = Math.PI / 180;
    var fx_tl;

    // resize for retina
    resizeCv();

    function start_fx() {
        // particles
        init_fx(
            "circle", // texture
            1777, // total sprites
            50, 50, 50, 50, // width-+, height-+
            0, 1600, 0, 1600, // start position x-+, y-+
            4, 12, 0, 360, // velocity-+, angle-+
            .1, 2.5, .2, .8, // scale start-+, end-+
            360, 0, 0, // rotation start, end-+
            1.7, 24, // duration-+
            .1, 2, // fade in, out duration
            0.1, // gravity
            12, // delay+ inbetween sprites
            -1, // repeat sprite animation (-1 = infinite)
            0 // delay timeline
        );
    }
    $(document).mousemove(function (e) {
        var x = e.pageX;
        var y = e.pageY;
        var scrollPosition = $(window).scrollTop()
        createMagicDust(x, y - scrollPosition, 5)
    });

    function init_fx(textureSpr, totalSpr, minWidth, maxWidth, minHeight, maxHeight, xMin, xMax, yMin, yMax, veloMin, veloMax, angleMin, angleMax, startScaleMin, startScaleMax, endScaleMin, endScaleMax, rotStart, rotEndMin, rotEndMax, minDur, maxDur, fadeInDur, fadeOutDur, gravitySpr, delaySpr, repeatSpr, delayTl) {
        // generate sprites
        for (var i = 0; i < totalSpr; i++) {
            var widthSpr = randomInt(minWidth, maxWidth);
            var heightSpr = randomInt(minHeight, maxHeight);
            // define texture
            var texture = createShape(textureSpr, i);
            sprites.push(createSprite());
        }

        createMagicDust = (x, y, n) => {
            for (var i = 0; i < n; i++) {
                var texture = createShape(textureSpr, Math.floor(Math.random() * 10));
                sprites.push(createSprite(x, y, 2));
            }
        };

        // start rendering animation
        gsap.ticker.add(renderCv);
        // gsap.registerPlugin(Physics2DPlugin);
        function createSprite(x, y, t) {
            var width = (texture.naturalWidth || texture.width || 0) / resolution;
            var height = (texture.naturalHeight || texture.height || 0) / resolution;
            var duration = t || randomNr(minDur, maxDur);
            // limit angle if needed
            var angleNr;
            if (angleMin == -90 && angleMax == -270) {
                angleNr = Math.random() < 0.5 ? 90 : 270; // only up or down
            } else if (angleMin == -0 && angleMax == -180) {
                angleNr = Math.random() < 0.5 ? 0 : 180; // only left or right
            } else {
                angleNr = randomNr(angleMin, angleMax);
            }
            // create a new timeline for the sprite
            fx_tl = gsap.timeline({
                delay: t ? 0 : randomNr(delaySpr),
                repeat: t ? 0 : repeatSpr,
                repeatDelay: randomNr(1)
            });
            // sprite object default properites
            var sprite = {
                animation: fx_tl,
                texture: texture,
                width: width,
                height: height,
                alpha: 0,
                rotation: randomNr(rotStart),
                scale: randomNr(startScaleMin, startScaleMax),
                originX: t ? .2 : 0.5,
                originY: t ? .3 : 0.5,
                x: x || randomNr(xMin, xMax),
                y: y || randomNr(yMin, yMax),
            };

            // animate to
            fx_tl.add("start", delayTl)
                .to(sprite, t ? 0.3 : fadeInDur, {
                    alpha: 1,
                    ease: Power0.easeIn
                }, "start")
                .to(sprite, duration, {
                    rotation: 180 * randomNr(rotEndMin, rotEndMax),
                    scale: randomNr(endScaleMin, endScaleMax),
                    // physics2D: {
                    //     velocity: randomNr(veloMin, veloMax),
                    //     angle: angleNr,
                    //     gravity: gravitySpr,
                    // }
                }, "start")
                // fade out
                .to(sprite, t ? 1.5 : fadeOutDur, {
                    alpha: 0,
                    delay: t ? 1.5 : duration - fadeOutDur
                }, 0);

            return sprite;
        }

        function createShape(textureSpr, i) {
            // Create offscreen canvas
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = widthSpr * resolution;
            canvas.height = heightSpr * resolution;
            var radius = widthSpr / 2;
            var gradient = context.createRadialGradient(radius, radius, 0, radius, radius, radius);
            if (i % 3 === 0) {
                gradient.addColorStop(0, "rgba(177,255,252,0.75)");
                gradient.addColorStop(0.15, "rgba(177,255,252,0.1)");
            } else if (i % 5 === 0) {
                gradient.addColorStop(0, "rgba(202,76,255,0.6)");
                gradient.addColorStop(0.1, "rgba(202,76,255,0.1)");
            } else {
                gradient.addColorStop(0, "rgba(102,219,214,0.6)");
                gradient.addColorStop(0.1, "rgba(102,219,214,0.1)");
            }
            gradient.addColorStop(0.65, "rgba(0,0,0,0)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, widthSpr, heightSpr);
            return canvas;
        }
    }

    function renderCv() {
        end_ctx.clearRect(0, 0, end_cvWidth, end_cvHeight);
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            // Skip rendering sprite if it has no alpha
            if (!sprite.alpha) {
                continue;
            }
            end_ctx.save();
            var offsetX = sprite.originX * sprite.width;
            var offsetY = sprite.originY * sprite.height;
            end_ctx.translate(sprite.x + offsetX, sprite.y + offsetY);
            end_ctx.rotate(sprite.rotation * toRad);
            end_ctx.scale(sprite.scale, sprite.scale);
            end_ctx.globalAlpha = sprite.alpha;
            end_ctx.drawImage(sprite.texture, -offsetX, -offsetY);
            end_ctx.restore();
        }
    }

    function resizeCv() {
        end_cv.width = end_cvWidth * resolution;
        end_cv.height = end_cvHeight * resolution;
        end_cv.style.width = end_cvWidth + "px";
        end_cv.style.height = end_cvHeight + "px";
        end_ctx.scale(resolution, resolution);
    }

    function randomNr(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        return min + (max - min) * Math.random();
    }

    function randomInt(min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }
        return Math.floor(min + (max - min + 1) * Math.random());
    }
    start_fx();
}



// start_fx();
// var water = new Water('/images/landing/page2.jpg')
// var guang = new Guang()
// var cloud = new Cloud()
// var nianlundian = new NianLun()

var water = new Water('/images/landing/page2.jpg')
water.start()
// var cloud = new Cloud('images/landing/page3.jpg')
// cloud.start()

var sakura = new Sakura()
sakura.start()

Particles()