$(function() {
	$("#quickresult").hide();
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
                let html;
                $("#quickresult").show();
                response.result.forEach(element => {
                    
                    html += "<option value=" + "'" + element.Title +"'" + ">" + element.Title + "<option>";
                    
                    
                    $("#result").html(html);
                });
            }
        });
    }
    });
	
});

