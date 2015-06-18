(function (Directive, undefined)
{
	/**
	 * @ngdoc directive
	 * @name D3Test.directive:clock
	 * @description
	 * 
	 * An analog clock example in d3. Should be able to add minute
	 * and hour hands and shade time areas.
	**/
	D3Test.Modules.D3Test.directive("clock", [ function ()
	{
		return {
			restrict: 'E',
			controller: 'ClockCtrl',
			link: function (scope, elm, attrs)
			{
				var svg,
					radians 			= 0.0174532925,
					clockRadius 		= 200,
					margin 				= 50,
					width 				= (clockRadius + margin) * 2,
					height 				= (clockRadius + margin) * 2,
					hourHandLength		= 2 * clockRadius/3,
					minuteHandLength 	= clockRadius,
					secondHandLength 	= clockRadius - 12,
					secondHandBalance 	= 30,
					secondTickStart 	= clockRadius,
					secondTickLength 	= -10,
					hourTickStart 		= clockRadius,
					hourTickLength 		= -18,
					secondLabelRadius 	= clockRadius + 16,
					secondLabelYOffset 	= 5,
					hourLabelRadius 	= clockRadius - 40,
					hourLabelYOffset 	= 7,
					mouseMoving 		= false,
					hands;

				var hourScale 			= d3.scale.linear()
					.range([0,330])
					.domain([0,11]);

				var minuteScale			= secondScale = d3.scale.linear()
					.range([0,354])
					.domain([0,59]);

				var handData 			= [
					{
						type: 'hour',
						value: 0,
						length: -hourHandLength,
						scale: hourScale
					},
					{
						type: 'minute',
						value: 0,
						length: -minuteHandLength,
						scale: minuteScale
					},
					{
						type: 'second',
						value: 0,
						length: -secondHandLength,
						scale: secondScale,
						balance: secondHandBalance
					}
				];

				function drawClock ()
				{
					//create all the elements for the clock
					updateData();
					svg = d3.select("#clockContainer")
						.append('svg')
						.attr('width', width)
						.attr('height', height);

					var face 	= svg.append('g')
						.attr('id', 'clock-face')
						.attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

					//seconds
					face.selectAll('.second-tick')
						.data(d3.range(0,60)).enter()
						.append('line')
						.attr('class', 'second-tick')
						.attr('x1',0)
						.attr('x2', 0)
						.attr('y1', secondTickStart)
						.attr('y2', secondTickStart + secondTickLength)
						.attr('transform', function (d)
						{
							return 'rotate(' + secondScale(d) + ')';
						});

					//labels
					face.selectAll('.second-label')
						.data(d3.range(5,61,5))
						.enter()
						.append('text')
						.attr('class', 'second-label')
						.attr('text-anchor', 'middle')
						.attr('x', function (d)
						{
							return secondLabelRadius * Math.sin(secondScale(d)*radians);
						})
						.attr('y', function (d)
						{
							return -secondLabelRadius * Math.cos(secondScale(d)*radians) + secondLabelYOffset;
						})
						.text(function (d)
						{
							return d;
						});

					//hours
					face.selectAll('.hour-tick')
						.data(d3.range(0,12)).enter()
						.append('line')
						.attr('class', 'hour-tick')
						.attr('x1', 0)
						.attr('x2', 0)
						.attr('y1', hourTickStart)
						.attr('y2', hourTickLength + hourTickStart)
						.attr('transform', function (d)
						{
							return 'rotate(' + hourScale(d) + ')';
						});

					//label the hours
					face.selectAll('.hour-label')
						.data(d3.range(3,13,3))
						.enter()
						.append('text')
						.attr('class', 'hour-label')
						.attr('text-anchor', 'middle')
						.attr('x', function (d)
						{
							return hourLabelRadius * Math.sin(hourScale(d) * radians);
						})
						.attr('y', function (d)
						{
							return -hourLabelRadius * Math.cos(hourScale(d) * radians) + hourLabelYOffset;
						})
						.text(function (d)
						{
							return d;
						});

					hands 		= face.append('g').attr('id', 'clock-hands');

					face.append('g').attr('id', 'face-overlay')
						.append('circle')
						.attr('class', 'hands-cover')
						.attr('x', 0)
						.attr('y', 0)
						.attr('r', clockRadius/20);

					if(scope.handsByDefault == true)
					{
						var clockHands 		= elm.find('.clockContainer svg #clock-face #clock-hands');
						console.log(clockHands.children);
						
					}
					scope.addHands();

				}

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:clock
				 * @name D3Test.clock.class:addHands
				 * @param {String} handType Which type of hand are we adding?
				 * @description
				 *
				 * This function adds hands to the face of the clock.
				**/
				scope.addHands = function ()
				{
					hands.selectAll('line')
						.data(handData)
						.enter()
						.append('line')
						.attr('class', function (d)
						{
							return d.type + '-hand';
						})
						.attr('x1',0)
						.attr('y1', function (d)
						{
							return d.balance ? d.balance : 0;
						})
						.attr('x2', 0)
						.attr('y2', function (d)
						{
							return d.length;
						})
						.attr('transform', function (d)
						{
							return 'rotate(' + d.scale(d.value) + ')';
						})
						.on('mousedown', function (d)
						{
							var clickType = d.type;
							//clockMouseDown(clickType);
						})
				}





				/**
				**/
				scope.showHand = function (handType)
				{

				}

				

				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:clock
				 * @name D3Test.clock.class:moveHands
				 * @description
				 *
				 * Move the hands on the clock based on data sent.
				**/
				function moveHands()
				{
					d3.select('#clock-hands').selectAll('line')
						.data(handData)
						.transition()
						.attr('transform', function (d)
						{
							return 'rotate(' + d.scale(d.value) + ')';
						});
				}





				/**
                 * @ngdoc method
                 * @methodOf D3Test.directive:clock
                 * @name D3Test.clock.class:clockMouseDown
                 * @description
                 *
                 * Control moving minute, hour and second hands to desired position
				**/
				function clockMouseDown (e)
				{
					switch (e)
					{
						case 'hour':
							console.log('allow movement of  ' + e + ' hand.');
							svg.on('mousemove', clockMouseMove);
						break;

						case 'minute':
							console.log('allow movement of  ' + e + ' hand.');
							svg.on('mousemove', clockMouseMove);
						break;

						case 'second':
							console.log('allow movement of  ' + e + ' hand.');
							svg.on('mousemove', clockMouseMove);
						break;
					}
				}

				/**
                 * @ngdoc method
                 * @methodOf D3Test.directive:clock
                 * @name D3Test.clock.class:clockMouseUp
                 * @description
                 *
                 * Stop movement of elements. Catpure current values.
				**/
				function clockMouseUp ()
				{
					mouseMoving 		= false;
					svg.on('mousemove', null);
				}





				/**
				 * @ngdoc method
				 * @methodOf D3Test.directive:clock
				 * @name D3Test.clock.class:clockMouseMove
				 * @description
				 *
				 * Moving the specified clock hand around the radius of the clock face.
				**/
				function clockMouseMove ()
				{
					mouseMoving 		= true;
					var m 				= d3.mouse(this);
					var x 				= m[0];
					var y 			 	= m[1];
					var r 				= 0;

					console.log('x: ' + x); console.log(x^2);
					console.log('y: ' + y);console.log(y^2);
					r 					= x^2 + y^2;
					console.log('position: ' + r);
					d3.select('.hour-hand')
						.transition()
						.attr('transform', 'rotate(' + r + ')');


					/*d3.select('#clock-hands').selectAll('line')
						.data(handData)
						.transition()
						.attr('transform', function (d)
						{
							return 'rotate(' + d.scale(d.value) + ')';
						});*/

					mouseMoving 		= false;
				}






				function updateData ()
				{
					var t = new Date();
					handData[0].value 	= (t.getHours() % 12) + t.getMinutes()/60;
					handData[1].value 	= t.getMinutes();
					handData[2].value 	= t.getSeconds();
				}

				//draw the clock
				drawClock();

				setInterval(function ()
				{
					updateData();
					moveHands();
				}, 1000);

				d3.select(self.frameElement).style('height', height + 'px');
			}
		}
	}])
}(D3Test.Directives = D3Test.Directives || {} ));