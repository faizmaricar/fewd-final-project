$(document).ready(
    function(){
        loadItems();
        prevItem();
        nextItem();
    }
);

function loadItems(){
    $.ajax({url: "script/items.json", type: "GET", dataType: "json", cache: false, success: 
            function(data){
                displayItems(data);
                loadForm(data);
                $("#totalItems").text(data.length);
            }
           });
}

function displayItems(data){
    var $carousel = $(".carousel-inner");
    data.forEach(
        function(item, index){
            if(index === 0){
                var $row = $("<div class='item active'></div>");
            }else{
                var $row = $("<div class='item'></div>");
            }
            var $hgroup = $("<hgroup></hgroup>").attr("class", "col-sm-12");
            var $article = $("<article></article>").attr("class", "col-sm-8")
            var $section = $("<section></section>").attr("class", "col-sm-4");
                    
            var $title = $("<h1></h1>").html("<strong>" + item.Title + "</strong>");
            var $publisher = $("<h2></h2>").html("<strong>" + item.Publisher + "</strong>");
                    
            var $img = $("<img>").attr({src: item.mainContentImage, class: "img-responsive"});
            var $itemcode = $("<h3></h3>").html("<strong>" + item.ItemCode + "</strong>").attr("class", "col-sm-12");
            var $creators = $("<p></p>").html("<strong>" + item.Creators + "</strong>").attr("class", "col-sm-12");
            var $synopsis = $("<p></p>").html(item.Text).attr("class", "col-sm-12");
            var $releasedate = $("<h3></h3>").html("<strong>" + item.ReleaseDate + "</strong>").attr("class", "col-sm-12");
            var $srp = $("<h3></h3>").html("<strong>" + item.SRP + "</strong>").attr("class", "col-sm-12");;
                    
            $hgroup.append($title);
            $hgroup.append($publisher);
                    
            $section.append($img);
                    
            $article.append($hgroup);
            $article.append($itemcode);
            $article.append($creators);
            $article.append($synopsis);
            $article.append($releasedate);
            $article.append($srp);
                    
            $row.append($section);
            $row.append($article);
            
            $carousel.append($row);
            $(".carousel-inner:first-child").addClass("active");
        }
    );
}

function loadForm(data){
    var publishers = [];
    var srp = []
    var $publishers = $("#publisher");
    var $srp = $("#srp");
    data.forEach(
        function(item, index){
            if(!publishers.includes(item.Publisher.trim())){
                publishers.push(item.Publisher.trim());   
            }
            if(!srp.includes(item.SRP.trim().slice(5))){
                srp.push(item.SRP.trim().slice(5));   
            }
        }
    );
    publishers = publishers.sort();
    srp = srp.sort();
    publishers.forEach(
        function(publisher, index){
            var $publisher = $("<option></option>").html(publisher).attr("value", publisher.split(" ").join(""));
            $publishers.append($publisher);
        }
    
    );
    srp.forEach(
        function(price, index){
            var $price = $("<option></option>").html(price).attr("value", price.split(" ").join(""));
            $srp.append($price);
        }
    
    );
}
function filterData(){
}
function prevItem(){
    $("#itemCarousel").swiperight(function(){
            $(this).carousel('prev');
    });
}

function nextItem(){
    $("#itemCarousel").swipeleft(function(){
            $(this).carousel('next');
        });
}