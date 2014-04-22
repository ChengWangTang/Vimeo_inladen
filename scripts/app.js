/*
 App: Vimeo App
 =========================================================================
 Version: 0.1.0
 Last updated: 11/12/2013
 =========================================================================
 */


var _vimeoData = null;//Variable - Global Scope

var URLDATAVIMEOGROUP = 'http://vimeo.com/api/v2/group/{0}/videos.json?callback=?';

/*
 Utilities
 =========================================================================
 */
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

/*
 Function: Load Vimeo Group Data
 =========================================================================
 Load Vimeo Videos from a certain group
 */
function loadVimeoGroup(groupname){
    //Ansynchrone aanvraag tot data
    $.ajax({
        type:'GET',
        url:URLDATAVIMEOGROUP.format(groupname),
        dataType:'jsonp',
        contentType:'application/json',
        cache:false,
        success:function(data){
            _vimeoData = data;
            //Parse and Vizu Data
            parseAndVizuVimeoData();
        }
    });
}



/*
 Function: Parse en Visualize Vimeo Data
 =========================================================================
 Show all Vimeo data
 */
function parseAndVizuVimeoData(){
    $('#vimeoitems').html();//Clear all data in element

    var content = '';
    content += '<ul>';
    $.each(_vimeoData, function(key,_vimeoDataItem){
        content += ''
            + '<div class="col col-lg-4 col-md-6 col-sm-6">'
            + '<img class="video-thumbnails" src="' + _vimeoDataItem.thumbnail_medium + '"/>'
            + '<h1 data-input="#filterBasic-input">' + _vimeoDataItem.title + '</h1>'
            + '<p>' +_vimeoDataItem.upload_date + '</p>'

            + '<section class="icons"> '
            + '<ul class="icons-list">'
            + '<li id="likes">'+_vimeoDataItem.stats_number_of_likes + '</li>'
            + '<li id="plays">'+_vimeoDataItem.stats_number_of_plays + '</li>'
            + '<li id="comments">'+_vimeoDataItem.stats_number_of_comments + '</li>'
            + '</ul>'
            + '</section>'

            + '<section>'
            + '<a title="test" data-id="'+_vimeoDataItem.id + '" title="Add this item" class="open-AddBookDialog btn btn-primary" href="#addBookDialog">' + "Video bekijken" +'</a>'


            + '<div data-id="'+ _vimeoDataItem.id +'" class="modal fade" id="addBookDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                + '<div class="modal-dialog">'
                    + '<div class="modal-content">'
                        + '<div class="modal-header">'
                            + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                            + '<h4 class="modal-title" id="myModalLabel">'+_vimeoDataItem.title+'</h4>'
                        + '</div>'
                        + '<div class="modal-body ">'
                            + '<p>' + _vimeoDataItem.description + '</p>'
                            + '<input type="text" name="bookId" id="bookId" value="" />'
                            + '<iframe id="video" src="'+ "http://player.vimeo.com/video/"+ _vimeoDataItem.id +'" allowfullscreen="" frameborder="0" height="315" width="100%"></iframe>'
                            //+ '<iframe id="video" src="'+ "http://player.vimeo.com/video/"+ _vimeoDataItem.id +'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen >'+'</iframe>'
                        + '</div>'

                    + '</div>'
                + '</div>'
            + '</div>'
            + '</section>'
            + '</div>';

    });
    content += '</ul>';
    $('#vimeoitems').append(content);
}
$(document).on("click", ".open-AddBookDialog", function (e) {

    e.preventDefault();

    var _self = $(this);

    var myBookId = _self.data('id');
    $("#bookId").val(myBookId);



    $(_self.attr('href')).modal('show');

});


/* STOP VIMEO VIDEO WHEN CLOSING BOOTSTRAP MODAL
 =========================================================================
 */


//Basically stops and starts the video on modal open/close
$('#modal').on('hide', function (e) {
    $("iframe").attr('src','');
});





/*
 SEARCH FUNCTION
 =========================================================================
 */

var TRange=null;

function findString (str) {
    if (parseInt(navigator.appVersion)<4) return;
    var strFound;
    if (window.find) {

        // CODE FOR BROWSERS THAT SUPPORT window.find

        strFound=self.find(str);
        if (!strFound) {
            strFound=self.find(str,0,1);
            while (self.find(str,0,1)) continue;
        }
    }
    else if (navigator.appName.indexOf("Microsoft")!=-1) {

        // EXPLORER-SPECIFIC CODE

        if (TRange!=null) {
            TRange.collapse(false);
            strFound=TRange.findText(str);
            if (strFound) TRange.select();
        }
        if (TRange==null || strFound==0) {
            TRange=self.document.body.createTextRange();
            strFound=TRange.findText(str);
            if (strFound) TRange.select();
        }
    }
    else if (navigator.appName=="Opera") {
        alert ("Opera browsers not supported, sorry...")
        return;
    }
    if (!strFound) alert ("String '"+str+"' not found!")
    return;
}




/*
 Function: Nameless function
 =========================================================================
 Simulate document.ready but better
 */
(function(){
    /* Call function: loadEcoplan */
    loadVimeoGroup(209646);
})();