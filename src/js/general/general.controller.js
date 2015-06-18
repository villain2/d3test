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
