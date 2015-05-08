var xmlHttp;
var xmlHttpDos;
var audioObject = null;
var results = document.getElementById('sugerenciasHTML');
var playingCssClass = 'playing';

    
//Obteniendo las canciones cuando se pone un nombre de cancion
function muestraCanciones(str) {
    if (str.length == 0 || str.length == 1 || str.length == 2) { 
        document.getElementById("cancionesHTML").innerHTML="";
        return;
    }
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp == null) {
        alert ("Tu navegador no soporta AJAX!");
        return;
    } 
    var url="http://localhost/MusicMatch/cancion.php";
    url=url+"?cancion="+str;
    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
} 
//Sacando las recomendaciones cuando se hace click en una cancion
$(document).ready(function () {
   $(document).on('click','.cancionLink',function(){
       var artista = $(this).attr('id').split('-')[0];
    xmlHttpDos=GetXmlHttpObject();
    if (xmlHttpDos == null) {
        alert ("Tu navegador no soporta AJAX!");
        return;
    } 
    var url="http://localhost/MusicMatch/recomendacion.php";
    url=url+"?artista="+artista;
    xmlHttpDos.onreadystatechange=stateChanged;
    xmlHttpDos.open("GET",url,true);
    xmlHttpDos.send(null);
    
    
   }); 
});

//Sacando las recomendaciones cuando se hace click en una cancion
$(document).ready(function () {
   $(document).on('click','.cover',function(e){
       var albumId = $(this).attr('id');
       var target = e.target;
       
       if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(albumId, function (data) {
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function () {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function () {
                    target.classList.remove(playingCssClass);
                });
            });
        }
   }); 
});

/*
$(document).ready(function () {
   $(document).on('click','.coverTrack',function(e){
       var trackId = $(this).attr('id');
       var target = e.target;
       
       if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTrack(trackId, function (data) {
                audioObject = new Audio(data.preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function () {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function () {
                    target.classList.remove(playingCssClass);
                });
            });
        }
   }); 
});*/

var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};

/*
var fetchTrack = function (trackId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/tracks/' + trackId,
        success: function (response) {
            callback(response);
        }
    });
};*/



//Cambios en el HTML cuando se responde
function stateChanged() { 
    if (xmlHttp.readyState==4)
    { 
        document.getElementById("cancionesHTML").innerHTML=xmlHttp.responseText;
    }
    
    if (xmlHttpDos.readyState==4)
    { 
        document.getElementById("sugerenciasHTML").innerHTML=xmlHttpDos.responseText;
    }
}

function GetXmlHttpObject() {
    var xmlHttp=null;
    try
    {
        // Firefox, Opera 8.0+, Safari
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}