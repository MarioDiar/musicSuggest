<?php
    if(isset($_GET['artista'])){
        $tastekid_url = 'http://www.tastekid.com/api/similar?q='. urlencode($_GET['artista']) .'&k=134758-MusicCom-ODNHKKMQ&info=1&limit=5';
        $stringalbumID = "puta madre";
               
        $tastekid_json = file_get_contents($tastekid_url);
        $artistas_array = json_decode($tastekid_json,true);
        
        if(!empty($artistas_array)){
            foreach ($artistas_array['Similar']['Results'] as $track){
                $spotify_url = 'https://api.spotify.com/v1/search?q=artist:'. urlencode($track['Name']) .'&type=album&limit=2';
                $spotify_json = file_get_contents($spotify_url);
                $artistaSpot_array = json_decode($spotify_json,true);
                
                echo '<tr>';
                echo '<td>';
                echo '<div style="background-image:url('.$artistaSpot_array['albums']['items'][0]['images'][0]['url'].')" id="'.$artistaSpot_array['albums']['items'][0]['id'].'" class="cover"></div>';
                echo '</td>';
                echo '<td>';
                echo ''.$artistaSpot_array['albums']['items'][0]['name'].'';
                echo '</td>';
                echo '<td>';
                echo ''.$track['Name'].'';
                echo '</td>';
                echo '</tr>';
            }
        }
        
    }
?>

                