const API_URL = "https://backend.festivalforgood.sg/api/";//"https://virtserver.swaggerhub.com/tranthanglong/festival-for-good/1.1.0/"; 

function getChatSrc() {
	if (typeof(Storage) !== "undefined" && localStorage.getItem("DEFAULT_CHAT_SRC") != null) {
		initChat(localStorage.getItem("DEFAULT_CHAT_SRC"));
	} else {
		$.ajax({
			url: API_URL + "home",
			success: function (result) {
				if (result) {
					if (typeof(Storage) !== "undefined") {
						localStorage.setItem("DEFAULT_CHAT_SRC", result.supportChat);
					}
					initChat(result.supportChat);
				}
			}
		});
	}
}

function initChat(chatSrc) {
	if (!chatSrc) {
		console.log("getting chatSrc...");
		getChatSrc();
	}
	console.log("chatSrc =", chatSrc);
	const script = document.createElement('script')
	script.id = 'tawkId'
	script.async = true
	script.src = chatSrc
	script.charset = 'UTF-8'
	script.setAttribute('crossorigin', '*')

	const container = document.getElementById('container');
	if (!container) {
		return null;
		// throw new Error('DOM is unavailable')
	}

	container.appendChild(script);

	if (!window) {
		return null;
		// throw new Error('DOM is unavailable')
	}

	window.$_Tawk = {};
	window.Tawk_API = {};
	window.Tawk_LoadStart = new Date();

	// pass attributes to tawk.to on widget load
	window.Tawk_API.onLoad = () => {
		console.log("window.Tawk_API.onLoad();");
		console.log(window.Tawk_API);
		window.Tawk_API.hideWidget();
	}

	window.Tawk_API.onChatMinimized = function () {
		window.Tawk_API.hideWidget();
	};

	const tawk = document.getElementById('tawkId')
	if (tawk) {
		// Prevent TawkTo to create root script if it already exists 
		return window.Tawk_API
	}
}

function resizeWindow() {
	// checkSizeWindow
	console.log("resizeWindow");
	var width = $(window).innerWidth();
	var height = $(window).innerHeight();
	var isHome = window.isHome;

	var ratioW = width/1370;
	var ratioH = height/790;
	// var zoom = width / 1366;
	var zoom = Math.min(ratioW, ratioH);

	if (isHome) {
		ratioH = height/825;
		zoom = Math.min(ratioW, ratioH);

		$("#container-blocks").css('transform', 'scale(' + zoom + ')');
		$("#container-bg").css('transform', 'scale(' + zoom + ')');
		if ($("#container-blocks")) {
			$("#container").height($("#container-blocks").height()*zoom + "px");
		}
	} else {
		$("#container").css('height', '');
		$("#wrapper").css('transform', 'scale(' + zoom + ')');	
	}
	// $("#wrapper").css('transform', 'scale(' + zoom + ')');
	// $("#what-happening").css('transform', 'scale(' + zoom + ')');
	// $("#about-us").css('transform', 'scale(' + zoom + ')');
}

function initMenu() {
	if ($("body .btn-menu").length > 0 && !$("body").hasClass("menu-rendered")) {
		$("body").on('click', '.btn-menu', function (event) {
			$("body #gNavi").addClass('active');
			setTimeout(function () { $("#gNavi").addClass('change-bg') }, 700);
		});
		$("body").on('click', ".btn-close", function (event) {
			$("body #gNavi").removeClass('active').removeClass('change-bg');
		});

		$("body").addClass("menu-rendered");
	}
}

function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};

function initSPA() {
	function requestContent(file) {
		console.log("file:" + file);
		$(document).trigger('unload');

		// console.log('jQuery("body .btn-chat").hide();');
		// jQuery("body .btn-chat").hide();

		$("<div>").load(file, function() {
			console.log("loaded");
			var that = this;
			
			jQuery("body #container").next().remove();
			jQuery('body').prepend('<div class="top-layer"></div><div class="top-layer top-layer--2"></div><div class="top-layer top-layer--3"></div><div class="top-layer top-layer--4"></div><div class="top-layer top-layer--5"></div>');
			
			setTimeout(function () {
				var topLayer = jQuery('body .top-layer');
				topLayer.addClass('active');
			  
			  	setTimeout(function () {
					jQuery("body #container").html($(that).find("#container").html());
					// jQuery("body .btn-chat").hide();
			  	}, 500);

			  	setTimeout(function () {
			  		initMenu();
			  		resizeWindow();
			  	}, 700);
			  
			  	setTimeout(function () {
					topLayer.remove();
					// jQuery("body .btn-chat").show();
					// console.log('>>>>>>>>>>>.show();');
			  	}, 1200);
			}, 50);
		});
	}

	history.pushState(location.href, null, location.href);

	jQuery("body").on('click', 'a', function(e) {
		// if(e.target != e.currentTarget) {
			var data = $(this).attr('href');
			var url = new URL(data, document.baseURI);

			if (data == undefined || data == '#') {
				return;
			}

			var ext = data.substr(data.lastIndexOf('.') + 1);

			if (location.origin != url.origin || location.href == url.href || ext == 'pdf') {
				return;
			}

			e.preventDefault();
		  	history.pushState(data, null, data);
		  	console.log("url:" + data);
		  	requestContent(data);
		// }

		e.stopPropagation();
	});


	window.addEventListener('popstate', function(e){
		var character = e.state;
		console.log("character: " + character);
		if (character == null) {
	  		character = '/';
		}

		requestContent(character);
	});
}


/* !stack ------------------------------------------------------------------- */
$(document).ready(function () {
	initSPA();
	resizeWindow();
	initMenu();
	window.addEventListener('resize', resizeWindow);

	$('body').on('click', '.btn-chat', function () {
		if (Tawk_API) {
			if (Tawk_API.isChatHidden()) {
				Tawk_API.showWidget();
				Tawk_API.maximize();
			} else {
				Tawk_API.hideWidget();
			}
		}
	});

	$(".registration-box input").keypress(function(){
		$('.form-valid').hide();
	});
	  
	$('.registration-box .btn-submit').click(function(){
		var firstname = $('#FirstName').val();
		
		var company = $('#Company').val();
		var Destination = $('#Destination').val();
		var Email = $('#Email').val();

		let is_valid = true;

		if(Email == ''){
			$('#EmailValid').show();
			is_valid = false;
		}

		if(company == ''){
			$('#CompanyValid').show();
			is_valid = false;
		}

		if(Destination == ''){
			$('#DestinationValid').show();
			is_valid = false;
		}

		if(firstname == ''){
			is_valid = false;
			$('#FirstNameValid').show();
		}

		// if(is_valid){
		// 	$.ajax({
		// 		url: "https://docs.google.com/forms/d/FORMKEY/formResponse",
		// 		beforeSend: function (xhr) {
		// 		  xhr.setRequestHeader('Access-Control-Allow-Origin', 'chrome-extension://EXTENSION_ID');
		// 		  xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
		// 		},
		// 		data: { "entry_856586387": timeOne, 
		// 		"entry_244812041": timeTwo, 
		// 		"entry_2138937452": timeThree },
		// 		type: "POST",
		// 		dataType: "xml",
		// 		xhrFields: {
		// 			withCredentials: true
		// 		},
		// 		statusCode: {
		// 			0: function () {
		// 				document.getElementById("message").innerHTML = "Your form has been submitted!";
		// 				window.location.replace("ThankYou.html");
		// 			},
		// 			200: function () {
		// 				document.getElementById("message").innerHTML = "Your form has been submitted!";
		// 				console.log("Success");
		// 				window.location.replace("ThankYou.html");
		// 			}
		// 		}
		// 	});
		// }
	});
	

});
