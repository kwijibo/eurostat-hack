<?php

#i: germany population 2006
#o: 1234567890

class EuroStatQuery {
	
	var $countryCodes = array();
	
	
	function __construct(){
		$this->countryCodes = fetchData('countries-codes.json');
	}
	
	function query($fileName, $countryID, $codeList, $code, $Year){
		$dom = new DomDocument();
		$dom->loadXML(file_get_contents($fileName));
		
		$xpath = new DomXPath($dom);
//		$xpath->registerNamespace()
return  $xpath->query("//*[@geo='{$countryID}'][@{$codeList}='{$code}']/*[@TIME_PERIOD='{$year}']")->item(0)->getAttribute('OBS_VALUE');
		
		
	}
	
	function 
	
}


function fetchData($fileName){
	return json_decode(file_get_contents($fileName), 1);
}

?>