/**
 * Created by kchunter on 1/12/2015.
 */
(function (D3Test, undefined)
{
    D3Test.Version          = "0.0.1";
    D3Test.PartialsPath     = "partials/";
    D3Test.Factory          = {};
    D3Test.Modules          = {};
    D3Test.Configs          = {};
    D3Test.Controllers      = {};
    D3Test.Directives       = {};
}(window.D3Test = window.D3Test || {} ));

(function (Modules, undefined)
{
    Modules.D3Test = angular.module("d3test", ['ngRoute']);

}(D3Test.Modules = D3Test.Modules || {} ));


(function (Configs, undefined)
{
    D3Test.Modules.D3Test.config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: D3Test.PartialsPath + "/home.html"
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);
}(D3Test.Configs = D3Test.Configs || {} ));

/** home ctrl **/
(function (Controllers, undefined)
{
    D3Test.Modules.D3Test.controller('HomeCtrl', ['$scope', '$element', '$rootScope', '$compile', '$timeout', function ($scope, $element, $rootScope, $compile, $timeout)
    {
        var scope               = $scope;
        var mainContainer       = $element.find('#mainContainer');

        //data to visualize

    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));


/** home directive **/
(function (Directives, undefined)
{
    D3Test.Modules.D3Test.directive("home", [function ()
    {
        return {
            restrict: 'A',
            transclude: false,
            controller: 'HomeCtrl',
            link: function (scope, elem, attrs)
            {
                scope.width             = 500;
                scope.height            = 500;
                scope.dataArray         = [20, 40, 50, 60];
                scope.inputValue        = scope.dataArray[0];

                scope.updateWidth = function(value)
                {
                    changeBarWidth(value);

                };
                /*scope.width     = 500;
                scope.height    = 500;
                var mainContainer   = elem.find('#mainContainer');

                var canvas = d3.select("body")
                    .append("svg")
                    .attr("width", scope.width)
                    .attr("height", 500);

                var circle = canvas.append("circle")
                    .attr("cx", 50)
                    .attr("cy", 50)
                    .attr("r", 25);

                circle.transition()
                    .duration(1500)
                    .delay(1000)
                    .attr("cx", 150)
                    .transition()
                    .attr("cy", 200)
                    .transition()
                    .attr("cx", 50)
                .each("start", function ()
                {
                    d3.select(this)
                        .attr("fill", "#d81e05")
                });*/

                var widthScale      =
                    d3.scale.linear()
                        .domain([0,60])
                        .range([0, scope.width]);

                var color           =
                    d3.scale.linear()
                        .domain([0,60])
                        .range(['#d81e05', '#3044b5']);

                //add an axis
                var axis            =
                    d3.svg.axis()
                        .ticks(5)
                        .scale(widthScale);

                //create canvas
                var canvas          =
                    d3.select("#mainContainer")
                        .append("svg")
                        .attr("width", scope.width)
                        .attr("height", scope.height)
                        .append("g")
                        .attr("transform", "translate(20,0)");

                //Make a bar chart, d is for the data array value for each, i is the id
                var bars            =
                    canvas.selectAll("rect")
                        .data(scope.dataArray)
                        .enter()
                        .append("rect")
                        .attr("width", 1)
                        .attr("height", 50)
                        .attr("fill", function (d)
                        {
                            return color(d)
                        })
                        .attr("y", function (d, i)
                        {
                            return i * 80
                        })
                        .transition()
                        .delay(750)
                        .attr("width", function (d)
                        {
                            return widthScale(d);
                        });

                //move the axis below the bars
                canvas.append("g")
                    .attr("transform", "translate(0, 400)")
                    .call(axis);

                var changeBarWidth = function (value)
                {
                    //change the value of width
                    scope.dataArray       = [scope.inputValue, 40, 50, 60];
                    bars = canvas.selectAll("rect")
                        .data(scope.dataArray)
                        .transition()
                        .delay(100)
                        .attr("width", function (d)
                        {
                            return widthScale(d)
                        })
                }


            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));


(function (Directives, undefined)
{
    D3Test.Modules.D3Test.directive('inputDir', [function ()
    {
        return {
            restrict: 'A',
            transclude: false,
            controller: 'HomeCtrl',
            link: function (scope, elem, attrs)
            {
                function updateWidth(value)
                {
                    alert(value);
                }
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));

