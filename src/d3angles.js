/**
 * @ngdocs object
 * @name D3Test
 * @id D3Test
 * @description
 *
 * Creating a D3 test for Connections.
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

/**
 */

(function (Modules, undefined)
{
    Modules.D3Test = angular.module("d3test", ['ngRoute']);
}(D3Test.Modules = D3Test.Modules || {} ));

/**
 **/
/*(function (Configs, undefined)
{
    D3Test.Modules.D3Test.config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: D3Test.PartialsPath + '/home.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);
}(D3Test.Configs = D3Test.Configs || {} ));*/
(function (Controllers, undefined)
{
	D3Test.Modules.D3Test.controller('AnglesCtrl', ['$scope', '$element', function ($scope, $element)
	{
		var scope 			= $scope;
		var element 		= $element;
	}]);
}(D3Test.Controllers = D3Test.Controllers || {} ));
(function (Directives, undefined)
{
	D3Test.Modules.D3Test.directive("angles", [function ()
	{
		return {
			restrict: 'A',
			controller: 'AnglesCtrl',
			template: '<div class="d3Container"></div>',
			link: function (scope, elm, attrs)
			{
				var main = d3.select('.d3Container');
				var width = 960,
					height = 700;


			}
		}
	}])

}(D3Test.Directives = D3Test.Directives || {} ));