<?php
header('Content-Type: application/xml');
$filtre="";
if(isset($_POST["codiProv"])){
    $filtre="[codi='".$_POST['codiProv']."']";
}
    $xmlFile= simplexml_load_file("Dades/provincies.xml");
    echo "<illes>".PHP_EOL;
    $temp=$xmlFile->xpath("/cp:provincies/provincia".$filtre."/illes/illa");
    foreach ($temp as &$item){
        echo "<illa>".PHP_EOL;
        foreach ($item->children() as $xmlChild){
            echo trim($xmlChild->asXML()).PHP_EOL;
        }
        echo "</illa>".PHP_EOL;
    }
    echo "</illes>";
?>