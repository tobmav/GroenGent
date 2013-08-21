var loaded = false;

$(document).ready(function() {
        loaded = true;
        
        showOverlays();
        getData(1);
        
        // Mobile
        $('.btn-user').click(function() {
            $('#menu-mobile, #overlay').fadeIn('fast');
        });
        
        $('#mobileClose').click(function() {
            $('#menu-mobile, #overlay').fadeOut('fast');
        });
       
        $('#mobileInfo').click(function() {
            $('#intro').show();
            $('#choose-data, #show-data').fadeOut().hide();
        });
       
        $('#mobileLijst').click(function() {
            $('#choose-data').show();
            $('#intro, #show-data').fadeOut().hide();
        });
        
        $('#mobileKaart').click(function() {
            $('#show-data').show();
            $('#intro, #choose-data').hide();
            $('#show-data *').css('display', 'block !important');
            google.maps.event.trigger(gmaps, 'resize');
            map.panTo(new google.maps.LatLng(lastLoc.lat(), lastLoc.lng()));
        });
        
        // Desktop
        
        $('.btn-login').click(function() {
		$('#overlay').clearQueue().fadeIn('fast');
		$('#view-login').clearQueue().delay(100).fadeIn();
	});
	
	$('.btn-register').click(function() {
		$('#overlay').clearQueue().fadeIn('fast');
		$('#view-register').clearQueue().delay(100).fadeIn();
	});
	
	$('#view-disclaimer .closeBtn').click(function(){
		if(!$('#view-login')) {
                    $('#view-disclaimer').clearQueue().delay(100).fadeOut();
                }
                
                else
                    $('#overlay').clearQueue().fadeOut('fast');
                    $('#view-disclaimer').clearQueue().fadeOut();
	});
	
	$('#list-styles').mouseover(function(){
		$('#list-styles').show();
	});
	
	$('#btn-style').click(function(){
    	$('#list-styles').toggle();
	});
	
	if($('#list-styles:visible')) {
		$('#container, #logo, #content, footer').click(function() {
			$('#list-styles').hide();
		});
	}
	
	$('footer a, #mobileDisclaimerBtn').click(function() {
		$('#overlay').clearQueue().fadeIn('fast');
		$('#view-disclaimer').clearQueue().delay(100).fadeIn();
	});
	
	$('#nav-mobile .menuBtn').click(function(){
		$('#buttons-header-mobile').clearQueue().fadeToggle('fast');
		$('#overlay').clearQueue().fadeToggle();
	});
	
	if($('#buttons-header-mobile:visible')) {
		$('#container, #content, #logo, #content, footer').click(function() {
			$('#buttons-header-mobile').clearQueue().hide();
		});
	}
});

function showOverlays() {
	$('#view-login').show();
	$('#view-forgot').show();
	$('#view-register').show();
        var url = window.location;
        console.log(url.pathname);
        var d = url.pathname.split('');
        var s = url.pathname.split('/');
        if (d [d.length-1] == '/') {
            var pathname = s[s.length-2];
        }else  {
            var pathname = s[s.length-1];
        }
        
	console.log(pathname);
        
        if(pathname == 'login' || pathname == 'forgotpassword' || pathname == 'register')
        {
            $("#overlay").show();
        }
}

function clearCbx () {
    $('#selData input').attr('checked', false);
}