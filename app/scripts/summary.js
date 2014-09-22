function summarySteam(element, data){


	var sumBalance = data[0];
	var raised = data[1];
	var spent = data[2];

	var dataOb = computeSteam(spent, raised)

	//console.log(spent)

	var timeStart = '2013-01-01T00:00:00';
	var timeEnd = '2014-06-31T00:00:00';

	var timeScaleStart = timeformat('2013-07-01T00:00:00');
	var timeSCaleEnd = timeformat('2014-06-31T00:00:00');

	var timeDomain = [ timeScaleStart, timeSCaleEnd];
	var tvals = [ timeformat('2013-07-01T00:00:00'), timeformat('2014-01-01T00:00:00'), timeformat('2014-06-31T00:00:00')];

	//Need to make dynamic

	var moneyDomain = [dataOb.maxVal, dataOb.minVal-35000]
	//[350000, -90000];

	var summary = element.select('#steam');

	var width = $('#steam').width() -40;
	var height = $('#steam').height() -40;

	var svg = summary.append('svg')
						.attr('width', width)
						.attr('height', height)
						.append('g')
						.attr('transform', 'translate(0, 30)');

	var x = d3.time.scale().range([20, width]).domain(timeDomain);
	var y = d3.scale.linear().range([20, height]).domain(moneyDomain);

	var xAxis = d3.svg.axis().scale(x).tickValues(tvals).tickFormat(monthDate).orient('bottom');
	var yAxis = d3.svg.axis().scale(y).ticks(7).tickFormat(dollar).tickSize(width).orient('right');

	var xLine = svg
				.append('g')
				.attr('class', 'x axis')
				.call(xAxis)
				.attr('transform', 'translate(0 ,'+ y(0) +')');
				

	var yLine = svg
				.append('g')
				.attr('class', 'y axis')
				.call(yAxis)
				.attr('transform', 'translate(25, 0)');

				yLine.selectAll("text")
		    	.attr("x", 4)
		    	.attr("dy", -4);


	var area = d3.svg.area()
				.interpolate("cardinal")
			    .x(function(d) { return x(d.date); })
			    .y0(y(0))
			    .y1(function(d) { return y(d.amt); });
	
		svg
			.append('g')
			.append('path')
			.datum(dataOb.spentFinal)
			.attr('class', 'down')
			.style('fill', '#ca0020')
			.attr('d', area)


		svg
			.append('g')
			.append('path')
			.datum(dataOb.raisedFinal)
			.attr('class', 'up')
			.style('fill', '#0571b0')
			.attr('d', area)

		svg
			.append('g')
			.append('path')
			.datum(dataOb.allTrans)
			.attr('class', 'balance')
			.style('fill', '#92c5de')
			.attr('d', area)
			
	//Stack experiment
	var stackOb = [
					{
						"name": "Raised",
						"value": dataOb.raisedFinal
					}, 
					{
						"name": "Spent",
						"value": dataOb.spentFinal
					}, 
					{
						"name": "Balance",
						"value": dataOb.spentFinal
					}

					]
	

	var stack =  d3.layout.stack()
					.offset("wiggle")
					.values(function(d) { return d.value; })
				    .x(function(d) { return d.date; })
				    .y(function(d) { return d.amt; });


	var color = d3.scale.linear()
    .range(["#aad", "#556"]);

    console.log(stackOb)

    svg
    .append('g')
    .selectAll("path")
    .data(stackOb)
  .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random()); });


				

	//Side content containers			

	var sumCtr = d3.select('#steam-ctr');
	var sumCtrQ1 = d3.select('#steam-ctr .q1');
	var sumCtrQ2 = d3.select('#steam-ctr .q2');
	var sumCtrQ3 = d3.select('#steam-ctr .q3');



	sumCtrQ3.style('height', '230px')

		sumCtrQ1
				.on('click', function(){
					var ob = this;
					slideboxToggle(sumCtr, ob);
				})

		sumCtrQ2
				.on('click', function(){		
					var ob = this;
					slideboxToggle(sumCtr, ob);			
				})

		sumCtrQ3
				.on('click', function(){
					var ob = this;
					slideboxToggle(sumCtr, ob);					
				})					
				

	var mnQ3 = sumCtrQ3.select('.slide-content')
			.datum(sumBalance[2])
			.append('p');

	var mnQ2 = sumCtrQ2.select('.slide-content')
			.datum(sumBalance[1])
			.append('p');

	var mnQ1 = sumCtrQ1.select('.slide-content')
			.datum(sumBalance[0])
			.append('p');

	function writeData(ob){

			ob
			.append('span')
			.html(function(d){
				return 'Raised : '+ dollar(Math.round(d.line_12 + d.line_13 + d.line_14)) + "<br>";
			})

			ob
			.append('span')
			.html(function(d){
				return 'Spent : '+ dollar(Math.round(d.line_15)) + "<br>";
			})

			ob
			.append('span')
			.html(function(d){
				return 'Remaining : '+ dollar(Math.round(d.line_16));
			})

	}

	writeData(mnQ1);
	writeData(mnQ2);
	writeData(mnQ3);





}





function summaryViz (element, data) {

	var timeDomain = [ timeformat('2013-01-01T00:00:00'), timeformat('2014-06-31T00:00:00')];
	var tvals = [ timeformat('2013-01-01T00:00:00'), timeformat('2013-07-01T00:00:00'), timeformat('2014-01-01T00:00:00'), timeformat('2014-06-31T00:00:00')];

	var moneyDomain = [400000, -70000];

	var summary = element.select('#summary');

	var width = $('#summary').width() -40;
	var height = $('#summary').height() -40;

	var svg = summary.append('svg')
						.attr('width', width)
						.attr('height', height)
						.append('g')
						.attr('transform', 'translate(0, 30)');

	var x = d3.time.scale().range([20, width]).domain(timeDomain);
			var y = d3.scale.linear().range([20, height]).domain(moneyDomain);

			var xAxis = d3.svg.axis().scale(x).tickValues(tvals).tickFormat(monthDate).orient('bottom');
			var yAxis = d3.svg.axis().scale(y).ticks(7).tickFormat(dollar).tickSize(width).orient('right');

			var xLine = svg
						.append('g')
						.attr('class', 'x axis')
						.call(xAxis)
						.attr('transform', 'translate(0 ,'+ y(0) +')');
						

			var yLine = svg
						.append('g')
						.attr('class', 'y axis')
						.call(yAxis)
						.attr('transform', 'translate(25, 0)');

						yLine.selectAll("text")
				    	.attr("x", 4)
				    	.attr("dy", -4);


			var area = d3.svg.area()
					    .x(function(d) { return x(d.date); })
					    .y0(y(0))
					    .y1(function(d) { return y(d.amt); });



			var balance = svg
							.selectAll('.balance')
							.data(data)
							.enter()
							.append('g')
							.attr('class', 'balance');

			var sumCtr = d3.select('#summary-ctr');
			var sumCtrQ1 = d3.select('#summary-ctr .q1');
			var sumCtrQ2 = d3.select('#summary-ctr .q2');
			var sumCtrQ3 = d3.select('#summary-ctr .q3');



			sumCtrQ3.style('height', '230px')

				sumCtrQ1
						.on('click', function(){
							var ob = this;
							slideboxToggle(sumCtr, ob);
						})

				sumCtrQ2
						.on('click', function(){		
							var ob = this;
							slideboxToggle(sumCtr, ob);			
						})

				sumCtrQ3
						.on('click', function(){
							var ob = this;
							slideboxToggle(sumCtr, ob);					
						})					
						

			var mnQ3 = sumCtrQ3.select('.slide-content')
					.datum(data[2])
					.append('p');

			var mnQ2 = sumCtrQ2.select('.slide-content')
					.datum(data[1])
					.append('p');

			var mnQ1 = sumCtrQ1.select('.slide-content')
					.datum(data[0])
					.append('p');

			function writeData(ob){

					ob
					.append('span')
					.html(function(d){
						return 'Raised : '+ dollar(Math.round(d.line_12 + d.line_13 + d.line_14)) + "<br>";
					})

					ob
					.append('span')
					.html(function(d){
						return 'Spent : '+ dollar(Math.round(d.line_15)) + "<br>";
					})

					ob
					.append('span')
					.html(function(d){
						return 'Remaining : '+ dollar(Math.round(d.line_16));
					})

			}

			writeData(mnQ1);
			writeData(mnQ2);
			writeData(mnQ3);

		
			balance.each(function(d, i) {
				var x2 = d3.scale.ordinal().domain(['up', 'down']);
				var ob = this;
				var startdate = timeformat(d.dates[0])
				var enddate = timeformat(d.dates[1])
				var g_W = (x(enddate) - x(startdate))/2

				x2.rangeRoundBands([x(startdate), x(enddate)])
				
				var up  = d3.select(ob)
							.append('rect')
							.attr('class', 'up')
							.attr('width', g_W)
							.attr('x', x2('up'))
							.attr('y', function (d) {
								return y(d.line_12 + d.line_13 +d.line_14);
							})
							//.attr('height', 0)
							//.transition()
							//.duration(300)
							.attr('height', function (d) {
								return y(0) -y(d.line_12 + d.line_13 +d.line_14);
							})
							
							

				var down = d3.select(ob)
							.append('rect')
							.attr('class', 'down')
							.attr('width', g_W)
							.attr('x', x2('down'))
							.attr('y', function (d) {
								return y(0);
							})
							//.attr('height', 0)
							//.transition()
							//.duration(300)
							.attr('height', function (d) {
								return y(0) -y(d.line_15);
							})
						
				});

			


				d3.selectAll('.balance')
							.each(function(){
								var ob = d3.select(this);
								var arD = ob.datum();
								var nD = [{date:timeformat(arD.dates[0]), amt: arD.line_12 },
					      				{date:timeformat(arD.dates[1]), amt: arD.line_16 }];

								ob
								.append("path")
								.datum(nD)
					      		.attr("class", "area")
					      		.attr("d", area);
							});
					






	
	}