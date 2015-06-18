var D3Tut = D3Tut || {};

D3Tut.init = function ()
{
	//data to visualize
	var dataArray 		= [20, 40, 50, 60];
	var width 			= 500;
	var height 			= 500;

	var widthScale 		= d3.scale.linear()
							.domain([0, 60])
							.range([0, width]);

	var color 			= d3.scale.linear()
							.domain([0, 60])
							.range(["#d81305", "#3044b5"]);

	//add an axis
	var axis 
		= d3.svg.axis()
		.ticks(5)
		.scale(widthScale);

	//create canvas
	var canvas = 
		d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(20, 0)");

	//MAKE A bar chart, d is for the data array value for each, i is the id
	var bars = 
		canvas.selectAll("rect")
		.data(dataArray)
		.enter()
			.append("rect")
			.attr("width", function(d)
			{
				return widthScale(d);
			})
			.attr("height", 50)
			.attr("fill", function (d)
			{
				return color(d)
			})
			.attr("y", function (d, i)
			{
				return i * 100
			})

	//move the axis below the bars
	canvas.append("g")
		.attr("transform", "translate(0, 400)")
		.call(axis);


	/*
	var circle = canvas.append("circle")
					.attr("cx", 250)
					.attr("cy", 250)
					.attr("r", 50)
					.attr("fill", "#3044b5");

	var rect = 
		canvas.append("rect")
		.attr("width", 100)
		.attr("height", 50)

	var line =
		canvas.append("line")
		.attr("x1", 10)
		.attr("y1", 100)
		.attr("x2", 400)
		.attr("y2", 400)
		.attr("stroke", "#d01833")
		.attr("stroke-width", "10");*/

}