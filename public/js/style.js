$(function() {
    $("#userSrc").keyup(function() {
        let dInput = $("#userSrc").val();
        if(dInput.length >2){
        $.ajax({
            type: 'POST',
            url: '/quicksearch',
            data: {
                userSrc: dInput
            },
            dataType: 'json',
            success: function(response) {
                let html = '';
                
                response.result.forEach(element => {
                    console.log(element.Title);
                    html += "<h2>" + element.Title + "</h2>";
                    
                    
                    $("#userSrc").html(html);
                });
            }
        });
    }
    });
});