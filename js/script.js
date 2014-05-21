﻿function feedTicker ( parent, elem, marginLI, marginUL, tempDistance, leftBtn, rightBtn, temp ) {
    if (!elem || !parent) return false;
    var POSITION  = null,
        currentDirection = false;
    $('#feed-left').html($(elem).html());
    $('#feed-clone').html($(elem).html());
    var Ticker = {
        feedId : null,
        opts   :  {
            parent             :    parent,
            elem               :    elem,
            leftBtn            :    leftBtn,
            rightBtn           :    rightBtn,
            marginLI           :    40   ||   marginLI,
            marginUL           :    50   ||   marginUL,
            tempDistance       :    0    ||   tempDistance,
            intervalMs         :    20,
            temp               :    temp || 3
        },
        init  : function () {

            $(elem).find('li').each(function(){
                tempDistance = $(this).width()+tempDistance+marginLI;
            });
            $(elem).css({
                width:tempDistance+marginUL +30 + 'px',
                left: 0 + 'px'
            });

            $('#feed-left').css({
                width: $(elem).width() + 'px',
                left : -$(elem).width()
            });
            $('#feed-clone').css({
                width: $(elem).width() + 'px',
                left : $(elem).width() 
            });
           
            POSITION = $(elem).width();
        },
        stepLeft  : function (firstUl) {
            var LeftFirstUl   = (parseInt( $("#"+firstUl).css('left')) ),
                leftFeedClone = (parseInt( $('#feed-clone').css('left')) ),
                leftFeedLeft  = (parseInt( $('#feed-left').css('left')) );
                
                currentDirection = false;
                $("#"+firstUl).css({
                    left:  (LeftFirstUl - temp)+'px'
                });
                $('#feed-clone').css({
                    left: (leftFeedClone - temp) + 'px'
                });
                $('#feed-left').css({
                    left: (leftFeedLeft - temp) + 'px'
                });

                /*если центральный блок находится левее своей ширины ( < -2122 ) то переставляем его на место справа*/
                if ( LeftFirstUl <= -($(elem).width()) ) {
                    POSITION -= temp;
                    $('#feed').css({
                        left: (POSITION*2) + 'px'
                    });
                }
                /*если последний блок находится левее , чем -2112, то переставляем его на место справа*/
                if ( leftFeedClone <= -($(elem).width()) ) {
                    POSITION -= temp;
                    $('#feed-clone').css({
                        left: (POSITION*2) + 'px'
                    });
                }
                /*если первый блок (который слева) и его левая точка уходит за ширину, то переставляем его вправо*/
                if ( leftFeedLeft < -($(elem).width()) ) {
                    POSITION -= temp;
                    $('#feed-left').css({
                        left: (POSITION*2) + 'px'
                    });
                }

        },
        stepRight : function (firstUl) {
            var LeftFirstUl   = (parseInt( $("#"+firstUl).css('left'))),
                leftFeedClone = (parseInt( $('#feed-clone').css('left')) ),
                leftFeedLeft  = (parseInt( $('#feed-left').css('left')) );
                currentDirection = true;

                $( "#"+firstUl ).css({
                    left:  ( LeftFirstUl + temp) +'px'
                });
                
                $('#feed-left').css({
                    left: ( leftFeedLeft + temp) + 'px'
                });

                $('#feed-clone').css({
                    left: ( leftFeedClone + temp) + 'px'
                });

                /*если центральный блок уходит за правую часть*/
                if ( LeftFirstUl >= ($(elem).width()) ) {
                    POSITION+=temp;
                    $('#feed').css({
                        left: -(POSITION)*2 + 'px'
                    });
                }
                if ( leftFeedClone >= ($(elem).width()) ) {
                    POSITION+=temp;
                    $('#feed-clone').css({
                        left: -(POSITION)*2 + 'px'
                    });
                }
                if ( leftFeedLeft >= ($(elem).width()) ) {
                    POSITION+=temp;
                    $('#feed-left').css({
                        left: -(POSITION)*2 + 'px'
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
var ticker1 = feedTicker ( '.wrap-feed', '#feed', 40, 50, 0, '.left-btn', '.right-btn', 3 );