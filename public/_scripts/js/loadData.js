var data;
var gmaps;
var markers  =  [];
var wijken   =  [];
var kotzones =  [];
var latlngs  =  [];
var iwindows =  [];

// Get data (14 datasets)
function getData(el){
    var url = window.location.pathname;
    url = url.substring(0, url.length-1);
    var tags = url.split('/');
   
    if (tags[tags.length-1] == "public") {
        switch (el) {
            case 1:
                    parseJson("http://datatank.gent.be/Grondgebied/Wijken.json");
                break;
            case 2:
                    parseJson("http://datatank.gent.be/Grondgebied/BebouwdeOppervlakte.json");
                break;
            case 3:
                    parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Speelterreinen.json");
                break;
            case 4:
                    parseJson("http://datatank.gent.be/Bevolking/BevolkingsdichtheidPerWijk.json");
                break;
            case 5:
                    parseJson("http://datatank.gent.be/Doelgroepen/JeugdwerkLocaties.json");
                break;
            case 6:
                    parseJson("http://datatank.gent.be/Bevolking/BevolkingPerLeeftijd,Geslacht1999-2011.json");
                break;
            case 7:
                    parseJson("http://datatank.gent.be/Bevolking/EtnischCultureleMinderhedenPerWijk.json");
                break;
            case 8:
                    parseJson("http://datatank.gent.be/WerkEnEconomie/Werkzoekenden(werkloosheidsduurTussen2En5Jaar).json");
                break;
            case 9:
                    parseJson("http://datatank.gent.be/WerkEnEconomie/Armoede,InkomenEnArbeid2000-2010.json");
                break;
            case 10:
                    parseJson("http://datatank.gent.be/Infrastructuur/Parkeergarages.json");
                break;
            case 11:
                    parseJson("http://datatank.gent.be/Mobiliteit/ParkinglocatiesInGent.json");
                break;
            case 12:
                    parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Bioscopen.json");
                break;
            case 13:
                    parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Sportcentra.json");
                break;
            case 14:
                    parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Bibliotheek.json");
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
    
    if (data.Wijken)                                    {parseWijken(data.Wijken);}
    if (data.BebouwdeOppervlakte)                       {parseBebOpp(data.BebouwdeOppervlakte);}
    if (data.Speelterreinen)                            {parseSpeelT(data.Speelterreinen);}
    if (data.BevolkingsdichtheidPerWijk)                {parseBDWijk(data.BevolkingsdichtheidPerWijk);}
    if (data.JeugdwerkLocaties)                         {parseJWLocaties(data.JeugdwerkLocaties);}
    if (data.BevolkingPerLeeftijd,Geslacht1999-2011)    {parseBPLeeftijd(data.BevolkingPerLeeftijd,Geslacht1999-2011);}
    if (data.EtnischCultureleMinderhedenPerWijk)        {parseEtnMind(data.EtnischCultureleMinderhedenPerWijk);}
    if (data.Werkzoekenden)                             {parseWZoek(data.Werkzoekenden);}
    if (data.Armoede,InkomenEnArbeid2000-2010)          {parseArmInkArb(data.Armoede,InkomenEnArbeid2000-2010);}
    if (data.Parkeergarages)                            {parseParkGar(data.Parkeergarages);}
    if (data.ParkinglocatiesInGent)                     {parseParkLGent(data.ParkinglocatiesInGent);}
    if (data.Bioscopen)                                 {parseBios(data.Bioscopen);}
    if (data.Sportcentra)                               {parseSpCentra(data.Sportcentra);}
    if (data.Bibliotheek)                               {parseBibs(data.Bibliotheek);}
    
    if (data.apotheken) {
        console.log('apotheken');
        parseApoth(data.apotheken);
    }
}

function clearMap(){
    for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
    for (var i = 0; i < wijken.length; i++ ) {
    wijken[i].setMap(null);
  }
}

function parseWijken(dst)
{
    clearMap();
    markers =[];
    console.log(dst);
    $.each(dst, function(key,val){
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
            fillColor: "#00FF00",
            fillOpacity: 0.35,
            name: dst.naam
        });

        z.setMap(Googlemap);
        wijken.push(z);
    })
}



function parseStudenthousings(sth) {
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
 
//        v
//        ar m = new google.maps.Marker({
//            position: new google.maps.LatLng(val.lat,val.long), 
//            map: Googlemap, 
//            title: val.naam
//        })
//        markers.push(m);
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

        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.roepnaam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Aanbod:</span> ' + val.aanbod + '</li>'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.straat + '</li>'+
                                    '<li><span class="txtBold">Onderwijsnet:</span> ' + val.net + '</li>'+
                                '</ul>'+
                                '<a href="https://www.google.com/maps/preview#!q=" + val.lat + "%2C+" + val.long + "&data=!4m10!1m9!4m8!1m3!1d46175175!2d16.9848501!3d0.2136714!3m2!1i1920!2i1085!4f13.1" title="Navigeer op Google Maps" class="btnNavigate" target="_blank">Navigeer op Google Maps</a>'
                            '</div>'+
                        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: iwContent
        });

        google.maps.event.addListener(m, 'click', function() {
                //resetInfoWindow();
                infowindow.close();
                infowindow.open(gmaps,this);
        });

        markers.push(m);
    })
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