<?php 
    //This module receives the parameters given to make a search utilizing the spotify API
    if(isset($_GET['cancion'])){
        $spotify_url = 'https://api.spotify.com/v1/search?q='. urlencode($_GET['cancion']) .'*&limit=5&type=track';
        
        $spotify_json = file_get_contents($spotify_url);
        $canciones_array = json_decode($spotify_json,true);
        
        if(!empty($canciones_array)){
            foreach ($canciones_array['tracks']['items'] as $track){
                echo '<tr class="cancionLink" id="'.$track['artists'][0]['name'].'"-"'.$track['name'].'">';
                echo '<td>';
                echo ''.$track['album']['name'].'';
                echo '<br><div style="background-image:url('.$track['album']['images'][0]['url'].')" id="'.$track['id'].'" class="coverTrack"></div>';
                echo '</td>';
                echo '<td>';
                echo ''.$track['name'].'';
                echo '</td>';
                echo '<td>';
                echo ''.$track['artists'][0]['name'].'';
                echo '</td>';
                echo '</tr>';
            }
        }
    }
?>
