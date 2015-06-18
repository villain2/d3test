(function (Controllers, undefined)
{
    D3Test.Modules.D3Test.controller('CheckboxCtrl', ['$scope', 'checkboxFactory', function ($scope, checkboxFactory)
    {
        var scope               = $scope;
        scope.totalRows         = 0;
        scope.totalColumns      = 0;

        scope.checkboxData      = {};
        scope.newtable          = '<table style="width:100%;">' +
            '<thead>'+
            '<tr><th></th></th><th data-ng-repeat="columns in checkboxData.columns">{{columns.title}}</th></tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr data-ng-repeat="rows in checkboxData.rows">' +
            '<td>{{rows.value}}</td>' +
            '<td data-ng-repeat="answer in checkboxData.rows[$index].answers[0] track by $index"><input type="checkbox">{{answer}} -- {{rows.id}}:{{$index}}</td>' +
            '</tr>' +
            '</tbody></table>';

        getData();

        function getData()
        {
            checkboxFactory.getData()
                .success(function (d)
                {
                    console.log(d);
                    scope.checkboxData      = d;
                    buildTable();
                })
                .error(function (error)
                {
                    alert('error in retrieving data');
                });
        }

        function buildTable()
        {

            totalColumns        = scope.checkboxData.columns.length + 1;
            totalRows           = scope.checkboxData.rows.length + 1;
            console.log(scope.checkboxData.rows[0].answers[0]);
        }
    }]);
}(D3Test.Controllers = D3Test.Controllers || {} ));