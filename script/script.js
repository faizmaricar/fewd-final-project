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
            cache: true,
            success: displayItems
        };
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        $.ajax(ajaxOptions);
        function displayItems(items){
            loadForm(items);
            var $carousel = $(".carousel");
            items.forEach(
                function(item, index){
                    var $row = $("<div></div>");
                    $row.addClass("media");
                    $row.addClass("item");
                    $row.addClass(item.Publisher.trim().split(" ").join(""));
                    var $hgroup = $("<hgroup></hgroup>").attr("class", "col-sm-12");
                    var $article = $("<article></article>").attr("class", "col-sm-8")
                    var $section = $("<section></section>") .attr("class", "col-sm-4");
                    
                    var $title = $("<h1></h1>").html("<strong>" + item.Title + "</strong>")
                    var $publisher = $("<h2></h2>").html("<strong>" + item.Publisher + "</strong>")
                    
                    var $img = $("<img>").attr({"data-lazy": item.mainContentImage, alt: "Item Image", class: "img-responsive"});
                    var $itemcode = $("<h3></h3>").html("<strong>" + item.ItemCode + "</strong>").attr("class", "col-sm-12");
                    var $creators = $("<p></p>").html("<strong>" + item.Creators + "</strong>").attr("class", "col-sm-12");
                    var $synopsis = $("<p></p>").html(item.Text).attr("class", "col-sm-12");
                    var $releasedate = $("<h3></h3>").html("<strong>" + item.ReleaseDate + "</strong>").attr("class", "col-sm-12 ");
                    var $srp = $("<h3></h3>").html("<strong>" + item.SRP + "</strong>").attr("class", "col-sm-12 " + item.SRP);
                    
                    $hgroup.append($title);
                    $hgroup.append($publisher);
                    
                    //$section.append("<div class='loader'></div>");
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
                });
            $(".carousel").slick({
                arrows: false,
                lazyLoad: "ondemand"
            });
            console.log($(".carousel div").length);
            toastr["info"]($(".carousel div").length + " items shown");
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
                    console.log($(".carousel div").length);
                    toastr["info"]($(".carousel div").length + " items shown");
                }
                else{
                    $(".carousel").slick('slickUnfilter');
                    $(".carousel").slick('slickFilter', '.' + $("#publisher").val());
                    console.log($(".carousel div").length);
                    toastr["info"]($(".carousel div").length + " items shown");
                } 
            }
        );
        $(document).ajaxStart(
            function(){
                $(".loader").css("display", "block");
            }
        );
        $(document).ajaxComplete(
            function(){
                $(".loader").css("display", "none");
            }
        );
    }
);