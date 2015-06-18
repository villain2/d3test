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