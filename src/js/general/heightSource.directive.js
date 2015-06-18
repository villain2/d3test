(function (Directive, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:heightsource
	 * @description 
	 * 
	 * Fix the position of the left panel if we scroll 80 pixels down or more in the main container.
	**/
	D3Test.Modules.D3Test.directive('heightsource', [ '$window', function ($window)
	{
		return {
			restrict: 'A',
			scope: {
				scroll: '=scrollPosition'
			},
			link: function (scope, elm, attrs)
			{
				var windowEl 		= angular.element($window);
				var leftPanel 		= elm.find('.leftStatic');
				windowEl.on('scroll', function ()
				{
					if(windowEl[0].scrollY > 80)
					{
						leftPanel.attr("style", "margin-top: -100px; position: fixed;");
					} else {
						leftPanel.attr("style", "margin-top: 0px; position: relative;");
					}
				});
			}
		}
	}]);
}(D3Test.Directives = D3Test.Directives || {} ));