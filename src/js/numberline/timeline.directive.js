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