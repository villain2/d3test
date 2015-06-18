(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:pieChart
     * @description
     *
     * Make a pie chart with d3 and c3.
     * @example
     * <pre>
     *     <pie-chart></pie-chart>
     * </pre>
     */
    D3Test.Modules.D3Test.directive("pieChart", [ function ()
    {
        return {
            restrict: 'E',
            controller: 'PieChartCtrl',
            link: function (scope, elm, attrs)
            {
                var chart = c3.generate({
                    bindto: '#pieChart',
                    data: {
                        columns: scope.pieData,
                        type: "pie"
                    }
                });

                scope.$watch(function (newVal, oldVal)
                {
                    if(newVal)
                    {
                        scope.updatePieChart();

                    }
                })
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));