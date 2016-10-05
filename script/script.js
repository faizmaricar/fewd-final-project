$(document).ready(
    function(){
        var owl = $("#owl-example")
        owl.owlCarousel({
            slideSpeed : 500,
            paginationSpeed : 400,
            singleItem:true,
            pagination: false,
            jsonPath: "script/items.json",
            jsonSuccess: displayItems
        });
    
        function displayItems(data){
            var items = data.items;
            var $carousel = $("#owl-example");
            
            loadForm(items)
            
            items.forEach(
                function(item, index){
                    var $row = $("<div></div>");
                    $row.addClass(item.Title.replace(/\s+/g, ''))
                    $row.addClass(item.Publisher.replace(/\s+/g, ''))
                    $row.addClass(item.ItemCode)
                    $row.addClass(item.ReleaseDate.slice(5).replace(/\s+/g, ''))
                    
                    var $hgroup = $("<hgroup></hgroup>").attr("class", "col-sm-12");
                    var $article = $("<article></article>").attr("class", "col-sm-8")
                    var $section = $("<section></section>") .attr("class", "col-sm-4");
                    
                    var $title = $("<h1></h1>").html("<strong>" + item.Title + "</strong>")
                    var $publisher = $("<h2></h2>").html("<strong>" + item.Publisher + "</strong>")
                    
                    var $img = $("<img>").attr({src: item.mainContentImage, class: "img-responsive"});
                    var $itemcode = $("<h3></h3>").html("<strong>" + item.ItemCode + "</strong>").attr("class", "col-sm-12");
                    
                    var $creators = $("<p></p>").html("<strong>" + item.Creators + "</strong>").attr("class", "col-sm-12");
                    var $synopsis = $("<p></p>").html(item.Text).attr("class", "col-sm-12");
                    var $releasedate = $("<h3></h3>").html("<strong>" + item.ReleaseDate + "</strong>").attr("class", "col-sm-12 ");
                    var $srp = $("<h3></h3>").html("<strong>" + item.SRP + "</strong>").attr("class", "col-sm-12 " + item.SRP);
                    
                    $hgroup.append($title);
                    $hgroup.append($publisher);
                    
                    $section.append($img);
                    
                    //$article.append($hgroup);
                    $article.append($itemcode);
                    $article.append($creators);
                    $article.append($synopsis);
                    $article.append($releasedate);
                    $article.append($srp);
                    
                    $row.append($hgroup);
                    $row.append($section);
                    $row.append($article);
            
                    $carousel.append($row);
                    
                });
        }
        
        function loadForm(data){
            var publishers = [""];
            var srp = [""];
            
            var $publishers = $("#publisher");
            var $srp = $("#srp");
            
            data.forEach(
                function(item, index){
                    if(!publishers.includes(item.Publisher.trim())){
                        publishers.push(item.Publisher.trim());   
                    }
                    if(!srp.includes(parseFloat(item.SRP.trim().slice(6)))){
                        srp.push(parseFloat(item.SRP.trim().slice(6)));   
                    }
                }
            );
            publishers = publishers.sort();
            srp = srp.sort(function(a,b){return a-b});
            publishers.forEach(
                function(publisher, index){
                    var $publisher = $("<option></option>").html(publisher).attr("value", publisher.split(" ").join(""));
                    $publishers.append($publisher);
                }
            );
            srp.forEach(
                function(price, index){
                    if(price !== ""){
                        price = "$" + price
                    }
                    var $price = $("<option></option>").html(price).attr("value", price);
                    $srp.append($price);
                }
            );
            $("#totalItems").text(data.length);
        }
        $(".next").click(function(){
            owl.trigger('owl.next');
        })
        $(".prev").click(function(){
            owl.trigger('owl.prev');
        })
    }
);  