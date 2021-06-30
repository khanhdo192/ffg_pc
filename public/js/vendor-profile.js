function getItem(product, marketId) {
    let content = '<div class="col-2">';
    let url = '#';
    if (typeof product.url !== 'undefined') {
        url = product.url;
    }

    content += '<div class="p-item">';
    content += '<div class="p-img"><img src="' + product.image + '"></div>';
    content += '<div class="p-title">' + product.title + '</div>';
    content += '</div>';
    content += '</div>';

    return content;
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

/* !stack ------------------------------------------------------------------- */
$(document).ready(function () {
    let apiUrl = '';
    let b2bId = getUrlParameter('b2bId');
    let id = '';
    id = getUrlParameter('id');

    let marketId = getUrlParameter('marketId');
    if(marketId != undefined){
        $('.btn-back-marketplace').attr('href', 'marketplace-vendor.html?id='+marketId);
    }
    
    if(b2bId != undefined){
        $('.btn-back-b2b').attr('href', 'b2b-vendor.html?id='+b2bId);
    }
       

    if(b2bId) {
        id = getUrlParameter('b2bVendorId');
        apiUrl = API_URL + "b2b/" + b2bId + "/" + id;
    } else {
        id = getUrlParameter('id');
        let marketId = getUrlParameter('marketId');
        apiUrl = API_URL + "marketplace/" + marketId + "/" + id;
    }

    if(getUrlParameter('b2bVendorId') == 63||getUrlParameter('b2bVendorId') == 136||getUrlParameter('b2bVendorId') == 102||getUrlParameter('b2bVendorId') == 106
    ||getUrlParameter('b2bVendorId') == 138||getUrlParameter('b2bVendorId') == 139||getUrlParameter('b2bVendorId') == 143||getUrlParameter('b2bVendorId') == 126
    ||getUrlParameter('b2bVendorId') == 142||getUrlParameter('b2bVendorId') == 133||getUrlParameter('b2bVendorId') == 68||getUrlParameter('b2bVendorId') == 140
    ||getUrlParameter('id') == 169||getUrlParameter('id') == 53||getUrlParameter('id') == 162||getUrlParameter('id') == 29||getUrlParameter('id') == 2
    ||getUrlParameter('id') == 170||getUrlParameter('id') == 155||getUrlParameter('id') == 152||getUrlParameter('id') == 161||getUrlParameter('id') == 58
    ||getUrlParameter('id') == 151||getUrlParameter('id') == 38||getUrlParameter('id') == 168){
        logo2 = `<span>Supported By&emsp;<img src="img/data/DBS Foundation_E1_4C RGB.png" alt="" width="200px"></span>`;
    }else if(getUrlParameter('b2bVendorId') == 141||getUrlParameter('b2bVendorId') == 125||getUrlParameter('b2bVendorId') == 64||getUrlParameter('b2bVendorId') == 137
    ||getUrlParameter('b2bVendorId') == 135||getUrlParameter('id') == 28||getUrlParameter('id') == 154||getUrlParameter('id') == 153){
        logo2 = `<span><img class="logo-grant" src="img/data/Grant-Award-Lockup_Generic_RGB.png" alt="" width="180px"></span>`;
    }else{
        logo2 = ``;
    }


    $.ajax({
        url: apiUrl,
        success: function (result) {
            console.clear();
            if (result) {
                const element = result.data;

                if (element.supportChat && validURL(element.supportChat)) {
                    initChat(element.supportChat);
                }

                $('.vendor-logo').html(logo2);
                $('.vendor-title').html(element.title);
                $('.btn-shop').attr('href', element.shopUrl);
                $('.vendor-description').html(element.description);
                $('.btn-facebook').attr('href', element.facebookUrl);
                $('.btn-instagram').attr('href', element.instagramUrl);
                $('.btn-web').attr('href', element.url);

                if(b2bId && element.linkedinUrl) {
                    $('.btn-linkedin').attr('href', element.linkedinUrl);
                }

                if (element.introVideo) {
                    $('.embed-responsive-item').attr('src', element.introVideo);
                } else {
                    $('.col-profile').removeClass('col-6');
                    $('.col-profile').addClass('col-12');
                    $('.col-video').remove();
                    $('.vendor-box').addClass('center');
                }

                result.data.products.data.forEach(product => {
                    let content = getItem(product, id);
                    $('#myDiv').append(content);
                });
            }
        }
    });
});