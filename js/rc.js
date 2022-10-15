// Radar Chart
// Guide: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
function drawRadar(data) {

    // Radius of graph
    var radius = 175;

    var svg = d3.select("#radarchart")
        .append("svg")
        .attr("width", radius * 2)
        .attr("height", radius * 2);

    //var maxAxis = parseFloat(d3.max(data, function (d) { return d.avrRating; }));
    //var minAxis = parseFloat(d3.min(data, function (d) { return d.avrRating; }));

    //maxAxis = Math.round(maxAxis/10)*10;
    //minAxis = Math.round(minAxis/10)*10;

    //console.log(maxAxis)
    //console.log(data[0].avrRating)

    maxAxis = 150000000;

    // Set radial size
    var radialScale = d3.scaleLinear()
        .domain([0, maxAxis]) // works when [0,10]
        .range([0, radius - 40]); //radius of actual Chart 

    var ticks = [50000000, 100000000, 150000000];

    // Draw radar circles
    ticks.forEach(t =>
        svg.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("r", radialScale(t))
    );

    // Draw radar numbers
    ticks.forEach(t =>
        svg.append("text")
            .attr("x", radius - 28)
            .attr("y", radius - radialScale(t) - 2)
            .text((t / 1000000).toString() + " Mil")
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
    );
    // Convert angle to coordinate function
    function angleToCoordinate(angle, value) {
        var x = Math.cos(angle) * radialScale(value);
        var y = Math.sin(angle) * radialScale(value);
        return { x: radius + x, y: radius - y };
    }

    // Draw origo lines (and genre names)
    for (var i = 0; i < data.length; i++) {
        var genre_name = data[i].genre;
        var angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
        var line_coordinate = angleToCoordinate(angle, (maxAxis));
        var label_coordinate = angleToCoordinate(angle, (maxAxis)+ maxAxis/6);

        // Draw axis line
        svg.append("line")
            .attr("x1", radius)
            .attr("y1", radius)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .attr("stroke", "black");
        // Draw axis label
        svg.append("text")
            .attr("x", label_coordinate.x)
            .attr("y", label_coordinate.y)
            .text(genre_name)
            .attr("font-family", "sans-serif")
            .style("text-anchor", "middle")
            .attr("font-size", "9px");
    }


    // The attributes shown in the graph
    types = ["avrBudget", "avrRevenue"];

    function getPathCoordinates(data_type) {
        var coordinates = [];
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i][data_type]);
            var genre_name = data[i].genre;
            var angle = (Math.PI / 2) + (2 * Math.PI * i / data.length);
            coordinates.push(angleToCoordinate(angle, data[i][data_type]));
        }
        return coordinates;
    }

    // Define line coordinates
    var line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    
    var colors = ["red", "blue"];


    // Draw data
    for (var i = 0; i < types.length; i++) {
        var color = colors[i];
        var coordinates = getPathCoordinates(types[i]);
        // Draw the path element
        svg.append("path")
            .datum(coordinates)
            .attr("d", line)
            .attr("stroke-width", 3)
            .attr("stroke", color)
            .attr("fill", color)
            .attr("stroke-opacity", 1)
            .attr("fill-opacity", 0.2);
    }

    

    ////////////////////////////
    // LEGEND FOR RADAR CHART //
    ////////////////////////////


    // Information for radar chart legend
    var legend = [
        { "cx": 30, "cy": 15, "radius": 5, "color": "red", "text": "Average Budget" },
        { "cx": 30, "cy": 30, "radius": 5, "color": "blue", "text": "Average Revenue" }
    ];

    // Create the SVG Viewport
    var svg = d3.select("#radarchartlegend")
        .append("svg")

    // Add circles to the svgContainer
    var circles = svg.selectAll("circle")
        .data(legend)
        .enter()
        .append("circle");

    // Circle attributes
    var circleAttributes = circles
        .attr("cx", function (d) { return d.cx; })
        .attr("cy", function (d) { return d.cy; })
        .attr("r", function (d) { return d.radius; })
        .style("fill", function (d) { return d.color; });

    // Add some text to the svgContainer
    var text = svg.selectAll("text")
        .data(legend)
        .enter()
        .append("text");

    // Add the SVG Text Element Attributes
    var textLabels = text
        .attr("x", function (d) { return d.cx + 30; })
        .attr("y", function (d) { return d.cy + 3; })
        .text(function (d) { return d.text; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black");

}