function getItem(element) {

    let content = '<div class="container-fuild mySlides effect">';
    content += '<div class="images">';
    content += '<img style="border:3.2px solid #332083" id="img-happening" src="' + element.image + '"></img>';
    content += '</div>';
    content += '<div class="content">';
    content += '<h2 id="h2-happening">' + element.name + '</h2>';
    content += '<p id="text-happening">' + element.description +'</p>';
    content += '<a class="btn-regis" href="' + element.url + '.html";">SHOP NOW</a>';
    content += '</div>';
    content += '</div>';
    
    return content;
}



function loadPage() {
    $('#myHappening').html("");
    $.ajax({
        url: API_URL + "happenings",
        success: function (result) {
            console.clear();
            if (result) {
                let index = 0;
                $('#myHappening').html("");
                result.data.forEach(element => {
                    let content = '<div class="container-fuild mySlides effect">';
                        content = getItem(element);
                    $('#myHappening').append(content);
                    index++;
                });
            }
        }
    });
}

/* !stack ------------------------------------------------------------------- */
$(document).ready(function () {

    loadPage(1);

});