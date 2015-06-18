(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:BoxWhiskerCtrl
     * @description
     *
     * Holds the data and main functions of the box whisker widget.
     */
    D3Test.Modules.D3Test.controller("BoxWhiskerCtrl", [ '$scope', function ($scope)
    {
        var scope           = $scope;

        scope.boxWhiskerData = [
            {"year": 1991, "name":"alpha", "value": 15},
            {"year": 1992, "name":"alpha", "value": 34},
            {"year": 1991, "name":"alpha2", "value": 17},
            {"year": 1992, "name":"alpha2", "value": 65},
            {"year": 1991, "name":"beta", "value": 10},
            {"year": 1992, "name":"beta", "value": 10},
            {"year": 1991, "name":"beta2", "value": 40},
            {"year": 1992, "name":"beta2", "value": 38},
            {"year": 1991, "name":"gamma", "value": 5},
            {"year": 1992, "name":"gamma", "value": 10},
            {"year": 1991, "name":"gamma2", "value": 20},
            {"year": 1992, "name":"gamma2", "value": 34},
            {"year": 1991, "name":"delta", "value": 50},
            {"year": 1992, "name":"delta", "value": 43},
            {"year": 1991, "name":"delta2", "value": 17},
            {"year": 1992, "name":"delta2", "value": 35}
        ];


    }])
}(D3Test.Controllers = D3Test.Controllers || {} ));