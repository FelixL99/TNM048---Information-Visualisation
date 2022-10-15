// Stacked Bar Chart
function drawBar(avrBudget, avrRevenue, avrRating, avrRuntime) {

	var bc = d3.select('#barchart')

	var margin = { top: 50, right: 50, bottom: 50, left: 75 }
	//var h = 600 - margin.top - margin.bottom
	//var w = 1200 - margin.left - margin.right
	var h = 400 - margin.top - margin.bottom
	var w = 1150 - margin.left - margin.right

	var svg = bc.append('svg')
		.attr('height', h + margin.top + margin.bottom)
		.attr('width', w + margin.left + margin.right)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	var tooltip = d3.select("#barchart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "2px")
	.style("height", "auto")
	.style("width", "auto")

	// Subgroups / genres for the stacked barchart
	var subgroups = ["Action", "Adventure", "Comedy", "Crime", "Drama", "Family",
		"Fantasy", "Horror", "Mystery", "Romance", "ScienceFiction", "Thriller", "Other"];

	// Groups / all the years for the xAxis
	var groups = d3.map(avrBudget, function (d) { return d.year }).keys();

	var maxYaxis = d3.max(avrBudget, function (d) {return (d.Action + d.Adventure + d.Comedy + d.Crime + d.Drama + 
	d.Family + d.Fantasy + d.Horror + d.Mystery + d.Romance + d.ScienceFiction + d.Thriller + d.Other); })
	

	// Add X axis
	var x = d3.scaleBand()
		.domain(groups)
		.range([0, w])
		.padding([0.2])
	svg.append("g")
		.attr("transform", "translate(0," + h + ")")
		.call(d3.axisBottom(x).tickValues(x.domain().filter(function (d, i) { return !(i % 10 -4) })));

	// Add Y axis
	var y = d3.scaleLinear()
		.domain([0, maxYaxis])
		.range([h, 0]);
	svg.append("g")
		.call(d3.axisLeft(y));

	// Color palette, one color per subgroup
	var colors = ["#4081ec", "#b3f650", "#8731c2", "#3bb502", "#f82387", "#36edd3", "#31120d", "#b6ecf5", "#122b17", "#f7b5be", "#2b1267", "#f2e576", "#c0c0c0"];

	// Connect color to subgroup
	var color = d3.scaleOrdinal()
		.domain(subgroups)
		.range(colors)

	// Stack the data
	var stackedData = d3.stack()
		.keys(subgroups)
		(avrBudget)

	var mouseover = function(d){
		var subgroupName = d3.select(this.parentNode).datum().key;
		var subgroupValue = d.data[subgroupName];

	tooltip
		.html("Genre: " + subgroupName + "<br>" + "Value: " + subgroupValue + "<br>" + "Year: " + d.data.year)
		.style("opacity", 1)
	}
	var mousemove = function(d){
		tooltip
			//.style("width", "100px")
			.style("left", (d3.mouse(this)[0] + 450) + "px")
			.style("top", (d3.mouse(this)[1] + 560) + "px")
	}
	var mouseleave = function(d) {
		tooltip
		  .style("opacity", 0)
	}


		// Show the bars
	svg.append("g")
		.selectAll("g")
		// Enter in the stack data = loop key per key = group per group
		.data(stackedData)
		.enter().append("g")
		.attr("fill", function (d) { return color(d.key); })
		.selectAll("rect")
		// Enter a second time, loop subgroup per subgroup to add all rectangles
		.data(function (d) { return d; })
		.enter().append("rect")
		.attr("x", function (d) { return x(d.data.year); })
		.attr("y", function (d) { return y(d[1]); })
		.attr("height", function (d) { return y(d[0]) - y(d[1]); })
		.attr("width", x.bandwidth())
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave)


	this.changeY = function (valueY) {
		var data;
		if (valueY == "budget") {data = avrBudget}
		else if (valueY == "revenue") {data = avrRevenue}
		else if (valueY == "vote_average") {data = avrRating}
		else {data = avrRuntime}
		
		if (valueY != "release_date") {
			
			svg.selectAll("g").remove();
			
			maxYaxis = d3.max(data, function (d) {return (d.Action + d.Adventure + d.Comedy + d.Crime + 
			d.Drama + d.Family + d.Fantasy + d.Horror + d.Mystery + 
			d.Romance + d.ScienceFiction + d.Thriller + d.Other); })
			
			
			svg.append("g")
			.attr("transform", "translate(0," + h + ")")
			.call(d3.axisBottom(x).tickValues(x.domain().filter(function (d, i) { return !(i % 10 -4) })));
			
			y
			.domain([0, maxYaxis])
			.range([h, 0]);
			svg.append("g")
			.transition().duration(1000)
			.call(d3.axisLeft(y));

		var stackedData = d3.stack()
		.keys(subgroups)
		(data)
			
		var rects = svg.append("g")
			.selectAll("g")
			// Enter in the stack data = loop key per key = group per group
			.data(stackedData)
			.enter().append("g")
			.attr("fill", function (d) { return color(d.key); })
			.selectAll("rect")
			// Enter a second time, loop subgroup per subgroup to add all rectangles
			.data(function (d) { return d; })
			.enter().append("rect")
			.attr("x", function (d) { return x(d.data.year); })
			.attr("y", function (d) { return y(d[1]); })
			.attr("height", function (d) { return y(d[0]) - y(d[1]); })
			.attr("width", x.bandwidth())
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave)

		}
	}
	
}

