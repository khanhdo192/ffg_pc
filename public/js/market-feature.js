function getItem(element) {
    let marketId = 0;
    if (element.links.self) {
        // format: https://backend.festivalforgood.sg/api/marketplace/4/12
        // the needed 'id' is /4/                                this ^
        let temp_array = element.links.self.split("/");
        if (temp_array.length > 2) {
            marketId = parseInt(temp_array[temp_array.length - 2]);
        }
    }
    
    let url = 'vendor-profile.html?id=' + element.id + '&marketId=' + marketId;
    let chatUrl = url + '$chatOn=1';
    let imgClassName = "img";
    let itemClassName = "vendor_item";
    let vendorName = getVendorClassName(marketId);
    if (vendorName) {
        imgClassName += " border-market-" + vendorName;
        itemClassName += " m-" + vendorName;
    }
    let content = '<div class="col-md-2">';
    content += '<div class="' + itemClassName + '">';
    content += '<div class="' + imgClassName + '"><a href="' + url + '"><img src="' + element.image + '"></a></div>';
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

function getVendorClassName(id) {
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
    return className;
}

function loadPage(pgNum) {
    
    $('#myDiv').html("");
    $.ajax({
        url: API_URL + "marketplace/" + "feature" + ((pgNum > 1) ? "?page=" + pgNum : ""),
        success: function (result) {
            console.clear();
            if (result) {
                let index = 0;
                let hideContent = [];
                $('#myDiv').html("");
                result.data.forEach(element => {
                    let content = '<div class="col-md-2"></div>';
                        content = getItem(element);
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
                            pageContent += '<a id="prevBtn" class="prev" onclick="loadPage(' + prev_page + ')"><img src="img/common/pre_btn.svg" alt=""></a>';
                        }
                        // next btn
                        if (pgData.current_page < pgData.total_pages) {
                            let next_page = pgData.current_page + 1;
                            pageContent += '<a id="nextBtn" class="next" onclick="loadPage(' + next_page + ')"><img src="img/common/next_btn.svg" alt=""></a>';
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
    loadPage(1);
});