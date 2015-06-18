(function (Directives, undefined)
{
    D3Test.Modules.D3Test.directive('coordinate', [function ()
    {
        return {
            link: function (scope, elem, attrs)
            {
                var circle;
                var margin 		    = {top: 20, right: 20, bottom: 20, left: 20},
                    padding 		= {top: 60, right: 60, bottom: 60, left: 60},
                    outerWidth 		= 960,
                    outerHeight 	= 960,
                    innerWidth 		= outerWidth - margin.left - margin.right,
                    innerHeight 	= outerHeight - margin.top - margin.bottom,
                    width 			= innerWidth - padding.left - padding.right,
                    height 			= innerHeight - padding.top - padding.bottom;
                
                var vis = d3.select('.drawingContainer').append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .on("mousedown", mousedown)
                    .on("mouseup", mouseup);

                function mousedown()
                {
                    var m = d3.mouse(this);
                    /*line = vis.append("line")
                        .attr("x1", m[0])
                        .attr("x2", m[1])
                        .attr("y1", m[0])
                        .attr("y2", m[1]);*/
                    
                    circle = vis.append("circle")
                        .attr("cx", m[0])
                        .attr("cy", m[1])
                        .attr("r", 200);


                    vis.on("mousemove", mousemove);
                }

                function mousemove()
                {
                    var m = d3.mouse(this);
                    circle.attr("cx", m[0])
                        .attr("cy", m[1]);
                }

                function mouseup()
                {
                    vis.on("mousemove", null);
                }
                
                /*var chart = c3.generate({
                    data: {
                        columns: [
                            ["points", 30, 200, 100, 400, 150, 250, 120, 200]
                        ]
                    },
                    grid: {
                        x: {
                            show: true
                        },
                        y: {
                            show: true
                        }
                    }
                });*/
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
