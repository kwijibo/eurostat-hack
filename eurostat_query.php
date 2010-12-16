<?php

#i: germany population 2006
#o: 1234567890


	
	function query($fileName, $countryID, $attr, $attrVal, $year){
		$dom = new DomDocument();
		$dom->loadXML(file_get_contents('data/'.$fileName));		
		$xpath = new DomXPath($dom);
		$pathQuery = "//*[@geo='{$countryID}'][@{$attr}='{$attrVal}']/*[@TIME_PERIOD='{$year}']";
		if($node = $xpath->query($pathQuery)->item(0)) return  $node->getAttribute('OBS_VALUE');
		else return "";
			
	}


	// countryCode	FR
	// dataset	env_air_ind
	// indicatorCode	airpol
	// indicatorValue	Urban population exposure to air pollution by ozone
	// year	2006
//airpol="5_1" geo="AT"

// countryCode	AT
// dataset	env_air_ind
// indicatorCode	airpol
// indicatorValue	5_2
// year	1991
// 
// $_GET = array('countryCode' => 	'AT',
// 'dataset' =>	'env_air_ind',
// 'indicatorCode' => 	'airpol',
// 'indicatorValue'	 => '5_2',
// 'year' => 	'1991',
// );
// 
// //echo query('env_air_ind.sdmx.xml', 'AT', 'airpol', '5_1', '1991' );
// echo query('env_air_ind.sdmx.xml', 'AT', 'airpol', '5_2', '1991' );
// 
// echo "\n";//die;

echo query($_GET['dataset'].'.sdmx.xml', $_GET['countryCode'], $_GET['indicatorCode'], $_GET['indicatorValue'], $_GET['year'] );
?>