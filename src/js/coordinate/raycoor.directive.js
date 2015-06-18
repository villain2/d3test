(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:raycoor
     * @description
     *
     * Draw a ray from two or more points on the grid.
    **/
    D3Test.Modules.D3Test.directive('raycoor', [ function ()
    {
        return {
            restrict: 'AE',
            link: function (scope, elm, attrs)
            {
                scope.updateNav("graphs");
                var margin          = {top: 0, right: 0, bottom: 0, left: 0},
                    padding         = {top: 0, right: 0, bottom: 0, left: 0},
                    outerWidth      = scope.unitX,
                    outerHeight     = scope.unitY,
                    innerWidth      = outerWidth - margin.left - margin.right,
                    innerHeight     = outerHeight - margin.top - margin.bottom,
                    width           = innerWidth - padding.left - padding.right,
                    height          = innerHeight - padding.top - padding.bottom,
                    lineStarted     = true,
                    mouseUp         = false,
                    mouseMoving     = false,
                    color = d3.scale.category10(),
                    startX, startY, endX, endY, currentX, currentY,
                    circle, arrow, line;

                var yaxiscoor = d3.range(25, height, 25);
                var xaxiscoor = d3.range(25, width, 25);




                //for segments and drawing rays
                var drawingType         = [
                    {
                        "type": "ray",
                        "active": false
                    },
                    {
                        "type": "segment",
                        "active": false
                    }
                ];

                scope.drawingType           = drawingType;

                var x = d3.scale.linear()
                    .domain([-width / 2, width / 2])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([-height / 2, height / 2])
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");
                    //.tickSize(-height);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");
                    //.ticks(15)
                    //.tickSize(-width);

                var svg = d3.select('.raycoor')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .on("mousedown", mousedown)
                    .on("mouseup", mouseup);



                /** START CODE FOR D3 MARKER ARROW */
                var data = [
                    { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
                ];

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


                // build the arrow.
                svg.append("defs").append("marker")
                    .attr("id", "arrowhead")
                    .attr("refX", 6 + 3) /*must be smarter way to calculate shift*/
                    .attr("refY", 2)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 4)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M 0,0 V 4 L6,2 Z");
                /** END ARROW MARKER **/
                

                /** SET X AND Y AXIS **/
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);




                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:snapTo
                 * @param {Number} xAxis the current x position of the mouse
                 * @param {Number} yAxis the current y position of the mouse
                 * @description
                 *
                 * Get the current x and y position of the mouse on the grid and
                 * round to the nearest coordinate point. This should be updated
                 * to be based on the units of the graph (1s, 5s, 10s, 25s etc.).
                 */
                function snapTo (xAxis, yAxis)
                {
                    if( (mouseUp == false) && (mouseMoving == false) )
                    {
                        startX      = Math.round(xAxis/25)*25;
                        startY      = Math.round(yAxis/25)*25;
                    }
                    else if( (mouseUp == true) && (mouseMoving == false) )
                    {
                        endX        = Math.round(xAxis/25)*25;
                        endY        = Math.round(yAxis/25)*25;
                    }
                    else if( (mouseUp == false) && (mouseMoving == true) )
                    {
                        currentX    = Math.round(xAxis/25)*25;
                        currentY    = Math.round(yAxis/25)*25;
                    }
                }


                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:mousedown
                 * @description
                 *
                 * Checks the drawing type. Sends mouse location to snapTo function.
                 * Checks whether or not we're drawing a line or plotting a point.
                 */
                function mousedown()
                {
                    var m           = d3.mouse(this);
                    checkDrawingType();

                    snapTo(m[0], m[1]);


                    //check if we're starting or ending a line
                    if(lineStarted == true)
                    {
                        line = svg.append("line")
                            .attr("x1", startX)
                            .attr("y1", startY)
                            .attr("x2", startX)
                            .attr("y2", startY)
                            .attr("id", String);

                        //draw the circle for this segment
                        circle = svg.append("circle")
                            .attr("cx", startX)
                            .attr("cy", startY)
                            .attr("r", 10);
                            console.log('position:');
                            console.log(startX + ' x ' + startY);
                    }
                    else
                    {
                        //draw the circle for this segment
                        circle = svg.append("circle")
                            .attr("cx", startX)
                            .attr("cy", startY)
                            .attr("r", 10);
                    }

                    svg.on("mousemove", mousemove);
                }



                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:mouseup
                 * @description
                 *
                 * sets mouseUp variable to true. Sends mouse x and y values to snapTo function.
                 * Determines what we're drawing and if we're starting a ray or a line segment.
                 * Draws a new path base on the type of object we're drawing.
                 */
                function mouseup()
                {
                    mouseUp         = true;

                    svg.on("mousemove", null);
                    var m = d3.mouse(this);

                    snapTo(m[0], m[1]);

                    if( (lineStarted == true)&&(scope.drawingType[1].active == true) )
                    {
                        lineStarted     = false;
                        circle          = svg.append("circle")
                            .attr("cx", endX)
                            .attr("cy", endY)
                            .attr("r", 10);
                            //console.log('position:');
                            //console.log(endX + ' x ' + endY);

                        var defs = svg.append('svg:defs');
                        var paths = svg.append('svg:g')
                            .attr('id', 'markers')
                            .attr('transform', 'translate(0 , 0)');

                        var path = paths.selectAll('path')
                            .data(data)
                            .enter()
                            .append('svg:path')
                            .attr('d', 'M ' + startX + ',' + startY + ' L ' + endX + ',' + endY + '')
                            .attr('stroke', '#000')
                            .attr('stroke-width', 5)
                            .attr('stroke-linecap', 'round')
                            //.attr('marker-start', function(d,i){ return 'url(#marker_' + d.name + ')' })
                            .attr('marker-end', 'url(#marker_arrow)');
                    }
                    else if( (lineStarted == true)&&(scope.drawingType[0].active == true) )
                    {
                        lineStarted = false;

                        var defs = svg.append('svg:defs');
                        var paths = svg.append('svg:g')
                            .attr('id', 'markers')
                            .attr('transform', 'translate(0,0)');

                        var marker = defs.select('marker')
                            .data(data)
                            .enter()
                            .append('svg:marker')
                                .attr('id', 'marker_arrow')
                                .attr('markerHeight', 5)
                                .attr('markerWidth', 5)
                                .attr('markerUnits', 'strokeWidth')
                                .attr('orient', 'auto')
                                .attr('refX', endX)
                                .attr('refY', endY)
                            .append('svg:path')
                                .attr('d', 'M 0,0m -5,-5 L 5,0 L -5,5 Z')
                                .attr('fill', '#000');

                        var path = paths.selectAll('path')
                            .data(data)
                            .enter()
                            .append('svg:path')
                            .attr('d', 'M ' + startX + ',' + startY + ' L ' + endX + ',' + endY + '')
                            .attr('stroke', '#000')
                            .attr('stroke-width', 5)
                            .attr('stroke-linecap', 'round')
                            //.attr('marker-start', function(d,i){ return 'url(#marker_' + d.name + ')' })
                            .attr('marker-end', 'url(#marker_arrow)');
                    }
                    mouseUp         = false;
                }


                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:mousemove
                 * @description
                 *
                 * Sets mouseMoving to true. runs snapTo function with x and y position of the mouse.
                 * If we're drawing a line then we set the stroke and other attributes to guide it's path.
                 * If not, we plot a point.
                 */
                function mousemove()
                {
                    mouseMoving       = true;
                    var m = d3.mouse(this);
                    snapTo(m[0], m[1]);

                    if(lineStarted == true)
                    {
                        line.attr("x2", currentX)
                            .attr("y2", currentY)
                            .attr("stroke-dasharray", ("5, 5"));
                    }
                    else
                    {
                        circle.attr("cx", currentX)
                            .attr("cy", currentY);
                    }
                    mouseMoving       = false;
                }



                /*
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:checkDrawingType
                 * @description
                 *
                 * Sets lineStarted to false.
                 * Loops through all drawingType data and sets lineStarted to true if the current
                 * drawingType active value is true.
                 */
                function checkDrawingType()
                {
                    lineStarted = false;
                    for (var d = 0; d < drawingType.length; d++)
                    {
                        if(drawingType[d].active == true)
                        {
                            lineStarted = true;
                        }
                    }
                }


                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:resetDrawingType
                 * @description
                 *
                 * Loops through drawingType and sets all active values to false.
                 */
                function resetDrawingType()
                {
                    for (var t = 0; t < drawingType.length; t++)
                    {
                        drawingType[t].active = false;
                    }
                }



                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:scope#resetraycoor
                 * @description
                 *
                 * Clears any circles or lines from the svg area. Reapplies grid.
                 * Resets lineStarted to "true".
                **/
                scope.resetraycoor = function ()
                {
                    svg.selectAll("circle").remove();
                    svg.selectAll('line').remove();
                    svg.selectAll('g').remove();
                    lineStarted = true;
                    drawGraph();
                };




                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:scope#setDrawingType
                 * @param {string} drawType Value of drawType
                 * @description
                 *
                 * Call the resetDrawingType function.
                 * Then cycle through data to match with the current drawType.
                **/
                scope.setDrawingType = function (drawType)
                {
                    resetDrawingType();
                    for(var i = 0; i < drawingType.length; i++)
                    {
                        if(drawingType[i].type == drawType)
                        {
                            drawingType[i].active       = true;
                        }
                    }
                    //console.log(drawingType);
                };




                /*
                 * @ngdoc method
                 * @methodOf D3Test.directive:raycoor
                 * @name D3Test.raycoor.class:drawGraph
                 * @description
                 *
                 * Add vertical and horizontal lines to grid.
                 */
                function drawGraph()
                {
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

                    svg.append("text")
                        .attr("x", scope.unitX/2)
                        .attr("y", scope.unitY)
                        .text("X-Axis");
                }

                drawGraph();
            }
        }
    }])

}(D3Test.Directives = D3Test.Directives || {} ));
