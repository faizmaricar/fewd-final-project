$(document).ready(
    function(){
        var filterbtn = $("#filter");
        
        filterbtn.click(function(){
            var titlequery = $("#title").val();
            var publisherquery = $("#publisher").val();
            var items = $(".owl-item") 
            console.log(titlequery);
            console.log(publisherquery);
            $(".owl-item").hide();
            $("." + publisherquery).parent(".owl-item").show();
            //$(".owl-item:nth-child(1)").hide();
        });
    }
);