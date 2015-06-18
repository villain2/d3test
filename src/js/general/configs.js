/**
 **/
(function (Configs, undefined)
{
    D3Test.Modules.D3Test.config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: D3Test.PartialsPath + '/home.html'
            })
            .when('/graphs', {
                templateUrl: D3Test.PartialsPath + '/graphs.html'
            })
            .when('/number-lines', {
                templateUrl: D3Test.PartialsPath + '/number_lines.html'
            })
            .when('/charts', {
                templateUrl: D3Test.PartialsPath + '/charts.html',
                controller: 'ChartCtrl'
            })
            .when('/geometry', {
                templateUrl: D3Test.PartialsPath + '/geometry.html'
            })
            .when('/time/', {
                templateUrl: D3Test.PartialsPath + '/time.html'
            })
            .when('/temperature', {
                templateUrl: D3Test.PartialsPath + '/temperature.html'
            })
            .when('/fractions', {
                templateUrl: D3Test.PartialsPath + '/fractions.html'
            })
            .otherwise({
                redirectTo: '/',
                templateUlr: D3Test.PartialsPath + '/home.html'
            })
    }]);
}(D3Test.Configs = D3Test.Configs || {} ));
