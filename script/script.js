$(document).ready(
    function(){
        loadItems();
        prevItem();
        nextItem();
    }
);

function loadItems(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            displayItems(xhr.responseText);
        }
    };
    xhr.open("GET", "script/items.json", true);
    xhr.send(null);
}

function displayItems(responseText){
    items = JSON.parse(responseText);
            var $carousel = $(".carousel-inner");
            items.forEach(
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