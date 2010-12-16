<?php

#i: germany population 2006
#o: 1234567890


	
	function query($fileName, $countryID, $attr, $attrVal, $year){
		$dom = new DomDocument();
		$dom->loadXML(file_get_contents('data/'.$fileName));		
		$xpath = new DomXPath($dom);
return  $xpath->query("//*[@geo='{$countryID}'][@{$attr}='{$attrVal}']/*[@TIME_PERIOD='{$year}']")->item(0)->getAttribute('OBS_VALUE');
			
	}

//airpol="5_1" geo="AT"
echo query('env_air_ind.sdmx.xml', 'AT', 'airpol', '5_1', '1991' );
?>