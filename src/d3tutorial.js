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
    Modules.D3Test = angular.module("d3test", ['ngRoute', 'duScroll']);
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
                templateUrl: D3Test.PartialsPath + '/number-lines.html'
            })
            .when('/charts', {
                templateUrl: D3Test.PartialsPath + '/charts.html'
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
            .when('/probability', {
                templateUrl: D3Test.PartialsPath + '/probability'
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
                console.log('show directive scope');
                console.log(scope);

                //add watch on page
                
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
    D3Test.Modules.D3Test.controller('GridCtrl', ['$scope', '$rootScope', '$element', function ($scope, $rootScope, $element)
    {
        var scope           = $scope;
        var margin 		    = {top: 20, right: 20, bottom: 20, left: 20},
            padding 		= {top: 60, right: 60, bottom: 60, left: 60},
            outerWidth 		= 960,
            outerHeight 	= 960,
            innerWidth 		= outerWidth - margin.left - margin.right,
            innerHeight 	= outerHeight - margin.top - margin.bottom,
            width 			= innerWidth - padding.left - padding.right,
            height 			= innerHeight - padding.top - padding.bottom,
            circle,
            line;
        
        scope.gridX         = 400;
        scope.gridY         = 400;

        this.yaxiscoor = d3.range(25, height, 25);
        this.xaxiscoor = d3.range(25, width, 25);
        scope.unitX         = 550;
        scope.unitY         = 550;
        scope.answerArray   = [];
        scope.plottedAnswer;

        scope.updateNav = function (data)
        {
            $scope.$emit('updateCurrentPage', data);
        }
    }])
}(D3Test.Controllers = D3Test.Controllers || {} ));

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
                    console.log(scope.answerArray);
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

                scope.resetGrid = function ()
                {
                    console.log('reset all');
                    console.log(scope);
                    svg.selectAll("circle").remove();
                }

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

                console.log(yaxiscoor);
                console.log(xaxiscoor);

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


                var defs = svg.append('svg:defs')

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
                    //.attr('marker-start', function(d,i){ return 'url(#marker_' + d.name + ')' })
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
                    console.log('mouse is up, stop drawing lines.');
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
                    color           = d3.scale.category10(),
                    startX, startY,
                    circle, arrow, line;

                var yaxiscoor = d3.range(25, height, 25);
                var xaxiscoor = d3.range(25, width, 25);


                var data = [
                    { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
                ];
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
                    checkDrawingType();
                    console.log(scope.drawingType[0].active);
                    console.log(lineStarted);

                    //check if we're starting or ending a line
                    if(lineStarted == true)
                    {
                        startX      = Math.round(m[0]);
                        startY      = Math.round(m[1]);
                        line = svg.append("line")
                            .attr("x1", m[0])
                            .attr("y1", m[1])
                            .attr("x2", m[0])
                            .attr("y2", m[1])
                            .attr("id", String);

                        //draw the circle for this segment
                        circle = svg.append("circle")
                            .attr("cx", m[0])
                            .attr("cy", m[1])
                            .attr("r", 5);
                            console.log('position:');
                            console.log(m[0] + ' x ' + m[1]);
                    }
                    else
                    {
                        //draw the circle for this segment
                        circle = svg.append("circle")
                            .attr("cx", m[0])
                            .attr("cy", m[1])
                            .attr("r", 5);
                            console.log('position:');
                            console.log(m[0] + ' x ' + m[1]);
                    }

                    svg.on("mousemove", mousemove);
                }
                
                function mouseup()
                {
                    svg.on("mousemove", null);
                    var m = d3.mouse(this);

                    if( (lineStarted == true)&&(scope.drawingType[1].active == true) )
                    {
                        lineStarted = false;
                        circle = svg.append("circle")
                            .attr("cx", m[0])
                            .attr("cy", m[1])
                            .attr("r", 5);
                            console.log('position:');
                            console.log(m[0] + ' x ' + m[1]);
                    }
                    else if( (lineStarted == true)&&(scope.drawingType[0].active == true) )
                    {
                        lineStarted = false;
                        console.log('draw a ray');

                        var defs = svg.append('svg:defs');
                        var paths = svg.append('svg:g')
                            .attr('id', 'markers')
                            .attr('transform', 'translate(0 , 0)');

                        var marker = defs.select('marker')
                            .data(data)
                            .enter()
                            .append('svg:marker')
                                .attr('id', 'marker_arrow')
                                .attr('markerHeight', 5)
                                .attr('markerWidth', 5)
                                .attr('markerUnits', 'strokeWidth')
                                .attr('orient', 'auto')
                                .attr('refX', m[0])
                                .attr('refY', m[1])
                            .append('svg:path')
                                .attr('d', 'M0, 0m-5, -5L5, 0L-5, 5Z')
                                .attr('fill', '#000');

                        var path = paths.selectAll('path')
                            .data(data)
                            .enter()
                            .append('svg:path')
                            .attr('d', 'M ' + startX + ',' + startY + ' L ' + m[0] + ',' + m[1] + '')
                            .attr('stroke', '#000')
                            .attr('stroke-width', 2)
                            .attr('stroke-linecap', 'round')
                            //.attr('marker-start', function(d,i){ return 'url(#marker_' + d.name + ')' })
                            .attr('marker-end', 'url(#marker_arrow)');

                        

                        // build the arrow.
                    }
                }
                
                function mousemove()
                {
                    var m = d3.mouse(this);
                    if(lineStarted == true)
                    {
                        line.attr("x2", m[0])
                            .attr("y2", m[1])
                            .attr("stroke-width", 5)
                            .attr("stroke", "black");
                    }
                    else
                    {
                        circle.attr("cx", m[0])
                            .attr("cy", m[1]);
                    }
                }

                //drawing type

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

                function resetDrawingType()
                {
                    for (var t = 0; t < drawingType.length; t++)
                    {
                        drawingType[t].active = false;
                    }
                }



                /**
                 * @ngdoc function
                 * @name resetraycoor
                 * @description
                 *
                 * Clears any circles or lines from the svg area. Reapplies grid.
                 * Resets lineStarted to "true".
                **/
                scope.resetraycoor = function ()
                {
                    svg.selectAll("circle").remove();
                    svg.selectAll('line').remove();
                    lineStarted = true;
                    drawGraph();
                }

                /**
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
                    console.log(drawingType);
                }

                //draw graph
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


                /*var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 550 - margin.left - margin.right,
                    height = 550 - margin.top - margin.bottom;

                var x = d3.scale.linear()
                    .domain([-width / 2, width / 2])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([-height / 2, height / 2])
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(5)
                    .tickSize(-height);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(5)
                    .tickSize(-width);

                var zoom = d3.behavior.zoom()
                    .x(x)
                    .y(y)
                    .scaleExtent([1, 32])
                    .on("zoom", zoomed);

                var svg = d3.select(".raycoor").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(zoom);

                svg.append("rect")
                    .attr("width", width)
                    .attr("height", height);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                function zoomed() {
                  svg.select(".x.axis").call(xAxis);
                  svg.select(".y.axis").call(yAxis);
                }*/
            }
        }
    }])

}(D3Test.Directives = D3Test.Directives || {} ));
