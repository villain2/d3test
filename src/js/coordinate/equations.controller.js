(function (Controllers, undefined)
 {
    /**
     * @ngdoc controller
     * @name D3Test.controller:EquationsCtrl
     * @description
     *
     * Control the variables and interactive functions for the equations-based grid.
     * @example
     * <pre>
     *  return {
     *      restrict: 'AE',
     *      controller: 'EquationsCtrl'
     *      link: function (scope, elm, attrs)
     *      {
     *      }
     *  }
     * </pre>
    **/
    D3Test.Modules.D3Test.controller('EquationsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) 
    {
        var scope           = $scope;
        var margin 		    = {top: 20, right: 20, bottom: 20, left: 20},
            padding 		  = {top: 60, right: 60, bottom: 60, left: 60},
            outerWidth 		= 960,
            outerHeight 	= 960,
            innerWidth 		= outerWidth - margin.left - margin.right,
            innerHeight 	= outerHeight - margin.top - margin.bottom,
            width 			 = innerWidth - padding.left - padding.right,
            height 			= innerHeight - padding.top - padding.bottom,
            circle,
            line;
        
        scope.gridX         = 400;
        scope.gridY         = 400;

        this.yaxiscoor      = d3.range(25, height, 25);
        this.xaxiscoor      = d3.range(25, width, 25);
        scope.unitX         = 550;
        scope.unitY         = 550;
        scope.answerArray   = [];
        scope.plottedAnswer;
        
        scope.equation      = {x1: 0, x2: 0, y1: 0, y2: 0, rotation: 0};

        scope.updateNav = function (data)
        {
            $scope.$emit('updateCurrentPage', data);
        }
    }]);
}( D3Test.Controllers = D3Test.Controllers || {} ));