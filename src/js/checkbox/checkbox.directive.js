(function (Directives, undefined)
{
    D3Test.Modules.D3Test.directive("checkbox", ['$compile', function ($compile)
    {
        return {
            restrict: 'AE',
            controller: 'CheckboxCtrl',
            transclude: false,
            link: function (scope, elm, attrs)
            {
                var maketable           = $compile(scope.newtable);
                var content             = maketable(scope);
                elm.append(content);
            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));