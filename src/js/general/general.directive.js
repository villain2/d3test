(function (Directives, undefined) {
    D3Test.Modules.D3Test.directive('navigation', [ function (){
        return {
            restrict: 'AE',
            controller: 'NavCtrl',
            link: function (scope, elm, attrs) {
                /*console.log('show directive scope');
                console.log(scope);*/
                
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
