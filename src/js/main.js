var MIN_LENGTH = 3;
$(document).ready(function(){
    $("#search-bar").on('keyup', function(){
        var query = $("#search-bar").val().toLowerCase();
        handleQuery(query);
    });
});

function handleQuery(query){
    console.log("handle")
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
