var gmaps;
var data;
var i = 0;
var m = [];
var marker = [];
var markers = [];
var infowindow = null;
var kotzones = [];
var latlngs = [];

function getData(el){
    var url = window.location.pathname;
    url = url.substring(0, url.length-1);
    var tags = url.split('/');
   
    if (tags[tags.length-1] == "public") {
        switch (el) {
            case 1:
                    parseJson("http://data.appsforghent.be/poi/basisscholen.json");
                break;
            case 2:
                    parseJson("http://data.appsforghent.be/poi/ziekenhuizen.json");
                break;
            case 3:
                    parseJson("http://data.appsforghent.be/poi/bioscopen.json");
                break;
            case 4:
                    parseJson("http://data.appsforghent.be/poi/dierenartsen.json");
                break;
            case 5:
                    parseJson("http://data.appsforghent.be/poi/kotzones.json");
                break;
            case 6:
                    parseJson("http://data.appsforghent.be/poi/parkings.json");
                break;
            case 7:
                    parseJson("http://data.appsforghent.be/poi/secundairescholen.json");
                break;
            case 8:
                    parseJson("http://data.appsforghent.be/poi/gezondheidscentra.json");
                break;
            case 9:
                    parseJson("http://data.appsforghent.be/poi/bibliotheken.json");
                break;
            case 10:
                    parseJson("http://data.appsforghent.be/poi/apotheken.json");
                break;
            
            default:
                break;
        }
    }
}

function parseJson(url){
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',url+"?callback=parse");
    var b = document.getElementsByTagName('body')[0];
    b.appendChild(s);
}

function parse(data)
{
    gmaps = window.Googlemap;
    data = data;
    
    if (data.dierenartsen)      {parseVets(data.dierenartsen);}
    if (data.basisscholen)      {parsePrimarySchools(data.basisscholen);}
    if (data.ziekenhuizen)      {parseHospitals(data.ziekenhuizen);}
    if (data.bioscopen)         {parseCinemas(data.bioscopen);}
    if (data.kotzones)          {parseStudenthousings(data.kotzones);}
    if (data.parkings)          {parseParkings(data.parkings);}
    if (data.secundairescholen) {parseHighSchools(data.secundairescholen);}
    if (data.gezondheidscentra) {parseCentra(data.gezondheidscentra);}
    if (data.bibliotheken)      {parseLibraries(data.bibliotheken);}
    
    if (data.apotheken) {
        console.log('apotheken');
        parseApoth(data.apotheken);
    }
}

function clearMap(){
    for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
    for (var i = 0; i < kotzones.length; i++ ) {
    kotzones[i].setMap(null);
  }
}

function parseVets(vets)
{
    clearMap();
    markers =[];
    console.log(vets);
    $.each(vets, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.adres + " " + val.huisnr
        })
        markers.push(m);
    }) 
}

function parsePrimarySchools(schools)
{
    // Clear map
    clearMap();
    
    // Check amount of markers, add them afterwards
    $.each(schools, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.roepnaam + ": " + val.straat
        });

        var iwContent = '<div id="contentIW">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h2 id="firstHeading" class="firstHeading">' + val.roepnaam + '</h2>'+
                        '<div id="bodyContent">'+
                            '<p>' + val.aanbod + '</p>'+
                            '<p>' + val.straat + '</p>'+
                            '<p>' + val.net + '</p>'+
                            '<a href="https://www.google.com/maps/preview#!q=' + val.lat + '%2C+' + val.long + '&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="" target="_blank">Navigeer</a>'
                        '</div>'+
                    '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
            infowindow.open(gmaps,m);
        });

        markers.push(m);
    })
}

function parseHospitals(hospitals)
{
    clearMap();
    markers =[];
    console.log(hospitals);
    $.each(hospitals, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.naam + ": " + val.straat + " " + val.nr
        })
        markers.push(m);
    })
}

function parseCinemas(cinemas)
{
    clearMap();
    markers =[];
    console.log(cinemas);
    $.each(cinemas, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.naam
        })
        markers.push(m);
    })
}

function parseStudenthousings(sth)
{
    clearMap();
    markers =[];
    console.log(sth);
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
            name: sth.kotzone_na
          });

 z.setMap(Googlemap);
 kotzones.push(z);
    })  
}

function parseParkings(parkings)
{
    clearMap();
    markers =[];
    console.log(parkings);
    $.each(parkings, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.nr_p + ": " + val.naam
        })
        markers.push(m);
    })   
}

function parseHighSchools(schools)
{
    clearMap();
    markers =[];
    console.log(schools);
    $.each(schools, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.naam + ": " + val.adres
        })
        markers.push(m);
    })    
}

function parseCentra(centra)
{
    clearMap();
    markers =[];
    console.log(centra);
    $.each(centra, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.naamgzc + ": " + val.adres
        })
        markers.push(m);
    })
}

function parseLibraries(libs)
{
    clearMap();
    markers =[];
    console.log(libs);
    $.each(libs, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.afdeling + ": " + val.locatie
        })
        markers.push(m);
    })
}

function parseApoth(apoths)
{
    clearMap();
    markers =[];
    console.log(apoths);
    $.each(apoths, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.naam + ": " + val.adres
        })
        markers.push(m);
    })
}

$(document).ready(function(){
    $('#selData li:first-child input').attr('checked', true);
})