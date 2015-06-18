(function (Controllers, undefined)
{
	D3Test.Modules.D3Test.controller('AnglesCtrl', ['$scope', '$element', function ($scope, $element)
	{
		var scope 			= $scope;
		var element 		= $element;

		scope.dWidth = 700;
		scope.dHeight = 700;

		this.restart = function ()
		{
			scope.dWidth = 700;
			scope.dheight = 700;
		};

        var line;
        var vis = d3.select(".anglesContainer").append("svg")
            .on("mousedown", mousedown)
            .on("mouseup", mouseup);


        console.log('vis: ' + vis);
        function mousedown() {
            var m = d3.mouse(this);
            line = vis.append("line")
                .attr("x1", m[0])
                .attr("y1", m[1])
                .attr("x2", m[0])
                .attr("y2", m[1]);

            vis.on("mousemove", mousemove);
        }

        function mousemove() {
            var m = d3.mouse(this);
            line.attr("x2", m[0])
                .attr("y2", m[1]);
        }

        function mouseup() {
            vis.on("mousemove", null);
        }
	}]);
}(D3Test.Controllers = D3Test.Controllers || {} ));