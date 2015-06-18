var D3Tut = D3Tut || {};

D3Tut.init = function ()
{
	d3.json("json/data.json", function (data)
	{
		var canvas = 
			d3.select("body").append("svg")
			.attr("width", 500)
			.attr("height", 500)

		canvas.selectAll("rect")
			.data(data)
			.enter()
				.append("rect")
				.attr("width", function (d)
				{
					return d.age * 10;
				})
				.attr("height", 40)
				.attr("y", function (d, i)
				{
					return i * 50;
				})
				.attr("fill", "#3044b5")

		canvas.selectAll("text")
			.data(data)
			.enter()
				.append("text")
				.attr("fill", "#f3f4f5")
				.attr("y", function (d,i)
				{
					return i * 50 + 24;
				})
				.attr("x", 10)
				.text(function (d)
				{
					return d.name;
				})

	})
}