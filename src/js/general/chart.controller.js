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