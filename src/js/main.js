var MIN_LENGTH = 3;
$(document).ready(function(){
    equalheight('.api', 'p');
    $("#search-bar").on('keyup', function(){
        var query = $("#search-bar").val().toLowerCase();
        handleQuery(query);
    });

    $("#search #apiOnly").change(function(){
        console.log("change")
        if (this.checked) { //show APIonly!
            $(".noapi").hide(function(){
                equalheight('.api', 'p');
            });
        } else {  //show all
            $(".api").show(function(){
                equalheight('.api', 'p');
            })
        }
    })
});

function handleQuery(query){
    if (query.length >= MIN_LENGTH){
        $.each($(".api"), function(i, api){
            var data = api.dataset.queries.split(",");
            var i, len, term, match = false;
           for (i=0, len=data.length; i<len; i++){
                term = data[i];
                if (~term.indexOf(query)){
                    match = true;
                    break;
                }
           }
           match ?  $(api).fadeIn() : $(api).fadeOut();

        });
    }
    else {
        $(".api").fadeIn();
    }
}

//* Pads extend element so all items in container row have equal height.
equalheight = function(container, extend){
    var currentTallest   = 0,
         currentRowStart = 0,
         rowDivs         = new Array(),
         topPosition     = 0,
         $el;

    var updateHeight = function(currentDiv) {
        var content          = currentDiv.find(extend),
            oldDivHeight     = currentDiv.height(),
            oldContentHeight = content.height();

        content.height(oldContentHeight + (currentTallest-oldDivHeight));
    };
     $(container).each(function() {


       $el = $(this);

       if ($el.css('display') == 'none') return
       $($el).height('auto');
       topPostion = $el.position().top;

       if (currentRowStart != topPostion) {
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            updateHeight(rowDivs[currentDiv]);
          }
          rowDivs.length  = 0; // empty the array
          currentRowStart = topPostion;
          currentTallest  = $el.height();
          rowDivs.push($el);
       } else {
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          updateHeight(rowDivs[currentDiv]);
       }
     });
};
