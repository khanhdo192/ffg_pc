function animationLogo() {
    var params = {
        container: document.getElementById('lottie'),
        renderer: 'svg',
        progressiveLoad: true,
        loop: false,
        autoplay: true,
        // animationData: animationData,
        rendererSettings: {
            filterSize: {
                width: '200%',
                height: '200%',
                x: '-50%',
                y: '-50%',
                preserveAspectRatio: 'xMidYMid meet',
            }
        }
    };
    if (typeof lottie  !== 'undefined') {
        if (lottie) {
          if (lottie.loadAnimation) {
            lottie.loadAnimation(params);
          }
        }
    }
}
function myFunction_about() {
  var x = document.getElementById("about");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
let check_happening = false;
let check_about = false;
function myFunction_happening() {
  var x = document.getElementById("happening");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
window.onclick = function(event) {
  var modal_happening = document.getElementById('happening');
  var displaySetting = modal_happening.style.display;
  if (displaySetting == 'block' && check_happening == true){
    modal_happening.style.display = 'none';
    check_happening = false;
  }else{
    check_happening = true;
  }

  var modal_about = document.getElementById('about');
  var displaySetting = modal_about.style.display;
  if (displaySetting == 'block' && check_about == true){
    modal_about.style.display = 'none';
    check_about = false;
  }else{
    check_about = true;
  }
  
}

function introVideo() {
    // no intro video on any other page, except the homepage
    let sub_path = window.location.href.substring(window.location.origin.length);
    if ((sub_path.length > 1) && (window.location.pathname !== "/")) { // not the home page
        console.log("no video");
        return;
    }

    let isPlayed = false;
    if (typeof Cookies !== 'undefined') {
        if (Cookies.get('home_intro')) {
            isPlayed = true;
        }
    }

    console.log("video played: ", isPlayed);

    if (!isPlayed) {
        $.ajax({
            url: API_URL + "home",
            success: function (result) {
                if (result) {
                    $("#video").attr('src', result.highlightVideo +
                        "?autoplay=1&wmode=opaque&amp;modestbranding=1&amp;showinfo=0");
                    $('#myModal').modal({
                        backdrop: false
                    });
                }
            }
        });
    }

    $('#myModal').on('hide.bs.modal', function (e) {
        $(".embed-responsive").find('iframe').attr('src', '');
        if (typeof Cookies !== 'undefined') {
            Cookies.set('home_intro', 1);
        }
    });
}
// initChat();

$(document).ready(function() {
  window.setTimeout(function() {
    introVideo();
    animationLogo();
  }, 10);
});
