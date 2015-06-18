var D3Tut = D3Tut || {};

D3Tut.init = function ()
{
	var canvas = d3.select("body").append("svg")
		.attr("width", 500)
		.attr("height", 500)
		.append("g")
			.attr("transform", "translate(60,60)");

	var tree = d3.layout.tree()
		.size([400, 400]);

	d3.json("json/TreeData.json", function (data)
	{
		var nodes = tree.nodes(data);//nodes runs the tree layout and returns all the objects in the data
		var links = tree.links(nodes);//path between each node

		//create a group element that holds nodes together
		var node = canvas.selectAll(".node")
			.data(nodes)
			.enter()
			.append("g")
				.attr("class", "node")
				.attr("transform", function (d)
				{
					return "translate(" + d.y + ", " + d.x + ")";
				});

		node.append("circle")
			.attr("r", 5)
			.attr("fill", "steelblue");

		node.append("text")
			.text(function (d)
			{
				return d.name;
			})

		var diagonal = d3.svg.diagonal()
			.projection(function (d)
			{
				return [d.y, d.x];
			});

		//attach the paths between nodes
		canvas.selectAll(".link")
			.data(links)
			.enter()
			.append("path")
				.attr("class", "link")
				.attr("fill", "none")
				.attr("stroke", "#323232")
				.attr("d", diagonal);
	})

	/*var diagonal = d3.svg.diagonal()
		.source({x: 10, y: 10})
		.target({x: 300, y: 500});

	canvas.append("path")
		.attr("fill", "none")
		.attr("stroke", "black")
		.attr("d", diagonal);*/
}