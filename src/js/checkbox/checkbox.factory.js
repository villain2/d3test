(function (Factory, undefined)
{
    D3Test.Modules.D3Test.factory("checkboxFactory", ['$http', function ($http)
    {
        var source          = 'json/checkbox-data.json',
            checkboxFactory = {};

        checkboxFactory.getData = function ()
        {
            return $http.get(source);
        };

        return checkboxFactory;
    }]);
}(D3Test.Factory = D3Test.Factory || {} ));