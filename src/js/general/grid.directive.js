(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:grid
     * @description
     *
     * Set up the grid of a page with x and y axis. This version of the grid is using quadrants. Should add a variable to pass in to the directive to determine what kind of grid.
     *@example
     <pre>
     <grid></grid>
     </pre>
    **/
    D3Test.Modules.D3Test.directive("grid", [function ()
    {
        return {
            restrict: 'AE',
            controller: 'GridCtrl',
            link: function (scope, elm, attrs)
            {
                scope.updateNav("graphs");
                var margin 		    = {top: 0, right: 0, bottom: 0, left: 0},
                    padding 		= {top: 0, right: 0, bottom: 0, left: 0},

                    outerWidth 		= scope.unitX,
                    outerHeight 	= scope.unitY,
                    innerWidth 		= outerWidth - margin.left - margin.right,
                    innerHeight 	= outerHeight - margin.top - margin.bottom,
                    width 			= innerWidth - padding.left - padding.right,
                    height 			= innerHeight - padding.top - padding.bottom,
                    circle,
                    line;

                var yaxiscoor = d3.range(25, height, 25);
                var xaxiscoor = d3.range(25, width, 25);

                var x = d3.scale.linear()
                    .domain([-width / 2, width / 2])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([-height / 2, height / 2])
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickSize(-height);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(5)
                    .tickSize(-width);

                var svg = d3.select('.d3Container')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .on("mousedown", mousedown)
                    .on("mouseup", mouseup);
                

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                function mousedown()
                {
                    var m = d3.mouse(this);
                    circle = svg.append("circle")
                        .attr("cx", m[0])
                        .attr("cy", m[1])
                        .attr("r", 10);
                    
                    scope.plottedAnswer = "" + Math.round(m[0] - (scope.unitX/2)) + " x " + Math.round(m[1] - (scope.unitY/2)) + "";
                    scope.$apply();

                    svg.on("mousemove", mousemove);
                }
                
                function mouseup()
                {
                    svg.on("mousemove", null);
                    scope.answerArray.push(scope.plottedAnswer);
                    scope.$apply();
                }
                
                function mousemove()
                {
                    var m = d3.mouse(this);
                    circle.attr("cx", m[0])
                        .attr("cy", m[1]);
                    scope.plottedAnswer = "" + Math.round(m[0] - (scope.unitX/2)) + " x " + Math.round(m[1] - (scope.unitY/2)) + "";
                    scope.$apply();
                }

                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:grid
                 * @name D3Test.grid:scpoe#resetGrid
                 * @description
                 *
                 * Remove all circles from the grid.
                 * Should be updated to remove all <g> tags from the grid.
                 */
                scope.resetGrid = function ()
                {
                    console.log('reset all');
                    svg.selectAll("circle").remove();
                };

                //draw graph
                svg.selectAll("line.vertical")
                    .data(xaxiscoor)
                    .enter().append("svg:line")
                    .attr("x1", function (d){
                        return d;
                    })
                    .attr("y1", 25)
                    .attr("x2", function (d)
                    {
                        return d;
                    })
                    .attr("y2", height-25)
                    .style("stroke", "#f3f4f5")
                    .style("stroke-width", 2);

                svg.selectAll("line.horizontal")
                    .data(yaxiscoor)
                    .enter().append("svg:line")
                    .attr("x1", 25)
                    .attr("y1", function (d)
                    {
                        return d;
                    })
                    .attr("x2", width-25)
                    .attr("y2", function (d)
                    {
                        return d;
                    })
                    .style("stroke", "#f3f4f5")
                    .style("stroke-width", 2);

                svg.selectAll("line.horizontal")
                    .data(yaxiscoor)
                    .enter()
                    .append("svg:line")
                    .attr("x1", scope.unitY/2)
                    .attr("y1",  25)
                    .attr("x2", scope.unitY/2)
                    .attr("y2", scope.unitY-25)
                    .style("stroke", "#d81e05")
                    .style("stroke-width", 5);


                svg.selectAll("line.horizontal")
                    .data(xaxiscoor)
                    .enter()
                    .append("svg:line")
                    .attr("x1", 25)
                    .attr("y1", scope.unitX/2)
                    .attr("x2", scope.unitX-25)
                    .attr("y2", scope.unitX/2)
                    .style("stroke", "#d81e05")
                    .style("stroke-width", 5);

                svg.append("text")
                    .attr("x", scope.unitX/2)
                    .attr("y", scope.unitY)
                    .text("X-Axis");

            }
        }
    }])

}(D3Test.Directives = D3Test.Directives || {} ));
