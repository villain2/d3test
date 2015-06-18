(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:graphShapes
     * @description
     *
     * Manipulate 2d shapes on a coordinate grid.
     * @example
     * <pre>
     *     <graph-shapes></graph-shapes>
     * </pre>
     */
    D3Test.Modules.D3Test.directive('graphShapes', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'GridCtrl',
            link: function (scope, elm, attrs)
            {
                scope.updateNav("graphs");
                var margin          = { top: 20, right: 20, bottom: 20, left: 20},
                    width           = 540 - margin.left - margin.right,
                    height          = 540 - margin.top - margin.bottom,
                    chartX          = 50,
                    chartY          = 50,
                    chartHeight     = height/25,
                    chartWidth      = width/25,
                    domainWidth     = width / 50,
                    domainHeight    = height / 50,
                    coordWidth      = width/2 + margin.left,
                    coordHeight     = height/2 + margin.top,
                    shapeX          = 0,
                    shapeY          = 0,
                    curScale        = scope.curScale,
                    curRotation     = 0,
                    currentObj;

                scope.xPlot         = 0;
                scope.yPlot         = 0;

                //var rangeNum        = 10;

                //var yaxiscoor       = d3.range(rangeNum, height, rangeNum);
                //var xaxiscoor       = d3.range(rangeNum, width, rangeNum);

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
                    .tickSize(-height);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(chartHeight)
                    .tickSize(-width);

                var zoom = d3.behavior.zoom()
                    .x(x)
                    .y(y)
                    .scaleExtent([1, 10])
                    .on("zoom", zoomed);

                var svg = d3.select(".graphShapes")
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .on("mousedown", chartmousedown)
                    .on("mouseup", mouseup)
                    .append('g')
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
                    //.call(zoom);

                svg.append('g')
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + height + ")")
                    .call(xAxis);

                svg.append('g')
                    .attr("class", "y axis")
                    .call(yAxis);

                /*var rect = svg.append("rect")
                    .style('fill', 'yellow')
                    .attr("width", 25)
                    .attr("height", 25)
                    .attr("transform", "translate(50, 50)")
                    .on("mousedown", rectmousedown);*/

                var shapeObj = svg.append('g')
                    .attr("stroke", "white")
                    .attr("stroke-width", 3)
                    .attr("fill", "lightgreen");

                var shape = shapeObj.append("svg:path")
                    .style('stroke', 'black')
                    .style('fill', 'none')
                    .attr('width', 50)
                    .attr('height', 50)
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('d', 'M 0,0 L 0,50, L 50,50 L 50,0 Z')
                    .attr('id', 'shape')
                    .on("mousedown", mousedown)
                    .transition()
                        .style('fill', 'blue')
                        .delay(1000)
                        .duration(3000);

                setShapeMath();

                /*shapeObj.transition()
                    .attr("x", 450)
                    .attr("transform", "translate(-98,-43)")
                    .delay(100)
                    .duration(300);*/



                //console.log('rect x: ' + $('rect')[0].attributes[0].value);
               //console.log('rect y: ' + $('rect')[0].attributes[1].value);

                function setShapeMath ()
                {
                    shapeFullWidth          = $('path#shape')[0].attributes[0].value;
                    shapeFullHeight         = $('path#shape')[0].attributes[1].value;
                    shapeXPos               = $('path#shape')[0].attributes[2].value;
                    shapeYPos               = $('path#shape')[0].attributes[3].value;
                    console.log($('path#shape'));
                }


                scope.rotateObject = function(direction)
                {
                    switch (direction)
                    {
                        case 'horizontal':
                            shapeObj.transition()
                                //.attr("transform", " translate(50, 50) rotate(180 100 100)")
                                .attr("transform", "translate(" + shapeX + ", " + shapeY + ") scale(" + curScale + ") rotate(90 " + shapeFullWidth/2 + " " + shapeFullHeight/2 + ")")
                                .ease("elastic")
                                .delay(300)
                                .duration(750);
                        break;

                        case 'vertical':
                            shapeObj.transition()
                                .attr("transform", "translate(" + shapeX + ", " + shapeY + ") scale(" + curScale + ") rotate(180 " + shapeFullWidth/2 + " " + shapeFullHeight/2 + ")")
                                .ease("elastic")
                                .delay(300)
                                .duration(750);
                        break;

                        default: 
                            shapeObj.transition()
                                .attr("transform", "translate(" + shapeX + ", " + shapeY + ") scale(" + curScale + ") rotate(" + scope.shapeDegrees + " " + shapeFullWidth/2 + " " + shapeFullHeight/2 + ")")
                                .ease("elastic")
                                .delay(300)
                                .duration(750);
                        break;
                    }
                }
                
                scope.resizeObject = function (type)
                {
                    switch (type)
                    {
                        case 'shrink':
                            scope.curScale        = 0.5;
                            shapeObj.transition()
                                .attr("transform", "translate(" + shapeX + ", " +shapeY + ") scale(" + scope.curScale + ")")
                                .attr("width", shapeFullWidth/2)
                                .attr("height", shapeFullHeight/2)
                                .ease("elastic")
                                .delay(300)
                                .duration(750);
                        break;
                            
                        case 'expand':
                            scope.curScale        = 2;
                            shapeObj.transition()
                                .attr("transform", "translate(" + shapeX + ", " + shapeY + ") scale(" + scope.curScale + ")")
                                .attr("width", shapeFullWidth*2)
                                .attr("height", shapeFullHeight*2)
                                .ease("elastic")
                                .delay(300)
                                .duration(750);
                        break;
                            
                        default:
                            shapeObj.transition()
                                .attr("transform", "translate(" + shapeX + ", " + shapeY + ") scale(" + scope.curScale + " )")
                                .attr("width", shapeFullWidth*2)
                                .attr("height", shapeFullHeight*2)
                                .ease("elastic")
                                .delay(100)
                                .duration(300);
                        break;
                    }
                }



                /*svg.append('path')
                    .style('stroke', 'black')
                    .style('fill', 'green')
                    .attr('d', 'M 100,50 L 200,125, L 305,50 Z');*/



                function chartmousedown()
                {
                    var point           = d3.mouse(this), p = {x:point[0], y: point[1]};
                    scope.xPlot         = Math.round((point[0]-coordWidth)/25);
                    scope.yPlot         = Math.round(-(point[1]-coordWidth)/25);
                    scope.$apply();
                    //console.log(Math.round((point[0]-coordWidth)/25));
                    //console.log(Math.round(-(point[1]-coordWidth)/25));
                }

                function rectmousedown()
                {

                    var point = d3.mouse(this), p = {x:point[0], y: point[1]};
                    currentObj          = rect;
                    svg.on("mousemove", mousemove);
                }

                function mousedown()
                {
                    var point = d3.mouse(this), p = {x:point[0], y: point[1]};
                    currentObj          = shapeObj;

                    svg.on("mousemove", mousemove);
                }

                function mousemove()
                {
                    var point = d3.mouse(this);
                    console.log('new x: ' + Math.round(point[0]));
                    
                    var newX        = point[0];
                    var newY        = point[1];

                    currentObj.attr("transform", "translate(" + newX + ", " + newY + ") scale(" + scope.curScale + ")");
                    shapeX = $('path#shape')[0].attributes[2].value = newX;
                    shapeY = $('path#shape')[0].attributes[3].value = newY;
                    
                    //shapeObj.attr("transform", "translate(" + newX + ", " + newY + ")");

                    //console.log('mouse position: ' + point[0] + ' x ' + point[1]);
                }

                function mouseup()
                {
                    svg.on("mousemove", null);
                    setShapeMath();

                }



                function zoomed()
                {
                    svg.select(".x.axis").call(xAxis);
                    svg.select(".y.axis").call(yAxis);
                }

                zoomed();
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));