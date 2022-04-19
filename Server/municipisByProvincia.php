<?php
header('Content-Type: application/xml');
$filtreProv="";
$filtreIlla="";
if(isset($_POST["codiProv"])){
    $filtreProv="[@codiProv='".$_POST['codiProv']."']";
}
if(isset($_POST["codiIlla"])){
    $filtreIlla="[@codiIlla='".$_POST['codiIlla']."']";
}

    $xmlFile= simplexml_load_file("Dades/municipis.xml");
    echo "<muns>".PHP_EOL;
    $temp=$xmlFile->xpath("/cp:municipis/municipi".$filtreProv.$filtreIlla);
    foreach ($temp as &$item){
        echo "<mun>".PHP_EOL;
        foreach ($item->children() as $xmlChild){
            if ($xmlChild->count()==0){
                echo trim($xmlChild->asXML()).PHP_EOL;
            }
        }
        echo "</mun>".PHP_EOL;
    }
    echo "</muns>";
?>