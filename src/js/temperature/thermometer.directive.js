(function (Directives, undefined)
 {
    /**
     * @ngdoc directive
     * @name D3Test.directive:thermometer
     * @description 
     *
     * A simple thermometer scale with interaction
    **/
    
    D3Test.Modules.D3Test.directive('thermometer', [ function () {
        return {
            restrict: 'E',
            controller: 'ThermCtrl',
            link: function (scope, elm, attr)
            {
                
                //create therm
                var svg,
                    margin      = 20,
                    width       = 600 + margin,
                    height      = 500 + margin,
                    mouseDown   = false,
                    mouseMove   = false,
                    yTracking   = [],
                    mask, mercury, interactiveTube, yAxis, scale, x, y;
                
                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:thermometer
                 * @name D3Test.thermometer.class:drawThermometer
                 * @description
                 *
                 * Draw the actual thermometer. Create a shell thermometer svg image.
                 * Then draw a mercury rect and a masked rect for interactivity.
                **/
                drawThermometer = function ()
                {
                    
                    scale = d3.scale.linear().domain([-30, 60]).range([0,height/1.1]);
                    
                    yAxis   = d3.scale.linear().domain([-30,60]).range([height/1.1,0]);
                    
                    //create tracking array for y values
                    for (var i = yAxis.domain()[0]; i <= yAxis.domain()[1]; i++)
                    {
                        yTracking.push(i);
                    }
                    
                    yTracking.reverse();
                    
                    

                    y = d3.scale.linear()
                        .range([height, 0]);
                    
                    svg     = d3.select(".thermometer")
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height);
                    
                    svg.append("rect").classed("thermometer", true)
                        .attr({width: 20, height: height/1.1, rx: 10, ry: 10, x: 120, y: 10});

                    //create the mercury, set it inside a mask svg element so we can
                    //mimic sliding within the thermometer tube.
                    mercury = svg.append("mask")
                        .attr({width: 20, height: height/1.1, x: 0, y: 0})
                        .attr("id", "mask2")
                        .append("rect")
                        .classed("mercury", true)
                        .attr("name", "mercury")
                        .attr("id", "mercury")
                        .attr({width: 20, height: height/1.1, rx: 10, ry: 0, x: 120, y: 10});

                    interactiveTube = svg.append("rect").classed("interactiveTube", true)
                        .attr({ width: 20, height: height/1.1, rx: 0, ry: 0, x: 120, y: 10 })
                        .style("mask", "url(#mask2)")
                        .on("mousedown", thermMouseDown)
                        .on("mouseup", thermMouseUp)
                        .on("mousemove", thermMouseMove);
                    
                    var svg2 = d3.select("article svg");
                    
                    svg.append("g").attr("transform", "translate(50,10)")
                        .call(d3.svg.axis().scale(yAxis).orient("right").ticks(15));
                    
                    var article = d3.select("svg");
                    
                    
                    
                }
                
                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:thermometer
                 * @name D3Test.thermometer.class:thermMouseDown
                 * @description
                 *
                 * Handles mouse down when clicking on the thermometer.
                 * Will slide the mercury to the right position.
                **/
                function thermMouseDown ()
                {
                    //var y0 = y.invert(d3.mouse(this)[0]);
                    //var yorig = d3.mouse(this)[0];
                    /*console.log(yTracking.length);
                    console.log(height);
                    console.log(height / yTracking.length);*/
                    
                    
                    var divideBy    = height / yTracking.length;
                    var newY        = d3.mouse(this)[1] - 5;
                    var displayY    = Math.round(newY / 5.35);
                    
                    scope.newTemp     = yTracking[displayY];
                    console.log('new temp: ' + scope.newTemp);
                    scope.$apply();

                    console.log(mercury);
                    
                    mercury.transition()
                        .attr({ width: 20, height: height/1.1, rx: 0, ry: 0, x: 120, y: 10 + newY })
                        .ease("elastic")
                        .delay(100)
                        .duration(300);
                    
                    
                }
                
                
                
                
                
                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:thermometer
                 * @name D3Test.thermometer.class:thermMouseUp
                 * @description
                 *
                 * Mouse up.
                **/
                function thermMouseUp()
                {
                }
                
                
                
                
                

                /**
                 * @ngdoc method
                 * @methodOf D3Test.directive:thermometer
                 * @name D3Test.thermometer.class:thermMouseMove
                 * @description
                 *
                 * Use if we need to drag the mercury.
                **/
                function thermMouseMove()
                {
                    
                    
                }
                
                
                
                
                
                //init
                drawThermometer();
                
                
                    
                
                
                
            }
        }
    }])
}(D3Test.Directives = D3Test.Directives || {} ));
