dist = ""
$(document).ready(function(){

	// Setup Menu
	menu();

	// Get example graph
	dist = $('#distributionGraph').find('h1:eq(0)').text().replace(/ /g, "_")

	// Set up the moving results bar
	resultsBar( $(window).width() )

	// Initialize Graphs
	$('.graph, .graph2').each(function(){ addGraph( this, $(this).find('h1:eq(0)').text(), $(this).attr("data-min"), $(this).attr("data-max"), $(this).attr("data-default") ); });

	// Initialize Input Clicks
	inputClick();

	// Initialize Button Clicks
	buttonClicks();

	// Draw color legend
	drawtheLegend();

	// Window updates
	$(window).resize( function(e){ 
		resultsBar( $(e.target).width() ) // Change the results bar
		width[dist] = $('#col1').width() - margin[dist].left - margin[dist].right
		graphResize() // Update the graph sizes
		delete width[dist];
	} )

	// Initialize Input focus out
	focusOut();

	// Initially hide the document
	//initialHide();

	// Initialize password events
	//passEvents();

})

function resultsBar(w){

	// Setting the scroll on the fixed Div - Modified from https://css-tricks.com/scroll-fix-content/
	tParentRight = $('#resultsBox')
	tParentBottom = $('#resultsBox2')
	tDiv = $('#resultsBoxDiv')
	tDivTop = $('#col1').offset().top

	if( w >= 992 ){

		tParentRight.show()
		tParentBottom.hide()

		$(document).scroll(function(e){

			if ( $(document).scrollTop() > tDivTop ) {
				$(tDiv).width($(tParentRight).width())
				tDiv.addClass("resultsFixedRight");
			} else {
				tDiv.removeClass("resultsFixedRight");
			}

		})

	} else {

		tParentRight.hide()
		tParentBottom.show()

	}

	$(tDiv).width($(tParentRight).width())

}

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
abc = {}
slider = {}
handle = {}
tRange = {}
defaults = {}
rectWidth = 0
countGraphs = 0
function addGraph(el, div, tMin, tMax, tDefault){

	// Add a d3 bar graph that is scalable to a example div
	// Modified from http://bl.ocks.org/mbostock/3885304
	div = div.replace(/ /g, "_")
	defaults[div] = tDefault

	tMin = tMin * 1;
	tMax = tMax * 1;

	tRange[div] = []
	numBars = 40
	rMax = 1
	gap = (tMax-tMin)/numBars
	for (i=0;i<numBars;i++){
		tRange[div].push(gap*i + tMin)
	}

	d3.select(el).append("div")
		.attr("id", div)
		.attr("class", "graphHolder")

	d3.select(el).select('input').attr("id", div + "-input")

	margin[div] = {top: 20, right: 60, bottom: 30, left: 15}
    width[div] = $('#col1').width() - margin[div].left - margin[div].right
    height[div] = 200 - margin[div].top - margin[div].bottom;

	x[div] = d3.scale.linear().domain([tMin, tMax]).range([0, width[div]]);

	y[div] = d3.scale.linear().domain([0, rMax]).range([height[div], 0]);

	xAxis[div] = d3.svg.axis().scale(x[div]).orient("bottom").ticks(6);

	yAxis[div] = d3.svg.axis().scale(y[div]).orient("right").ticks(5, "%");

	svg[div] = d3.select('#' + div).append("svg")
		.attr("width", width[div] + margin[div].left + margin[div].right)
		.attr("height", height[div] + margin[div].top + margin[div].bottom)
		.attr("id", div + "_svg")
		.append("g")
		.attr("transform", "translate(" + margin[div].left + "," + margin[div].top + ")");

	svg[div].append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height[div] + 5) + ")")
		.call(xAxis[div]);

	drawDefaultDiv(div,tDefault)

	madeUpData = []
	madeUp = $.map(tRange[div], function(a){ madeUpData.push( {"xs":a, "ys":0.15 } ) })

	svg[div].selectAll(".bar")
		.data(madeUpData)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x[div](d.xs); })
		.attr("width", function(d) { return width[div]/numBars - 1; })
		.attr("y", function(d) { return y[div](d.ys); })
		.attr("height", function(d) { return height[div] - y[div](d.ys); });

	svg[div].append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + width[div] + ",0)")
		.call(yAxis[div])

	abc[div] = svg[div].append("g")
		.attr("class", "y axis label")
		.attr("transform", "translate(" + width[div] + ",0)")
	
	abc[div].append("text").text('Odds Of Construction')
		.attr("y", -10)
		.attr("x", -80)

	svg[div].selectAll('.y.axis .tick')
		.append("line")
		.attr("class", "overBar")
		.attr("x2", 0)
		.attr("x1", -width[div])
		.attr("y1", 0)

	formatData = $(el).attr("data-format")

	$(el).find('.x .tick text').each(function(){
		$(this).text( formatNumber( $(this).text().replace(',','').replace(',','') * 1, formatData ) )
	})

	// Add sliders to graphs. Modified from http://bl.ocks.org/mbostock/6452972
	if (div != dist){
	   	rectWidth = 10
	    svg[div].append("line").attr("class", "slider_bg")
	    	.attr("transform", "translate(0," + (height[div] - rectWidth/2) + ")")
	    	.attr("x1", 0).attr("x2", width[div]).attr("y1", 5).attr("y2", 5)

	    svg[div].append("line").attr("class", "slider_bg2")
	    	.attr("transform", "translate(0," + (height[div] - rectWidth/2) + ")")
	    	.attr("x1", 0).attr("x2", width[div]).attr("y1", 5).attr("y2", 5)

		xSlider[div] = d3.scale.linear().domain([tMin, tMax]).range([0, width[div]]).clamp(true);

		brush[div] = d3.svg.brush().x(xSlider[div]).extent([0, 0]).on("brush", brushed);

		svg[div].select('.x.axis').select(".domain")
	  		.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })

	    slider[div] = svg[div].append("g").attr("class", "slider").attr("id", div + "-slider").call(brush[div]);

	    slider[div].selectAll(".extent,.resize").remove();

	    handle[div] = slider[div].append("circle").attr("class", "handle")
	    	.attr("transform", "translate(0," + height[div] + ")")
	    	.attr("r", 7);

	    slider[div].call(brush[div].event).transition() // gratuitous intro!
	    	.duration(500)
	    	.call(brush[div].extent([tDefault,tDefault]))
	    	.call(brush[div].event)
	    	.each('end', function(d){ 
	    		countGraphs++
	    		if (countGraphs == $('.graph').length){
	    			updateGraphs();
	    			countGraphs++
	    		}
	    	});
	}
	else{

		uVal = []
		insertData = $.map(tRange[div], function(a){ 
			uVal.push( {"xs":a, "ys":probs_poisson[a]} );
		});

		svg[div].selectAll('.bar')
			.data(uVal)
			.transition()
			.duration(500)
			.attr("x", function(d) { return x[div](d.xs); })
			.attr("width", function(d) { return width[div]/numBars - 1; })
			.attr("y", function(d) { return y[div](d.ys); })
			.attr("height", function(d) { return height[div] - y[div](d.ys); });

		delete width[div];

	}

	addCircles(el,div);

}

function drawDefaultDiv(tDiv,ttDefault){

	newtick = svg[tDiv].select(".x.axis").append("g")
		.attr("class", "tick tickDefault")
		.attr("transform", "translate(" + x[tDiv](ttDefault) + ",0)")
		.attr("style", "opacity: 1;")

	newtick.append("line").attr("y2", 6).attr("x2", 0)

	newtick.append("text").attr("dy", ".71em").attr("y", 9).attr("x", 0).attr("style", "text-anchor: middle;")
		.text(ttDefault)

}

function brushed() {

	// Modified from http://bl.ocks.org/mbostock/6452972

	sg = $(this).attr('id').split('-')[0]

	var value = brush[sg].extent()[0];

	if (d3.event.sourceEvent) { // not a programmatic event
		value = xSlider[sg].invert(d3.mouse(this)[0]);
		brush[sg].extent([value, value]);
	}

	handle[sg].attr("cx", xSlider[sg](value));

	formatData = $("#" + sg).parent().attr("input-format")

	if (sg == "Height" && value < 1){
		$("#" + sg + "-input").val(1);
	}
	else{ $("#" + sg + "-input").val( formatNumber( value, formatData) ); }

	if (countGraphs > $('.graph').length){ updateGraphs(); }

}

function graphResize(){

	// Resize graphs on window change, modified from https://www.safaribooksonline.com/blog/2014/02/17/building-responsible-visualizations-d3-js/
	for (g in width){

		width[g] = $('#col1').width() - margin[g].left - margin[g].right

		d3.select('svg#' + g + '_svg').attr("width", width[g] + margin[g].left + margin[g].right)

		x[g].range([0, width[g]]);

		svg[g].select('.x.axis')
		 	.call(xAxis[g]);

		drawDefaultDiv(g,defaults[g]);

		svg[g].select('.y.axis')
			.attr("transform", "translate(" + width[g] + ",0)")
		 	.call(yAxis[g]);

		svg[g].selectAll('.bar')
			.attr("x", function(d) { return x[g](d.xs); })
			.attr("width", function(d) { return width[g]/numBars - 1; })
			.attr("y", function(d) { return y[g](d.ys); })
			.attr("height", function(d) { return height[g] - y[g](d.ys); });

		svg[g].selectAll('.y.axis .overBar')
			.attr("x1", -width[g])

		abc[g].attr("transform", "translate(" + width[g] + ",0)")

		formatData = $('#' + g).parent().attr("data-format")

		$('#' + g).find('.x .tick text').each(function(){
			$(this).text( formatNumber( $(this).text().replace(',','') * 1, formatData ) )
		})

		// Resize slider
		if (g != dist){
			svg[g].select(".slider_bg").attr("transform", "translate(0," + (height[g] - rectWidth/2) + ")").attr("x2", width[g])

			svg[g].select(".slider_bg2").attr("transform", "translate(0," + (height[g] - rectWidth/2) + ")").attr("x2", width[g])

			xSlider[g].range([0, width[g]]);

			brush[g].x(xSlider[g]);

			handle[g].attr("transform", "translate(0," + height[g] + ")");
		}

	}

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
	}

	return num

}

storeVal = {}
function inputClick(){
	
	// Control actions of input clicks
	for (g in width){

		storeVal[sg] = 0

		$("#" + g + "-input").focusin(function(e){

			sg = $(e.target).attr('id').split('-')[0]

			storeVal[sg] = $(e.target).val().replace('$','').replace(',','').replace('%','');
			$(e.target).val("")

			$(e.target).on("keypress", offKey);

		}).focusout(function(e){

			$(e.target).off("keypress", offKey);
			aVal = $(e.target).val().replace('$','').replace(',','').replace('%','')
			formatData = $(e.target).parent().parent().attr('input-format')
			sg = $(e.target).attr('id').split('-')[0]

			if ($.isNumeric(aVal)){ 

				dMin = $(e.target).parent().parent().attr('data-min') * 1;
				if (aVal < dMin){ aVal = dMin; }

				dMax = $(e.target).parent().parent().attr('data-max') * 1;
				if (aVal > dMax){ aVal = dMax; }

				$(e.target).val( formatNumber( aVal, formatData ) );

				brush[sg].extent([aVal, aVal]); 

				handle[sg].attr("cx", xSlider[sg](aVal));

			}
			else{ $(e.target).val( formatNumber( storeVal[sg], formatData ) ); }

		})

	}

}

function offKey(e){

	// Make sure enter and tab just format the number and don't move to next box
	if (e.which == 13){
		$(e.target).focusout()
	}

}

function focusOut(){

	// Update graphs when typing out of the input
	$('input').focusout(function(e){ 
		updateGraphs();
	});

}

rent = true;
fee = true;
cu = false;
either = true;
function buttonClicks(){

	// Activate the button clicks
	$('#condo_apt .button').click(function(e){

		$('#condo_apt .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
				if ($(this).text() == "For Rent"){
					$('#rentalDiv, #rWord').hide();
					$('#salesDiv, #sWord').show();
					$('#cap').hide();
					rent = false;
					updateGraphs();
				}
				else{
					$('#rentalDiv, #rWord').show();
					$('#salesDiv, #sWord').hide();
					$('#cap').show();
					rent = true;
					updateGraphs();
				}
			}

		})

		$(e.target).addClass('activeb')

	})

	$('#aff_fee .button').click(function(e){

		$('#aff_fee .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
			}

		})

		if ($(e.target).text() == "Inclusionary"){
			$('#feeDiv').hide();
			$('#affHousingDiv, #affHousingLevelDiv').show();
			fee = false;
			either = false;
			updateGraphs();
		}
		else if ($(e.target).text() == "Fee"){
			$('#feeDiv').show();
			$('#affHousingDiv, #affHousingLevelDiv').hide();
			fee = true;
			either = false;
			updateGraphs();
		}
		else{
			$('#feeDiv').show();
			$('#affHousingDiv, #affHousingLevelDiv').show();
			fee = true;
			either = true;
			updateGraphs();
		}

		$(e.target).addClass('activeb')

	})

	$('#liquefaction .button').click(function(e){

		$('#liquefaction .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
			}

		})

		$(e.target).addClass('activeb')

		updateGraphs();

	})

	$('#landslide .button').click(function(e){

		$('#landslide .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
			}

		})

		$(e.target).addClass('activeb')

		updateGraphs();

	})

	$('#specificplan .button').click(function(e){

		$('#specificplan .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
				if ($(this).text() == "Yes"){
					$('#negativedeclaration').show();
					//$('#specificplan').removeClass('big-break');
					updateGraphs();
				}
				else{
					$('#negativedeclaration').hide();
					//$('#specificplan').addClass('big-break');
					updateGraphs();
				}
			}

		})

		$(e.target).addClass('activeb')

		updateGraphs();

	})

	$('#negativedeclaration .button').click(function(e){

		$('#negativedeclaration .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
				updateGraphs();
			}

		})

		$(e.target).addClass('activeb')

		updateGraphs();

	})

	$('#conditionaluse .button').click(function(e){

		$('#conditionaluse .button').each(function(){

			if ($(this).attr('class').indexOf('activeb') > -1){ 
				$(this).removeClass('activeb'); 
				if ($(this).text() == "Yes"){
					$('#cutime, #cucost').hide();
					$('#specificplan, #negativedeclaration').hide()
					//$('#specificplan, #negativedeclaration').removeClass('big-break');
					//$('#conditionaluse').addClass('big-break');
					cu = false;
					updateGraphs();
				}
				else{
					$('#cutime, #cucost').show();
					//$('#conditionaluse').removeClass('big-break');
					$('#specificplan').show();
					if (inputs["specificplan"] == "No"){
						//$('#negativedeclaration').show().addClass('big-break');
					}
					else{
						//$('#specificplan').addClass('big-break');
					}
					cu = true;
					updateGraphs();
				}
			}

		})

		$(e.target).addClass('activeb')

		updateGraphs();

	})

	$('.choice').each(function(){
		addCircles(this,$(this).find('h1:eq(0)').text().split(' (')[0].replace(/ /g, "_"))
	})

}

function updateGraphs(){

	// Update graphs when a number is entered or the slider changes
	getVals();

	updateVals = {}
	for (g in width){

		updateVals[g] = []
		insertData = $.map(tRange[g], function(a){ 
			inputs[g] = a;
			test = cap( calcInputs()[0] )
			if (isNaN(test)){ test = 0; }
			updateVals[g].push( {"xs":a, "ys":test } );
		});

		getVals();

	}

	for (g in width){

		svg[g].selectAll('.bar')
			.data(updateVals[g])
			.transition()
			.duration(500)
			.attr("x", function(d) { return x[g](d.xs); })
			.attr("width", function(d) { return width[g]/numBars - 1; })
			.attr("y", function(d) { return y[g](d.ys); })
			.attr("height", function(d) { return height[g] - y[g](d.ys); });

	}

	updateBar();

}

function cap(val){

	topCap = 1;
	bottomCap = 0;
	if (val > topCap){ val = topCap; }
	if (val < bottomCap){ val = bottomCap; }
	return val;

}

function updateBar(){

	getVals();
	ret = calcInputs();
	ret_show = (ret[0] * 100).toFixed(0) + '%';
	$('#returnData, #returnDataSmall').html(ret_show);
	if (ret[0] < 0.25){
		//$('.nogo').show()
		$('#returnDiv, #resultsBoxDivSmall').css("background-color", "red");
		$('#returnWord, #returnWordSmall').html("Unlikely");
	}
	else if (ret[0] < 0.75){
		//$('.unsure').show()
		$('#returnDiv, #resultsBoxDivSmall').css("background-color", "yellow");
		$('#returnWord, #returnWordSmall').html("Maybe");
	}
	else{
		//$('.build').show()
		$('#returnDiv, #resultsBoxDivSmall').css("background-color", "green");
		$('#returnWord, #returnWordSmall').html("Likely");
	}

	tot_hard_costs = ret[5]/(1 + assumptions["softPerc"])
	tot_soft_costs = ret[5] - tot_hard_costs
	$('#cUnits').html( Math.round(ret[1]) )
	$('#cLand').html( milFormat(ret[2]) )
	//$('#cPre').html( milFormat(ret[3]) )
	$('#cOther').html( milFormat(ret[3] + ret[4] + tot_soft_costs) )
	$('#cConstruction').html( milFormat(tot_hard_costs) )
	$('#cTotal').html( milFormat(ret[6]) )
	$('#cValue').html( milFormat(ret[7]) )
	$('#cMonths').html( Math.round(ret[8]) + " months" )
	$('#cLandSF').html( '$' + Math.round(ret[9]) )
	$('#cLandPrice').html( '$' + Math.round(inputs['Market_Land_Costs']) )
	$('#cAffUnits').html( Math.round(ret[10]) )
	$('#cFees').html( milFormat(ret[11]) )

}

function milFormat(val){

	// Format to millions for display
	return '$' + (Math.round(val/100000)/10).toFixed(1) + "M"

}

function validatePass(){

	// Simple page password protection - modified from http://stackoverflow.com/questions/11955828/simple-password-protection-for-non-sensitive-links
    if($('#password').val() == 'gspp2016'){
        $('.container, #resultsBox2, #logoLead').show();
        $('#passwordDiv').hide();

        tParentRight = $('#resultsBox')
		tParentBottom = $('#resultsBox2')
        w = $(window).width()
        if( w >= 992 ){

			tParentRight.show()
			tParentBottom.hide()

		}
		else{

			tParentRight.hide()
			tParentBottom.show()

		}
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
	$('.container, #resultsBox2, #logoLead').hide(); 

}

circles_svg = {}
mouseOverHeight = 0
function addCircles(tEl,tDiv){

	r = 6
	$(tEl).find('h1:eq(0)').html($(tEl).find('h1:eq(0)').html() + ' ')
		.append('<img src="css/img/question_mark.png" id="' + tDiv + '_question" class="question_image" />')

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
	x1 = $(e.target).offset().left
	y1 = $(e.target).offset().top

	x1 = x1 + 27
	y1 = y1 - mouseOverHeight/2 + 6;

	$('#explainIt').css("left", x1).css("top", y1);

}

function menu(){
	countMenu = 0
	toApp = ''
	$('#col1 .lead2').each(function(){
		if (countMenu < 9){
			addMeHere = ''
			if ($(this).attr('id') == 'marketfactors' || $(this).attr('id') == 'localgovernmentfactors' || $(this).attr('id') == 'otherfactorstoconsider'){
				addMeHere = ' buttonStandOut'
			}
			toApp += '<li class="buttonMenu' + addMeHere + '" href="' + $(this).attr('id') + '">' + $(this).text() + '</li>'
			countMenu++
		}
	})
	$('#menuList').append(toApp);
	$('#menuList li').click(function(e){
		location.hash = '#' + $(e.target).attr('href')
	})
}

legendSVG = ''
function drawtheLegend(){

	colors = ["#FF0000","#FFFF66","#33CC33"]

	textHeight = 17

	legendSVG = d3.select('#mapLegend').append('svg')
		.attr('id', 'legendSVG')
		.attr('width', $('#col1').width())
		.attr('height', 25)
		.append('g')

	legendSVG.append('text')
		.attr('x', 2)
		.attr('y', textHeight)
		.text('Odds of Construction:')

	widthText = 113 + 20
	circleSpace = 60
	circleRadius = 10
	circleSpace2 = circleRadius + 5
	loc = widthText
	legText = ["75-100%", "25-74%", "0-24%"]
	for (i=0;i<=2;i++){
		legendSVG.append('rect')
			.attr('width', circleRadius)
			.attr('height', circleRadius)
			.attr('x', loc)
			.attr('y', textHeight - circleRadius)
			.attr('fill', colors[2-i])

		legendSVG.append('text')
			.attr('x', loc + circleSpace2)
			.attr('y', textHeight - 1)
			.text(legText[i])

		loc = loc + circleSpace + circleSpace2
	}

}