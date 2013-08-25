/* GroenGent JS File - DS
 * Tom Van humbeek
 * NMDAD III - 2012/2013
-------------------------
1. Variables
2. Document ready
3. Get JSON data
4. Parse JSON
5. Clear map for other datasets
6. Dataset functions
-----------------------*/

// -- 1. Variables --
var Googlemap;
var data;
var mapOptions;
var map;
var infowindow;
var marker;
var contentString;
var image;
var markers     = [];
var kotzones    = [];
var parken      = [];
var latlngs     = [];
var infoWindow  = [];

// -- 2. Document ready --
$(document).ready(function(){
    google.maps.event.addListener(Googlemap, 'click', function() {
        if (infowindow) {
            infowindow.close();
        }
    });
})

// -- 3. Get JSON data --
function getData(el){
    var url = window.location.pathname;
    url = url.substring(0, url.length-1);
    var tags = url.split('/');
   
    if (tags[tags.length-1] == "public") {
        
        switch (el) {
            case 1:
                    parseJson("http://datatank.gent.be/MilieuEnNatuur/Parken.json");
                break;
            case 2:
                    parseJson("http://data.appsforghent.be/poi/parkings.json");
                break;
            case 3:
                    parseJson("http://data.appsforghent.be/poi/bibliotheken.json");
                break;
            case 4:
                    parseJson("http://data.appsforghent.be/poi/bioscopen.json");
                break;
            case 5:
                    parseJson("http://data.appsforghent.be/poi/apotheken.json");
                break;
            case 6:
                    parseJson("http://data.appsforghent.be/poi/gezondheidscentra.json");
                break;
            case 7:
                    parseJson("http://data.appsforghent.be/poi/dierenartsen.json");
                break;
            case 8:
                    parseJson("http://data.appsforghent.be/poi/ziekenhuizen.json");
                break;
            case 9:
                    parseJson("http://data.appsforghent.be/poi/basisscholen.json");
                break;
            case 10:
                    parseJson("http://data.appsforghent.be/poi/secundairescholen.json");
                break;
            case 11:
                    parseJson("http://data.appsforghent.be/poi/kotzones.json");
            
            default:
                break;
        }
    }
}

// -- 4. Parse JSON --
function parseJson(url){
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',url+"?callback=parse");
    var b = document.getElementsByTagName('body')[0];
    b.appendChild(s);
}

function parse(data)
{
    Googlemap = window.Googlemap;
    data = data;
    
    if (data.Parken)            {parseParks(data.Parken);}
    if (data.parkings)          {parseParkings(data.parkings);}
    if (data.bibliotheken)      {parseLibraries(data.bibliotheken);}
    if (data.bioscopen)         {parseCinemas(data.bioscopen);}
    if (data.apotheken)         {parsePharms(data.apotheken);}
    if (data.gezondheidscentra) {parseCentra(data.gezondheidscentra);}
    if (data.dierenartsen)      {parseVets(data.dierenartsen);}
    if (data.ziekenhuizen)      {parseHospitals(data.ziekenhuizen);}
    if (data.basisscholen)      {parsePrimarySchools(data.basisscholen);}
    if (data.secundairescholen) {parseHighSchools(data.secundairescholen);}
    if (data.kotzones)          {parseStudenthousings(data.kotzones);}
}

// -- 5. Clear map for other datasets --
function clearMap(){
  // Clear markers
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  
  // Clear kotzones
  for (var i = 0; i < kotzones.length; i++ ) {
    kotzones[i].setMap(null);
  }
  
  // Clear parken
  for (var i = 0; i < parken.length; i++ ) {
    parken[i].setMap(null);
  }
  
  if (infowindow) {
      infowindow.close();
  }
}

// -- 6. Dataset functions --
function parseParks(prk)
{
    clearMap();
    markers = [];
    $.each(prk, function(key,val){
        var c = val.coords;
        var d = c.split(' ');
        latlngs = [];
        $.each(d, function(k,v){
            var q = v.split(',');
            var latlng = new google.maps.LatLng(q[1],q[0]);
            latlngs.push(latlng);
        })
        
        var z = new google.maps.Polygon({
            paths: latlngs,
            strokeColor: "#003300",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#006600",
            fillOpacity: 0.35,
            name: prk.objectnaam,
            clickable: true,
            visible: true
        }); 

        z.setMap(Googlemap);
        parken.push(z);
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.objectnaam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Beschrijving:</span> ' + val.objectnaam + '</li>'+
                                    '<li><span class="txtBold">Oppervlakte:</span> ' + val.oppervlakt + " m²" + '</li>'+
                                    '<li><span class="txtBold">Speelterrein aanwezig:</span> ' + '<span class="capitalize">' + val.speelterr + "</span>" + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' + val.objectnaam + ", 9000 Gent" + '&data=!4m22!1m9!4m8!1m3!1d36847056!2d-95.677068!3d37.0625!3m2!1i1920!2i1085!4f13.1!5m11!1m10!1sbijloke!4m8!1m3!1d36847056!2d-95.677068!3d37.0625!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';
        
            var infowindow = new google.maps.InfoWindow({
            content: iwContent,
            suppressMapPan:true
        });

        eventPolygonClick = google.maps.event.addListener(z, 'click', function(event) {
           var marker = new google.maps.Marker({
              position: event.latLng
           });
           infowindow.open(Googlemap, marker);

        });
    })
    
    // Polygon rendering fix for Google Maps
    google.maps.event.trigger(Googlemap, 'resize');
    Googlemap.panTo(new google.maps.LatLng(lastLoc.lat(), lastLoc.lng()));
}

function parseParkings(parkings)
{
    clearMap();
    markers = [];
    $.each(parkings, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.nr_p + ": " + val.naam
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Nummer:</span> ' + val.nr_p + '</li></ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

            var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });
        
        markers.push(m);
    })   
}

function parseLibraries(libs)
{
    clearMap();
    markers = [];
    $.each(libs, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.afdeling + ": " + val.locatie
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.afdeling + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.locatie + '</li>'+
                                    '<li><span class="txtBold">Code:</span> ' + val.code_filia + '</li></ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });
        
        markers.push(m);
    })
}

function parseCinemas(cinemas)
{
    clearMap();
    
    markers = [];
    $.each(cinemas, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.naam,
            clickable: true,
            visible: true
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Aanbod:</span> ' + val.ligging + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
            closeInfoWindows();
            infowindow.open(Googlemap, m);
        });
        
        function closeInfoWindows() {
            for (var i = 0; i < infowindow.length; i++) {
                infowindow[i].close();
            }
        }

        markers.push(m);
    })
}

function parsePharms(pharms)
{
    clearMap();
    markers = [];
    $.each(pharms, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.naam + ": " + val.adres
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.adres +
                                    '<li><span class="txtBold">Gemeente:</span> ' + val.postcode + " " + "<span class='capitalize'>" + val.gemeente + "</span>" + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });
        
        markers.push(m);
    })   
}

function parseCentra(centra)
{
    clearMap();
    markers = [];
    $.each(centra, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.naamgzc + ": " + val.adres
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naamgzc + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.adres + '</li></ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });
        
        markers.push(m);
    })
}

function parseVets(vets)
{
    clearMap();
    markers = [];
    $.each(vets, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.adres + " " + val.huisnr
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.adres + " " + val.huisnr + '</li>'+
                                    '<li><span class="txtBold">Gemeente:</span> ' + val.postcode + " " + "<span class='capitalize'>" + val.gemeente + "</span>" + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });
        
        markers.push(m);
    }) 
}

function parseHospitals(hospitals)
{
    clearMap();
    markers = [];
    $.each(hospitals, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.naam + ": " + val.straat + " " + val.nr
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.straat + " " + val.nr + '</li>'+
                                    '<li><span class="txtBold">Gemeente:</span> ' + val.postcode + " " + "<span class='capitalize'>" + val.gemeente + "</span>" + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });

        markers.push(m);
    })
}

function parsePrimarySchools(schools)
{
    clearMap();
    markers = [];
    $.each(schools, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.roepnaam + ": " + val.straat
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.roepnaam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Aanbod:</span> ' + val.aanbod + '</li>'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.straat + '</li>'+
                                    '<li><span class="txtBold">Onderwijsnet:</span> ' + val.net + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });

        markers.push(m);
    })
}

function parseHighSchools(schools)
{
    clearMap();
    markers = [];
    $.each(schools, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.naam + ": " + val.adres
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.straat + " " + val.huisnummer + '</li>'+
                                    '<li><span class="txtBold">Gemeente:</span> ' + val.postcode + " " + "<span class='capitalize'>" + val.gemeente + "</span>" + '</li>'+
                                    '<li><span class="txtBold">Zetel:</span> ' + "<span class='capitalize'>" + val.zetel + "</span>" + '</li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' +  val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(Googlemap,this);
        });
      
        markers.push(m);
    })
}

function parseStudenthousings(sth)
{
    clearMap();
    markers = [];
    $.each(sth, function(key,val){
        var c = val.coords;
        var d = c.split(' ');
        latlngs = [];
        $.each(d, function(k,v){
            var q = v.split(',');
            var latlng = new google.maps.LatLng(q[1],q[0]);
            latlngs.push(latlng);
        })
        
        var z = new google.maps.Polygon({
            paths: latlngs,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            name: sth.kotzone_na,
            clickable: true,
            visible: true
        }); 

        z.setMap(Googlemap);
        kotzones.push(z);
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.kotzone_na + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">' + "Studenten, overal studenten!" + '</span></li>'+
                                '</ul>' +
                                '<a href="https://www.google.com/maps/preview#!q=' + val.kotzone_na + ", Gent" + '&data=!4m22!1m9!4m8!1m3!1d36847056!2d-95.677068!3d37.0625!3m2!1i1920!2i1085!4f13.1!5m11!1m10!1sbijloke!4m8!1m3!1d36847056!2d-95.677068!3d37.0625!3m2!1i1920!2i1085!4f13.1" title="Navigeren" class="btnNavigate" target="_blank" class="btnFW txtBold">Navigeren</a>'
                            '</div>'+
                        '</div>';
        
            var infowindow = new google.maps.InfoWindow({
            content: iwContent,
            suppressMapPan:true
        });

        eventPolygonClick = google.maps.event.addListener(z, 'click', function(event) {
             var marker = new google.maps.Marker({
              position: event.latLng
           });
           
           infowindow.open(Googlemap, marker);
        });
    })
    
    // Polygon rendering fix for Google Maps
    google.maps.event.trigger(Googlemap, 'resize');
    Googlemap.panTo(new google.maps.LatLng(lastLoc.lat(), lastLoc.lng()));
}