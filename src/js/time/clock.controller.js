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
