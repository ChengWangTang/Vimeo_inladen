//NAMELESS FUNCTION - AUTO EXECUTED WHEN DOCUMENT IS LOADED
(function(){



    //SCROLL TO TOP
    $('.scrolltotop').click(function(ev){
        ev.preventDefault();
        $('html, body').animate({scrollTop:0},600);
        return false;
    });

    //FADE IN AND OUT SCROLLTOTOP
    $(window).scroll(function(ev){
        if($(this).scrollTop() > 60)
            $('.scrolltotop').fadeIn();
        else
            $('.scrolltotop').fadeOut();
    });


})();