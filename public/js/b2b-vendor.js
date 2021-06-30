function getItem(element, marketId) {
    let url = 'b2b-vendor-profile.html?b2bVendorId=' + element.id + '&b2bId=' + marketId;
    let chatUrl = url + '$chatOn=1';
    let content = '<div class="col-2">';
    content += '<div class="vendor_item">';
    content += '<div class="img"><a href="' + url + '"><img src="' + element.image + '"></a></div>';
    content += '<div class="title">' + element.title + '</div>';
    content += '<div class="row">';
    content += '<div class="col-7-5 text-right">';
    content += '<a class="btn-vendor" href="' + url + '">Learn more</a>';
    content += '</div>';
    //content += '<div class="col-6 text-left">';
    //content += '<a class="btn-vendor" href="' + chatUrl + '">Chat now</a>';
    //content += '</div>';
    content += '</div>';
    content += '</div>';
    content += '</div>';

    return content;
}

function setVendorClassName(id) {
    // 7 Gifting
    // 8 Pantry
    // 9 Logistics
    // 10 Building Management
    // 11 Staff Engagement
    // 12 Services
    let className = '';
    switch (parseInt(id)) {
        case 7:
            className = 'gifting';
            break;
        case 8:
            className = 'pantry';
            break;
        case 9:
            className = 'education-training';
            break;
        case 10:
            className = 'management-systems';
            break;
        case 11:
            className = 'communication-engagement';
            break;
        case 12:
            className = 'business-services';
            break;
    }

    if (className) {
        $('#mainContent').addClass('m-' + className);
        $('#b2bLogo').addClass("animation menu__items").html('<img src="img/common/menu-' + className + '.svg" alt="">');
    }
}

function loadPage(id, pgNum) {
    $('#myDiv').html("");
    $.ajax({
        url: API_URL + "b2b/" + id + ((pgNum > 1) ? "?page=" + pgNum : ""),
        success: function (result) {
            console.clear();
            if (result) {
                let index = 0;
                let hideContent = [];
                $('#myDiv').html("");
                result.data.forEach(element => {
                    let content = '<div class="col-2"></div>';
                    if (index !== 8 && index !== 9) {
                        content = getItem(element, id);
                    } 
                    if (index == 8 || index == 9) {
                        hideContent.push(getItem(element, id));
                    }

                    $('#myDiv').append(content);
                    index++;
                });

                if (hideContent) {
                    for (let i = 0; i < hideContent.length; i++) {
                        const element = hideContent[i];
                        $('#myDiv').append(element);
                    }
                    
                }

                let pgData = result.meta.pagination;
                let pageContent = "";
                if (pgData) {
                    if (pgData.total_pages > 1) {
                        // prev btn
                        if (pgData.current_page > 1) {
                            let prev_page = pgData.current_page - 1;
                            pageContent += '<a id="prevBtn" class="prev" onclick="loadPage(' + id + ',' + prev_page + ')"><img src="img/common/pre_btn.svg" alt=""></a>';
                        }
                        // next btn
                        if (pgData.current_page < pgData.total_pages) {
                            let next_page = pgData.current_page + 1;
                            pageContent += '<a id="nextBtn" class="next" onclick="loadPage(' + id + ',' + next_page + ')"><img src="img/common/next_btn.svg" alt=""></a>';
                        }
                    }
                    $('#myPageNavi').html(pageContent);
                }
            }
        }
    });
}

/* !stack ------------------------------------------------------------------- */
$(document).ready(function () {
    let id = getUrlParameter('id');

    setVendorClassName(id);

    loadPage(id, 1);
});