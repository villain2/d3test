(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:barGraph
     * @description
     *
     * Adding bar graphs and manipulating their data and display.
     * @example
     * <pre>
     *     <bar-graphs></bar-graphs>
     * </pre>
     */
    D3Test.Modules.D3Test.directive('barGraphs', [ function ()
    {
        return {
            restrict: 'E',
            controller: 'BarCtrl',
            link: function (scope, elm, attrs)
            {
                scope.updateNav("graphs");

                var chart = c3.generate({
                    bindto: '#barGraph',
                    data: {
                        columns: [
                            scope.barData
                        ],
                        type: "bar"
                    },
                    x: scope.xBarLabel,
                    axis: {
                        rotated: true,
                        x: {
                            type: 'category',
                            categories: scope.barXLabels,
                            label: {
                                text: scope.xBarLabel,
                                position: 'outer-middle',
                            }
                        },
                        y: {
                            max: 50,
                            label: {
                                text: scope.yBarLabel,
                                position: 'outer-center'
                            }
                        }
                    },
                    grid: {
                        y: {
                            show: true
                        }
                    },
                    padding: {
                        top: 20,
                        bottom: 20,
                        right: 10
                    },
                    legend: {
                        show: false
                    }
                });

                scope.turnHorizontal = function ()
                {
                    //console.log(chart);
                    chart.axis({
                        rotated: true
                    });
                };

                scope.turnVertical = function ()
                {
                    //console.log(chart);
                    chart.axis({
                        rotated: false
                    });
                };

                scope.$watch(function (newVal, oldVal) {
                    if(newVal)
                    {
                        scope.updateBarChart();

                        //reload the graph
                        setTimeout(function ()
                        {
                            chart.axis.labels({
                                x: scope.xBarLabel,
                                y: scope.yBarLabel
                            });
                            chart.load({
                                columns: [
                                    scope.barData
                                ]
                            });
                        });
                    }
                }, true);
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));