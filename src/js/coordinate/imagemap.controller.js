(function (Controllers, undefined) {
    /**
     * @ngdoc controller
     * @name D3Test.controller:ImageMapCtrl
     * @description 
     *
     * Use maps to make an image that can be shaded and have labels added to it.
    **/
    D3Test.Modules.D3Test.controller("ImageMapCtrl", [ '$scope', '$timeout', function ($scope, $timeout) {
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'graphs');
        
        var margin          = {top: 20, right: 20, bottom: 20, left: 20},
            padding         = {top: 60, right: 20, bottom: 60, left: 60},
            outerWidth          = 960,
            outerHeight         = 960,
            innerWidth          = outerWidth - margin.left - margin.right,
            innerHeight         = outerHeight - margin.top - margin.bottom,
            width               = innerWidth - padding.left - padding.right,
            height              = innerHeight - padding.top - padding.bottom,
            circle, line;
        
        scope.gridX             = 400;
        scope.gridY             = 400;
        scope.unit              = 25;

        scope.yaxiscoor         = d3.range(scope.unit, height, scope.unit);
        scope.xaxiscoor         = d3.range(scope.unit, width, scope.unit);
        scope.unitX             = 550;
        scope.unitY             = 550;
        scope.drawingDirection  = 0; //0 for left, 1 for right
        scope.curStyle          = 0;
        scope.width             = width;
        scope.height            = height;
        scope.margin            = margin;


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));