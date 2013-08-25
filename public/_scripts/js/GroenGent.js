/* GroenGent JS File - FX
 * Tom Van humbeek
 * NMDAD III - 2012/2013
-------------------------
1. Init
2. Common events
3. Set compare texts
4. Mobile
5. Desktop
6. Show approppriate forms
-----------------------*/

// -- 1. Init --
var loaded = false;

function initMobile() {
    $('#intro, #compare').show();
    $('#choose-data, #show-data').fadeOut().hide();
}

// -- 2. Common events (document ready) --
$(document).ready(function() {
        loaded = true;
        
        showOverlays();
        getData(1);
        
        $('#choose-data li:first-child a:first-child').css({'font-style':'italic' , 'text-decoration':'underline'});
        
        $('#choose-data li a:first-child').click(function() {
            $('#choose-data li a:first-child').css({'font-style':'normal' , 'text-decoration':'none'});
            $(this).css({'font-style':'italic' , 'text-decoration':'underline'});
        });
        
        // -- 3. Compare texts --
        
        $('#liParken').click(function() {
            $('#compare h3').html('Je hebt parken geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Hmm, een mooie uitstap naar het park, zalig! Met je kleintje een namiddag gaan spelen, of met je partner een wandeling maken.</p><p>Als je wil, kan je hierna een filmpje meepikken? Klik hieronder op bioscopen!</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-parken.png');
            $('#c3').attr('src','_assets/img/compare/icon-bios.png');
        });
        
        $('#liParking').click(function() {
            $('#compare h3').html('Je hebt parkings geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Daar parkeer je het beste! Als je dus in Gent moet zijn voor bijvoorbeeld een infodag van een school, kan je hier het beste parkeren. Je kan nadien ook nog de kotzones eens doornemen?</p><p>Hieronder vind je alvast parkings terug. Kies vervolgens uit de lijst om enkele bezienswaardigheden terug te vinden.</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-parking.png');
            $('#c3').attr('src','_assets/img/compare/icon-kotzones.png');
        });
        
        $('#liBibs').click(function() {
            $('#compare h3').html('Je hebt bibliotheken geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Een spannend avontuur van Sherlock Holmes, een magische uitstap in de wereld van Harry Potter! Of... schoolwerk dat je moet maken? Arme jij. Ongetwijfeld vind je hier alles wat je dient op te zoeken.</p><p>Hieronder staan alvast de beste bibliotheken op een rijtje! We geven je alvast de suggestie mee voor het dichtsbijzijnde ziekenhuis.</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-bib.png');
            $('#c3').attr('src','_assets/img/compare/icon-hospital.png');
        });
        
        $('#liBios').click(function() {
            $('#compare h3').html('Je hebt bioscopen geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Op de eerste rij, of op de achterste rij met je lief? Hieronder tonen we je alvast de bioscopen waar je dit kan doen! Of het nu een komische-, drama- of horrorfilm is - er is absoluut voldoende keuze!</p> <p>Als je nadien de weg terug wilt vinden naar de auto, klik je op parkings. We wensen je alvast veel kijkplezier toe!</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-bios.png');
            $('#c3').attr('src','_assets/img/compare/icon-parking.png');
        });
        
        $('#liApoth').click(function() {
            $('#compare h3').html('Je hebt apotheken geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Ai, iets teveel gedronken gisteren? Wij tonen je alvast de apotheken uit Gent (en dat zijn er veel). Koop hier je pijnstillers of andere medicatie!</p><p>Als dat niet voldoende moest zijn, hebben we ook nog gegevens voor de ziekenhuizen! Veel beterschap!</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-apoth.png');
            $('#c3').attr('src','_assets/img/compare/icon-hospital.png');
        });
        
        $('#liGZCentra').click(function() {
            $('#compare h3').html('Je hebt gezondheidscentra geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Op zoek naar een plaats waar verschillende soorten hulpverleners samenwerken? Ben je bijvoorbeeld aan het revalideren? Dan kan je steeds terecht bij gezondheidscentra waar verschillende soorten artsen en therapeuten samenwerken.</p><p>Indien je extra medicatie zou moeten ophalen, kan je altijd langs bij de apotheker.</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-centra.png');
            $('#c3').attr('src','_assets/img/compare/icon-apoth.png');
        });
        
        $('#liDArtsen').click(function() {
            $('#compare h3').html('Je hebt dierenartsen geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Zat de hond vast in het kattenluik? Dan ga je best maar eens langs de dierenarts! Of het nu gaat om je kat, hond, vogel of ander dier. Er is voor elk dier wel een arts.</p><p>Indien je extra medicatie zou moeten ophalen, kan je altijd langs bij de apotheker.</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-dierenarts.png');
            $('#c3').attr('src','_assets/img/compare/icon-apoth.png');
        });
        
        $('#liZhuizen').click(function() {
            $('#compare h3').html('Je hebt ziekenhuizen geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Gevallen bij het joggen, en is je been gebroken? De ziekenhuizen van Gent staan al paraat om je verder te helpen!</p><p>Indien je zou moeten revalideren, kan je altijd terecht bij gezondheidscentra. Denk maar een ligament dat gescheurd is, of je ademhaling die je terug moet leren beheersen?</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-hospital.png');
            $('#c3').attr('src','_assets/img/compare/icon-centra.png');
        });
        
        $('#liBScholen').click(function() {
            $('#compare h3').html('Je hebt basisscholen geselecteerd:');
            
            $('#compareTxt').html(
                '<p>1 + 1 = 2. Flink zo! Gaat je kleine ukkie binnenkort naar de basisschool? Dan tonen we je hieronder alvast de basisscholen uit Gent!</p><p>Indien je kind al wat ouder wordt, kan je alvast de middelbare scholen eens bekijken?</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-basis.png');
            $('#c3').attr('src','_assets/img/compare/icon-middelbaar.png');
        });
        
        $('#liMScholen').click(function() {
            $('#compare h3').html('Je hebt middelbare scholen geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Ze worden toch zo snel groot, meneer! Je kleine uk is nu groot aan het worden. We tonen je dan ook alvast de middelbare scholen in Gent!</p><p>Indien je wilt, kan je ook al eens de kotzones bekijken voor je kind? Op die manier kan je je alvast goed voorbereiden!</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-middelbaar.png');
            $('#c3').attr('src','_assets/img/compare/icon-kotzones.png');
        });
        
        $('#liKoten').click(function() {
            $('#compare h3').html('Je hebt kotzones geselecteerd:');
            
            $('#compareTxt').html(
                '<p>Kotstudenten en Gent, dat gaat nu eenmaal samen. Als je recht uit het middelbaar onderwijs komt, is dit dan ook ideale data voor jou. Hieronder zie je alvast de kotzones waar je op kot zou kunnen gaan.</p><p>Voor de meest wilde studenten onder jullie: hierbij alvast de suggestie om de ziekenhuizen te bekijken.</p>'
            );
                
            $('#cImg img:first-child').attr('src','_assets/img/compare/icon-kotzones.png');
            $('#c3').attr('src','_assets/img/compare/icon-hospital.png');
        });
        
        // -- 4. Mobile events --
        $('.btn-user').click(function() {
            $('#menu-mobile, #overlay').fadeIn('fast');
        });
        
        $('#mobileClose').click(function() {
            $('#menu-mobile, #overlay').fadeOut('fast');
        });
       
        $('#logo h1 a, #mobileInfo').click(function() {
            if($(window).width() < 1024) {
                initMobile();
                $('#mobileKaart').removeClass('ui-btn-active');
                $('#mobileInfo').addClass('ui-btn-active');
            }
        });
        
        $('.frontOpacity').click(function(){
            $('#view-register, #view-login, #view-forgot').css('opacity', '0.3');
        });
        
        $('.backOpacity').click(function(){
            $('#view-register, #view-login, #view-forgot').css('opacity', '1');
        });
        
        $('#register-btn').attr('data-ajax', 'false');
       
        $('#mobileLijst').click(function() {
            $('#choose-data, #compare').show();
            $('#intro, #show-data, #compare').fadeOut().hide();
        });
        
        $('#mobileKaart').click(function() {
            $('#show-data').show();
            $('#intro, #choose-data, #compare').hide();
            $('#show-data *').css('display', 'block !important');
            
            // jQuery Mobile fix for Google Maps
            google.maps.event.trigger(Googlemap, 'resize');
            Googlemap.panTo(new google.maps.LatLng(lastLoc.lat(), lastLoc.lng()));
        });
        
        $('#mobileDisclaimer').click(function() {
            $('#menu-mobile').fadeOut('fast');
            $('#view-disclaimer, #overlay').fadeIn('fast');
        });
        
        $('#view-disclaimer #mobileClose').click(function(){
            $('#view-disclaimer').fadeOut();
            $('#menu-mobile').delay(400).fadeIn();
        });
        
        // -- 5. Desktop events --
        
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
        
        $('footer a').click(function(){
            $('#view-register, #view-login, #view-forgot, #choose-data, #show-data, #intro, #compare, header').fadeTo('fast', '0.3', function(){});
        });
        
        $('#view-disclaimer .closeBtn').click(function(){
            $('#view-register, #view-login, #view-forgot, #choose-data, #show-data, #intro, #compare, header').fadeTo('fast', '1', function(){});
        });
	
	if($('#buttons-header-mobile:visible')) {
		$('#container, #content, #logo, #content, footer').click(function() {
			$('#buttons-header-mobile').clearQueue().hide();
		});
	}
});

// -- 6. Show approppriate forms
function showOverlays() {
    $('#view-login').show();
    $('#view-forgot').show();
    $('#view-register').show();

    var url = window.location;
    var d = url.pathname.split('');
    var s = url.pathname.split('/');

    if (d [d.length-1] == '/') {
        var pathname = s[s.length-2];
    }
    else  {
        var pathname = s[s.length-1];
    }

    if(pathname == 'login' || pathname == 'forgotpassword' || pathname == 'register')
    {
        $("#overlay").show();
    }
}