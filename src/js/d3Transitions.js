var D3Tut = D3Tut || {};

D3Tut.init = function ()
{
	/** arrays **/
	var data = [10, 20, 30, 40, 50];
	console.log(d3.min(data));
	console.log(d3.max(data));
	console.log(d3.sum(data));
	console.log(d3.mean(data));
	console.log(d3.shuffle(data));
	console.log(d3);
	console.log(d3.extent(data));
	/*var canvas =
		d3.select("body")
		.append("svg")
		.attr("width", 500)
		.attr("height", 500)

	var circle = canvas.append("circle")
		.attr("cx", 50)
		.attr("cy", 50)
		.attr("r", 25);

	circle.transition()
		.duration(1500)
		.delay(1000)
		.attr("cx", 150)
		.transition()
			.attr("cy", 200)
			.transition()
				.attr("cx", 50);
		.each("start", function ()
		{
			d3.select(this)
				.attr("fill", "#d81e05")
		})*/
};