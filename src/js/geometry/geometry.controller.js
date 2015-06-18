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