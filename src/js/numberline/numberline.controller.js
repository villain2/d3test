(function (Controllers, undefined)
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:NumberLineCtrl
     * @description
     *
     * baseline values and set up for d3 number line widget. Holds all values, scaling and
     * other variables.
     * <pre>
     *  return {
        restrict: 'E',
        controller: 'NumberLineCtrl',
        ...
        }
     * </pre>
     */
    D3Test.Modules.D3Test.controller("NumberLineCtrl", [ '$scope', '$timeout', function ($scope, $timeout)
    {
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'number_lines');

        var drawingType;
        var margin              = {top: 20, right: 20, bottom: 20, left: 20},
            padding             = {top: 60, right: 60, bottom: 60, left: 60},
            outerWidth          = 960,
            outerHeight         = 960,
            innerWidth          = outerWidth - margin.left - margin.right,
            innerHeight         = outerHeight - margin.top - margin.bottom,
            width               = innerWidth - padding.left - padding.right,
            height              = innerHeight - padding.top - padding.bottom,
            circle,
            line;
        
        scope.gridX             = 400;
        scope.gridY             = 400;

        scope.unit              = 25;
        
        scope.addLabel          = false;
        scope.timelineLabel     = "";
        scope.labelArray        = [];

        scope.yaxiscoor         = d3.range(scope.unit, height, scope.unit);
        scope.xaxiscoor         = d3.range(scope.unit, width, scope.unit);
        scope.unitX             = 550;
        scope.unitY             = 550;
        scope.drawingDirection  = 0; //0 for left, 1 for right
        scope.curStyle          = 0;
        scope.width             = width;
        scope.height            = height;
        scope.margin            = margin;
        scope.drawStyle         = [
            {
                "id": 0,
                "type": "closeAll",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'}
            },
            {
                "id": 1,
                "type": "openEnd",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'}
            },
            {
                "id": 2,
                "type": "closedEnd",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'black'}
            },
            {
                "id": 3,
                "type": "openAll",
                "startStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'},
                "endStyle": {'stroke': 'black', 'stroke-width': 2, 'fill': 'white'}
            }
        ];


        scope.drawingType     = [
            {
                "type": "ray",
                "active": false
            },
            {
                "type": "segment",
                "active": true
            }
        ];


    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));