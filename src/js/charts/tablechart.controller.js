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