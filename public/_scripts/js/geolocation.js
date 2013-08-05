// GroenGent JS File
// ------------------------------------------------
// Geolocation and Google Maps setup
// Creation date: July 27th, 2013
// ------------------------------------------------

var gmaps;
var currentMarker;
var locationCurrent;
var ghentlocation = new google.maps.LatLng(51.05866,3.763161);

function display(){
    var myOptions = {
    zoom: 13,
    center: ghentlocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL}
    }
    
    gmaps = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    window.Googlemap = gmaps;
    
    var iwContent = '<div id="contentIW">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h2 id="firstHeading" class="firstHeading">Title</h2>'+
                        '<div id="bodyContent">'+
                            '<h2><b>Subtitle</b></h2>'+
                            '<p>Text</p>'+
                            '<p>And some final text.</p>'+
                        '</div>'+
                    '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: iwContent
    });

    var marker = new google.maps.Marker({
        position: ghentlocation,
        map: gmaps,
        title: "Title"
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(gmaps,marker);
    });
    
    // Force marker placement
    marker.setMap(gmaps);
}

//GET LOCATION OF USER THROUGH WIFI OR 3G
//FALLBACK FROM HTML5 GEOLOCATION GOOGLE AJAX API THROUGH MAXMIND'S GEOLOCATION API
function getGeolocation(){
    if(Modernizr.geolocation)
    {
        console.log('geolocation works');
        navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError);
    }

    else
    {
        var geocoder = new google.maps.Geocoder()
        if(google.loader.ClientLocation != null)
        {
            locationCurrent = new google.maps.LatLng(google.loader.ClientLocation.latitude,google.loader.ClientLocation.longitude);
            displayMap();	
        }
        else{
            locationCurrent = new google.maps.LatLng(geoip_latitude(),geoip_longitude());
            displayMap();
        }
    }
}

function geoLocationSuccess(position){
    locationCurrent = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    displayMap();	
}

function geoLocationError(err){
    locationCurrent = ghentlocation;
    displayMap();
}

//DISPLAY GOOGLE MAP
function displayMap(){
    zoomin = 11;
    gmaps.setZoom(zoomin);

    if(locationCurrent != ghentlocation)
    {
        currentMarker = new google.maps.Marker({
            position: locationCurrent, 
            map: gmaps, 
            title:'Your current position'
        });
        currentMarker.setAnimation(google.maps.Animation.DROP);
        google.maps.event.addListener(currentMarker, 'click', function() {
            gmaps.panTo(locationCurrent);
        });
    }
}

//DOCUMENT READY
$(document).ready(function(){
	display();
	getGeolocation();
        
//        $('#map_canvas').click(function(){
//            alert("Hello");
//        });
});