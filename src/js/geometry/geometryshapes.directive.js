(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:geometryshapes
     * @description
     *
     * Create a graph using shapes that can be resizes, moved and more.
     */
    D3Test.Modules.D3Test.directive("geometryshapes", [ function ()
    {
        return {
            restrict: 'E',
            controller: 'GeometryCtrl',
            link: function (scope, elm, attrs)
            {
                var margin          = {top: 20, right: 20, bottom: 20, left: 20},
                    width           = 540 - margin.left -margin.right,
                    height          = 540 - margin.top - margin.bottom,
                    chartHeight     = height/25,
                    chartWidth      = width/25,
                    domainWidth     = width /50,
                    domainHeight    = height/50,
                    shapeX          = 0,
                    shapeY          = 0,
                    shapeArray      = [],
                    rotationArray   = [],
                    currentObj, newX, newY;

                scope.xPlot         = 0;
                scope.yPlot         = 0;

                var x = d3.scale.linear()
                    .domain([-(domainWidth), domainWidth])
                    .range([0,width]);

                var y = d3.scale.linear()
                    .domain([-(domainHeight), domainWidth])
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

                var svg = d3.select(".geometryshapes")
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .on("mousedown", geogridMouseDown)
                    .on("mouseup", geogridMouseUp)
                    .append('g')
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

                svg.append('g')
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + height + ")")
                    .call(xAxis);

                svg.append('g')
                    .attr("class", "y axis")
                    .call(yAxis);

                var shapeObj = svg.append('g')
                    .attr("id", "shapes");






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:scope#drawShape
                 * @param {String} shapeType What kind of shape are we drawing
                 * @description
                 *
                 * Draws a shape to the graph. We determine what kind of shape by
                 * filtering through the shapeType passed in.
                 */
                scope.drawShape = function (shapeType)
                {
                    var newID;
                    if(shapeArray.length == 0)
                    {
                        newID = 0;
                    }
                    else
                    {
                        newID       = shapeArray.length;
                    }
                    shapeArray.push(newID);
                    switch (shapeType)
                    {
                        case "square":
                            var square = shapeObj.append("rect")
                                .attr('x', 0)
                                .attr('y', 0)
                                .attr('width', 100)
                                .attr('height', 100)
                                .attr('id', newID)
                                .style('stroke', 'black')
                                .style('fill', 'orange')
                                .on("mousedown", shapeMouseDown);
                            break;

                        case "rect":
                            var rectangle = shapeObj.append("rect")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width", 175)
                                .attr("height", 100)
                                .attr('id', newID)
                                .style('stroke', 'black')
                                .style("fill", "green")
                                .on("mousedown", shapeMouseDown);
                            break;

                        case "parallelogram":
                            var parallelogram = shapeObj.append("svg:path")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width", 220)
                                .attr("height", 100)
                                .attr('id', newID)
                                .attr('d', 'M 0,0 L 20,100 L 220,100 L 200,0 Z')
                                .style('fill', 'yellow')
                                .style('stroke', 'orange')
                                .on("mousedown", shapeMouseDown);

                            break;

                        case "trapazoid":
                            var trapazoid = shapeObj.append("svg:path")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width", 150)
                                .attr("height", 100)
                                .attr('d', 'M 0,100 L 150,100 L 125,0 L 25,0 Z')
                                .style("stroke", "#333333")
                                .style("fill", "purple")
                                .attr('id', newID)
                                .on("mousedown", shapeMouseDown);

                            break;

                        case "circle":
                            var circle = shapeObj.append("circle")
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width", 75)
                                .attr("height", 75)
                                .attr("id", newID)
                                .attr("cx", 75)
                                .attr("cy", 75)
                                .attr("r", 75)
                                .style("stroke", "#f3f4f5")
                                .style("fill", "blue")
                                .on("mousedown", shapeMouseDown);

                            break;

                        case "triangle":
                            break;

                        default:
                            console.log('no shape type selected');
                            break;
                    }
                    newX        = 0;
                    newY        = 0;
                    currentObj  = elm.find('#' + newID);
                    rotationArray.push(0);
                    setGeoShapeMath();
                };






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:scope#resizeGeoObject
                 * @description
                 *
                 * Use a value in a check box to resize chosen object.
                 */
                scope.resizeGeoObject = function (type)
                {
                    switch (type)
                    {
                        case 'shrink':
                            scope.curScale      = scope.curScale / 2;
                            break;

                        case 'expand':
                            scope.curScale          = scope.curScale * 2;
                            break;

                        default:
                            break;
                    }


                    var thisDegree      = currentObj[0].id;
                    console.log(rotationArray[thisDegree]);
                    console.log(shapeFullWidth/2);

                    //currentObj.attr("transform", "translate(" + newX + ", " + newY + ") scale(" + scope.curScale + ")");
                    currentObj.attr("transform", "translate(" + newX + ", " + newY + ") scale(" + scope.curScale + ") rotate(" + rotationArray[thisDegree] + " " + shapeFullWidth/2 + " " + shapeFullHeight/2 + ")");

                };






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:setGeoShapeMath
                 * @description
                 *
                 * Set the description of an object as variables to be manipulated.
                 */
                function setGeoShapeMath ()
                {
                    shapeXPos           = currentObj[0].attributes[0].value;
                    shapeYPos           = currentObj[0].attributes[1].value;
                    shapeFullWidth      = currentObj[0].attributes[2].value;
                    shapeFullHeight     = currentObj[0].attributes[3].value;
                }






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:scope#rotateGeoObject
                 * @description
                 *
                 * Rotate the selected object by degrees based on input text value.
                 */
                scope.rotateGeoObject = function ()
                {
                    currentObj.attr("transform", "translate(" + newX + ", " + newY + ") scale(" + scope.curScale + ") rotate(" + scope.objDegrees + " " + shapeFullWidth/2 + " " + shapeFullHeight/2 + ")");
                    updateRotationArray(currentObj[0].id, scope.objDegrees);
                };






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:updateRotationArray
                 * @param {Number} id The position of the value being replaced
                 * @param {Number} value New rotation degree value
                 * @description
                 *
                 * This function updates the rotationArray that saves the degrees for each object's rotation
                 * based off of their id.
                 */
                function updateRotationArray (id, value)
                {
                    rotationArray.splice(id,1,value);
                }






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:geogridMouseDown
                 * @description
                 *
                 * Handles mouse down functions on the grid.
                 */
                function geogridMouseDown ()
                {

                }






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:geogridMouseUp
                 * @description
                 *
                 * Handles mouse up functions on the grid.
                 */
                function geogridMouseUp ()
                {
                    svg.on("mousemove", null);
                }






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3Test.geometryshapes.class:shapeMouseDown
                 * @description
                 *
                 * Handles mouse down functions on the a particular shape.
                 */
                function shapeMouseDown ()
                {
                    var point   = d3.mouse(this);
                    var p       = {x:point[0], y: point[1]};
                    currentObj  = elm.find('#' + this.id);

                    svg.on("mousemove", shapeMouseMove);
                    setGeoShapeMath();
                }






                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:geometryshapes
                 * @name D3test.geometryshapes.class:shapeMouseMove
                 * @description
                 *
                 * How we move objects once they've been clicked.
                 */
                function shapeMouseMove()
                {
                    var point           = d3.mouse(this);
                    var thisDegree      = currentObj[0].id;
                    newX                = point[0];
                    newY                = point[1];


                    currentObj.attr("transform", "translate(" + newX + ", " + newY + ") scale(" + scope.curScale + ") rotate(" + rotationArray[thisDegree] + " " + shapeFullWidth/2 + " " + shapeFullHeight/2 + ")");
                    shapeX = newX;
                    shapeY = newY;
                }

            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));