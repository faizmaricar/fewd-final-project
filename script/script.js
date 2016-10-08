$(document).ready(
    function(){
        var next = $(".next");
        var prev = $(".prev");
        var filter = $("#filter");
        var filtered = false;
        var ajaxOptions = {
            url: "script/items.json",
            dataType: "json",
            type: "get",
            cache: false,
            success: displayItems
        };
        $.ajax(ajaxOptions);
        
        function displayItems(items){
            loadForm(items);
            var $carousel = $(".carousel");
            items.forEach(
                function(item, index){
                    var $row = $("<div></div>");
                    $row.addClass("item");
                    $row.addClass(item.Publisher.trim().split(" ").join(""));
                    var $hgroup = $("<hgroup></hgroup>").attr("class", "col-sm-12");
                    var $article = $("<article></article>").attr("class", "col-sm-8")
                    var $section = $("<section></section>") .attr("class", "col-sm-4");
                    
                    var $title = $("<h1></h1>").html("<strong>" + item.Title + "</strong>")
                    var $publisher = $("<h2></h2>").html("<strong>" + item.Publisher + "</strong>")
                    
                    var $img = $("<img>").attr({src: item.mainContentImage, alt: "Item Image", class: "img-responsive"});
                    var $itemcode = $("<h3></h3>").html("<strong>" + item.ItemCode + "</strong>").attr("class", "col-sm-12");
                    
                    var $creators = $("<p></p>").html("<strong>" + item.Creators + "</strong>").attr("class", "col-sm-12");
                    var $synopsis = $("<p></p>").html(item.Text).attr("class", "col-sm-12");
                    var $releasedate = $("<h3></h3>").html("<strong>" + item.ReleaseDate + "</strong>").attr("class", "col-sm-12 ");
                    var $srp = $("<h3></h3>").html("<strong>" + item.SRP + "</strong>").attr("class", "col-sm-12 " + item.SRP);
                    
                    $hgroup.append($title);
                    $hgroup.append($publisher);
                    
                    $section.append($img);
                    
                    $article.append($itemcode);
                    $article.append($creators);
                    $article.append($synopsis);
                    $article.append($releasedate);
                    $article.append($srp);
                    
                    $row.append($hgroup);
                    $row.append($section);
                    $row.append($article);
            
                    $carousel.append($row);
                    $("#totalItems").text(items.length);
                });
            $(".carousel").slick({arrows: false});
        }
        
        function loadForm(items){
            var publishers = [""];
            var $publishers = $("#publisher");
            
            items.forEach(
                function(item, index){
                    if(!publishers.includes(item.Publisher.trim())){
                        publishers.push(item.Publisher.trim());   
                    }
                }
            );
            publishers = publishers.sort();
            publishers.forEach(
                function(publisher, index){
                    var $publisher = $("<option></option>").html(publisher).attr("value", publisher.split(" ").join(""));
                    $publishers.append($publisher);
                }
            );
        }
        next.click(
            function(){
                $(".carousel").slick("slickNext");
            }
        );
        prev.click(
            function(){
                $(".carousel").slick("slickPrev");
                
            }
        );
        filter.click(
            function(){
                if($("#publisher").val() === ""){
                    $(".carousel").slick('slickUnfilter');
                }
                else{
                    $(".carousel").slick('slickUnfilter');
                    $(".carousel").slick('slickFilter', '.' + $("#publisher").val());
                }
                
            }
        );
    }
);