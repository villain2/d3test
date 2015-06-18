(function (Directives, undefined)
{
	D3Test.Modules.D3Test.directive("drawing", [function ()
	{
		return {
			require: "angles",
			link: function (scope, elem, attrs, anglesCtrl)
			{
				console.log(anglesCtrl);
			}
		}
	}]);
}(D3Test.Directives = D3Test.Directives || {} ));