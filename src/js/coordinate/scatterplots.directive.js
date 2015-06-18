(function (Directives, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:scatterPlots
	 * @description
	 *
	 * This directive controls the scatter plots options for Image Mapping and Drawing.
	 * Will allow for plot points to be entered and place them on a grid
	 * for manipulation
	 * @example
	 * <pre>
	 * 		<scatter-plots></scatter-plots>
	 * </pre>
	**/

	D3Test.Modules.D3Test.directive('scatterPlots', [ function ()
	{
		return {
			restrict: 'E',
			controller: 'ScatterPlotsCtrl',
			link: function (scope, elm, attrs)
			{
				scope.updateNav("graphs");
				var startDrawing		= false;
				var scatterPlotsSVG 	= elm.find('.scatterPlots')[0].children[0];
				var actualSVG;
				var startX, startY, endX, endY, svg, cir;




				var chart = c3.generate({
					bindto: '.scatterPlots',
					data: {
				        columns: [
				            scope.xScatterData,
				            scope.yScatterData
				        ],
				        x: scope.xScatterLabel,//scope.xScatterLabel,
				        type: 'scatter',
				        onclick: function (d, element) { 
				        	actualSVG.append('<line x1="0" y1="0" x2="98" y2="423" style="stroke:rgb(255,0,0);stroke-width:2" />');
				        	if(startDrawing == false)
				        	{
				        		startDrawing = true;
				        		startX 			= Math.round(element.cx.animVal.value);
				        		startY 			= Math.round(element.cy.animVal.value);
				        		endX 			= startX;
				        		endY 			= startY;
				        	}
				        	else
				        	{
				        		startDrawing = false;
				        		endX 			= Math.round(element.cx.animVal.value);
				        		endY 			= Math.round(element.cy.animVal.value);
				        	}

							svg = d3.select('g .c3-circles');
							cir = svg.append('line')
								.attr('x1', startX)
								.attr('y1', startY)
								.attr('x2', endX)
								.attr('y2', endY);
				        }
				    },
				    axis: {
				        x: {
				        	max: 120,
				        	min: -20,
				        	tick: {
				        		centered: true,
				        		culling: {
				        			max: 30
				        		},
				        		values: [-20, -10, 0,10,20,30,40,50,60,70,80,90,100,110, 120]
				        	},
				            label: {
				            	text: scope.xScatterLabel,
				            	position: 'outer-left'
				            }
				        },
				        y: {
				            label: {
				            	text: scope.yScatterLabel,
				            	position: 'outer-middle'
				            }
				        }
				    },
				    grid: {
				    	x: {
				    		show: true
				    	},
				    	y: {
				    		show: true
				    	}
				    },
				    point: {
				    	r: 5
				    },
				    padding: {
				    	top: 20,
				    	bottom: 20,
				    	right: 10
				    },
				    legend: {
				    	show: false
				    }
				});

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:scatterPlots
				 * @name D3Test.scatterPlots.class:resetScatterLines
				 * @description 
				 * 
				 * Reset all your drawn lines
				**/
				scope.resetScatterLines = function ()
				{
					svg.selectAll('line').remove();
				}




				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:scatterPlots
				 * @name D3Test.scatterPlots.class:watch
				 * @description
				 *
				 * Watch the plot points and labels for changes then update the c3.js chart.
				**/
				scope.$watchGroup(['xScatterPoints', 'yScatterPoints', 'xScatterLabel', 'yScatterLabel'], function (newVal, oldVal, scope)
				{
					scope.updateScatterPlot();

					setTimeout(function ()
					{
						chart.load({
							columns: [
								scope.xScatterData,
								scope.yScatterData
							]
						});

						chart.axis.labels({
							x: scope.xScatterLabel,
							y: scope.yScatterLabel
						});


						var sp = elm.find('.scatterPlots svg');
						var spCircle = elm.find('.c3-circle-5');
						actualSVG = elm.find('g.c3-circles');

						function svgMouseOver()
						{
							console.log('move it');
						}

					}, 1000);
				})
			}
		}
	}]);
} (D3Test.Directives = D3Test.Directives || {} ));