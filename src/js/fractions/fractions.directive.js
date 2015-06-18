(function (Directive, undefined) 
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:fractions
     * @description
     *
     * Create different shapes and allow highlighting to display fractions.
     * Display fraction on screen.
    **/
    D3Test.Modules.D3Test.directive("fractions", [ function () {
        return {
            restrict: 'E',
            controller: 'FractionsCtrl',
            link: function (scope, elm, attrs)
            {
                //console.log(scope);
                //console.log(elm);
                console.log(attrs);

                var svg,
                    thisType        = attrs.type,
                    slices          = attrs.slices,
                    margin          = 20,
                    width           = 300 + margin,
                    height          = 300 + margin,
                    selectedArray   = [],
                    container       = elm.find('#fractionsContainer')[0];

                console.log('this type: ' + thisType);
                console.log('slices: ' + slices);
                console.log(scope.objectType[thisType].shape);

                var newX = 0;
                var newY = 0;


                //draw shape based on type
                switch (scope.objectType[thisType].shape)
                {
                    case "rect":
                        svg     = d3.select(container)
                            .append("svg")
                            .attr({width: width, height: height});

                        //draw shape
                        for(var i=0; i < slices; i++)
                        {
                            if(i % 2)
                            {
                                newX = margin * 2;
                                newY = margin*2;
                                if(i > 1)
                                {
                                    console.log(i + 'NEW Y');
                                    newY = height/2;
                                }
                                console.log('odd: '  + i);
                                console.log('new y: ' + newY);
                                console.log('new x: ' + newX);
                            }
                            else
                            {
                                newX = width/2;
                                newY = margin*2;

                                if(i > 0 )
                                {
                                    newY = height/2;
                                }
                                console.log(i);
                                console.log('new y: ' + newY);
                                console.log('new x: ' + newX);
                            }
                            shape       = svg.append("" + scope.objectType[thisType].shape + "")
                                .attr({ style: "fill: #ffffff; stroke: #000; stroke-width: 2; cursor: pointer;",
                                    id: "block" + i,
                                    x: newX,
                                    y: newY,
                                    width: width/(slices/2) - margin*2,
                                    height: height/(slices/2) - margin*2})
                                .on('mousedown', fractionMouseDown );
                        }
                    break;

                    default:
                    break;
                }




                /**
                 * @ngdoc directive
                 * @methodOf D3Test.directive:fractions
                 * @name D3Test.fractions.class:fractionMouseDown
                 * @description
                 *
                 * Handle mouse down of each slice and update the fraction display.
                **/
                function fractionMouseDown()
                {
                    var block       = elm.find('#' + this.id);
                    if(selectedArray.indexOf(this.id) == -1)
                    {
                        selectedArray.push(this.id);
                        block.attr('style', 'fill: #000');
                    } else {
                        var itemToRemove = selectedArray.indexOf(this.id);
                        selectedArray.splice(itemToRemove, 1);
                        block.attr('style', 'fill: #fff')
                            .attr('stroke', '#000')
                            .attr('stroke-width', '2px');
                    }
                    updateFraction();
                }




                /**
                **/
                function updateFraction ()
                {
                    scope.fraction      = "" + selectedArray.length + "/" + slices;

                    scope.$apply();
                }






            }
        }
    }]);
}(D3Test.Directive == D3Test.Directive || {} ));
