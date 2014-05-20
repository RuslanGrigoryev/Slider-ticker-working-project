function feedTicker ( parent, elem, elemClone, marginLI, marginUL, tempDistance, leftBtn, rightBtn ) {
    if (!elem || !parent) return false;
    $(elemClone).html($(elem).html());


    var Ticker = {
        feedId : null,
        opts   :  {
            parent             :    parent,
            elem               :    elem,
            elemClone          :    elemClone,
            leftBtn            :    leftBtn,
            rightBtn           :    rightBtn,
            marginLI           :    40  ||   marginLI,
            marginUL           :    350 ||   marginUL,
            tempDistance       :    0   ||   tempDistance,
            intervalMs         :    20,
            currentDirection   :    false/*left*/
        },
        init  : function () {

            $(elem).find('li').each(function(){
                var offset=$(this).offset(),
                    offsetLeft=offset.left;
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
            $(elemClone).find('li').each(function(){
                var offset=$(this).offset();
                offsetLeft=offset.left;
                $(this).css({
                    left:offsetLeft+tempDistance
                });
                tempDistance=$(this).width()+tempDistance+marginLI;
            });
            $(elemClone).css({
                width:tempDistance+marginUL,
                marginLeft:tempDistance+marginLI
            });
        },
        stepLeft  : function (firstUl, cloneUl) {
            var marginLFirstUl=(parseInt($("#"+firstUl).css('marginLeft'))),
                marginLCloneUl=(parseInt($("#"+cloneUl).css('marginLeft')));

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
                if((-marginLCloneUl<=$("#"+cloneUl).width())){
                    $("#"+cloneUl).css({
                        marginLeft:  (marginLCloneUl-1)+'px'
                    });
                } else {
                    $("#"+cloneUl).css({
                        marginLeft:  tempDistance+10
                    });
                }

        },
        stepRight : function (firstUl, cloneUl) {
            var marginLFirstUl=(parseInt($("#"+firstUl).css('marginLeft'))),
                marginLCloneUl=(parseInt($("#"+cloneUl).css('marginLeft')));

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
                if((-marginLCloneUl<=$("#"+cloneUl).width())){
                    $("#"+cloneUl).css({
                        marginLeft:  (marginLCloneUl+1)+'px'
                    });
                } else {
                    $("#"+cloneUl).css({
                        marginLeft:  tempDistance-10
                    });
                }
        },
        playLeft :function () {
            Ticker.feedId = setInterval(function() {
                Ticker.stepLeft('feed','feed-clone');
            }, Ticker.opts.intervalMs);
        },
        playRight: function () {
            Ticker.feedId = setInterval(function() {
                Ticker.stepRight('feed','feed-clone');
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
var ticker1 = feedTicker ( '.wrap-feed', '#feed', '#feed-clone', 40, 350, 0, '.left-btn', '.right-btn' );