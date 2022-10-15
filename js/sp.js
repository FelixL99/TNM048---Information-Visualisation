// Scatter Plot
function drawScatter(data) {

	///////////////////////////////////////////
	// SELECT OPTION FOR INTERCHANGABLE AXIS //
	///////////////////////////////////////////


	var sp = d3.select('#scatterplot')

	// Create the different axis parameters
	var selectData = [{ "option": "release_date", "text": "Choose Axis Attribute" },
	{ "option": "release_date", "text": "Release Date" },
	{ "option": "runtime", "text": "Runtime" },
	{ "option": "budget", "text": "Budget" },
	{ "option": "revenue", "text": "Revenue" },
	{ "option": "vote_average", "text": "Average Rating" }]

	// Select X-axis Variable, calls for function xChange
	var span = sp.append('span')
		.text('Select X-Axis Attribute: ')
	var yInput = sp.append('select')
		.attr('id', 'xSelect')
		.on('change', xChange)
		.selectAll('option')
		.data(selectData)
		.enter()
		.append('option')
		.attr('value', function (d) { return d.option })
		.text(function (d) { return d.text; })
		sp.append("span")
		.text(" (Scatterplot only)")
	sp.append('br')

	// Select Y-axis Variable, calls for function yChange
	var span = sp.append('span')
		.text('Select Y-Axis Attribute: ')
	var yInput = sp.append('select')
		.attr('id', 'ySelect')
		.on('change', yChange)
		.selectAll('option')
		.data(selectData)
		.enter()
		.append('option')
		.attr('value', function (d) { return d.option })
		.text(function (d) { return d.text; })
		sp.append("span")
		.text(" (Scatterplot & Barchart)")
	sp.append('br')

	var span = sp.append("span")
		.text("Brush to zoom in, double click to zoom out")
	sp.append("br")

	//////////////////
	// SCATTER PLOT //
	//////////////////


	// Variables
	var sp = d3.select('#scatterplot')
	var margin = { top: 50, right: 50, bottom: 50, left: 75 }
	var h = 400 - margin.top - margin.bottom
	var w = 1500 - margin.left - margin.right

	var valueX = "release_date";
	var valueY = "budget";

	var brush = d3.brush().on("end", brushended);
	var idleTimeout;
	var idleDelay = 350;

	// Parse date
	var parseDate = d3.timeParse("%Y-%m-%d");

	// Crate scales
	var maxxAxis = d3.max(data, function (d) { return parseDate(d.release_date); });
	var minxAxis = d3.min(data, function (d) { return parseDate(d.release_date); });
	var maxyAxis = d3.max(data, function (d) { return parseInt(d.budget); });
	var minyAxis = 0;

	maxxAxis = new Date(maxxAxis.getTime() + 300 * 144000000);
	maxyAxis = maxyAxis + maxyAxis * 0.05;

	var xScale = d3.scaleTime()
		.domain([minxAxis, maxxAxis])
		.range([0, w])
	var yScale = d3.scaleLinear()
		.domain([minyAxis, maxyAxis])
		.range([h, 0])

	// SVG tag
	var svg = sp.append('svg')
		.attr('height', h + margin.top + margin.bottom)
		.attr('width', w + margin.left + margin.right)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	// Set area to restrict points from going outside axis
	svg.append("defs").append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", w)
		.attr("height", h);

	// X-Axis
	var xAxis = d3.axisBottom()
		.scale(xScale)

	// Y-axis
	var yAxis = d3.axisLeft()
		.scale(yScale)

	// Add brush
	svg.append("g")
		.attr("class", "brush")
		.call(brush);

	// X-Axis
	svg.append('g')
		.attr('class', 'axis')
		.attr('id', 'xAxis')
		.attr('transform', 'translate(0,' + h + ')')
		.call(xAxis)

	// Y-axis
	svg.append('g')
		.attr('class', 'axis')
		.attr('id', 'yAxis')
		.call(yAxis)

	// Set clipping box
	var canvas = svg.append("g");
	canvas.attr("clip-path", "url(#clip)");

	var genres = [
		"Action", "Adventure","Comedy", "Crime",
		"Drama", "Family", "Fantasy", "Horror",
		"Mystery", "Romance", "Science Fiction", "Thriller"];

	var colors = ["#4081ec", "#b3f650", "#8731c2", "#3bb502", 
				"#f82387", "#36edd3", "#31120d", "#b6ecf5", 
				"#122b17", "#f7b5be", "#2b1267", "#f2e576"];

		//["#c69a4c", "#6e41c3", "#73b94d", "#ca4dbf", "#567d4a", "#cb466f",
		// "#55a5b5", "#d35233", "#727ac8", "#814831", "#633667", "#cb8baf"]

	// Circles
	var circles = canvas.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function (d) { return xScale(parseDate(d.release_date)) })
		.attr('cy', function (d) { return yScale(parseInt(d.budget)) })
		.attr('r', 3)
		// Genre colors
		.attr('fill', function (d) {
			if (d.genres == genres[0]) return colors[0];
			else if (d.genres == genres[1]) return colors[1];
			else if (d.genres == genres[2]) return colors[2];
			else if (d.genres == genres[3]) return colors[3];
			else if (d.genres == genres[4]) return colors[4];
			else if (d.genres == genres[5]) return colors[5];
			else if (d.genres == genres[6]) return colors[6];
			else if (d.genres == genres[7]) return colors[7];
			else if (d.genres == genres[8]) return colors[8];
			else if (d.genres == genres[9]) return colors[9];
			else if (d.genres == genres[10]) return colors[10];
			else if (d.genres == genres[11]) return colors[11];
			else return "#c0c0c0";

		})

	// Call mouseOver and mouseOut functions
	mouseOver(circles);
	mouseOut(circles);

	// Function xChange, changes X-Axis if attribute changed
	function xChange() {
		// Get the new attribute
		var parseDate = d3.timeParse("%Y-%m-%d");
		valueX = this.value;

		// Chage axis parameters, different cases for dates and none dates
		if (valueX == "release_date") {
			maxxAxis = d3.max(data, function (d) { return parseDate(d[valueX]); });
			maxxAxis = new Date(maxxAxis.getTime() + 300 * 144000000);
			minxAxis = d3.min(data, function (d) { return parseDate(d[valueX]); });
			xScale = d3.scaleTime()
				.domain([minxAxis, maxxAxis])
				.range([0, w])
		}
		else {
			maxxAxis = d3.max(data, function (d) { return parseFloat(d[valueX]); });
			maxxAxis = maxxAxis + maxxAxis * 0.05;
			minxAxis = 0;
			xScale = d3.scaleLinear()
				.domain([minxAxis, maxxAxis])
				.range([0, w])
		}

		// Change the xScale
		xAxis.scale(xScale)

		// Redraw xAxis
		d3.select('#xAxis')
			.transition().duration(1000)
			.call(xAxis)

		// Move circles
		d3.select("#scatterplot")
			.selectAll('circle')
			.transition().duration(10)
			.delay(function (d, i) { return i / 5 })
			.attr('cx',
				function (d) {
					if (valueX == "release_date") { return xScale(parseDate(d[valueX])) }
					else { return xScale(parseFloat(d[valueX])) }
				})
	}

	// Function yChange, changes Y-Axis if attribute changed
	function yChange() {
		// Get the new attribute
		var parseDate = d3.timeParse("%Y-%m-%d");
		valueY = this.value

		bar.changeY(valueY);

		// Chage axis parameters, different cases for dates and none dates
		if (valueY == "release_date") {
			maxyAxis = d3.max(data, function (d) { return parseDate(d[valueY]); });
			maxyAxis = new Date(maxxAxis.getTime() + 300 * 144000000);
			minyAxis = d3.min(data, function (d) { return parseDate(d[valueY]); });
			yScale = d3.scaleTime()
				.domain([minyAxis, maxyAxis])
				.range([h, 0])
		}
		else {
			maxyAxis = d3.max(data, function (d) { return parseFloat(d[valueY]); });
			maxyAxis = maxyAxis + maxyAxis * 0.05;
			minyAxis = 0;
			yScale = d3.scaleLinear()
				.domain([minyAxis, maxyAxis])
				.range([h, 0])
		}

		// Change the yScale
		yAxis.scale(yScale)

		// Redraw yAxis
		d3.select('#yAxis')
			.transition().duration(1000)
			.call(yAxis)

		// Move circles
		d3.select("#scatterplot")
			.selectAll('circle')
			.transition().duration(10)
			.delay(function (d, i) { return i / 5 })
			.attr('cy',
				function (d) {
					if (valueY == "release_date") { return yScale(parseDate(d[valueY])) }
					else { return yScale(parseFloat(d[valueY])) }
				})
	}

	// Function mouseOver, highlights and shows details about moused over circle
	function mouseOver(circles) {
		circles
			.on("mouseover", function (d) {

				// Show detailed information about certain point when hovering
				var details = d3.select("#details")
				details
					.select("#title")
					.text("Movie Title: " + d.title)

				details
					.select("#releasedate")
					.text("Release Date: " + d.release_date)

				details
					.select("#genre")
					.text("Genre: " + d.genres)
				/*
								details
									.select("#overview")
									.text("Overview: " + d.overview)
				*/

				if (d.runtime == 0) {
					details
						.select("#runtime")
						.text("Runtime: No entry")
				} else {
					details
						.select("#runtime")
						.text("Runtime: " + d.runtime + " min")
				}

				details
					.select("#language")
					.text("Original Language: " + d.original_language.toUpperCase())

				if (d.budget == 0) {
					details
						.select("#budget")
						.text("Budget: No entry")
				} else {
					details
						.select("#budget")
						.text("Budget: " + d.budget)
				}

				if (d.revenue == 0) {
					details
						.select("#revenue")
						.text("Revenue: No entry")
				} else {
					details
						.select("#revenue")
						.text("Revenue: " + d.revenue)
				}


				if (d.vote_average == 0) {
					details
						.select("#voteavr")
						.text("Average Rating: No entry")
				} else {
					details
						.select("#voteavr")
						.text("Average Rating: " + d.vote_average + "/10.0")
				}

				// Rescale the dots onhover
				d3.select(this).attr('r', 10)



				//LINKAR MED ANDRA PLOTS ÄNDRA HÄR SENARE. TROR VI KAN ANVÄNDA ID I DATABASEN FÖR DETTA.
				//curent_id = d3.select(this)._groups[0][0].__data__.id.toString()
				//d3.selectAll(".mapcircle")
				//    .filter(function (d) { return d.id === curent_id; })
				//    .attr('r', 15)

			});

	}

	// Function mouseOut, deselects the hightlighted circle if mouse is moved off
	function mouseOut(circles) {
		circles
			.on("mouseout", function (d) {

				// Returning to original characteristics
				d3.select(this)
					.transition()
					.duration(500)
					.attr("r", 3)

				/*TILL SENARE NÄR VI IMPLEMENTERAT LINKING
			//Reset all the dots on the map
			d3.selectAll(".mapcircle")
				.filter(function (d) { return d.id === curent_id; })
				.transition()
				.duration(500)
				.attr("r", function (d) {
					if (d.properties.DEATHS == null) {
						return 3
					}
					else {
						return scaleQuantRad(d.properties.DEATHS);
					}
				})*/
			});
	}

	// Function brushended, changes scales on axis with brush
	function brushended() {
		var s = d3.event.selection;
		if (!s) {
			if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
			xScale.domain([minxAxis, maxxAxis]);
			yScale.domain([minyAxis, maxyAxis]);
		} else {
			xScale.domain([s[0][0], s[1][0]].map(xScale.invert, xScale));
			yScale.domain([s[1][1], s[0][1]].map(yScale.invert, yScale));
			svg.select(".brush").call(brush.move, null);
		}
		zoom();
	}

	function idled() {
		idleTimeout = null;
	}

	// Function zoom, takes the variables changed in brushended and changes the axes visually, takes in to account what attributes are used for the two axis
	function zoom() {
		var t = svg.transition().duration(750);
		svg.select("#xAxis").transition(t).call(xAxis);
		svg.select("#yAxis").transition(t).call(yAxis);
		svg.selectAll("circle").transition(t)
			.attr("r", 3)
			.attr('cx',
				function (d) {
					if (valueX == "release_date") { return xScale(parseDate(d[valueX])) }
					else { return xScale(parseFloat(d[valueX])) }
				})
			.attr('cy',
				function (d) {
					if (valueY == "release_date") { return yScale(parseDate(d[valueY])) }
					else { return yScale(parseFloat(d[valueY])) }
				})
	}
}