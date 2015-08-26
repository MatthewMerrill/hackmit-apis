var MIN_LENGTH = 3;
$(document).ready(function(){
    $("#search").on('keyup', function(){
        var query = $("#search").val().toLowerCase();
        handleQuery(query);
    });
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