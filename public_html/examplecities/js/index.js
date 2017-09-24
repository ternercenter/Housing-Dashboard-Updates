$(document).ready(function(){

	$.getJSON('js/data/' + tCity.replace(/ /g, "_") + '_Ready.js', function(dat){
		
		data = dat;

		// Load Data Positions
		dataPos();

		// Initialize Map
		loadMap();

		// Initialize Graphs
		$('.graph').each(function(){ addGraph( this, $(this).find('h1:eq(0)').text(), $(this).attr("data-min"), $(this).attr("data-max"), $(this).attr("data-default") ); });

		// Initialize Button Clicks
		buttonClicks();

		// Draw legend
		drawtheLegend();

		// Window updates
		$(window).resize( function(e){ 
			mapResize() // Update the map size
		} )

		// Initially hide the document
		//initialHide();

		// Initialize password events
		//passEvents();

	})

})

margin = {}
width = {}
height = {}
x = {}
y = {}
xAxis = {}
yAxis = {}
svg = {}
xSlider = {}
brush = {}
svg = {}
slider = {}
handle = {}
tRange = {}
sLabel = {}
sLabelText = {}
rectWidth = 0
countGraphs = 0
function addGraph(el, div, tMin, tMax, tDefault){

	// Add a d3 bar graph that is scalable to a example div
	// Modified from http://bl.ocks.org/mbostock/3885304
	div = div.split(' (')[0].replace(/ /g, "_")

	tMin = tMin * 1;
	tMax = tMax * 1;
	tStep = $(el).attr('data-step') * 1
	numButtons = (tMax - tMin) / tStep
	formatData = $(el).attr("data-format")
	tDefault = tDefault * 1;
	inputs[div] = tDefault;

	htmlstring = '<ul class="buttonHolder" id="' + div + '">'
	for (i=0;i<=numButtons;i++){
		buttonVal = tMin + tStep * i
		button_label = formatNumber(buttonVal, formatData);
		if (i == 0){ bDirection = 'bleft'; }
		else if (i < numButtons){ bDirection = 'bmiddle'; }
		else{ bDirection = 'bright'; }
		if (buttonVal == tDefault){ activeInd = ' activeb'; }
		else{ activeInd = ''; }
		htmlstring += '<li class="button2 ' + bDirection + activeInd + '" data-val="' + buttonVal + '">' + button_label + '</li>';
	}
	htmlstring += '<li class="clear"></li></ul>'
	$(el).append(htmlstring);

	addCircles(el,div,true);

	countGraphs++
	if (countGraphs == $('.graph').length){
		setDefaults();
		$('.button2').click(function(e){
			id = $(e.target).parent().attr('id');
			clickButtonVal = $(e.target).attr('data-val') * 1;
			inputs[id] = clickButtonVal;
			$('#' + id + ' .button2').each(function(){
				$(this).removeClass('activeb');
			})
			$(e.target).addClass('activeb');
			updateData();
		})
		adding = ["devPotential2","unitsHeader","revenueHeader","affUnitsHeader","bRow","cRow","aRow"]
		for (j=0;j<adding.length;j++){
			addCircles('#' + adding[j],adding[j],false)
		}
	}

}

function mapResize(){

	// Resize map on window change
	$('#mapDiv').height($(window).height())
	$('#mapContainer').width($('#mapDiv').width() - $('#col1').width() - 10);
	map.invalidateSize();

}

function formatNumber(num, fStr){

	// Format numbers based on fString symbols
	for (f in fStr){
		if (fStr[f] == "%"){ num = num + "%"}
		if (fStr[f] == "w"){ num = Math.round(num)}
		if (fStr[f] == "d"){ num = Math.round(num*10)/10; num = num.toFixed(1); }
		if (fStr[f] == "e"){ num = Math.round(num*100)/100; num = num.toFixed(2) }
		if (fStr[f] == "k"){ 
			if (num >= 1000 && num < 1000000){ num = Math.round(num/1000) + "K"}
			else if (num >= 1000000){ num = Math.round(num/1000000) + "." + Math.round((num % 1000000)/100000) + "M"}
		}
		if (fStr[f] == ","){
			// from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    		num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} 
		if (fStr[f] == "$"){ num = "$" + num}
		if (fStr[f] == "t"){ num = Math.round(num/1000)*1000 }
		if (fStr[f] == "h"){ num = Math.round(num/100)*100 }
		if (fStr[f] == "u"){ num = Math.round(num/10)*10 }
		if (fStr[f] == "a"){ num = "$" + Math.round(num/1000000) + "M"}
	}

	return num

}

fee = true;
cu = false;
either = false;
function buttonClicks(){

	$('#specificplan .button').click(function(e){

		$('#specificplan .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
				if ($(this).text() == "Yes"){
					inputs["specificplan"] = "No"
					updateData();
				}
				else{
					inputs["specificplan"] = "Yes"
					updateData();
				}
			}

		})

		$(e.target).addClass('activeb')

		updateData();

	})

	$('#conditionaluse .button').click(function(e){

		$('#conditionaluse .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
				if ($(this).text() == "Yes"){
					$('#cutime, #cucost').show();
					$('#specificplan').show()
					inputs["conditionaluse"] = "No"
					updateData();
				}
				else{
					$('#cutime, #cucost').hide();
					$('#specificplan').hide();
					inputs["conditionaluse"] = "Yes"
					updateData();
				}
			}

		})

		$(e.target).addClass('activeb')

		updateData();

	})

	$('.choice').each(function(){
		addCircles(this,$(this).find('h1:eq(0)').text().split(' (')[0].replace(/ /g, "_"),true)
	})

}

function cap(val){

	topCap = 1;
	bottomCap = 0;
	if (val > topCap){ val = topCap; }
	if (val < bottomCap){ val = bottomCap; }
	return val;

}

function updateBar(){

	ret_show = (ret[0] * 100).toFixed(0) + '%';
	$('#returnData, #returnDataSmall').html(ret_show);
	if (ret[0] < 0.333){
		//$('.nogo').show()
		$('#returnDiv, #resultsBoxDivSmall').css("background-color", "red");
		$('#returnWord, #returnWordSmall').html("Unlikely");
	}
	else if (ret[0] < 0.666){
		//$('.unsure').show()
		$('#returnDiv, #resultsBoxDivSmall').css("background-color", "yellow");
		$('#returnWord, #returnWordSmall').html("Maybe");
	}
	else{
		//$('.build').show()
		$('#returnDiv, #resultsBoxDivSmall').css("background-color", "green");
		$('#returnWord, #returnWordSmall').html("Likely");
	}

	$('#cUnits').html( Math.round(ret[1]) )
	$('#cLand').html( milFormat(ret[2]) )
	$('#cPre').html( milFormat(ret[3]) )
	$('#cOther').html( milFormat(ret[4]) )
	$('#cConstruction').html( milFormat(ret[5]) )
	$('#cTotal').html( milFormat(ret[6]) )
	$('#cValue').html( milFormat(ret[7]) )
	$('#cMonths').html( Math.round(ret[8]) + " months" )
	$('#cLandSF').html( '$' + Math.round(ret[9]) )
	$('#cLandPrice').html( '$' + Math.round(inputs['Land_Costs']) )
	$('#cAffUnits').html( Math.round(ret[10]) )
	$('#cFees').html( '$' + formatNumber(formatNumber(Math.round(ret[11]),'t'),',') )

}

function milFormat(val){

	// Format to millions for display
	return '$' + (Math.round(val/100000)/10).toFixed(1) + "M"

}

function validatePass(){

	// Simple page password protection - modified from http://stackoverflow.com/questions/11955828/simple-password-protection-for-non-sensitive-links
    if($('#password').val() == 'gspp2016'){
        $('.container, #mapDiv, #logoLead').show();
        $('#passwordDiv').hide();
    }
    else{
        alert('Sorry, incorrect password. Please try again.');
    }

}

function passEvents(){

	// Set up events for entering password
	$('#passwordButton').click(validatePass);

	$('#password').keypress(function(e){

		if (e.which == 13){
			validatePass();
		}

	});

}

function initialHide(){

	// Hide the document before password protection
	$('.container, #mapDiv, #logoLead').hide(); 

}

map = ''
circles = [];
colors = ["#FF0000","#FFFF66","#33CC33"]
function loadMap(){

	// Initialize Map
	$('#mapDiv').height($(window).height())
	$('#mapContainer').width($('#mapDiv').width() - $('#col1').width() - 10);

	map = L.map('mapContainer', {zoomControl: false}).setView(assumptions[tCity]["latLon"], assumptions[tCity]["zoom"]);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.light',
		accessToken: 'pk.eyJ1IjoiZ3JhaGFtMzMzMyIsImEiOiJjaWVvaDZ6bGYwaHZnc21rbXdpcGdkOHpwIn0.GH2JxN_kj6EjFIZ4D_qWOg'
	}).addTo(map);
	//map.addLayer(new L.StamenTileLayer("toner-lite", { detectRetina: true }));
	map.scrollWheelZoom.disable();
	map.addControl(L.control.zoom({position: 'topright'}));

	for (i=0;i<data["data"].length;i++){
		d = data["data"][i]
		if (!d[c["Max_Density_Units"]]){ ins = d[c["Lot_Area_Setback"]] * 5 / (assumptions[tCity]["Size"]/(assumptions["constEff"] + assumptions["addConstEff"][5])); }
		else{ ins = d[c["Max_Density_Units"]]; }
		scaleIns = scaleCircles(ins)
		circles[i] = L.circle([d[c["Y"]], d[c["X"]]], scaleIns, {
			stroke: false,	
			fillColor: colors[i % 3],
			fillOpacity: 0.5
		}).addTo(map);
		mouseover_events(i);
	}

	// Add results div
	$('#mapContainer').append(
		'<div id="resultsDiv">' + 
			'<p id="cityName">' + tCity + '</p>' +
			'<div id="devPotential">Max. Development Potential</div>' + 
			'<div id="devPotential2" exp-text=' + 
			'"This figure applies for vacant or underutilized lots only, and does not consider lots that are not zoned for residential construction. ' +
			'I calculate this figure by calculating the number of units that could be built if existing lots built to 20% or less of their development potential' +
			' under the zoning code were built to 100% of their development potential. The number of existing residential units ' + 
			'is then subtracted from this figure to get the net total possible additional units citywide. Note this number is much ' + 
			'larger than the actual number of developable units because of financial feasibility issues and because, in areas with uncapped' +
			' height limits, it is unlikely that every building will be built up to the model\'s maximum 99 story cap."' + 
			'><span id="devTotal">0</span><span style="color:#CCCCCC"> additional units</span></div>' +  
			'<table class="resultsTable">' +
			'<tr class="row1"><td class="col1">Potential...</td><td class="col2 tableBold" id="unitsHeader" exp-text=' + 
			'"The total number of potential units that could be built, given existing zoning, specific plans, rents, construction costs,' + 
			' and other factors for each property. The range represents the 10th percentile to the 90th percentile of possibilities, based' + 
			' on the probability of development for each parcel."' + 
			'>Units</td><td class="col3 tableBold" id="revenueHeader" exp-text=' + 
			'"The total amount of potential property tax revenue, transfer tax revenue (if a for sale project is the most profitable) and affordable housing' + 
			' fee revenue that could be gained, amortized over 10' + 
			' years at a 3% rate, given existing zoning, specific plans, rents, construction costs, and other factors for each property.' +
			' The range represents the 10th percentile to the 90th percentile of possibilities, based on the probability of development for each parcel."' +
			'>Tax Revenue</td><td class="col4 tableBold" id="affUnitsHeader" exp-text=' + 
			'"The total number of potential affordable units that could be built, given existing zoning, specific plans, rents, construction costs,' + 
			' and other factors for each property. The range represents the 10th percentile to the 90th percentile of possibilities, based' + 
			' on the probability of development for each parcel."' + 
			'>Aff. Units</td></tr>' + 
			'<tr class="row2"><td class="col1 tableBold" id="bRow" exp-text=' + 
			'"The potential units and revenue under current conditions in the city."' + 
			'>Base Scenario</td><td class="col2" id="baseUnits">0</td><td class="col3" id="baseRevenue">0</td><td class="col4" id="baseAffUnits"></td></tr>' + 
			'<tr class="row3"><td class="col1 tableBold" id="cRow" exp-text=' + 
			'"The potential units and revenue under the scenario you specify with the buttons on the left."' + 
			'>Current Scenario</td><td class="col2" id="currentUnits">0</td><td class="col3" id="currentRevenue">0</td><td class="col4" id="currentAffUnits"></td></tr>' + 
			'<tr class="row4"><td class="col1 tableBold" id="aRow" exp-text=' + 
			'"The scenario you specify minus the base scenario, or the net change, in the short run, in development units and revenue based on ' + 
			'the scenario you specify on the left."' +
			'>Net Change</td><td class="col2" id="changeUnits">0</td><td class="col3" id="changeRevenue">0</td><td class="col4" id="changeAffUnits"></td></tr>' + 
			'</table>' + 
		'</div>'
	);

}

function scaleCircles(units){

	return 5 * Math.sqrt(units)

}

c = {}
rands = []
var data
function dataPos(){

	for (i in data["cols"]){
		c[data["cols"][i]] = i * 1
	}

	for (i=0;i<data["data"].length;i++){
		temp = []
		for (j=0;j<10;j++){
			temp.push(data["data"][i][c["Rand" + j]])
		}
		rands.push(temp)
	}

}

minAff = [0,0,0,0]; // Scenarios: 0 no bonus, fee input, 1 bonus, fee input, 2 no bonus, no fee, 3 bonus, no fee
bonus_Mult = [1,1,1,1];
aff_level = [80,80,80,80]
baseLand = [];
final_results = []
count_units = []
count_aff_units = []
count_revenue = []
base_counts = []
max_potential = 0
mouseOverHeight = 0
notloading = false;
function baseValues(){

	aff_level = [inputs["Affordability_Level"],inputs["Affordability_Level"],inputs["Affordability_Level"],inputs["Affordability_Level"]]
	minAff[1] = Math.max(inputs["Affordable_Housing"],assumptions[tCity]["densityBonusThreshold"]);
	minAff[3] = Math.max(inputs["Affordable_Housing"],assumptions[tCity]["densityBonusThreshold"]);
	bonus_Mult[1] = (minAff[1] - assumptions[tCity]["densityBonusThreshold"]) * assumptions[tCity]["densityBonusStep"] + assumptions[tCity]["densityBonusBase"]
	bonus_Mult[3] = (minAff[3] - assumptions[tCity]["densityBonusThreshold"]) * assumptions[tCity]["densityBonusStep"] + assumptions[tCity]["densityBonusBase"]
	if (bonus_Mult[1] > assumptions[tCity]["densityBonusMax"]){ bonus_Mult[1] = assumptions[tCity]["densityBonusMax"]; }
	if (bonus_Mult[3] > assumptions[tCity]["densityBonusMax"]){ bonus_Mult[3] = assumptions[tCity]["densityBonusMax"]; }
	if (inputs["Affordability_Level"] > assumptions[tCity]["densityBonusAff"]){
		aff_level[1] = assumptions[tCity]["densityBonusAff"]
		aff_level[3] = assumptions[tCity]["densityBonusAff"]
	}

	inputs["conditionaluse"] = "No"
	inputs["specificplan"] = "No"

	for (w=0;w<10;w++){
		count_units[w] = 0
		count_aff_units[w] = 0
		count_revenue[w] = 0
	}

	for (b=0;b<data["data"].length;b++){
		baseLand[b] = calcAll(b);
		final_results[b] = calcAll(b);
		doAction(final_results,b);
	}

	notloading = true;

	d = data["data"]
	for (b=0;b<d.length;b++){
		if (!d[b][c["Max_Density_Units"]]){ ins = d[b][c["Lot_Area_Setback"]] * 5 / (assumptions[tCity]["Size"]/(assumptions["constEff"] + assumptions["addConstEff"][5])); }
		else{ ins = d[b][c["Max_Density_Units"]]; }
		max_potential += ins - d[b][c["Res_Units"]]
	}

	$('#devTotal').text( formatNumber(Math.round(max_potential), ",") );

	counts = minmax();
	$('#baseUnits').text( formatNumber(Math.round(counts[0]), ",") + ' to ' + formatNumber(Math.round(counts[1]), ","))
	$('#baseAffUnits').text( formatNumber(Math.round(counts[4]), ",") + ' to ' + formatNumber(Math.round(counts[5]), ","))
	$('#baseRevenue').text( formatNumber(counts[2], "a") + ' to ' + formatNumber(counts[3], "a"))
	base_counts = counts;

	currents();

	mouseOverHeight2 = $('#mouseOver').height();
	width2 = $('#mouseOver').width() * 1/2;

}

function updateData(){

	aff_level = [inputs["Affordability_Level"],inputs["Affordability_Level"],inputs["Affordability_Level"],inputs["Affordability_Level"]]
	minAff[1] = Math.max(inputs["Affordable_Housing"],assumptions[tCity]["densityBonusThreshold"]);
	minAff[3] = Math.max(inputs["Affordable_Housing"],assumptions[tCity]["densityBonusThreshold"]);
	bonus_Mult[1] = (minAff[1] - assumptions[tCity]["densityBonusThreshold"]) * assumptions[tCity]["densityBonusStep"] + assumptions[tCity]["densityBonusBase"]
	bonus_Mult[3] = (minAff[3] - assumptions[tCity]["densityBonusThreshold"]) * assumptions[tCity]["densityBonusStep"] + assumptions[tCity]["densityBonusBase"]
	if (bonus_Mult[1] > assumptions[tCity]["densityBonusMax"]){ bonus_Mult[1] = assumptions[tCity]["densityBonusMax"]; }
	if (bonus_Mult[3] > assumptions[tCity]["densityBonusMax"]){ bonus_Mult[3] = assumptions[tCity]["densityBonusMax"]; }
	if (inputs["Affordability_Level"] > assumptions[tCity]["densityBonusAff"]){
		aff_level[1] = assumptions[tCity]["densityBonusAff"]
		aff_level[3] = assumptions[tCity]["densityBonusAff"]
	}

	for (w=0;w<10;w++){
		count_units[w] = 0
		count_aff_units[w] = 0
		count_revenue[w] = 0
	}

	for (b=0;b<data["data"].length;b++){
		final_results[b] = calcAll(b);
		doAction(final_results,b)
	}

	currents();

}

transferTax = {
	"Oakland": 0.015,
	"San Francisco": 0.0068,
	"Pleasanton": 0.00055,
	"Menlo Park": 0.00055
}
function doAction(res,t){
	if (res[t][0] < 0.25){
		acolor = colors[0];
	}
	else if (res[t][0] < 0.75){
		acolor = colors[1];
	}
	else{
		acolor = colors[2];
	}
	circles[t].setStyle({fillColor: acolor});
	circles[t].setRadius(scaleCircles(res[t][1]))
	for (w=0;w<10;w++){
		if (res[t][0] >= rands[t][w]){ 
			count_units[w] += res[t][1]
			count_aff_units[w] += res[t][10]
			count_revenue[w] += res[t][11] + res[t][7] * 0.01 * 0.4 * 8.5 // Property tax revenue, 10 years, 3% discount rate, NPV
			if (!res[t][12]){ count_revenue[w] += transferTax[tCity] * res[t][6]; }
		}
	}
}

function minmax(){
	count_units.sort(function(m,n){ return m - n; })
	count_max = count_units[count_units.length-2]
	count_min = count_units[1]
	count_aff_units.sort(function(m,n){ return m - n; })
	count_aff_max = count_aff_units[count_aff_units.length-2]
	count_aff_min = count_aff_units[1]
	count_revenue.sort(function(m,n){ return m - n; })
	count_rev_max = count_revenue[count_revenue.length-2]
	count_rev_min = count_revenue[1]

	return [count_min,count_max,count_rev_min,count_rev_max,count_aff_min,count_aff_max]
}

function minmax2(){
	diff_min = counts[0] - base_counts[0]
	diff_max = counts[1] - base_counts[1]
	a = [diff_min,diff_max]
	a.sort(function(m,n){ return m - n; })
	diff_min = counts[2] - base_counts[2]
	diff_max = counts[3] - base_counts[3]
	b = [diff_min,diff_max]
	b.sort(function(m,n){ return m - n; })
	diff_min = counts[4] - base_counts[4]
	diff_max = counts[5] - base_counts[5]
	c1 = [diff_min,diff_max]
	c1.sort(function(m,n){ return m - n; })

	return [a[0],a[1],b[0],b[1],c1[0],c1[1]]
}

function currents(){

	counts = minmax();
	$('#currentUnits').text( formatNumber(Math.round(counts[0]), ",") + ' to ' + formatNumber(Math.round(counts[1]), ","))
	$('#currentAffUnits').text( formatNumber(Math.round(counts[4]), ",") + ' to ' + formatNumber(Math.round(counts[5]), ","))
	$('#currentRevenue').text( formatNumber(counts[2], "a") + ' to ' + formatNumber(counts[3], "a"))

	counts2 = minmax2();
	formats_counts2 = [",",",","a","a",",",","]
	for (i=0;i<counts2.length;i++){
		if (counts2[i] < 0){ counts2[i] = '<span style="color: red;">' + formatNumber(Math.round(counts2[i]), formats_counts2[i]) + '</span>'; }
		else { counts2[i] = formatNumber(Math.round(counts2[i]), formats_counts2[i]); }
	}
	$('#changeUnits').html(counts2[0] + ' to ' + counts2[1])
	$('#changeAffUnits').html(counts2[4] + ' to ' + counts2[5])
	$('#changeRevenue').html( counts2[2] + ' to ' + counts2[3])

}

function mouseover_events(t){

	circles[t].myid = t;
	$(circles[t]).mouseover(function(e){

		id = e.target.myid;

		ret_show = (final_results[id][0] * 100).toFixed(0) + '%';
		$('#returnData, #returnDataSmall').html(ret_show);
		if (final_results[id][0] < 0.25){
			aColor = colors[0];
		}
		else if (final_results[id][0] < 0.75){
			aColor = colors[1]
		}
		else{
			aColor = colors[2]
		}

		$('#returnDiv').css("background-color", aColor);
		circles[id].setStyle({
			stroke: true,
			color: "#000000",
			weight: 1,
			opacity: 1
		})

		$('#cUnits').html( final_results[id][1] )
		$('#cTotal').html( milFormat(final_results[id][6]) )
		$('#cValue').html( milFormat(final_results[id][7]) )
		$('#cMonths').html( Math.round(final_results[id][8]) + " mos." )
		$('#cLandSF').html( '$' + Math.round(final_results[id][9]) )
		$('#cLandPrice').html( '$' + Math.round(baseLand[id]) )
		$('#cAffUnits').html( Math.round(final_results[id][10]) )
		$('#cFees').html( milFormat(final_results[id][11]) )

		pos(e);

	}).mouseout(function(e){
		id = e.target.myid;
		$('#mouseOver').hide()
		circles[id].setStyle({
			stroke: false
		});
	}).mousemove(function(e){
		pos(e);
	});

}

function pos(a){

	mouseDiff = 20
	x = a.pageX || a.originalEvent.originalEvent.pageX
	y = a.pageY || a.originalEvent.originalEvent.pageY

	scrollBottom = $(window).scrollTop() + $(window).height();
	if ((y + mouseDiff + mouseOverHeight2) > scrollBottom){
		y = y - mouseDiff - mouseOverHeight2;
	}
	else{
		y = y + mouseDiff;
	}

	$('#mouseOver').show().css("left", x - width2).css("top", y);

}

circles_svg = {}
mouseOverHeight = 0
function addCircles(tEl,tDiv,ind){

	r = 6
	if (ind){
		$(tEl).find('h1:eq(0)').html($(tEl).find('h1:eq(0)').html() + ' ')
			.append('<img src="css/img/question_mark.png" id="' + tDiv + '_question" class="question_image" />')
	}
	else{
		$(tEl).append(' <img src="css/img/question_mark.png" id="' + tDiv + '_question" class="question_image" />')
	}

	$('#' + tDiv + '_question').mouseover(function(e){
		$('#explainIt').text($(tEl).attr('exp-text')).show();
		mouseOverHeight = $('#explainIt').height();
		$('#explainIt').hide().fadeIn();
		pospop(e);
	}).mouseout(function(e){
		$('#explainIt').fadeOut();
	})

}

function pospop(e){

	paddingDiff = 20
	x = $(e.target).offset().left
	y = $(e.target).offset().top

	x = x + 27
	y = y - mouseOverHeight/2 + 6;

	$('#explainIt').css("left", x).css("top", y);

}

// Modified from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

tCity = getParameterByName('city');
if (!tCity){ tCity = "Oakland"; }

function setDefaults(){

	defs = {
		"Oakland": [20000,10,120,6,6,10000,11],
		"San Francisco": [70000,10,60,18,12,20000,11],
		"Pleasanton": [10000,15,80,6,6,10000,11],
		"Menlo Park": [30000,15,80,6,12,20000,11]
	}

	ids = ["Fees","Affordable_Housing","Affordability_Level","Basic_Permitting_Time","CU_or_PUD_Additional_Time","CU_or_PUD_Additional_Cost","Total_Project_Target_Return"]
	for (i=0;i<ids.length;i++){
		$('#' + ids[i] + ' .button2').each(function(){
			$(this).removeClass('activeb');
			if ($(this).attr('data-val')*1 == defs[tCity][i]){
				$(this).addClass('activeb');
			}
		})
		divName = $('#' + ids[i]).parent().find('h1:eq(0)').text().split(' (')[0].replace(/ /g, "_")
		inputs[divName] = defs[tCity][i]
	}

	$('#cityList .button').each(function(){
		$(this).removeClass('activeb')
		if ($(this).text() == tCity){ $(this).addClass('activeb'); }
	}).click(function(e){
		if ($(e.target).text() != tCity){
			document.location = 'index.html?city=' + $(e.target).text();
		}
	});

	$('.graph .button2').each(function(){
		if ($(this).attr('class').split(' ').indexOf('activeb') > -1){
			$(this).attr('style', 'border: 1px solid #777 !important;')
		}
	});

	baseValues();

}

legendSVG = ''
function drawtheLegend(){

	textHeight = 17

	legendSVG = d3.select('#mapLegend').append('svg')
		.attr('id', 'legendSVG')
		.attr('width', $('.col-md-7:eq(0)').width())
		.attr('height', 25)
		.append('g')

	legendSVG.append('text')
		.attr('x', 2)
		.attr('y', textHeight)
		.text('Odds of Construction:')

	widthText = 113 + 20
	circleSpace = 60
	circleRadius = 5
	circleSpace2 = circleRadius + 5
	loc = widthText
	legText = ["75-100%", "25-74%", "0-24%"]
	for (i=0;i<=2;i++){
		legendSVG.append('circle')
			.attr('r', circleRadius)
			.attr('cx', loc)
			.attr('cy', textHeight - circleRadius)
			.attr('fill', colors[2-i])

		legendSVG.append('text')
			.attr('x', loc + circleSpace2)
			.attr('y', textHeight - 1)
			.text(legText[i])

		loc = loc + circleSpace + circleSpace2
	}

	legendSVG.append('text')
		.attr('x', loc - 5)
		.attr('y', textHeight)
		.text('Circles sized by potential units')

}