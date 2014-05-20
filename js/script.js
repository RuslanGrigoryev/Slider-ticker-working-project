function feedTicker ( parent, elem, elemClone, marginLI, marginUL, tempDistance ) {
    if (!elem || !parent) return false;
    $(elemClone).html($(elem).html());


    var Ticker = {
        feedId : null,
        opts   :  {
            parent       :    parent,
            elem         :    elem,
            elemClone    :    elemClone,
            marginLI     :    40  ||   marginLI,
            marginUL     :    350 ||   marginUL,
            tempDistance :    0   ||   tempDistance,
            intervalMs   :    20
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
        step  : function (firstUl, cloneUl) {
            var marginLFirstUl=(parseInt($("#"+firstUl).css('marginLeft'))),
                marginLCloneUl=(parseInt($("#"+cloneUl).css('marginLeft')));
            if((-marginLFirstUl<=$("#"+firstUl).width())&&(-marginLFirstUl<=$("#"+firstUl).width())){
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
        play :function () {
            Ticker.feedId = setInterval(function() {
                Ticker.step('feed','feed-clone');
            }, Ticker.opts.intervalMs);
        },
        pause: function () {
            clearInterval(Ticker.feedId);
        }
    };
    $(parent).on('mouseover', function () {
        Ticker.pause();
    });
    $(parent).on('mouseleave', function () {
        Ticker.play();
    });
    Ticker.init();
    Ticker.play();
    return Ticker;
};
var ticker1 = feedTicker ( '.wrap-feed', '#feed', '#feed-clone', 40, 350, 0 );