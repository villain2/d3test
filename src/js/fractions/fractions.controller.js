(function (Controllers, undefined) 
{
    /**
     * @ngdoc controller
     * @name D3Test.controller:FractionsCtrl
     * @description 
     *
     * Set up the fractions type and control how the fractions work. Should update 
     * for different types of shapes and fractions.
    **/
    D3Test.Modules.D3Test.controller("FractionsCtrl", [ '$scope', function ($scope) {
        var scope           = $scope;

        scope.$emit('updateCurrentPage', 'fractions');
        scope.fraction      = "0";
        scope.type          = 0;
        scope.objectType    = [
            {
                "id": 0,
                "name": "Circle",
                "sections": 7,
                "shape": "circle"
            },
            {
                "id": 1,
                "name": "Square",
                "sections": 4,
                "shape": "rect"
            }
        ];

    }]);
}(D3Test.Controller == D3Test.Controller || {} ));
