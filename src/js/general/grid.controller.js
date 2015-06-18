(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:GridCtrl
     * @description
     *
     * Set up the universal parameters for our grids. Variables can change based on an eventual editor or the user changing them in the application.
     *@example
     <pre>
      return {
            restrict: 'AE',
            controller: 'GridCtrl',
            link: function (scope, elm, attrs)
            {
            }
        }
     </pre>
    **/
    D3Test.Modules.D3Test.controller('GridCtrl', ['$scope', '$window', '$rootScope', '$element', function ($scope, $window, $rootScope, $element)
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
        scope.curScale      = 1;
        scope.plottedAnswer;

        scope.updateNav = function (data)
        {
            $scope.$emit('updateCurrentPage', data);
        };

        scope.rotateShape = function (direction)
        {
          $scope.rotateObject(direction);

        };
        
        scope.resizeShape = function (data)
        {
            $scope.resizeObject(data);
        }

        scope.backToTop = function ()
        {
            $window.scrollTo(0,0);
        }
        
    }])
}(D3Test.Controllers = D3Test.Controllers || {} ));
