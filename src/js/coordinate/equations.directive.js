(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:graphEquations
     * @description
     *
     * Plot points and line segments based on equations entered into
     * a text area. User can control type of points and lines drawn.
     * <pre>
     *      <graph-equation></graph-equation>
     * </pre>
     */
    D3Test.Modules.D3Test.directive('graphEquations', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'EquationsCtrl',
            link: function (scope, elm, attrs) {
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
                    curScale        = 1,
                    curRotation     = 0,
                    currentObj;
                
                //the equation holder
                var equation        = scope.equation;

                //arrow data
                var data = [
                    { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
                ];
                
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
                    .tickSize(-height);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(chartHeight)
                    .tickSize(-width);

                var svg = d3.select(".graphEquations")
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    //.on("mousedown", chartmousedown)
                    //.on("mouseup", mouseup)
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

                var defs = svg.append('svg:defs');

                var paths = svg.append('svg:g')
                    .attr('id', 'markers')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

                svg.append('g')
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + height + ")")
                    .call(xAxis);

                svg.append('g')
                    .attr("class", "y axis")
                    .call(yAxis);
                
                var newpath = svg.append('path')
                    .attr('d', 'M ' + equation.x1 + ',' + equation.y1 + ' L ' + equation.x1 + ', ' + equation.y2 + '')
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2)
                    .attr('id', 'drawnLine')
                    .attr('marker-end', 'url(#marker_arrow)')
                    .attr('marker-start', 'url(#marker_arrow)');
                
                function start()
                {
                    svg.select(".x.axis").call(xAxis);
                    svg.select(".y.axis").call(yAxis);
                }
                
                start();
                
                scope.$watch(function () { return scope.equation; }, function (newVal, oldVal) {
                    if(newVal){
                        /*console.log(newVal);
                        console.log((equation.x1 * 25)+250);
                        console.log((equation.x2 * 25)+250);
                        console.log(-(equation.y1 * 25)+250);
                        console.log(-(equation.y2 * 25)+250);*/
                        
                        var newX1 = (equation.x1 * 25)+250,
                            newX2 = (equation.x2 * 25)+250,
                            newY1 = -(equation.y1 * 25)+250,
                            newY2 = -(equation.y2 * 25)+250;
                
                        newpath.attr("x1", newX1)
                            .attr("x2", newX2)
                            .attr("y1", newY1)
                            .attr("y2", newY2)
                            .attr('d', 'M ' + newX1 + ',' + newY1 + ' L ' + newX2 + ', ' + newY2 + '');
                        
                        //figuring out full ine
                        var m, n;
                        
                        m = (equation.y2 - equation.y1)/(equation.x2 - equation.x1);
                        n = equation.y2*m - equation.x2;
                        
                        //console.log('coord?: ' + m + ' :: ' + n );
                        
                    }
                }, true);
            }
        }
    }]);
}( D3Test.Directives = D3Test.Directives || {} ));