(function (Directives, undefined)
{
    /**
     * @ngdoc directive
     * @name D3Test.directive:tablechart
     * @description
     *
     * HTML5 based table chart to show examples of how functionality will work.
     */
    D3Test.Modules.D3Test.directive("tablechart", [ function ()
    {
        return {
            restrict: 'E',
            controller: 'TableChartCtrl',
            link: function (scope, elm, attrs)
            {


                /**
                 * @ngdocs method
                 * @methodOf D3Test.directive:tablechart
                 * @name D3Test.tablechart.class:scope#checkAnswer
                 * @description
                 *
                 * Check the selected answers against the correct answers array.
                 * compile table Columns into a new array to compare against the tableAnswers array.
                 */
                scope.checkAnswer = function () {
                    var correctCount        = 0;

                    //console.log(scope.tableColumns.length);

                    for (var i = 0; i < scope.tableColumns.length; i++)
                    {
                        var theAnswer       = scope.tableColumns[i].answer;

                        if( (theAnswer == 0) && (scope.tableColumns[i].linear == true) )
                        {
                            isCorrect           = true;
                            correctCount++;
                        }
                        else if( (theAnswer == 1) && (scope.tableColumns[i].nonlinear == true) )
                        {
                            isCorrect           = true;
                            correctCount++;
                        }
                        else
                        {
                            isCorrect           = false;
                            endChecking("failed");
                        }
                    }

                    if(correctCount == scope.tableColumns.length)
                    {
                        endChecking("Passed");
                    }
                };






                /**
                 * @ngdocs method
                 * @methodOf D3Test.directive:tablechart
                 * @name D3Test.tablechart.class:scope#endChecking
                 * @param {String} passOrFail Determines whether or not the user has gotten all the items correct.
                 * @description
                 *
                 * End Checking for correct answers if just one answer is wrong.
                 */
                function endChecking(passOrFail)
                {
                    scope.answerValue           = passOrFail;
                }

            }
        }
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));
