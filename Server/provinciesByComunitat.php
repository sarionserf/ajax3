<?php
header('Content-Type: application/xml');
$filtre="";
if(isset($_POST["codiCom"])){
    $filtre="[@codiCom='".$_POST['codiCom']."']";
}
    $xmlFile= simplexml_load_file("Dades/provincies.xml");
    echo "<provs>".PHP_EOL;
    $temp=$xmlFile->xpath("/cp:provincies/provincia".$filtre);
    foreach ($temp as &$item){
        echo "<prov>".PHP_EOL;
        foreach ($item->children() as $xmlChild){
            if ($xmlChild->count()==0){
                echo trim($xmlChild->asXML()).PHP_EOL;
            }
        }
        echo "</prov>".PHP_EOL;
    }
    echo "</provs>";
?>