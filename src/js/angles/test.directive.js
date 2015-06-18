(function (Directives, undefined)
{
	D3Test.Modules.D3Test.directive("test", [ function ()
	{
		return {
			restrict: 'E',
			link: function (scope, elm, attrs)
			{

                var data = [
                    { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
                ];

                var color = d3.scale.category10(),
                    margin = {top: 50, right: 20, bottom: 30, left: 40},
                    width = 960 - margin.left - margin.right,
                    height = 500 - margin.top - margin.bottom;

                var svg = d3.select('.testdiv').append('svg:svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom);


                var defs = svg.append('svg:defs');

                var paths = svg.append('svg:g')
                    .attr('id', 'markers')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                var marker = defs.selectAll('marker')
                    .data(data)
                    .enter()
                    .append('svg:marker')
                    .attr('id', 'marker_arrow')
                    .attr('markerHeight', 5)
                    .attr('markerWidth', 5)
                    .attr('markerUnits', 'strokeWidth')
                    .attr('orient', 'auto')
                    .attr('refX', 0)
                    .attr('refY', 0)
                    .attr('viewBox', '0 -5 10 10')
                    .append('svg:path')
                    .attr('d', 'M 0,0 m -5,-5 L 5,0 L -5,5 Z')
                    .attr('fill', '#000');

                var path = paths.selectAll('path')
                    .data(data)
                    .enter()
                    .append('svg:path')
                    .attr('d', function(d,i){ return 'M 0,' + (i * 100) + ' L ' + (width - margin.right) + ',' + (i * 100) + '' })
                    .attr('stroke', function(d,i) { return color(i)})
                    .attr('stroke-width', 5)
                    .attr('stroke-linecap', 'round')
                    .attr('marker-start', function(d,i){ return 'url(#marker_' + d.name + ')' })
                    .attr('marker-end', function(d,i){ return 'url(#marker_' + d.name  + ')' })

               /* var data = {
                    "name": "node"
                    , "children": [
                        {"name": "child1"}
                        , {"name": "child2"}
                        , {"name": "child3"}
                        , {"name": "child4"}
                    ]
                };

                var width = 1000,
                    height = 1000;

                var cluster = d3.layout.cluster()
                    .size([height, width - 160]);

                var diagonal = d3.svg.diagonal()
                    .projection(function(d) { return [d.y, d.x]; });

                var svg = d3.select(".testdiv").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(100,0)");

                svg.append("defs").append("marker")
                    .attr("id", "arrowhead")
                    .attr("refX", 6 + 3) *//*must be smarter way to calculate shift*//*
                    .attr("refY", 2)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 4)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M 0,0 V 4 L6,2 Z");

                var nodes = cluster.nodes(data);
                var links = cluster.links(nodes);

                var link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("marker-end", "url(#arrowhead)")
                    .attr("d", diagonal);

                var node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

                node.append("circle")
                    .attr("r", 4.5);

                node.append("text")
                    .attr("dx", function(d) { return d.children ? -8 : 8; })
                    .attr("dy", function(d) { return d.children ? -5 : 3; })
                    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
                    .text(function(d) { return d.name; });

                d3.select(self.frameElement).style("height", height + "px");*/


				/*// get the data
				d3.csv("force.csv", function(error, links) {

				var nodes = {};

				// Compute the distinct nodes from the links.
				links.forEach(function(link) {
				    link.source = nodes[link.source] || 
				        (nodes[link.source] = {name: link.source});
				    link.target = nodes[link.target] || 
				        (nodes[link.target] = {name: link.target});
				    link.value = +link.value;
				});

				var width = 960,
				    height = 500;

				var force = d3.layout.force()
				    .nodes(d3.values(nodes))
				    .links(links)
				    .size([width, height])
				    .linkDistance(60)
				    .charge(-300)
				    .on("tick", tick)
				    .start();

				var svg = d3.select(".testdiv").append("svg")
				    .attr("width", width)
				    .attr("height", height);

				// build the arrow.
				svg.append("svg:defs").selectAll("marker")
				    .data(["end"])      // Different link/path types can be defined here
				  .enter().append("svg:marker")    // This section adds in the arrows
				    .attr("viewBox", "0 -5 10 10")
				    .attr("refX", 15)
				    .attr("refY", -1.5)
				    .attr("markerWidth", 6)
				    .attr("markerHeight", 6)
				    .attr("orient", "auto")
				  .append("svg:path")
				    .attr("d", "M0,-5L10,0L0,5");

				// add the links and the arrows
				var path = svg.append("svg:g").selectAll("path")
				    .data(force.links())
				  .enter().append("svg:path")
				    .attr("class", function(d) { return "link " + d.type; })
				    .attr("class", "link")
				    .attr("marker-end", "url(#end)");

				// define the nodes
				var node = svg.selectAll(".node")
				    .data(force.nodes())
				  .enter().append("g")
				    .attr("class", "node")
				    .call(force.drag);

				// add the nodes
				node.append("circle")
				    .attr("r", 5);

				// add the text 
				node.append("text")
				    .attr("x", 12)
				    .attr("dy", ".35em")
				    .text(function(d) { return d.name; });

				// add the curvy lines
				function tick() {
				    path.attr("d", function(d) {
				        var dx = d.target.x - d.source.x,
				            dy = d.target.y - d.source.y,
				            dr = Math.sqrt(dx * dx + dy * dy);
				        return "M" + 
				            d.source.x + "," + 
				            d.source.y + "A" + 
				            dr + "," + dr + " 0 0,1 " + 
				            d.target.x + "," + 
				            d.target.y;
				    });

				    node
				        .attr("transform", function(d) { 
				  	    return "translate(" + d.x + "," + d.y + ")"; });
				}

				});*/
			}
		}
		
	}]);
}(D3Test.Directive = D3Test.Directives || {} ));