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