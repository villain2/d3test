(function (Controllers, undefined)
 {
    /**
     * @ngdoc controller
     * @name D3Test.controller:ThermCtrl
     * @description
     *
     * Variables for the thermometer.
     * 
    **/
    D3Test.Modules.D3Test.controller('ThermCtrl', [ '$scope', function ($scope) {
        
        var scope           = $scope;
        $scope.$emit('updateCurrentPage', 'temperature');
        
        scope.degreeType        = [ 
            {
                "id": 0,
                "name": "Farenheiht",
                "label": "F",
                "range": [ 0, 100 ],
            },
            {
                "id": 1,
                "name": "Celcius",
                "label": "C",
                "range": [ -30, 60 ]
            }
        ];
        
        scope.newTemp       = 60;
    }]);
}( D3Test.Controllers == D3Test.Controllers || {} ));
