(function (Directives, undefined)
{
	D3Test.Modules.D3Test.directive("angles", [function ()
	{
		return {
			restrict: 'A',
			controller: 'AnglesCtrl',
			link: function (scope, elm, attrs)
			{

                var timeOut     = 0,
                    nodes       = [],
                    links       = [];

			    //mouse events
			    var selected_node = null,
			    	mousedown_link = null,
			    	mousedown_node = null,
			    	mouseup_node = null;


			    var draw = function (object)
			    {
			    	var mousePos = d3.mouse(object);
			    	timeOut = 1;
			    	setTimeout(function ()
			    	{
			    		timeOut = 0;
			    	}, 10);
				    line.attr("x2", mousePos[0])
				    	.attr("y2", mousePos[1]);
			    };

			    var resetMouse = function ()
			    {
			    	mousedown_node = null;
			    	mouseup_node = null;
			    	mousedown_link = null;
			    };
			}
		}
	}])

}(D3Test.Directives = D3Test.Directives || {} ));