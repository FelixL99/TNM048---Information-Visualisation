//We first have to create a dataset for the circules with some information
//Maybe use this website for colorpicker? https://medialab.github.io/iwanthue/

var colors = ["#4081ec", "#b3f650", "#8731c2", "#3bb502", "#f82387", "#36edd3", "#31120d", "#b6ecf5", "#122b17", "#f7b5be", "#2b1267", "#f2e576", "#c0c0c0"];

var circleData = [
    { "cx": 30, "cy": 20, "radius": 8, "color": colors[0], "text": "Action" },
    { "cx": 30, "cy": 40, "radius": 8, "color": colors[1], "text": "Adventure" },
    { "cx": 30, "cy": 60, "radius": 8, "color": colors[2], "text": "Comedy" },
    { "cx": 30, "cy": 80, "radius": 8, "color": colors[3], "text": "Crime" },
    { "cx": 30, "cy": 100, "radius": 8, "color": colors[4], "text": "Drama" },
    { "cx": 30, "cy": 120, "radius": 8, "color": colors[5], "text": "Family" },
    { "cx": 30, "cy": 140, "radius": 8, "color": colors[6], "text": "Fantasy" },
    { "cx": 30, "cy": 160, "radius": 8, "color": colors[7], "text": "Horror" },
    { "cx": 30, "cy": 180, "radius": 8, "color": colors[8], "text": "Mystery" },
    { "cx": 30, "cy": 200, "radius": 8, "color": colors[9], "text": "Romance" },
    { "cx": 30, "cy": 220, "radius": 8, "color": colors[10], "text": "Science Fiction" },
    { "cx": 30, "cy": 240, "radius": 8, "color": colors[11], "text": "Thriller" },
	{ "cx": 30, "cy": 260, "radius": 8, "color": colors[12], "text": "Other" }
];

//Then get width and height of the parent
var width = $("#color-info").parent().width();
var height = $("#color-info").parent().height() - 30;

//Then we create the SVG Viewport
var svgContainer = d3.select("#color-info")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

//After we add circles to the svgContainer
var circles = svgContainer.selectAll("circle")
    .data(circleData)
    .enter()
    .append("circle");

//And some circle attributes
var circleAttributes = circles
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d) { return d.color; });

//Also adding some text to the svgContainer
var text = svgContainer.selectAll("text")
    .data(circleData)
    .enter()
    .append("text");

//And lastly adding the SVG Text Element Attributes
var textLabels = text
    .attr("x", function (d) { return d.cx + 30; })
    .attr("y", function (d) { return d.cy + 3; })
    .text(function (d) { return d.text; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", "black");
