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