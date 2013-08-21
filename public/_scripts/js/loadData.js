var loaded = false;
var data;
var gmaps;
var markers     = [];
var wijken      = [];
var sector      = [];
var splter      = [];
var latlngs     = [];
var iwindows    = [];
var htmlOutput  = [];
var htmlOutput2 = [];

// Get data (13 datasets)
function getData(el){
    if(!loaded){
        return false;
    }
    
    else {
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
                        parseJson("http://datatank.gent.be/Bevolking/EtnischCultureleMinderhedenPerWijk.json");
                    break;
                case 7:
                        parseJson("http://datatank.gent.be/WerkEnEconomie/Werkzoekenden(werkloosheidsduurTussen2En5Jaar).json");
                    break;
                case 8:
                        parseJson("http://datatank.gent.be/MilieuEnNatuur/Parken.json");
                    break;
                case 9:
                        parseJson("http://datatank.gent.be/Infrastructuur/Parkeergarages.json");
                    break;
                case 10:
                        parseJson("http://datatank.gent.be/Mobiliteit/ParkinglocatiesInGent.json");
                    break;
                case 11:
                        parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Bioscopen.json");
                    break;
                case 12:
                        parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Sportcentra.json");
                    break;
                case 13:
                        parseJson("http://datatank.gent.be/Cultuur-Sport-VrijeTijd/Bibliotheek.json");
                    break;

                default:
                    break;
            }
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
    
    if (data.Wijken)                                    {parseWijken(data.Wijken);                              console.log('wijken werken')       ;}
    if (data.BebouwdeOppervlakte)                       {parseBebOpp(data.BebouwdeOppervlakte);                 console.log('bebouwde oppervlakte');}
    if (data.Speelterreinen)                            {parseSpeelT(data.Speelterreinen);                      console.log('splter')              ;}
    if (data.BevolkingsdichtheidPerWijk)                {parseBDWijk(data.BevolkingsdichtheidPerWijk);          console.log('bevolkingsdichtheid') ;}
    if (data.JeugdwerkLocaties)                         {parseJWLocaties(data.JeugdwerkLocaties);               console.log('jeugdwerklocaties')   ;}
    if (data.EtnischCultureleMinderhedenPerWijk)        {parseEtnMind(data.EtnischCultureleMinderhedenPerWijk); console.log('etnische minderheden');}
    if (data.Werkzoekenden)                             {parseWZoek(data.Werkzoekenden);                        console.log('werkzoekenden')       ;}
    if (data.Parken)                                    {parseParken(data.Parken);                              console.log('parken')              ;}
    if (data.Parkeergarages)                            {parseParkGar(data.Parkeergarages);                     console.log('parkeergarages')      ;}
    if (data.ParkinglocatiesInGent)                     {parseParkLGent(data.ParkinglocatiesInGent);            console.log('parkinglocaties')     ;}
    if (data.Bioscopen)                                 {parseBios(data.Bioscopen);                             console.log('bioscopen')           ;}
    if (data.Sportcentra)                               {parseSpCentra(data.Sportcentra);                       console.log('sportcentra')         ;}
    if (data.Bibliotheek)                               {parseBibs(data.Bibliotheek);                           console.log('bib')                 ;}
}

function clearMap(){
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  
  for (var i = 0; i < wijken.length; i++ ) {
    wijken[i].setMap(null);
  }
  
  for (var i = 0; i < sector.length; i++ ) {
    sector[i].setMap(null);
  }
  
  for (var i = 0; i < splter.length; i++ ) {
    splter[i].setMap(null);
  }
}

function parseWijken(dst)
{
    clearMap();
    console.log(dst);
    $.each(dst, function(key,val){
        htmlOutput+= '<li id="' + key + '">' + "<span class='txtBold'>Wijk: </span>" + '<span class="wijkNaam">' + val.wijk + '</span>' + '</li>';
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
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.3,
            name: dst.naam
        });

        z.setMap(Googlemap);
        wijken.push(z);
        wijken.sort();
    })
    
    var ulLeft = document.getElementById('c1UL');
    $(ulLeft).html(htmlOutput);
    
    wijken.sort();
}

function parseBebOpp(bop) {
{
    //clearMap();
    sector =[];
    console.log(bop);
    $.each(bop, function(key,val){
        htmlOutput2 += '<li id="' + key + '">' + "Bebouwde oppervlakte: " + val.sector + "Oppervlakte/km²: " + val.oppervlakte_km2 + "Bebouwinsgraad: " + val.bebouwingsgraad_pct + '</li>';
        
        var c = val.sector;
        var d = val.oppervlakte_km2;
        var e = val.bebouwingsgraad_pct;
        
        $.each(c, function(k,v){
            var q = v.split(',');
        })

        var ul2 = document.getElementById('c2UL');
        $(ul2).html(htmlOutput2);
    })
}

function parseSpeelT(spt)
{
    //clearMap();
    markers =[];
    console.log(spt);
    $.each(spt, function(key,val){
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
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.3,
            name: spt.naam
        });

        z.setMap(Googlemap);
        splter.push(z);
    })
}

/*function parseSpeelT(spt)
{
    // Clear map
    //clearMap();
    
    // Check amount of markers, add them afterwards
    $.each(spt, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: gmaps, 
            title: val.naam + ": " + val.straat
        });

        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
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
}*/

function parseBDWijk(vets)
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

function parseJWLocaties(jwl)
{ 
    clearMap();
    markers =[];
    console.log(jwl);
    $.each(jwl, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long), 
            map: Googlemap, 
            title: val.organisati
        })
        
        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.organisati + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.straat + ' ' + val.huisnr + '</li>'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.postcode + ' ' + val.gemeente + '</li>'+
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
    
    /*
    // Clear map
    clearMap();
    
    // Check amount of markers, add them afterwards
    $.each(jwl, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long),
            map: gmaps, 
            title: val.organisati
        });

        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.organisati + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.straat + ' ' + val.huisnr + '</li>'+
                                    '<li><span class="txtBold">Adres:</span> ' + val.postcode + ' ' + val.gemeente + '</li>'+
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
    */
}

function parseBPLeeftijd(hospitals)
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

function parseEtnMind(cinemas)
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

function parseWZoek(parkings)
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

function parseArmInkArb(schools)
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

function parseParkGar(centra)
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

function parseParkLGent(ploc)
{
    // Clear map
    clearMap();
    
    // Check amount of markers, add them afterwards
    $.each(ploc, function(key,val){
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(val.lat,val.long),
            map: gmaps, 
            title: val.naam
        });

        var iwContent = '<div class="contentIW">'+
                            '<h2 class="iwTitle txtUppercase">' + val.naam + '</h2>'+
                            '<div class="iwContent">'+
                                '<ul class="iwUL">'+
                                    '<li><span class="txtBold">Type:</span> ' + val.type + ' ' + val.huisnr + '</li>'+
                                    '<li><span class="txtBold">URL:</span> <a href=" + val.url + "> title="Navigeer op Google Maps" target="_blank">' + ' Navigeer op Google Maps '  + '</a></li>'+
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

function parseBios(apoths)
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

function parseSpCentra(apoths)
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
    loaded = true;
})
}