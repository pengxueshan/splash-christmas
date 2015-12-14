$(function(){
    /**
     * 雪花
     */
    function setWrapSize(){
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var $wrap = $('.wrap');
        var wrapWidth = $wrap.width();
        var wrapHeight = $wrap.height();
        var windowRatio = windowWidth/windowHeight;
        var designRatio = wrapWidth/wrapHeight;
        if(windowRatio < designRatio){
            $wrap.css({
                transform: 'scale('+windowHeight/wrapHeight+')'
            });
        }else{
            $wrap.css({
                transform: 'scale('+windowWidth/wrapWidth+')',

            });
        }
    }

    setWrapSize();

    function Snowflake(radius, color){
        if (radius === undefined) { radius = 10; }
        if (color === undefined) { color = "#ffffff"; }
        this.x = 0;
        this.y = 0;
        this.radius = radius;
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.color = color;
        this.lineWidth = 0;
    }

    Snowflake.prototype.draw = function (context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.scale(this.scaleX, this.scaleY);
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
        context.closePath();
        context.fill();
        if (this.lineWidth > 0) {
            context.stroke();
        }
        context.restore();
    };

    var piece = 10;
    var $wrap = $('.snow');
    var flakes = [];
    var canvas = $('#canvas').get(0);
    var context = canvas.getContext('2d');
    var startPoint = {
        x: canvas.width / 2 + 5,
        y: 5
    };

    for (var snow, i = 0; i < piece; i++) {
        snow = new Snowflake(Math.random() + 9);
        snow.x  = startPoint.x;
        snow.y  = startPoint.y;
        snow.vx = Math.random() * 2 - 1;
        snow.vy = Math.random();
        snow.speed = Math.random() * 0.5;
        flakes.push(snow);
    }

    function draw(snow){
        snow.vy += snow.speed;
        snow.x += snow.vx;
        snow.y += snow.vy;
        if (snow.x - snow.radius > canvas.width ||
            snow.x + snow.radius < 0 ||
            snow.y - snow.radius > canvas.height ||
            snow.y + snow.radius < 0) {
          snow.x = startPoint.x;
          snow.y = startPoint.y;
          snow.vx = Math.random() * 2 - 1;
          snow.vy = Math.random();
        }
        snow.draw(context);
    }

    var timer = setInterval(drawFrame, 30);

    function drawFrame(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        flakes.forEach(draw);
    }
});