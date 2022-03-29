function Cloud(baseurl) {
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

    function setScene() {
        // renderer.view 是 Pixi 创建的一个canvas
        // 把 Pixi 创建的 canvas 添加到页面上
        playground.appendChild(renderer.view);

        // 创建一个容器
        stage = new PIXI.Container();

        // 创建置换图精灵
        cloudSprite[0] = PIXI.Sprite.fromImage(baseurl+'/images/landing/cloud.png');
        cloudSprite[0].y = 1080 - 323;
        cloudSprite[1] = PIXI.Sprite.fromImage(baseurl+'/images/landing/cloud2.png');
        cloudSprite[1].y = 80;
        cloudSprite[1].x = -2200;
        cloudSprite[2] = PIXI.Sprite.fromImage(baseurl+'/images/landing/cloud3.png');
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
    var velocity = [1.8, 1.2, 1.3];
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
    setScene();

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

function Water(img, baseurl) {
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
        displacementSprite = PIXI.Sprite.fromImage(baseurl+'/images/landing/water.jpg');

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
    var petalNum = 0;

    var addPetalTimer

    this.start = function () {
        this.addPetalTimer = setInterval(function() {
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

var isMobile = screen.width <= 750;

var fireworkConfig1 = {
    "hue": {
        "min": 50,
        "max": 350
    },
    "delay": {
        "min": 20,
        "max": 40
    },
    "rocketsPoint": {
        "min": 21,
        "max": 45
    },
    "opacity": 0.1,
    "acceleration": 1.1,
    "friction": 0.94,
    "gravity": 0.3,
    "particles": 130,
    "trace": 1,
    "traceSpeed": 100,
    "explosion": 7,
    "intensity": 17,
    "flickering": 28,
    "lineStyle": "round",
    "lineWidth": {
        "explosion": {
            "min": 2,
            "max": 5.5
        },
        "trace": {
            "min": 0.00000001,
            "max": 0.00000001
        }
    },
    "autoresize": true,
    "brightness": {
        "min": 50,
        "max": 100,
        "decay": {
            "min": 0.012,
            "max": 0.024
        }
    },
    "boundaries": {
        "visible": false,
        "x": 0,
        "y": 0,
        "width": isMobile ? screen.width : screen.width / 3,
        "height": screen.height
    }
}
var fireworkConfig2 = {
    "hue": {
        "min": 50,
        "max": 350
    },
    "delay": {
        "min": 20,
        "max": 40
    },
    "rocketsPoint": {
        "min": 21,
        "max": 45
    },
    "opacity": 0.1,
    "acceleration": 1.1,
    "friction": 0.94,
    "gravity": 0.3,
    "particles": 130,
    "trace": 1,
    "traceSpeed": 100,
    "explosion": 7,
    "intensity": 17,
    "flickering": 28,
    "lineStyle": "round",
    "lineWidth": {
        "explosion": {
            "min": 2,
            "max": 5.5
        },
        "trace": {
            "min": 0.00000001,
            "max": 0.00000001
        }
    },
    "autoresize": true,
    "brightness": {
        "min": 50,
        "max": 100,
        "decay": {
            "min": 0.012,
            "max": 0.024
        }
    },
    "boundaries": {
        "visible": false,
        "x": screen.width / 1.4,
        "y": 50,
        "width": screen.width * 2.2,
        "height": screen.height
    }
}


function swiperInit(slides, firework1, firework2) {
    $(".landing-swiper").vegas({
        slides: slides,
        timer: false,
        delay: 5000,
        shuffle: false,
        transition: isMobile ? "slideDown2" : "fade",
        init: function (options) {
            $.each(options.slides, function (index) {
                var dom = '<div class="landing-swiper-pagination-item" data-index="' + index + '"></div>'
                if (index === 0) {
                    dom = '<div class="landing-swiper-pagination-item landing-swiper-pagination-active" data-index="' + index + '"></div>'
                }
                $(".landing-swiper-pagination").append(dom)

            })
            $('.landing-swiper-pagination').on('click', '.landing-swiper-pagination-item', function () {
                $(".landing-swiper").vegas('jump', parseInt($(this).attr("data-index")));
            })
        },
        walk: function (index) {
            // if (!isMobile) {
                $(".landing-swiper-pagination > .landing-swiper-pagination-item").each(function (i) {
                    if (i === index) {
                        $(this).addClass("landing-swiper-pagination-active")
                    } else {
                        $(this).removeClass("landing-swiper-pagination-active")
                    }
                })
            // }
            if (index === 0) {
                firework1.start()
                if (!isMobile) {
                    firework2.start()
                }
                $(".landing-title img").css("opacity", "0");
            } else {
                firework1.stop()
                if (!isMobile) {
                    firework2.stop()
                }
                $(".landing-title img").css("opacity", "1");
            }
            $(".landing-pixi").children().each(function () {
                $(this).fadeOut()
            })
            if (index === 1) {
                $("#water").fadeIn()
            }
            if (index === 2) {
                $("#sakura").fadeIn()
            }
            if (index === 3) {
                $("#cloud").fadeIn()
            }
        }
    });
}


function landingInit(slides, baseUrl) {

    var firework1 = new Fireworks(document.querySelector('#firework1'), fireworkConfig1)
    var firework2 = new Fireworks(document.querySelector('#firework2'), fireworkConfig2)

    swiperInit(slides, firework1, firework2)

    var water = new Water(slides[1].src, baseUrl)
    water.start()

    var cloud = new Cloud(baseUrl)
    cloud.start()

    var sakura = new Sakura()
    sakura.start()
}

