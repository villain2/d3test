(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:numberline
     * @description
     *
     * Number line controller widget. Has multiple options to turn on and off.
     *
     */
    D3Test.Modules.D3Test.directive("numberline", [ function ()
    {
        return {
            restrict: 'E',
            controller: 'NumberLineCtrl',
            link: function (scope, elm, attrs)
            {
                var margin          = { top: 60, right: 20, bottom: 40, left: 20},
                    width           = 540 - margin.left - margin.right,
                    height          = 0,//540 - margin.top - margin.bottom,
                    chartX          = 50,
                    chartY          = 50,
                    chartHeight     = height/scope.unit,
                    chartWidth      = width/scope.unit,
                    domainWidth     = width / 50,
                    domainHeight    = height / 50,
                    coordWidth      = width/2 + margin.left,
                    coordHeight     = height/2 + margin.top,
                    lineStarted     = true,
                    mouseUp         = false,
                    mouseMoving     = false,
                    shapeX          = 0,
                    shapeY          = 0,
                    curScale        = 1,
                    curRotation     = 0,
                    curLabel        = 0,
                    circleStyle     = scope.drawStyle[0].openStyle,
                    circlestyle2    = scope.drawStyle[0].closeStyle,
                    circle, line, arrow, startX, endX, currentX;

                //arrow data
                /*var data = [
                    { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
                ];*/


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
                
                //start graph

                var x = d3.scale.linear()
                    .domain([-(domainWidth), domainWidth])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([-(domainHeight), domainHeight])
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(chartWidth)
                    .tickSize(-height + 10);

                var svg = d3.select("#numberline")
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .on("mousedown", lineMouseDown)
                    .on("mouseup", lineMouseUp)
                    .append('g')
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


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

                /*var defs = svg.append('svg:defs');

                var paths = svg.append('svg:g')
                    .attr('id', 'markers')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');*/
                




                /** START CODE FOR D3 MARKER ARROW **/
                var data = [
                    { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
                ];

                var defs = svg.append('svg:defs');
                var text = svg.append("svg:text");
                
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


                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);




                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:snapTo
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
                        startX      = Math.round(xAxis/scope.unit)*scope.unit - scope.unit;
                    }
                    else if( (mouseUp == true) && (mouseMoving == false) )
                    {
                        endX        = Math.round(xAxis/scope.unit)*scope.unit - scope.unit;
                    }
                    else if( (mouseUp == false) && (mouseMoving == true) )
                    {
                        currentX    = Math.round(xAxis/scope.unit)*scope.unit;
                        //currentY    = Math.round(yAxis/scope.unit)*scope.unit;
                    }
                }





                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:mousedown
                 * @description
                 *
                 * Check the drawing type. Sends mouse to the location via the
                 * snapTo function.
                **/

                function lineMouseDown()
                {
                    var m           = d3.mouse(this);
                    checkDrawingType();

                    snapTo(m[0], m[1]);
                    
                    if(scope.addLabel == true)
                    {
                        scope.labelArray.push(scope.timelineLabel);
                        scope.makeLabel(m[0], m[1]);
                        curLabel++;
                    }
                    else
                    {
                        scope.resetNumberLine();

                        if(lineStarted == true)
                        {
                            line = svg.append("line")
                                .attr("x1", startX)
                                .attr("y1", 0)
                                .attr("x2", startX)
                                .attr("y2", 0)
                                .attr("id", String);

                            //draw the circle for this segment
                            circle = svg.append("circle")
                                .attr("cx", startX)
                                .attr("cy", 0)
                                .attr("r", 5)
                                .style(circleStyle)
                                .classed("bordered");
                        }
                        else
                        {
                            //draw circle for segment
                            circle = svg.append("circle")
                                .attr("cx", startX)
                                .attr("cy", 0)
                                .attr("r", 5)
                                .style(circleStyle)
                                .classed("bordered");
                        }

                        svg.on("mousemove", lineMouseMove);
                    }
                }




                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:mouseup
                 * @description
                 *
                 * Actions when mouse is released.
                **/
                function lineMouseUp()
                {
                    mouseUp             = true;
                    svg.on("mousemove", null);
                    var m           = d3.mouse(this);

                    snapTo(m[0], m[1]);
                    //console.log('is it a ray?');console.log(scope.drawingType[0].active);
                    //console.log('line started: ');console.log(lineStarted);

                    if( (lineStarted == true) && (scope.drawingType[1].active == true) )
                    {
                        lineStarted     = false;

                        var defs        = svg.append('svg:defs')
                        var paths       = svg.append('svg:g')
                            .attr('id', 'markers')
                            .attr('transform', 'translate(0,0)');

                        //redraw the line as solid
                        var path = paths.selectAll('path')
                            .data(data)
                            .enter()
                        .append('svg:path')
                            .attr('d', 'M' + startX + ',0 L ' + endX + ',0')
                            .attr("stroke", "black")
                            .attr("stroke-width", 5)
                            .attr("stroke-line", "round");

                        //draw circles
                        circle              = svg.append("circle")
                            .attr("cx", startX)
                            .attr("cy", 0)
                            .attr("r", 5)
                            .style(scope.drawStyle[scope.curStyle].startStyle)
                            .classed("bordered");

                        circle              = svg.append("circle")
                            .attr("cx", endX)
                            .attr("cy", 0)
                            .attr("r", 5)
                            .style(scope.drawStyle[scope.curStyle].endStyle)
                            .classed("bordered");
                    }
                    else if( (lineStarted == true) && (scope.drawingType[0].active == true) )
                    {
                        lineStarted         = false;

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
                                .attr('refY', 0)
                            .append('svg:path')
                                .attr('d', 'M 0,0m -5,-5 L 5,0 L -5,5 Z')
                                .attr('fill', '#000');

                        var path = paths.selectAll('path')
                            .data(data)
                            .enter()
                            .append('svg:path')
                            .attr('d', 'M ' + startX + ',0 L ' + endX + ',0')
                            .attr('stroke', '#000')
                            .attr('stroke-width', 5)
                            .attr('stroke-linecap', 'round')
                            .attr('marker-end', 'url(#marker_arrow)');

                        //draw circles
                        circle              = svg.append("circle")
                            .attr("cx", startX)
                            .attr("cy", 0)
                            .attr("r", 5)
                            .style(scope.drawStyle[scope.curStyle].startStyle)
                            .classed("bordered");
                    }
                    mouseUp         = false;
                }





                /**
                 * @ngdoc method 
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:lineMouseMove
                 * @description
                 *
                 * If the mouse moves we want to track the mouse position.
                 * If lineStarted is set to true, draw a dashed line to represent
                 * the path of the line. Otherwise, just plot a point. Set
                 * mouseMoving to false afterwards.
                **/
                function lineMouseMove ()
                {
                    mouseMoving = true;
                    var m = d3.mouse(this);
                    snapTo(m[0], m[1]);

                    if(lineStarted == true)
                    {
                        line.attr("x2", currentX)
                            .attr("y2", 0)
                            .attr("stroke-dasharray", ("5, 5"));
                    }
                    else
                    {
                        circle.attr("cx", currentX)
                            .attr("cy", 0)
                    }
                    mouseMoving     = false;
                }





                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:checkDrawingType
                 * @description
                 *
                 * Set lineStarted to false then loop through all the drawingLine
                 * values to find one that is active. Set it to active and
                 * then lineStarted to true (if applicaable).
                **/
                function checkDrawingType ()
                {
                    lineStarted = false;
                    for (var d = 0; d < scope.drawingType.length; d++)
                    {
                        if(scope.drawingType[d].active == true)
                        {
                            lineStarted = true;
                        }
                    }
                }





                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:resetDrawingType
                 * @description
                 *
                 * Loops through drawingType and sets all active values to false.
                **/
                function resetDrawingType ()
                {
                    for (var t = 0; t < scope.drawingType.length; t++)
                    {
                        scope.drawingType[t].active = false;
                    }
                }





                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:scope#resetNumberLine
                 * @description
                 *
                 * Clears all circles and lines. Sets lineStarted back to true.
                **/
                scope.resetNumberLine = function ()
                {
                    svg.selectAll('circle').remove();
                    svg.selectAll('line').remove();
                    svg.selectAll('g').remove();
                    lineStarted = true;

                    svg.append('g')
                        .attr("class", "x axis")
                        .attr("transform", "translate(0, " + height + ")")
                        .call(xAxis);
                }







                /**
                 * @ngdoc method 
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:scope#setLineType
                 * @param {String} Line Type is the value for whether a ray or line segment
                 * @param {Number} thisStyle is the value for drawType and which number is active.
                 * @description
                 *
                 * Resets the drawing type then sets the variable thisStyle to scope.curStyle.
                 * Loop through all the drawing types to find a match for the current one and
                 * sets its active state to true while others are false.
                **/
                scope.setLineType = function (lineType, thisStyle)
                {
                    resetDrawingType();
                    scope.curStyle      = thisStyle;
                    for(var i = 0; i < scope.drawingType.length; i++)
                    {
                        if(scope.drawingType[i].type == lineType)
                        {
                            scope.drawingType[i].active       = true;
                        }
                    }
                }
                
                
                
                
                
                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:scope#toggleLabeling
                 * @description
                 *
                 * Toggle whether or not clicking on the line segment will open the dialogue
                 * for making a label.
                **/
                scope.toggleLabeling = function ()
                {
                    scope.addLabel = !scope.addLabel;
                    if(scope.addLabel == false)
                    {
                        scope.timelineLabel = "";
                    }
                }
                
                
                
                
                
                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:scope#addLabel
                 * @description 
                 *
                 * Add the label to the current plotted point.
                **/
                scope.makeLabel = function (xPos, yPos)
                {
                    
                    var text = svg.append("svg:text")
                        .attr("x", xPos - 20)
                        .attr("y", -30)
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .attr("id", "text-label")
                        .text(scope.labelArray[curLabel]);

                    var labelBox = text.node().getBBox();

                    var rect = svg.append("svg:rect")
                        .attr("x", labelBox.x)
                        .attr("y", labelBox.y)
                        .attr("width", labelBox.width)
                        .attr("height", labelBox.height)
                        .style("fill", "#000")
                        .style("fill-opacity", .25)
                        .style("stroke", "#333")
                        .style("stroke-width", "1px");
                }                




                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:resetDrawingType
                 * @description
                 *
                 * Loops through drawingType and sets all active values to false.
                 */
                function resetDrawingType()
                {
                    for (var t = 0; t < scope.drawingType.length; t++)
                    {
                        scope.drawingType[t].active = false;
                    }
                }
                
                
                
                
                
                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:scope#resetAll
                 * @description
                 *
                 * Reset the entire number line.
                **/
                scope.resetAll = function ()
                {
                    svg.selectAll('#text-label').remove();
                    svg.selectAll('rect').remove();
                    scope.resetNumberLine();
                }
                
                
                
                


                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:numberline
                 * @name D3Test.numberline.class:start
                 * @description
                 * 
                 * Begin the number line with setting the x.axis
                 * and the intial line type we're drawing (segment).
                **/
                function start()
                {
                    svg.select(".x.axis").call(xAxis);
                    scope.setLineType('segment', '0');


                        var path = paths.selectAll('path')
                            .data(data)
                            .enter()
                            .append('svg:path')
                            .attr('d', 'M 34,0 L 122,0')
                            .attr('stroke', '#000')
                            .attr('stroke-width', 5)
                            .attr('stroke-linecap', 'round')
                            .attr('marker-end', 'url(#marker_arrow)');
                }
                
                start();






            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));