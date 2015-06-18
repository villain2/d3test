(function (Directive, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:boxWhisker
     * @description
     *
     * Create a box whisker chart with multiple abilities.
     * @example
     * <pre>
     *     <box-whisker></box-whisker>
     * </pre>
     */
    D3Test.Modules.D3Test.directive('boxWhisker', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'BoxWhiskerCtrl',
            link: function (scope, elm, attrs)
            {
                //scope.updateNav("graphs");

                var data = [
                    {"year": 1991, "name":"alpha", "value":15},
                    {"year": 1992, "name":"alpha", "value":34},
                    {"year": 1991, "name":"alpha2", "value":17},
                    {"year": 1992, "name":"alpha2", "value":65},
                    {"year": 1991, "name":"beta", "value":10},
                    {"year": 1992, "name":"beta", "value":10},
                    {"year": 1991, "name":"beta2", "value":40},
                    {"year": 1992, "name":"beta2", "value":38},
                    {"year": 1991, "name":"gamma", "value":5},
                    {"year": 1992, "name":"gamma", "value":10},
                    {"year": 1991, "name":"gamma2", "value":20},
                    {"year": 1992, "name":"gamma2", "value":34},
                    {"year": 1991, "name":"delta", "value":50},
                    {"year": 1992, "name":"delta", "value":43},
                    {"year": 1991, "name":"delta2", "value":17},
                    {"year": 1992, "name":"delta2", "value":35}
                ]

                var visualization = d3plus.viz()
                    .container("#boxWhisker")
                    .data(scope.boxWhiskerData)
                    .type("box")
                    .id("name")
                    .x("year")
                    .y("value")
                    .time("year")
                    .ui([{
                        "label": "Visualization Type",
                        "method": "type",
                        "value": ["scatter","box"]
                    }])
                    .draw()


            }
        }
    }])
}(D3Test.Directives = D3Test.Directives || {}));