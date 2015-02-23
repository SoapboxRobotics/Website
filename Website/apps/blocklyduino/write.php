<?php 
   $fn  = $_POST['fn'];
   $str = $_POST['str'];
   $file = fopen("/opt/lampp/htdocs/passVal/".$fn.".record","w");
   echo fwrite($file,$str);
   fclose($file);
?>
