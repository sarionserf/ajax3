<?php
header('Content-Type: application/xml');
    $xmlFile= simplexml_load_file("Dades/comunitats.xml");
    echo "<cas>".PHP_EOL;
    $temp=$xmlFile->xpath("/cp:comunitatsAutonomes/comunitat");
    foreach ($temp as &$item){
        echo "<ca>".PHP_EOL;
        foreach ($item->children() as $xmlChild){
            echo trim($xmlChild->asXML()).PHP_EOL;
        }
        echo "</ca>".PHP_EOL;
    }
    echo "</cas>";
?>