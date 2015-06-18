/**
 * @ngdoc function
 * @name D3Test
 * @id D3Test
 * @description
 *
 * Creating a D3 test for Connections.
 */

(function (D3Test, undefined)
{
    D3Test.Version          = "0.0.1";
    D3Test.PartialsPath     = "partials/";
    D3Test.Factory          = {};
    D3Test.Modules          = {};
    D3Test.Configs          = {};
    D3Test.Controllers      = {};
    D3Test.Directives       = {};
    D3Test.Providers        = {};
}(window.D3Test = window.D3Test || {} ));

/**
 */

(function (Modules, undefined)
{

    /**
     * @ngdoc object
     * @id D3Test
     * @name D3Test
     * @description
     *
     * This Module Initializes the D3Test Angular module. Uses the static angular
     * extern. This is a generic function used by the base template. Only modify if
     * updating or adding functionality to the default template. All angular template
     * controllers, directives, services and filters go here. See Angular
     * documentation for usage.
     */
    Modules.D3Test = angular.module("d3test", ['ngRoute', 'ngSanitize', 'duScroll']);
}(D3Test.Modules = D3Test.Modules || {} ));

/**
 **/
(function (Configs, undefined)
{
    D3Test.Modules.D3Test.config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: D3Test.PartialsPath + '/home.html'
            })
            .when('/graphs', {
                templateUrl: D3Test.PartialsPath + '/graphs.html'
            })
            .when('/number-lines', {
                templateUrl: D3Test.PartialsPath + '/number_lines.html'
            })
            .when('/charts', {
                templateUrl: D3Test.PartialsPath + '/charts.html',
                controller: 'ChartCtrl'
            })
            .when('/geometry', {
                templateUrl: D3Test.PartialsPath + '/geometry.html'
            })
            .when('/time/', {
                templateUrl: D3Test.PartialsPath + '/time.html'
            })
            .when('/temperature', {
                templateUrl: D3Test.PartialsPath + '/temperature.html'
            })
            .when('/fractions', {
                templateUrl: D3Test.PartialsPath + '/fractions.html'
            })
            .otherwise({
                redirectTo: '/',
                templateUlr: D3Test.PartialsPath + '/home.html'
            })
    }]);
}(D3Test.Configs = D3Test.Configs || {} ));

(function (Controllers, undefined)
 {
 	/**
 	 * @ngdoc controller
 	 * @name D3Test.controller:NavCtrl
 	 * @description 
 	 *
 	 * Nav Controller handles the states of the navigation to determine our current page.
 	 * Updates the scope value for current page.
 	**/
    D3Test.Modules.D3Test.controller('NavCtrl', [ '$scope', '$rootScope', function ($scope, $rootScope) 
    {
    	$scope.currentPage 			= undefined;
    	$scope.$on('updateCurrentPage', function (event, data)
    	{
            $scope.currentPage           = data;
    	});

    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));

(function (Directives, undefined) {
    D3Test.Modules.D3Test.directive('navigation', [ function (){
        return {
            restrict: 'AE',
            controller: 'NavCtrl',
            link: function (scope, elm, attrs) {
                /*console.log('show directive scope');
                console.log(scope);*/
                
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));

(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:GridCtrl
     * @description
     *
     * Set up the universal parameters for our grids. Variables can change based on an eventual editor or the user changing them in the application.
     *@example
     <pre>
      return {
            restrict: 'AE',
            controller: 'GridCtrl',
            link: function (scope, elm, attrs)
            {
            }
        }
     </pre>
    **/
    D3Test.Modules.D3Test.controller('GridCtrl', ['$scope', '$window', '$rootScope', '$element', function ($scope, $window, $rootScope, $element)
    {
        var scope           = $scope;
        var margin 		    = {top: 20, right: 20, bottom: 20, left: 20},
            padding 		  = {top: 60, right: 60, bottom: 60, left: 60},
            outerWidth 		= 960,
            outerHeight 	= 960,
            innerWidth 		= outerWidth - margin.left - margin.right,
            innerHeight 	= outerHeight - margin.top - margin.bottom,
            width 			 = innerWidth - padding.left - padding.right,
            height 			= innerHeight - padding.top - padding.bottom,
            circle,
            line;
        
        scope.gridX         = 400;
        scope.gridY         = 400;

        this.yaxiscoor      = d3.range(25, height, 25);
        this.xaxiscoor      = d3.range(25, width, 25);
        scope.unitX         = 550;
        scope.unitY         = 550;
        scope.answerArray   = [];
        scope.curScale      = 1;
        scope.plottedAnswer;

        scope.updateNav = function (data)
        {
            $scope.$emit('updateCurrentPage', data);
        };

        scope.rotateShape = function (direction)
        {
          $scope.rotateObject(direction);

        };
        
        scope.resizeShape = function (data)
        {
            $scope.resizeObject(data);
        }

        scope.backToTop = function ()
        {
            $window.scrollTo(0,0);
        }
        
    }])
}(D3Test.Controllers = D3Test.Controllers || {} ));

(function (Controllers, undefined)
{
	/**
	 * @ngdoc controller
	 * @name D3Test.controller:ChartCtrl
	 * @description
	 *
	 * Handle navigation to chart page.
	**/
	D3Test.Modules.D3Test.controller('ChartCtrl', [ '$scope', function ($scope)
	{
        $scope.$emit('updateCurrentPage', 'charts');
	}]);
}( D3Test.Controllers = D3Test.Controllers || {} ));
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

(function (Directive, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:heightsource
	 * @description 
	 * 
	 * Fix the position of the left panel if we scroll 80 pixels down or more in the main container.
	**/
	D3Test.Modules.D3Test.directive('heightsource', [ '$window', function ($window)
	{
		return {
			restrict: 'A',
			scope: {
				scroll: '=scrollPosition'
			},
			link: function (scope, elm, attrs)
			{
				var windowEl 		= angular.element($window);
				var leftPanel 		= elm.find('.leftStatic');
				windowEl.on('scroll', function ()
				{
					if(windowEl[0].scrollY > 80)
					{
						leftPanel.attr("style", "margin-top: -100px; position: fixed;");
					} else {
						leftPanel.attr("style", "margin-top: 0px; position: relative;");
					}
				});
			}
		}
	}]);
}(D3Test.Directives = D3Test.Directives || {} ));
(function (Controllers, undefined)
{
	D3Test.Modules.D3Test.controller('AnglesCtrl', ['$scope', '$element', function ($scope, $element)
	{
		var scope 			= $scope;
		var element 		= $element;

		scope.dWidth = 700;
		scope.dHeight = 700;

		this.restart = function ()
		{
			scope.dWidth = 700;
			scope.dheight = 700;
		};

        var line;
        var vis = d3.select(".anglesContainer").append("svg")
            .on("mousedown", mousedown)
            .on("mouseup", mouseup);


        console.log('vis: ' + vis);
        function mousedown() {
            var m = d3.mouse(this);
            line = vis.append("line")
                .attr("x1", m[0])
                .attr("y1", m[1])
                .attr("x2", m[0])
                .attr("y2", m[1]);

            vis.on("mousemove", mousemove);
        }

        function mousemove() {
            var m = d3.mouse(this);
            line.attr("x2", m[0])
                .attr("y2", m[1]);
        }

        function mouseup() {
            vis.on("mousemove", null);
        }
	}]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
	D3Test.Modules.D3Test.directive("angles", [function ()
	{
		return {
			restrict: 'A',
			controller: 'AnglesCtrl',
			link: function (scope, elm, attrs)
			{

                var timeOut     = 0,
                    nodes       = [],
                    links       = [];

			    //mouse events
			    var selected_node = null,
			    	mousedown_link = null,
			    	mousedown_node = null,
			    	mouseup_node = null;


			    var draw = function (object)
			    {
			    	var mousePos = d3.mouse(object);
			    	timeOut = 1;
			    	setTimeout(function ()
			    	{
			    		timeOut = 0;
			    	}, 10);
				    line.attr("x2", mousePos[0])
				    	.attr("y2", mousePos[1]);
			    };

			    var resetMouse = function ()
			    {
			    	mousedown_node = null;
			    	mouseup_node = null;
			    	mousedown_link = null;
			    };
			}
		}
	}])

}(D3Test.Directives = D3Test.Directives || {} ));
(function (Directives, undefined)
{
	D3Test.Modules.D3Test.directive("drawing", [function ()
	{
		return {
			require: "angles",
			link: function (scope, elem, attrs, anglesCtrl)
			{
				console.log(anglesCtrl);
			}
		}
	}]);
}(D3Test.Directives = D3Test.Directives || {} ));
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
(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:PieChartCtrl
     * @description
     *
     * Controller for c3 pie chart.
     */
    D3Test.Modules.D3Test.controller("PieChartCtrl", ['$scope', function ($scope)
    {
        var scope           = $scope;

        scope.pieData       = [
            ["data A", 57],
            ["data B", 20],
            ["Data C", 10],
            ["Data D", 10],
            ["Data E", 3]
        ];



        scope.updatePieChart = function ()
        {
            //console.log('UPDATE THE PIE CHART');
        }


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:pieChart
     * @description
     *
     * Make a pie chart with d3 and c3.
     * @example
     * <pre>
     *     <pie-chart></pie-chart>
     * </pre>
     */
    D3Test.Modules.D3Test.directive("pieChart", [ function ()
    {
        return {
            restrict: 'E',
            controller: 'PieChartCtrl',
            link: function (scope, elm, attrs)
            {
                var chart = c3.generate({
                    bindto: '#pieChart',
                    data: {
                        columns: scope.pieData,
                        type: "pie"
                    }
                });

                scope.$watch(function (newVal, oldVal)
                {
                    if(newVal)
                    {
                        scope.updatePieChart();

                    }
                })
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:TableChartCtrl
     * @description
     *
     * Controller for table chart. Should handle radio button clicks etc.
     */
    D3Test.Modules.D3Test.controller("TableChartCtrl", ['$scope', function ($scope)
    {
        var scope               = $scope;
        scope.answerValue       = "";
        scope.instructions      = "Classify each equation as defining <em>y</em> as a linear or non-linear function of <em>x</em>. Select one per column.";
        scope.tableColumns      = [
            {
                "label": "y = 7 x 4x",
                "linear": false,
                "nonlinear": false,
                "answer": 0
            },
            {
                "label": "y = (2x+5)<sup>2</sup>",
                "linear": false,
                "nonlinear": false,
                "answer": 1
            },
            {
                "label": "y = 10z<sup>2</sup>",
                "linear": false,
                "nonlinear": false,
                "answer": 1
            },
            {
                "label": "y = 5x-3",
                "linear": false,
                "nonlinear": false,
                "answer": 0
            },
            {
                "label": "y = z/2",
                "linear": false,
                "nonlinear": false,
                "answer": 0
            },
            {
                "label": "y = 2x<sup>2</sup> + 1",
                "linear": false,
                "nonlinear": false,
                "answer": 1
            }
        ];
    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:tablechart
     * @description
     *
     * HTML5 based table chart to show examples of how functionality will work.
     */
    D3Test.Modules.D3Test.directive("tablechart", [ function ()
    {
        return {
            restrict: 'E',
            controller: 'TableChartCtrl',
            link: function (scope, elm, attrs)
            {


                /**
                 * @ngdocs method
                 * @methodOf D3Test.directive:tablechart
                 * @name D3Test.tablechart.class:scope#checkAnswer
                 * @description
                 *
                 * Check the selected answers against the correct answers array.
                 * compile table Columns into a new array to compare against the tableAnswers array.
                 */
                scope.checkAnswer = function () {
                    var correctCount        = 0;

                    //console.log(scope.tableColumns.length);

                    for (var i = 0; i < scope.tableColumns.length; i++)
                    {
                        var theAnswer       = scope.tableColumns[i].answer;

                        if( (theAnswer == 0) && (scope.tableColumns[i].linear == true) )
                        {
                            isCorrect           = true;
                            correctCount++;
                        }
                        else if( (theAnswer == 1) && (scope.tableColumns[i].nonlinear == true) )
                        {
                            isCorrect           = true;
                            correctCount++;
                        }
                        else
                        {
                            isCorrect           = false;
                            endChecking("failed");
                        }
                    }

                    if(correctCount == scope.tableColumns.length)
                    {
                        endChecking("Passed");
                    }
                };






                /**
                 * @ngdocs method
                 * @methodOf D3Test.directive:tablechart
                 * @name D3Test.tablechart.class:scope#endChecking
                 * @param {String} passOrFail Determines whether or not the user has gotten all the items correct.
                 * @description
                 *
                 * End Checking for correct answers if just one answer is wrong.
                 */
                function endChecking(passOrFail)
                {
                    scope.answerValue           = passOrFail;
                }

            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));

(function (Controllers, undefined)
{
    D3Test.Modules.D3Test.controller('CheckboxCtrl', ['$scope', 'checkboxFactory', function ($scope, checkboxFactory)
    {
        var scope               = $scope;
        scope.totalRows         = 0;
        scope.totalColumns      = 0;

        scope.checkboxData      = {};
        scope.newtable          = '<table style="width:100%;">' +
            '<thead>'+
            '<tr><th></th></th><th data-ng-repeat="columns in checkboxData.columns">{{columns.title}}</th></tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr data-ng-repeat="rows in checkboxData.rows">' +
            '<td>{{rows.value}}</td>' +
            '<td data-ng-repeat="answer in checkboxData.rows[$index].answers[0] track by $index"><input type="checkbox">{{answer}} -- {{rows.id}}:{{$index}}</td>' +
            '</tr>' +
            '</tbody></table>';

        getData();

        function getData()
        {
            checkboxFactory.getData()
                .success(function (d)
                {
                    console.log(d);
                    scope.checkboxData      = d;
                    buildTable();
                })
                .error(function (error)
                {
                    alert('error in retrieving data');
                });
        }

        function buildTable()
        {

            totalColumns        = scope.checkboxData.columns.length + 1;
            totalRows           = scope.checkboxData.rows.length + 1;
            console.log(scope.checkboxData.rows[0].answers[0]);
        }
    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
    D3Test.Modules.D3Test.directive("checkbox", ['$compile', function ($compile)
    {
        return {
            restrict: 'AE',
            controller: 'CheckboxCtrl',
            transclude: false,
            link: function (scope, elm, attrs)
            {
                var maketable           = $compile(scope.newtable);
                var content             = maketable(scope);
                elm.append(content);
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
(function (Factory, undefined)
{
    D3Test.Modules.D3Test.factory("checkboxFactory", ['$http', function ($http)
    {
        var source          = 'json/checkbox-data.json',
            checkboxFactory = {};

        checkboxFactory.getData = function ()
        {
            return $http.get(source);
        };

        return checkboxFactory;
    }]);
}(D3Test.Factory = D3Test.Factory || {} ));
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
(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:BarCtrl
     * @description
     *
     * Holds the global variables for the Bar Graph directive.
     */
    D3Test.Modules.D3Test.controller("BarCtrl", ['$scope', function ($scope)
    {
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'graphs');

        scope.xBarPoints       = "2.5, 2.5, 2.5, 2.5";
        scope.yBarLabel        = "Number Of Dogs";
        scope.xBarLabel        = "Color of Dogs";
        scope.newBar            = "New Bar Name";
        scope.newBarValue       = 0;


        scope.barData       = [];
        scope.barXLabels    = ["Mixed", "White", "Black", "Others"];

        scope.updateBarChart = function ()
        {
            //reset
            scope.barData       = [];

            //format new data
            scope.barData       = scope.xBarPoints.split(',').map(Number);

            scope.barData.unshift(scope.yBarLabel);

        };

        scope.addNewBar = function ()
        {
            scope.xBarPoints += ", " + scope.newBarValue;
            scope.barXLabels.push(scope.newBar);
            scope.updateBarChart();
        };

        scope.updateBarChart();


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:barGraph
     * @description
     *
     * Adding bar graphs and manipulating their data and display.
     * @example
     * <pre>
     *     <bar-graphs></bar-graphs>
     * </pre>
     */
    D3Test.Modules.D3Test.directive('barGraphs', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'BarCtrl',
            link: function (scope, elm, attrs)
            {
                scope.updateNav("graphs");

                var chart = c3.generate({
                    bindto: '#barGraph',
                    data: {
                        columns: [
                            scope.barData
                        ],
                        type: "bar"
                    },
                    x: scope.xBarLabel,
                    axis: {
                        rotated: true,
                        x: {
                            type: 'category',
                            categories: scope.barXLabels,
                            label: {
                                text: scope.xBarLabel,
                                position: 'outer-middle',
                            }
                        },
                        y: {
                            max: 50,
                            label: {
                                text: scope.yBarLabel,
                                position: 'outer-center'
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true
                        }
                    },
                    padding: {
                        top: 20,
                        bottom: 20,
                        right: 10
                    },
                    legend: {
                        show: false
                    }
                });

                scope.turnHorizontal = function ()
                {
                    //console.log(chart);
                    chart.axis({
                        rotated: true
                    });
                };

                scope.turnVertical = function ()
                {
                    //console.log(chart);
                    chart.axis({
                        rotated: false
                    });
                };

                scope.$watch(function (newVal, oldVal) {
                    if(newVal)
                    {
                        scope.updateBarChart();

                        //reload the graph
                        setTimeout(function ()
                        {
                            chart.axis.labels({
                                x: scope.xBarLabel,
                                y: scope.yBarLabel
                            });
                            chart.load({
                                columns: [
                                    scope.barData
                                ]
                            });
                        });
                    }
                }, true);
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:BoxWhiskerCtrl
     * @description
     *
     * Holds the data and main functions of the box whisker widget.
     */
    D3Test.Modules.D3Test.controller("BoxWhiskerCtrl", [ '$scope', function ($scope)
    {
        var scope           = $scope;

        scope.boxWhiskerData = [
            {"year": 1991, "name":"alpha", "value": 15},
            {"year": 1992, "name":"alpha", "value": 34},
            {"year": 1991, "name":"alpha2", "value": 17},
            {"year": 1992, "name":"alpha2", "value": 65},
            {"year": 1991, "name":"beta", "value": 10},
            {"year": 1992, "name":"beta", "value": 10},
            {"year": 1991, "name":"beta2", "value": 40},
            {"year": 1992, "name":"beta2", "value": 38},
            {"year": 1991, "name":"gamma", "value": 5},
            {"year": 1992, "name":"gamma", "value": 10},
            {"year": 1991, "name":"gamma2", "value": 20},
            {"year": 1992, "name":"gamma2", "value": 34},
            {"year": 1991, "name":"delta", "value": 50},
            {"year": 1992, "name":"delta", "value": 43},
            {"year": 1991, "name":"delta2", "value": 17},
            {"year": 1992, "name":"delta2", "value": 35}
        ];


    }])
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directive, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:boxWhisker
     * @description
     *
     * Create a box whisker chart with multiple abilities.
     * @example
     * <pre>
     *     <box-whisker></box-whisker>
     * </pre>
     */
    D3Test.Modules.D3Test.directive('boxWhisker', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'BoxWhiskerCtrl',
            link: function (scope, elm, attrs)
            {
                //scope.updateNav("graphs");

                var data = [
                    {"year": 1991, "name":"alpha", "value":15},
                    {"year": 1992, "name":"alpha", "value":34},
                    {"year": 1991, "name":"alpha2", "value":17},
                    {"year": 1992, "name":"alpha2", "value":65},
                    {"year": 1991, "name":"beta", "value":10},
                    {"year": 1992, "name":"beta", "value":10},
                    {"year": 1991, "name":"beta2", "value":40},
                    {"year": 1992, "name":"beta2", "value":38},
                    {"year": 1991, "name":"gamma", "value":5},
                    {"year": 1992, "name":"gamma", "value":10},
                    {"year": 1991, "name":"gamma2", "value":20},
                    {"year": 1992, "name":"gamma2", "value":34},
                    {"year": 1991, "name":"delta", "value":50},
                    {"year": 1992, "name":"delta", "value":43},
                    {"year": 1991, "name":"delta2", "value":17},
                    {"year": 1992, "name":"delta2", "value":35}
                ]

                var visualization = d3plus.viz()
                    .container("#boxWhisker")
                    .data(scope.boxWhiskerData)
                    .type("box")
                    .id("name")
                    .x("year")
                    .y("value")
                    .time("year")
                    .ui([{
                        "label": "Visualization Type",
                        "method": "type",
                        "value": ["scatter","box"]
                    }])
                    .draw()


            }
        }
    }])
}(D3Test.Directives = D3Test.Directives || {}));
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

(function (Controllers, undefined)
 {
    /**
     * @ngdoc controller
     * @name D3Test.controller:EquationsCtrl
     * @description
     *
     * Control the variables and interactive functions for the equations-based grid.
     * @example
     * <pre>
     *  return {
     *      restrict: 'AE',
     *      controller: 'EquationsCtrl'
     *      link: function (scope, elm, attrs)
     *      {
     *      }
     *  }
     * </pre>
    **/
    D3Test.Modules.D3Test.controller('EquationsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) 
    {
        var scope           = $scope;
        var margin 		    = {top: 20, right: 20, bottom: 20, left: 20},
            padding 		  = {top: 60, right: 60, bottom: 60, left: 60},
            outerWidth 		= 960,
            outerHeight 	= 960,
            innerWidth 		= outerWidth - margin.left - margin.right,
            innerHeight 	= outerHeight - margin.top - margin.bottom,
            width 			 = innerWidth - padding.left - padding.right,
            height 			= innerHeight - padding.top - padding.bottom,
            circle,
            line;
        
        scope.gridX         = 400;
        scope.gridY         = 400;

        this.yaxiscoor      = d3.range(25, height, 25);
        this.xaxiscoor      = d3.range(25, width, 25);
        scope.unitX         = 550;
        scope.unitY         = 550;
        scope.answerArray   = [];
        scope.plottedAnswer;
        
        scope.equation      = {x1: 0, x2: 0, y1: 0, y2: 0, rotation: 0};

        scope.updateNav = function (data)
        {
            $scope.$emit('updateCurrentPage', data);
        }
    }]);
}( D3Test.Controllers = D3Test.Controllers || {} ));
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
(function (Controllers, undefined) {
    /**
     * @ngdoc controller
     * @name D3Test.controller:ImageMapCtrl
     * @description 
     *
     * Use maps to make an image that can be shaded and have labels added to it.
    **/
    D3Test.Modules.D3Test.controller("ImageMapCtrl", [ '$scope', '$timeout', function ($scope, $timeout) {
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'graphs');
        
        var margin          = {top: 20, right: 20, bottom: 20, left: 20},
            padding         = {top: 60, right: 20, bottom: 60, left: 60},
            outerWidth          = 960,
            outerHeight         = 960,
            innerWidth          = outerWidth - margin.left - margin.right,
            innerHeight         = outerHeight - margin.top - margin.bottom,
            width               = innerWidth - padding.left - padding.right,
            height              = innerHeight - padding.top - padding.bottom,
            circle, line;
        
        scope.gridX             = 400;
        scope.gridY             = 400;
        scope.unit              = 25;

        scope.yaxiscoor         = d3.range(scope.unit, height, scope.unit);
        scope.xaxiscoor         = d3.range(scope.unit, width, scope.unit);
        scope.unitX             = 550;
        scope.unitY             = 550;
        scope.drawingDirection  = 0; //0 for left, 1 for right
        scope.curStyle          = 0;
        scope.width             = width;
        scope.height            = height;
        scope.margin            = margin;


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined) {
    /**
     * @ngdoc directive
     * @name D3Test.directive:imagemap
     * @description
     *
     * Draw new maps based on svg image drawn. 
     * Create functions for controlling shading, labeling and manipulation of map sections.
    **/
    D3Test.Modules.D3Test.directive("imagemap", [ function () {
        return {
            restrict: 'E',
            controller: 'ImageMapCtrl',
            link: function (scope, elm, attrs) {
                var margin           = scope.margin;
                var mapObjArray      = [];
                
                
                var x = d3.scale.linear()
                    .domain([-(scope.domainWidth), scope.domainWidth])
                    .range([0, scope.width]);

                var y = d3.scale.linear()
                    .domain([-(scope.domainHeight), scope.domainHeight])
                    .range([scope.height, 0]);
                
                var svg = d3.select('#imagemap')
                    .append('svg')
                    .attr('width', scope.width + margin.left + margin.right)
                    .attr('height', scope.height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + scope.margin.left + ', ' + scope.margin.top + ')');
                
                var mapObj = svg.append('g');
                
                var maps                = elm.find('#Map');
                var mapObject           = maps[0].children[3].children;
                var totalMapObjects     = mapObject.length;
                //console.log(mapObject);
                //console.log(mapObject[0].children[3].children);
                
                for(var i = 0; i < totalMapObjects; i++)
                {
                    mapObjArray.push(mapObject[i].id);
                }
                
               /* mapObj.append("use")
                    .attr("xlink:href", "#Map")
                    .data(mapObjArray);*/
                    //.attr("xlink:href", "#sea_-_back")
                    //.attr("xlink:href", "#gray_territory")
                    //.attr("xlink:href", "#white_territory")
                    //.attr("xlink:href", "#borders")
                    //.attr("xlink:href", "#border_Europe");
                
                for (var x = 0; x < totalMapObjects; x++)
                {
                    mapObj.append("use")
                    .data(mapObjArray)
                    .attr("xlink:href", "#" + mapObjArray[x])
                    .attr("cursor", "pointer")
                    .on("mousedown", mapMouseDown);
                }
                
                
                function mapMouseDown()
                {
                    console.log(this.href.baseVal);
                    //this.attr('fill', 'red');
                    $(this.href.baseVal).attr("fill", "green");
                }
                
                
                
            }
        }
        
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
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

(function (Controllers, undefined)
{
	/**
	 * @ngdoc controller
	 * @name D3Test.controller:ScatterPlotsCtrl
	 * @description 
	 *
	 * 
	**/

	D3Test.Modules.D3Test.controller('ScatterPlotsCtrl', ['$scope', '$rootScope', '$element', function ($scope, $rootScope, $element)
	{
        $scope.$emit('updateCurrentPage', 'graphs');
		var scope 				= $scope;
		var rootScope 			= $rootScope;

		scope.xScatterLabel 	= "Average Temperature (F)";
		scope.xLabel 			= "Avg Temp (F)";
		scope.yScatterLabel 	= "Visitors";
		scope.xScatterPoints 	= "39, 35, 14, 25, 90, 80";
		scope.yScatterPoints 	= "200, 1000, 321, 2000, 1240, 80";
		scope.xScatterData 		= [];
		scope.yScatterData 		= [];
		scope.startingPoint		= 0;
		scope.endingPoint 		= 0;
		scope.scatterData 		= [];

		var defaultXPoints 		= scope.xScatterPoints;
		var defaultYPoints 		= scope.yScatterPoints;

		scope.updateScatterPlot = function ()
		{
			//reset
			scope.xScatterData 		= [];
			scope.yScatterData 		= [];

			//format new xPoints and yPoints
			scope.xScatterData 		= scope.xScatterPoints.split(',').map(Number);
			scope.yScatterData 		= scope.yScatterPoints.split(',').map(Number);


			scope.xScatterData.unshift(scope.xScatterLabel);
			scope.yScatterData.unshift(scope.yScatterLabel);

			for(var i = 0; i < scope.xScatterData.length; i++)
			{
				scope.scatterData.push([scope.xScatterData[i], scope.yScatterData[i]]);
				//scope.scatterData.push("[" + scope.xData[i] + ", " + scope.yData + "]");
			}
		};

		scope.updateNav = function (data)
		{
			$scope.$emit('updateCurrentPage', data);
		};

		scope.updateScatterPlot();
	}]);
} (D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:scatterPlots
	 * @description
	 *
	 * This directive controls the scatter plots options for Image Mapping and Drawing.
	 * Will allow for plot points to be entered and place them on a grid
	 * for manipulation
	 * @example
	 * <pre>
	 * 		<scatter-plots></scatter-plots>
	 * </pre>
	**/

	D3Test.Modules.D3Test.directive('scatterPlots', [ function ()
	{
		return {
			restrict: 'E',
			controller: 'ScatterPlotsCtrl',
			link: function (scope, elm, attrs)
			{
				scope.updateNav("graphs");
				var startDrawing		= false;
				var scatterPlotsSVG 	= elm.find('.scatterPlots')[0].children[0];
				var actualSVG;
				var startX, startY, endX, endY, svg, cir;




				var chart = c3.generate({
					bindto: '.scatterPlots',
					data: {
				        columns: [
				            scope.xScatterData,
				            scope.yScatterData
				        ],
				        x: scope.xScatterLabel,//scope.xScatterLabel,
				        type: 'scatter',
				        onclick: function (d, element) { 
				        	actualSVG.append('<line x1="0" y1="0" x2="98" y2="423" style="stroke:rgb(255,0,0);stroke-width:2" />');
				        	if(startDrawing == false)
				        	{
				        		startDrawing = true;
				        		startX 			= Math.round(element.cx.animVal.value);
				        		startY 			= Math.round(element.cy.animVal.value);
				        		endX 			= startX;
				        		endY 			= startY;
				        	}
				        	else
				        	{
				        		startDrawing = false;
				        		endX 			= Math.round(element.cx.animVal.value);
				        		endY 			= Math.round(element.cy.animVal.value);
				        	}

							svg = d3.select('g .c3-circles');
							cir = svg.append('line')
								.attr('x1', startX)
								.attr('y1', startY)
								.attr('x2', endX)
								.attr('y2', endY);
				        }
				    },
				    axis: {
				        x: {
				        	max: 120,
				        	min: -20,
				        	tick: {
				        		centered: true,
				        		culling: {
				        			max: 30
				        		},
				        		values: [-20, -10, 0,10,20,30,40,50,60,70,80,90,100,110, 120]
				        	},
				            label: {
				            	text: scope.xScatterLabel,
				            	position: 'outer-left'
				            }
				        },
				        y: {
				            label: {
				            	text: scope.yScatterLabel,
				            	position: 'outer-middle'
				            }
				        }
				    },
				    grid: {
				    	x: {
				    		show: true
				    	},
				    	y: {
				    		show: true
				    	}
				    },
				    point: {
				    	r: 5
				    },
				    padding: {
				    	top: 20,
				    	bottom: 20,
				    	right: 10
				    },
				    legend: {
				    	show: false
				    }
				});

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:scatterPlots
				 * @name D3Test.scatterPlots.class:resetScatterLines
				 * @description 
				 * 
				 * Reset all your drawn lines
				**/
				scope.resetScatterLines = function ()
				{
					svg.selectAll('line').remove();
				}




				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:scatterPlots
				 * @name D3Test.scatterPlots.class:watch
				 * @description
				 *
				 * Watch the plot points and labels for changes then update the c3.js chart.
				**/
				scope.$watchGroup(['xScatterPoints', 'yScatterPoints', 'xScatterLabel', 'yScatterLabel'], function (newVal, oldVal, scope)
				{
					scope.updateScatterPlot();

					setTimeout(function ()
					{
						chart.load({
							columns: [
								scope.xScatterData,
								scope.yScatterData
							]
						});

						chart.axis.labels({
							x: scope.xScatterLabel,
							y: scope.yScatterLabel
						});


						var sp = elm.find('.scatterPlots svg');
						var spCircle = elm.find('.c3-circle-5');
						actualSVG = elm.find('g.c3-circles');

						function svgMouseOver()
						{
							console.log('move it');
						}

					}, 1000);
				})
			}
		}
	}]);
} (D3Test.Directives = D3Test.Directives || {} ));
(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:GeometryCtrl
     * @description
     *
     * Controller for all geometry widgets. Should know which type we are creating based on the
     * directive being used.
     */
    D3Test.Modules.D3Test.controller("GeometryCtrl", ['$scope', function ($scope)
    {
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'geometry');
        scope.curScale      = 1;
        scope.objDegrees    = 0;


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:geometrycirc
     * @description
     *
     * Circumference-based graphing widgets to test geometry comprehension.
     */
    D3Test.Modules.D3Test.directive('geometrycirc', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'GeometryCtrl',
            link: function (scope, elm, attrs)
            {
                /*var margin          = {top: 20, right: 20, bottom: 20, left: 20},
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

                var svg = d3.select(".geometrycirc")
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
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
                    .attr("id", "shapes");*/




                function UnitCircle() {

                    var main = d3.select('.geometrycirc')
                    var width = 480
                        , height = 600
                        , radius = 80
                        , angleAliases = {}
                        , labelType = 0

                    $('input[name=labelType]:radio').on("change", function(){
                        labelType = $(this).val()
                        stdAngles()
                        $(".angleSweep").remove()
                        drawAngleSweep(lastAngle)
                        console.log(labelType)
                    })

                    //Lookup table
                    angleAliases[parseFloat(0).toFixed(2)] = ["0 or 2?", "0° or 360°", "0", "1"]; //Radians, degrees, sin, cos

                    angleAliases[parseFloat(Math.PI/6).toFixed(2)] = ["?/6", "30°", "1/2", "?3/2"];
                    angleAliases[parseFloat(Math.PI/4).toFixed(2)] = ["?/4", "45°", "1/?2", "1/?2"];
                    angleAliases[parseFloat(Math.PI/3).toFixed(2)] = ["?/3", "60°", "?3/2", "1/2"];

                    angleAliases[parseFloat(Math.PI/2).toFixed(2)] = ["?/2", "90°", "1", "0"];

                    angleAliases[parseFloat(2*(Math.PI/3)).toFixed(2)] = ["2?/3", "120°", "?3/2", "-1/2"];
                    angleAliases[parseFloat(3*(Math.PI/4)).toFixed(2)] = ["3?/4", "135°", "1/?2", "-1/?2"];
                    angleAliases[parseFloat(5*(Math.PI/6)).toFixed(2)] = ["5?/6", "150°", "1/2", "-?3/2"];

                    angleAliases[parseFloat(Math.PI).toFixed(2)] = ["?", "180°", "0", "1"];

                    angleAliases[parseFloat(7*(Math.PI/6)).toFixed(2)] = ["7?/6", "210°", "-1/2", "-?3/2"];
                    angleAliases[parseFloat(5*(Math.PI/4)).toFixed(2)] = ["5?/4", "225°", "-1/?2", "-1/?2"];
                    angleAliases[parseFloat(4*(Math.PI/3)).toFixed(2)] = ["4?/3", "240°", "-?3/2", "-1/2"];

                    angleAliases[parseFloat(3*(Math.PI/2)).toFixed(2)] = ["3?/2", "270°", "-1", "0"];

                    angleAliases[parseFloat(5*(Math.PI/3)).toFixed(2)] = ["5?/3", "300°", "-?3/2", "1/2"];
                    angleAliases[parseFloat(7*(Math.PI/4)).toFixed(2)] = ["7?/4", "315°", "-1/?2", "1/?2"];
                    angleAliases[parseFloat(11*(Math.PI/6)).toFixed(2)] = ["11?/6", "330°", "-1/2", "?3/2"];

                    console.log(angleAliases);

                    //Main group
                    var svg = main.append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 3 + "," + height / 3 + ") scale(1, -1)")
                        .on("mousedown", function() {
                            console.log(d3.mouse(this))
                        })
                    //.attr("transform", "rotate(180deg)")

                    //Axes and arrows
                    var axisColor = "rgba(100,100,100,1)"
                    svg.append("line")
                        .attr("class", "y")
                        .attr("y1", -(radius+30))
                        .attr("y2", (radius+30))
                        .style("fill", "none")
                        .style("stroke", axisColor)
                        .style("stroke-width", "2px")
                    svg.append("line")
                        .attr("class", "x")
                        .attr("x1", -(radius+30))
                        .attr("x2", (radius+30))
                        .style("fill", "none")
                        .style("stroke", axisColor)
                        .style("stroke-width", "2px")
                    svg.append("polygon")
                        .attr("class", "ynArrow")
                        .attr("points", "0,"+(radius+40)+" 5,"+(radius+30)+" -5,"+(radius+30))
                        .style("fill", axisColor)
                    svg.append("polygon")
                        .attr("class", "ypArrow")
                        .attr("points", "0,"+ -(radius+40)+" 5,"+ -(radius+30)+" -5,"+ -(radius+30))
                        .style("fill", axisColor)
                    svg.append("polygon")
                        .attr("class", "xnArrow")
                        .attr("points", -(radius+40)+",0 "+-(radius+30)+",5 "+-(radius+30)+",-5")
                        .style("fill", axisColor)
                    svg.append("polygon")
                        .attr("class", "xpArrow")
                        .attr("points",  (radius+40)+",0 "+(radius+30)+",5 "+(radius+30)+",-5")
                        .style("fill", axisColor)
                    //Center
                    svg.append("circle")
                        .attr("class", "center")
                        .attr("r", "5px")
                        .style("fill", "rgba(40, 40, 40, 1.0)")


                    //Circle
                    svg.append("circle")
                        .attr("class", "uc")
                        .attr("r", radius)
                        .style("fill", "rgba(0,0,0,0)")
                        .style("stroke", "rgba(40, 40, 40, 1)")
                        .style("stroke-width", "4px")


                    function drawAngleMark(angle) {
                        var length = 30
                            , width = 2
                            , color = "rgba(40,40,40,1)"
                            , cos = Math.cos(angle)
                            , sin = Math.sin(angle)
                            , coords = { inner: { x: (radius-(length/2))*cos
                                , y: (radius-(length/2))*sin }
                                , outer: { x: (radius+(length/2))*cos
                                    , y: (radius+(length/2))*sin }
                                , text: { x: (radius+(2*length))*cos - length/2
                                    , y: (radius+(2*length))*sin - length/4}
                                , center: { x: radius*cos
                                    , y: radius*sin }
                            }

                        //Line mark
                        svg.append("line")
                            .attr("class", "angleMark")
                            .attr("x1", coords.inner.x)
                            .attr("y1", coords.inner.y)
                            .attr("x2", coords.outer.x)
                            .attr("y2", coords.outer.y)
                            .style("fill", "none")
                            .style("stroke", color)
                            .style("stroke-width", "3.5px")

                        //Circle
                        svg.append("circle")
                            .attr("class", "angleMark")
                            .attr("cx", coords.center.x)
                            .attr("cy", coords.center.y)
                            .attr("r", 15)
                            .style("fill", "rgba(0,0,0,0)")
                            .style("stroke", "none")

                        //Text
                        svg.append("text")
                            .attr("class", "angleMark")
                            .attr("x", coords.text.x)
                            .attr("y", coords.text.y)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (coords.text.x-(1)*coords.text.x) +", "+ (coords.text.y-(-1)*coords.text.y) +")")
                            .attr("font-family", "monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", color)
                            .text(angleAliases[parseFloat(angle).toFixed(2)][labelType])
                    }

                    var lastAngle = 1.23
                    drawAngleSweep(lastAngle)

                    function drawAngleSweep(angle) {

                        lastAngle = angle

                        var length = 30
                            , width = 2
                            , color = "rgba(40,40,40,1)"
                            , cos = Math.cos(angle)
                            , sin = Math.sin(angle)
                            , coords = {  x: radius*cos
                                , y: radius*sin }
                            , textCoords = {  x: (radius+5)*cos
                                , y: (radius+5)*sin };

                        angleDisplay = (labelType == 0) ? parseFloat(angle).toFixed(2)+" rad" : parseFloat((180/Math.PI)*angle).toFixed(2) + "°"

                        svg.append("text")
                            .attr("class", "angleSweep")
                            .attr("x", 230)
                            .attr("y", 187)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (200-(1)*200) +", "+ (187-(-1)*187) +")")
                            .attr("font-family", "'Consolas', monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "rgba(255,0,0,1)")
                            .text("? = "+angleDisplay)

                        svg.append("text")
                            .attr("class", "angleSweep")
                            .attr("x", 340)
                            .attr("y", 187)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (340-(1)*340) +", "+ (187-(-1)*187) +")")
                            .attr("font-family", "'Consolas', monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "rgba(0,0,0,1)")
                            .text("(")
                        svg.append("text")
                            .attr("class", "angleSweep")
                            .attr("x", 350)
                            .attr("y", 187)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (340-(1)*340) +", "+ (187-(-1)*187) +")")
                            .attr("font-family", "'Consolas', monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "rgba(0,200,0,1)")
                            .text(parseFloat(cos).toFixed(2))
                        svg.append("text")
                            .attr("class", "angleSweep")
                            .attr("x", 388)
                            .attr("y", 187)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (340-(1)*340) +", "+ (187-(-1)*187) +")")
                            .attr("font-family", "'Consolas', monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "rgba(0,0,0,1)")
                            .text(",")
                        svg.append("text")
                            .attr("class", "angleSweep")
                            .attr("x", 395)
                            .attr("y", 187)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (340-(1)*340) +", "+ (187-(-1)*187) +")")
                            .attr("font-family", "'Consolas', monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "rgba(0,0,255,1)")
                            .text(parseFloat(sin).toFixed(2))
                        svg.append("text")
                            .attr("class", "angleSweep")
                            .attr("x", 435)
                            .attr("y", 187)
                            //.attr("transform", "rotate(90, "+coords.text.x+", "+coords.text.y+")")
                            .attr("transform", "matrix(1, 0, 0, -1, "+ (340-(1)*340) +", "+ (187-(-1)*187) +")")
                            .attr("font-family", "'Consolas', monospace, sans-serif")
                            .attr("font-size", "12px")
                            .attr("fill", "rgba(0,0,0,1)")
                            .text(")")

                        //Center to circle
                        svg.append("line")
                            .attr("class", "angleSweep")
                            .attr("x1", 0)
                            .attr("y1", 0)
                            .attr("x2", coords.x)
                            .attr("y2", coords.y)
                            .style("fill", "none")
                            .style("stroke", color)
                            .style("stroke-width", "2px")

                        //Y component
                        svg.append("line")
                            .attr("class", "angleSweep")
                            .attr("x1", 0)
                            .attr("y1", 0)
                            .attr("x2", coords.x)
                            .attr("y2", 0)
                            .style("fill", "none")
                            .style("stroke", "rgba(0,255,0,1)")
                            .style("stroke-width", "2px")

                        //X component
                        svg.append("line")
                            .attr("class", "angleSweep")
                            .attr("x1", coords.x)
                            .attr("y1", 0)
                            .attr("x2", coords.x)
                            .attr("y2", coords.y)
                            .style("fill", "none")
                            .style("stroke", "rgba(0,0,255,1)")
                            .style("stroke-width", "2px")
                            .attr("stroke-dasharray", "5, 5")

                        //Right Angle Symbol and coordinates
                        if(coords.x !== 0 && coords.y !== 0){
                            var xSize = (coords.x < 0 ? -Math.floor(radius/18) : Math.floor(radius/18))
                                , ySize = (coords.y < 0 ? -Math.floor(radius/18) : Math.floor(radius/18))

                            svg.append("polyline")
                                .attr("class", "angleSweep")
                                .attr("points", (coords.x-xSize)+",0 "+
                                (coords.x-xSize)+","+ySize+" "+
                                (coords.x)+","+(ySize))
                                .style("fill", "none")
                                .style("stroke", color)
                                .style("stroke-width", "2px")


                        }
                        //Point on circle
                        svg.append("circle")
                            .attr("class", "angleSweep")
                            .attr("cx", coords.x)
                            .attr("cy", coords.y)
                            .attr("r", 5)
                            .style("fill", color)
                            .style("stroke", "none")

                        //Angle arc
                        var anglePath = d3.svg.arc()
                            .outerRadius(21)
                            .innerRadius(19)
                            .startAngle(Math.PI/2)
                            .endAngle(angle+(Math.PI/2))
                        svg.append("path")
                            .attr("class", "angleSweep")
                            .attr("d", anglePath)
                            .attr("r", 20)
                            .style("stroke", "rgba(255,0,0,1)")
                            .style("fill", "rgba(255,0,0,1)")

                    }

                    var timedOut = 0
                        , draw = function(that){

                            var mousePos = d3.mouse(that)

                            if(mousePos[0] === 0 || mousePos[1] === 0) return

                            var referenceAngle = Math.atan(mousePos[1]/mousePos[0])
                            referenceAngle += (referenceAngle < 0) ? Math.PI/2 : 0

                            if(mousePos[0] >= 0 && mousePos[1] >= 0) angleToMouse = referenceAngle
                            else if(mousePos[0] <= 0 && mousePos[1] >= 0) angleToMouse = referenceAngle + (Math.PI/2)
                            else if(mousePos[0] <= 0 && mousePos[1] <= 0) angleToMouse = referenceAngle + Math.PI
                            else if(mousePos[0] >= 0 && mousePos[1] <= 0) angleToMouse = referenceAngle + 3*(Math.PI/2)
                            else return

                            console.log(angleToMouse);
                            $(".angleSweep").remove()
                            drawAngleSweep(angleToMouse)

                            timedOut = 1
                            setTimeout(function(){
                                timedOut = 0
                            }, 10)

                        }

                    svg.on("mousemove", function(){
                        if(!timedOut) draw(this)
                    })

                    function stdAngles() {
                        $('.angleMark').remove()

                        drawAngleMark(0)

                        drawAngleMark((Math.PI/6))
                        drawAngleMark((Math.PI/3))
                        drawAngleMark((Math.PI/4))

                        drawAngleMark(Math.PI/2)

                        drawAngleMark(5*(Math.PI/6))
                        drawAngleMark(2*(Math.PI/3))
                        drawAngleMark(3*(Math.PI/4))

                        drawAngleMark(Math.PI)

                        drawAngleMark(7*(Math.PI/6))
                        drawAngleMark(4*(Math.PI/3))
                        drawAngleMark(5*(Math.PI/4))

                        drawAngleMark(3*Math.PI/2)

                        drawAngleMark(11*(Math.PI/6))
                        drawAngleMark(5*(Math.PI/3))
                        drawAngleMark(7*(Math.PI/4))
                    }

                    stdAngles()

                }

                UnitCircle();







            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
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
(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:NumberLineCtrl
     * @description
     *
     * baseline values and set up for d3 number line widget. Holds all values, scaling and
     * other variables.
     * <pre>
     *  return {
        restrict: 'E',
        controller: 'NumberLineCtrl',
        ...
        }
     * </pre>
     */
    D3Test.Modules.D3Test.controller("NumberLineCtrl", [ '$scope', '$timeout', function ($scope, $timeout)
    {
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'number_lines');

        var drawingType;
        var margin              = {top: 20, right: 20, bottom: 20, left: 20},
            padding             = {top: 60, right: 60, bottom: 60, left: 60},
            outerWidth          = 960,
            outerHeight         = 960,
            innerWidth          = outerWidth - margin.left - margin.right,
            innerHeight         = outerHeight - margin.top - margin.bottom,
            width               = innerWidth - padding.left - padding.right,
            height              = innerHeight - padding.top - padding.bottom,
            circle,
            line;
        
        scope.gridX             = 400;
        scope.gridY             = 400;

        scope.unit              = 25;
        
        scope.addLabel          = false;
        scope.timelineLabel     = "";
        scope.labelArray        = [];

        scope.yaxiscoor         = d3.range(scope.unit, height, scope.unit);
        scope.xaxiscoor         = d3.range(scope.unit, width, scope.unit);
        scope.unitX             = 550;
        scope.unitY             = 550;
        scope.drawingDirection  = 0; //0 for left, 1 for right
        scope.curStyle          = 0;
        scope.width             = width;
        scope.height            = height;
        scope.margin            = margin;
        scope.drawStyle         = [
            {
                "id": 0,
                "type": "closeAll",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'}
            },
            {
                "id": 1,
                "type": "openEnd",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'}
            },
            {
                "id": 2,
                "type": "closedEnd",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'}
            },
            {
                "id": 3,
                "type": "openAll",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'}
            }
        ];


        scope.drawingType     = [
            {
                "type": "ray",
                "active": false
            },
            {
                "type": "segment",
                "active": true
            }
        ];


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
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
(function (Directives, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:timeline
	 * @description
	 *
	 * Timeline based on numberline widget base.
	**/
	D3Test.Modules.D3Test.directive("timeline", [ function ()
	{
		return {
			restrict: 'E',
			controller: 'NumberLineCtrl',
			link: function (scope, elm, attrs)
			{
				//set scope height for how tall we want the time line to be
				scope.height 			= 100;
				scope.unit 				= 50;

				var domainWidth 		= scope.width / 50,
					domainHeight 		= scope.height / 50,
					margin 				= scope.margin,
                    parseDate           = d3.time.format("%Y"),
                    chartHeight     	= scope.height/scope.unit,
                    chartWidth      	= 10;//scope.width/scope.unit;

                var timelineData 		= [{"date": "Jan 1776"}, 
                                           { "date": "Dec 1872"}, 
                                           {"date": "Feb 1892"}, 
                                           {"date": "April 1920"}, 
                                           {"date": "March 1945"}, 
                                           {"date": "Oct 1976"}, 
                                           {"date": "Sept 2001"}, 
                                           {"date": "Nov 2012"}];
                
                var totalDates 			= timelineData.length - 1;
                
                var format = d3.time.format("%Y-%m-%d");
                format.parse("2011-01-01"); // returns a Date
                console.log(parseDate(new Date(timelineData[totalDates].date))); // returns a string

				//start new graph
				var x = d3.scale.linear()
					.domain([parseDate(new Date(timelineData[0].date)), parseDate(new Date(timelineData[totalDates].date))])
                    //.domain([1000,3000])
					.range([0, scope.width]);

				var y = d3.scale.linear()
					.domain([-(domainHeight), domainHeight])
					.range([scope.height, 0]);

				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.tickSubdivide(true)
					.tickSize(-scope.height + 10);

				var svg = d3.select("#timeline")
					.append("svg")
					.attr("width", scope.width + margin.left + margin.right)
					.attr("height", scope.height + margin.top + margin.bottom)
					.on("mousedown", timelineMouseDown)
					.on("mouseup", timelineMouseUp)
					.append("g")
					.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0, " + scope.height + ")")
					.call(xAxis);

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:timeline
				 * @name D3Test.timeline.class:convertToNumber
				 * @param {String} obj String to convert to a number
				 * @description
				 * 
				 * Convert to a number.
				**/
				function convertToNumber (obj)
				{

				}


				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:timeline
				 * @name D3Test.timeline.class:timelineMouseDown
				 * @description
				 *
				 * Mouse down 
				**/
				function timelineMouseDown ()
				{
					//this should handle all the clicks from the mouse
				}





				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:timeline
				 * @name D3Test.timeline.class:timelineMouseUp
				 * @description
				 *
				 * Handle mouse up functions for the timeline.
				**/
				function timelineMouseUp ()
				{

				}





				/**
				 * @ngdoc method 
				 * @methodOf D3Test.directive:timeline
				 * @name D3Test.timeline.class:start
				 * @description
				 *
				 * Start the timeline directive by drawing the grid.
				**/
				function start()
				{
					svg.select('.x.axis').call(xAxis);

				}




			}
		}
	}]);
}(D3Test.Directves = D3Test.Directives || {} ));
(function (Controllers,undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:ClockCtrl
     * @description
     *
     * Holds the data and main functions of the clock widget.
     */
    D3Test.Modules.D3Test.controller('ClockCtrl', ['$scope', function ($scope)
    {
        $scope.handsByDefault       = true;
        $scope.$emit('updateCurrentPage', 'time');
    }]);

}(D3Test.Controller = D3Test.Controllers || {} ));

(function (Directive, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:clock
	 * @description
	 * 
	 * An analog clock example in d3. Should be able to add minute
	 * and hour hands and shade time areas.
	**/
	D3Test.Modules.D3Test.directive("clock", [ function ()
	{
		return {
			restrict: 'E',
			controller: 'ClockCtrl',
			link: function (scope, elm, attrs)
			{
				var svg,
					radians 			= 0.0174532925,
					clockRadius 		= 200,
					margin 				= 50,
					width 				= (clockRadius + margin) * 2,
					height 				= (clockRadius + margin) * 2,
					hourHandLength		= 2 * clockRadius/3,
					minuteHandLength 	= clockRadius,
					secondHandLength 	= clockRadius - 12,
					secondHandBalance 	= 30,
					secondTickStart 	= clockRadius,
					secondTickLength 	= -10,
					hourTickStart 		= clockRadius,
					hourTickLength 		= -18,
					secondLabelRadius 	= clockRadius + 16,
					secondLabelYOffset 	= 5,
					hourLabelRadius 	= clockRadius - 40,
					hourLabelYOffset 	= 7,
					mouseMoving 		= false,
					hands;

				var hourScale 			= d3.scale.linear()
					.range([0,330])
					.domain([0,11]);

				var minuteScale			= secondScale = d3.scale.linear()
					.range([0,354])
					.domain([0,59]);

				var handData 			= [
					{
						type: 'hour',
						value: 0,
						length: -hourHandLength,
						scale: hourScale
					},
					{
						type: 'minute',
						value: 0,
						length: -minuteHandLength,
						scale: minuteScale
					},
					{
						type: 'second',
						value: 0,
						length: -secondHandLength,
						scale: secondScale,
						balance: secondHandBalance
					}
				];

				function drawClock ()
				{
					//create all the elements for the clock
					updateData();
					svg = d3.select("#clockContainer")
						.append('svg')
						.attr('width', width)
						.attr('height', height);

					var face 	= svg.append('g')
						.attr('id', 'clock-face')
						.attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

					//seconds
					face.selectAll('.second-tick')
						.data(d3.range(0,60)).enter()
						.append('line')
						.attr('class', 'second-tick')
						.attr('x1',0)
						.attr('x2', 0)
						.attr('y1', secondTickStart)
						.attr('y2', secondTickStart + secondTickLength)
						.attr('transform', function (d)
						{
							return 'rotate(' + secondScale(d) + ')';
						});

					//labels
					face.selectAll('.second-label')
						.data(d3.range(5,61,5))
						.enter()
						.append('text')
						.attr('class', 'second-label')
						.attr('text-anchor', 'middle')
						.attr('x', function (d)
						{
							return secondLabelRadius * Math.sin(secondScale(d)*radians);
						})
						.attr('y', function (d)
						{
							return -secondLabelRadius * Math.cos(secondScale(d)*radians) + secondLabelYOffset;
						})
						.text(function (d)
						{
							return d;
						});

					//hours
					face.selectAll('.hour-tick')
						.data(d3.range(0,12)).enter()
						.append('line')
						.attr('class', 'hour-tick')
						.attr('x1', 0)
						.attr('x2', 0)
						.attr('y1', hourTickStart)
						.attr('y2', hourTickLength + hourTickStart)
						.attr('transform', function (d)
						{
							return 'rotate(' + hourScale(d) + ')';
						});

					//label the hours
					face.selectAll('.hour-label')
						.data(d3.range(3,13,3))
						.enter()
						.append('text')
						.attr('class', 'hour-label')
						.attr('text-anchor', 'middle')
						.attr('x', function (d)
						{
							return hourLabelRadius * Math.sin(hourScale(d) * radians);
						})
						.attr('y', function (d)
						{
							return -hourLabelRadius * Math.cos(hourScale(d) * radians) + hourLabelYOffset;
						})
						.text(function (d)
						{
							return d;
						});

					hands 		= face.append('g').attr('id', 'clock-hands');

					face.append('g').attr('id', 'face-overlay')
						.append('circle')
						.attr('class', 'hands-cover')
						.attr('x', 0)
						.attr('y', 0)
						.attr('r', clockRadius/20);

					if(scope.handsByDefault == true)
					{
						var clockHands 		= elm.find('.clockContainer svg #clock-face #clock-hands');
						console.log(clockHands.children);
						
					}
					scope.addHands();

				}

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:clock
				 * @name D3Test.clock.class:addHands
				 * @param {String} handType Which type of hand are we adding?
				 * @description
				 *
				 * This function adds hands to the face of the clock.
				**/
				scope.addHands = function ()
				{
					hands.selectAll('line')
						.data(handData)
						.enter()
						.append('line')
						.attr('class', function (d)
						{
							return d.type + '-hand';
						})
						.attr('x1',0)
						.attr('y1', function (d)
						{
							return d.balance ? d.balance : 0;
						})
						.attr('x2', 0)
						.attr('y2', function (d)
						{
							return d.length;
						})
						.attr('transform', function (d)
						{
							return 'rotate(' + d.scale(d.value) + ')';
						})
						.on('mousedown', function (d)
						{
							var clickType = d.type;
							//clockMouseDown(clickType);
						})
				}





				/**
				**/
				scope.showHand = function (handType)
				{

				}

				

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:clock
				 * @name D3Test.clock.class:moveHands
				 * @description
				 *
				 * Move the hands on the clock based on data sent.
				**/
				function moveHands()
				{
					d3.select('#clock-hands').selectAll('line')
						.data(handData)
						.transition()
						.attr('transform', function (d)
						{
							return 'rotate(' + d.scale(d.value) + ')';
						});
				}





				/**
                 * @ngdoc method
                 * @methodOf D3Test.directive:clock
                 * @name D3Test.clock.class:clockMouseDown
                 * @description
                 *
                 * Control moving minute, hour and second hands to desired position
				**/
				function clockMouseDown (e)
				{
					switch (e)
					{
						case 'hour':
							console.log('allow movement of  ' + e + ' hand.');
							svg.on('mousemove', clockMouseMove);
						break;

						case 'minute':
							console.log('allow movement of  ' + e + ' hand.');
							svg.on('mousemove', clockMouseMove);
						break;

						case 'second':
							console.log('allow movement of  ' + e + ' hand.');
							svg.on('mousemove', clockMouseMove);
						break;
					}
				}

				/**
                 * @ngdoc method
                 * @methodOf D3Test.directive:clock
                 * @name D3Test.clock.class:clockMouseUp
                 * @description
                 *
                 * Stop movement of elements. Catpure current values.
				**/
				function clockMouseUp ()
				{
					mouseMoving 		= false;
					svg.on('mousemove', null);
				}





				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:clock
				 * @name D3Test.clock.class:clockMouseMove
				 * @description
				 *
				 * Moving the specified clock hand around the radius of the clock face.
				**/
				function clockMouseMove ()
				{
					mouseMoving 		= true;
					var m 				= d3.mouse(this);
					var x 				= m[0];
					var y 			 	= m[1];
					var r 				= 0;

					console.log('x: ' + x); console.log(x^2);
					console.log('y: ' + y);console.log(y^2);
					r 					= x^2 + y^2;
					console.log('position: ' + r);
					d3.select('.hour-hand')
						.transition()
						.attr('transform', 'rotate(' + r + ')');


					/*d3.select('#clock-hands').selectAll('line')
						.data(handData)
						.transition()
						.attr('transform', function (d)
						{
							return 'rotate(' + d.scale(d.value) + ')';
						});*/

					mouseMoving 		= false;
				}






				function updateData ()
				{
					var t = new Date();
					handData[0].value 	= (t.getHours() % 12) + t.getMinutes()/60;
					handData[1].value 	= t.getMinutes();
					handData[2].value 	= t.getSeconds();
				}

				//draw the clock
				drawClock();

				setInterval(function ()
				{
					updateData();
					moveHands();
				}, 1000);

				d3.select(self.frameElement).style('height', height + 'px');
			}
		}
	}])
}(D3Test.Directives = D3Test.Directives || {} ));
(function (Controllers, undefined)
 {
    /**
     * @ngdoc controller
     * @name D3Test.controller:ThermCtrl
     * @description
     *
     * Variables for the thermometer.
     * 
    **/
    D3Test.Modules.D3Test.controller('ThermCtrl', [ '$scope', function ($scope) {
        
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'temperature');
        
        scope.degreeType        = [ 
            {
                "id": 0,
                "name": "Farenheiht",
                "label": "F",
                "range": [ 0, 100 ],
            },
            {
                "id": 1,
                "name": "Celcius",
                "label": "C",
                "range": [ -30, 60 ]
            }
        ];
        
        scope.newTemp       = 60;
    }]);
}( D3Test.Controllers == D3Test.Controllers || {} ));

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

(function (Controllers, undefined) 
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:FractionsCtrl
     * @description 
     *
     * Set up the fractions type and control how the fractions work. Should update 
     * for different types of shapes and fractions.
    **/
    D3Test.Modules.D3Test.controller("FractionsCtrl", [ '$scope', function ($scope) {
        var scope           = $scope;

        scope.$emit('updateCurrentPage', 'fractions');
        scope.fraction      = "0";
        scope.type          = 0;
        scope.objectType    = [
            {
                "id": 0,
                "name": "Circle",
                "sections": 7,
                "shape": "circle"
            },
            {
                "id": 1,
                "name": "Square",
                "sections": 4,
                "shape": "rect"
            }
        ];

    }]);
}(D3Test.Controller == D3Test.Controller || {} ));

(function (Directive, undefined) 
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:fractions
     * @description
     *
     * Create different shapes and allow highlighting to display fractions.
     * Display fraction on screen.
    **/
    D3Test.Modules.D3Test.directive("fractions", [ function () {
        return {
            restrict: 'E',
            controller: 'FractionsCtrl',
            link: function (scope, elm, attrs)
            {
                //console.log(scope);
                //console.log(elm);
                console.log(attrs);

                var svg,
                    thisType        = attrs.type,
                    slices          = attrs.slices,
                    margin          = 20,
                    width           = 300 + margin,
                    height          = 300 + margin,
                    selectedArray   = [],
                    container       = elm.find('#fractionsContainer')[0];

                console.log('this type: ' + thisType);
                console.log('slices: ' + slices);
                console.log(scope.objectType[thisType].shape);

                var newX = 0;
                var newY = 0;


                //draw shape based on type
                switch (scope.objectType[thisType].shape)
                {
                    case "rect":
                        svg     = d3.select(container)
                            .append("svg")
                            .attr({width: width, height: height});

                        //draw shape
                        for(var i=0; i < slices; i++)
                        {
                            if(i % 2)
                            {
                                newX = margin * 2;
                                newY = margin*2;
                                if(i > 1)
                                {
                                    console.log(i + 'NEW Y');
                                    newY = height/2;
                                }
                                console.log('odd: '  + i);
                                console.log('new y: ' + newY);
                                console.log('new x: ' + newX);
                            }
                            else
                            {
                                newX = width/2;
                                newY = margin*2;

                                if(i > 0 )
                                {
                                    newY = height/2;
                                }
                                console.log(i);
                                console.log('new y: ' + newY);
                                console.log('new x: ' + newX);
                            }
                            shape       = svg.append("" + scope.objectType[thisType].shape + "")
                                .attr({ style: "fill: #ffffff; stroke: #000; stroke-width: 2; cursor: pointer;",
                                    id: "block" + i,
                                    x: newX,
                                    y: newY,
                                    width: width/(slices/2) - margin*2,
                                    height: height/(slices/2) - margin*2})
                                .on('mousedown', fractionMouseDown );
                        }
                    break;

                    default:
                    break;
                }




                /**
                 * @ngdoc directive
                 * @methodOf D3Test.directive:fractions
                 * @name D3Test.fractions.class:fractionMouseDown
                 * @description
                 *
                 * Handle mouse down of each slice and update the fraction display.
                **/
                function fractionMouseDown()
                {
                    var block       = elm.find('#' + this.id);
                    if(selectedArray.indexOf(this.id) == -1)
                    {
                        selectedArray.push(this.id);
                        block.attr('style', 'fill: #000');
                    } else {
                        var itemToRemove = selectedArray.indexOf(this.id);
                        selectedArray.splice(itemToRemove, 1);
                        block.attr('style', 'fill: #fff')
                            .attr('stroke', '#000')
                            .attr('stroke-width', '2px');
                    }
                    updateFraction();
                }




                /**
                **/
                function updateFraction ()
                {
                    scope.fraction      = "" + selectedArray.length + "/" + slices;

                    scope.$apply();
                }






            }
        }
    }]);
}(D3Test.Directive == D3Test.Directive || {} ));
