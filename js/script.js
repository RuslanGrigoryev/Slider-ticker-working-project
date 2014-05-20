function feedTicker ( parent, elem, marginLI, marginUL, tempDistance, leftBtn, rightBtn ) {
    if (!elem || !parent) return false;
 
    var Ticker = {
        feedId : null,
        opts   :  {
            parent             :    parent,
            elem               :    elem,
            leftBtn            :    leftBtn,
            rightBtn           :    rightBtn,
            marginLI           :    40  ||   marginLI,
            marginUL           :    50 ||   marginUL,
            tempDistance       :    0   ||   tempDistance,
            intervalMs         :    20,
            currentDirection   :    false/*left*/
        },
        init  : function () {




            $(elem).find('li').each(function(){
                var offset    = $(this).offset(),
                    offsetLeft= offset.left;

                $(this).css({
                    left:offsetLeft+tempDistance
                });

                tempDistance = $(this).width()+tempDistance+marginLI;
            });
            $(elem).css({
                width:tempDistance+marginUL,
                marginLeft: marginLI
            });
            tempDistance = 0;
        },
        stepLeft  : function (firstUl) {
            var marginLFirstUl=(parseInt($("#"+firstUl).css('marginLeft')));

                currentDirection = false;
                console.log(currentDirection);
                console.log('Left FIre');
                
                if((-marginLFirstUl<=$("#"+firstUl).width())){
                    $("#"+firstUl).css({
                        marginLeft:  (marginLFirstUl-1)+'px'
                    });
                } else {
                    $("#"+firstUl).css({
                        marginLeft:  tempDistance+10
                    });
                }

        },
        stepRight : function (firstUl) {
            var marginLFirstUl=(parseInt($("#"+firstUl).css('marginLeft')));

                currentDirection = true;
                console.log(currentDirection);
                console.log('Right FIre');

                if((-marginLFirstUl<=$("#"+firstUl).width())){
                    $("#"+firstUl).css({
                        marginLeft:  (marginLFirstUl+1)+'px'
                    });
                } else {
                    $("#"+firstUl).css({
                        marginLeft:  tempDistance-10
                    });
                }
        },
        playLeft :function () {
            Ticker.feedId = setInterval(function() {
                Ticker.stepLeft('feed');
            }, Ticker.opts.intervalMs);
        },
        playRight: function () {
            Ticker.feedId = setInterval(function() {
                Ticker.stepRight('feed');
            }, Ticker.opts.intervalMs);
        },
        pause: function () {
            clearInterval(Ticker.feedId);
        },
        leftMove: function () {
            $(leftBtn).on('click', function () {
                clearInterval(Ticker.feedId);
                Ticker.playLeft();
            });
        },
        rightMove: function () {
            $(rightBtn).on('click', function () {
                clearInterval(Ticker.feedId);
                Ticker.playRight();
            });
        }
    };
    $(parent).on('mouseover', function () {
        Ticker.pause();
    });
    $(parent).on('mouseleave', function () {
        currentDirection ? Ticker.playRight() : Ticker.playLeft();
    });
    Ticker.init();
    Ticker.playLeft();
    Ticker.leftMove();
    Ticker.rightMove();
    return Ticker;
};
var ticker1 = feedTicker ( '.wrap-feed', '#feed', 40, 50, 0, '.left-btn', '.right-btn' );