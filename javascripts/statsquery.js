$(document).ready(function(){

var indicators = 	[{
	    "codelist": {
	        "V_4_1": "Urban population exposure to air pollution by ozone",
	        "5_1": "Total Greenhouse Gas Emissions (in CO2 equivalent) indexed to 1990",
	        "V_4_2": "Urban population exposure to air pollution by particulate matter",
	        "5_2": "Total Greenhouse Gas Emissions (in CO2 equivalent) indexed to Kyoto base year"
	    },
	    "dataset": "env_air_ind",
	    "indicatorLabel": "Air pollution indicator",
	    "indicator": "airpol"
	},
	{
	    "codelist": {
	        "F8001": "GDP in PPS (Million PPS)",
	        "F8002": "GDP in PPS, per capita (PPS)",
	        "F8003": "Government Budget as a share of GDP (%)",
	        "F8004": "Total annual public expenditure in regular education (current and capital) as a percentage of  GDP (ISCED levels 0-1, 2, 3-4, 5-6) (%) ",
	        "F8005": "Total annual public expenditure in Vocational Training (current and capital) as a percentage of GDP (ISCED levels 3-4 Vocational Training) (%) ",
	        "F8006": "Total annual public expenditure in regular education (current and capital) as a percentage of  Total Government Expenditure (ISCED levels 0-1, 2, 3-4, 5-6) (%) ",
	        "F8007": "Total annual public expenditure in Vocational Training (current and capital) as a percentage of Total Government Expenditure (ISCED levels 3-4 Vocational Training) (%) ",
	        "F8008": "Public investment in education as a share of GDP (%)"
	    },
	    "dataset": "med_ec0",
	    "indicatorLabel": "Indicator used in Euro_Med",
	    "indicator": "indic_md"
	},
	{
	    "codelist": {
	        "L0900": "Crops under glass"
	    },
	    "dataset": "tag00010",
	    "indicatorLabel": "Land use",
	    "indicator": "landuse"
	},
	{
	    "codelist": {
	        "JAN": "Population on 1. January"
	    },
	    "dataset": "tps00001",
	    "indicatorLabel": "Demographic indicator",
	    "indicator": "indic_de"
	},
	{
	    "codelist": {
	        "QWA_CL4": "Area for quality wines - Yield > 110 hl/ha (ha)",
	        "TOT_AR": "Area under wine-grape vines - Total (ha)",
	        "OWA_CL1": "Area for other wines - Yield < 40 hl/ha (ha)",
	        "OWA_CL2": "Area for other wines - Yield 40 - < 70 hl/ha (ha)",
	        "OWA_AR": "Area for other wines - Total (ha)",
	        "OWA_CL3": "Area for other wines - Yield 70 - < 100 hl/ha (ha)",
	        "OWA_CL4": "Area for other wines - Yield 100 - < 130 hl/ha (ha)",
	        "OWA_CL5": "Area for other wines - Yield > 130 hl/ha (ha)",
	        "QWA_CL1": "Area for quality wines - Yield < 30 hl/ha (ha)",
	        "QWA_CL2": "Area for quality wines - Yield 30 - < 70 hl/ha (ha)",
	        "QWA_CL3": "Area for quality wines - Yield 70 - < 110 hl/ha (ha)",
	        "QWA_AR": "Area for quality wines - Total (ha)"
	    },
	    "dataset": "vit_bs5",
	    "indicatorLabel": "Yield class",
	    "indicator": "yieldcls"
	}];

var country_codes = 	{
	    "Portugal": "PT",
	    "Former Yugoslav Republic of Macedonia": "MK",
	    "Latvia": "LV",
	    "Sweden": "SE",
	    "Hungary": "HU",
	    "Ireland": "IE",
	    "Slovakia": "SK",
	    "Iceland": "IS",
	    "Germany": "DE",
	    "Turkey": "TR",
	    "Spain": "ES",
	    "Poland": "PL",
	    "Japan": "JP",
	    "Greece": "EL",
	    "Denmark": "DK",
	    "Austria": "AT",
	    "Malta": "MT",
	    "Estonia": "EE",
	    "Norway": "NO",
	    "Albania": "AL",
	    "Romania": "RO",
	    "Belgium": "BE",
	    "Montenegro": "ME",
	    "Italy": "IT",
	    "Slovenia": "SI",
	    "Czech Republic": "CZ",
	    "Netherlands": "NL",
	    "Finland": "FI",
	    "Liechtenstein": "LI",
	    "United States of America": "US",
	    "Serbia": "RS",
	    "Switzerland": "CH",
	    "Cyprus": "CY",
	    "Bosnia-Herzegovina": "BA",
	    "Bulgaria": "BG",
	    "Croatia": "HR",
	    "France": "FR",
	    "Lithuania": "LT",
	    "United Kingdom": "UK",
	    "Luxembourg": "LU"
};

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function getIndicatorCode(indicatorLabel){
	for (var i=0; i < indicators.length; i++) {
		var indObj = indicators[i];
		var re = new RegExp(indicatorLabel, 'gi');
		if(indObj.indicatorLabel.match(re)){
			return indObj.indicator;
		}
	};
}
function getDataset(indicatorLabel){
	for (var i=0; i < indicators.length; i++) {
		var indObj = indicators[i];
		var re = new RegExp(indicatorLabel, 'gi');
		if(indObj.indicatorLabel.match(re)){
			return indObj.dataset;
		}
	};
	
}

function getCodeList(indicatorCode){
	for (var i=0; i < indicators.length; i++) {
		var indObj = indicators[i];
		if(indObj.indicator==indicatorCode){
			return indObj.codelist;
			
		}
	};
	
}

	$("#query-form").submit(function(){
		$("#results").html("<table></table>");

		var userQuery = $("#query").val();
		var userQueryParts = userQuery.split(" ");
		var indicator = userQueryParts[0];
		var countryName  = toTitleCase(userQueryParts[1]);
		var year = userQueryParts[2];
		var countryCode = country_codes[countryName];
		var indicatorCode = getIndicatorCode(indicator);
		var dataset = getDataset(indicator);
		var codeList = getCodeList(indicatorCode);
					// console.log(indicatorCode);
					// console.log(codeList);
					//  return false;
		$.each(codeList, function(index, value){
			$.get('eurostat_query.php', {
				'dataset': dataset,
				'indicatorCode': indicatorCode,
				'countryCode': countryCode,
				'year': year,
				'indicatorValue': index
			}, function(data){
				$("#results table").append('<tr><th>'+value+'</th><td>'+data+'</td></tr>');
			});
			
		});
		return false;
	});

	
});