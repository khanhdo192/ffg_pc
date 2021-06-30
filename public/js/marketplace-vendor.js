function getItem(element, marketId) {

    let key = '';
    element.socialCause.data.forEach(ele => {
        let res = ele.tooltip.toLowerCase();
        res = res.replace(/ /g,"_");
        res = res.replace(/&/g,"_");
        res = res.replace(/,/g,"_");
        key += res;
    });

    let url = 'vendor-profile.html?id=' + element.id + '&marketId=' + marketId;
    let content = '<div class="col-md-1">';
    content += '<div class="vendor_item" data-key="'+key+'">';
    content += '<div class="img"><a href="' + url + '"><img src="' + element.image + '"></a></div>';
    content += '<div class="title">' + element.title + '</div>';
    content += '<div class="row">';
    content += '<div class="col-6 text-right">';
    content += '<a class="btn-vendor" href="' + url + '">Learn more</a>';
    content += '</div>';
    content += '<div class="col-6 text-left">';
    content += '<a class="btn-vendor" href="' + element.shopUrl + '">Shop now</a>';
    content += '</div>';
    content += '</div>';
    content += '</div>';
    content += '</div>';

    return content;
}

function getItemSocialCause(element, index) {
    
    let content = '';
    
    let res = element.tooltip.toLowerCase();

    res = res.replace(/ /g,"_");
    res = res.replace(/&/g,"_");
    res = res.replace(/,/g,"_");

    content += '<div data-id="'+res+'" data-border="border-'+(index+1)+'" data-color="color-'+(index+1)+'" class="social_cause_item">';
    content += '<div class="img">';
    content += '<a class="img_social_cause" href="javascript:void(0)"><img src="' + element.image + '"></a>';
    content += '<div class="social-tooltip social-tooltip-'+index+' color-'+(index+1)+'">' + element.tooltip + '</div>';
    content += '</div>';
    content += '</div>';

    return content;
}

function setVendorClassName(id) {
    // 1 Education Hub
    // 2 Fashion Plaza
    // 3 Gourmet Street
    // 4 Community Centre
    // 5 Wellness Arena
    // 6 Living Room
    let className = '';
    switch (parseInt(id)) {
        case 1:
            className = 'education';
            break;
        case 2:
            className = 'fashion';
            break;
        case 3:
            className = 'gourmet';
            break;
        case 4:
            className = 'community';
            break;
        case 5:
            className = 'wellness';
            break;
        case 6:
            className = 'living';
            break;
    }

    if (className) {
        $('#mainContent').addClass('m-' + className);
        $('#marketLogo').addClass("animation menu__items").html('<img src="img/common/menu-' + className + '.svg" alt="">');
    }
}

/* !stack ------------------------------------------------------------------- */
$(document).ready(function () {
    let id = getUrlParameter('id');

    setVendorClassName(id);

    $.ajax({
        url: API_URL + "marketplace/" + id,
        success: function (result) {
            console.clear();
            if (result) {
                let index = 0;
                let hideContent = '';
                result.data.forEach(element => {
                    let content = '<div class="col-md-1"></div>';
                    if (index !== 10) {
                        content = getItem(element, id);
                    } else {
                        hideContent = getItem(element, id);
                    }

                    $('#myDiv').append(content);
                    index++;
                });

                if (hideContent) {
                    $('#myDiv').append(hideContent);
                }
            }
        }
    });
    
    $.ajax({
        url: API_URL + "socialCause",
        success: function (result) {
            console.clear();
            if (result) {
                let index = 0;
                let hideContentSocial = '';
                result.data.forEach(element => {
                    let content_social_cause = '';
                    if (index !== 17) {
                        content_social_cause = getItemSocialCause(element, index);
                    } else {
                        hideContentSocial = getItemSocialCause(element, index);
                    }
                    $('#socialCause').append(content_social_cause);
                    index++;
                });

                if (hideContentSocial) {
                    $('#socialCause').append(hideContentSocial);
                }
                $('.social_cause_item').click(function(){
                    $('.social-tooltip').hide();
                    $(this).find('.social-tooltip').show();
                    let id = $(this).attr('data-id');
                    let border = $(this).attr('data-border');
                    $('.vendor_item img').removeAttr('class');                    
                    $(".vendor_item").each(function() {
                        let key = $(this).attr('data-key');
                        if(key.indexOf(id) != -1){
                            $(this).find('img').addClass(border);
                        }
                    });

                });
            }
        }
    });

});