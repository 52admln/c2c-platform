$(document).ready(function () {
    var length,
        currentIndex = 0,
        interval,
        hasStarted = false, //是否已经开始轮播
        t = 3000; //轮播时间间隔
    length = $('.slider-panel').length;
    //将除了第一张图片隐藏
    $('.slider-panel:not(:first)').hide();
    //将第一个slider-item设为激活状态
    $('.slider-item:first').addClass('slider-item-selected');
    //隐藏向前、向后翻按钮
    $('.slider-page').hide();
    //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
    $('.slider-panel, .slider-pre, .slider-next').hover(function () {
        stop();
        $('.slider-page').show();
    }, function () {
        $('.slider-page').hide();
        start();
    });
    $('.slider-item').hover(function (e) {
        stop();
        var preIndex = $(".slider-item").filter(".slider-item-selected").index();
        currentIndex = $(this).index();
        console.log(preIndex, currentIndex)
        play(preIndex, currentIndex);
    }, function () {
        interval = null;
        start();
    });
    $('.slider-pre').unbind('click');
    $('.slider-pre').bind('click', function () {
        pre();
    });
    $('.slider-next').unbind('click');
    $('.slider-next').bind('click', function () {
        next();
    });
    /**
     * 向前翻页
     */
    function pre() {
        var preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        play(preIndex, currentIndex);
    }

    /**
     * 向后翻页
     */
    function next() {
        var preIndex = currentIndex;
        currentIndex = ++currentIndex % length;
        play(preIndex, currentIndex);
    }

    /**
     * 从preIndex页翻到currentIndex页
     * preIndex 整数，翻页的起始页
     * currentIndex 整数，翻到的那页
     */
    function play(preIndex, currentIndex) {
        $('.slider-panel').eq(preIndex - 1).fadeOut(500)
            .parent().children().eq(currentIndex - 1).fadeIn(1000);
        $('.slider-item').removeClass('slider-item-selected');
        $('.slider-item').eq(currentIndex - 1).addClass('slider-item-selected');
    }

    /**
     * 开始轮播
     */
    function start() {
        if (!hasStarted) {
            hasStarted = true;
            interval = setInterval(next, t);
        }
    }

    /**
     * 停止轮播
     */
    function stop() {
        clearInterval(interval);
        hasStarted = false;
    }

    //开始轮播
    start();
});


function showTag(tagNo) {
    for (var i = 1; i <= 3; i++) {
        document.getElementById("div" + i).style.display = "none";
        document.getElementById("tag" + i).style.background = "#fff";
    }
    var tag = document.getElementById("tag" + tagNo);
    tag.style.background = "#ffda44";
    var tagContent = document.getElementById("div" + tagNo);
    tagContent.style.display = "block";
}
