(function (Directives, undefined) {
    /**
     * @ngdoc directive
     * @name D3Test.directive:imagemap
     * @description
     *
     * Draw new maps based on svg image drawn. 
     * Create functions for controlling shading, labeling and manipulation of map sections.
    **/
    D3Test.Modules.D3Test.directive("imagemap", [ function () {
        return {
            restrict: 'E',
            controller: 'ImageMapCtrl',
            link: function (scope, elm, attrs) {
                var margin           = scope.margin;
                var mapObjArray      = [];
                
                
                var x = d3.scale.linear()
                    .domain([-(scope.domainWidth), scope.domainWidth])
                    .range([0, scope.width]);

                var y = d3.scale.linear()
                    .domain([-(scope.domainHeight), scope.domainHeight])
                    .range([scope.height, 0]);
                
                var svg = d3.select('#imagemap')
                    .append('svg')
                    .attr('width', scope.width + margin.left + margin.right)
                    .attr('height', scope.height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', 'translate(' + scope.margin.left + ', ' + scope.margin.top + ')');
                
                var mapObj = svg.append('g');
                
                var maps                = elm.find('#Map');
                var mapObject           = maps[0].children[3].children;
                var totalMapObjects     = mapObject.length;
                //console.log(mapObject);
                //console.log(mapObject[0].children[3].children);
                
                for(var i = 0; i < totalMapObjects; i++)
                {
                    mapObjArray.push(mapObject[i].id);
                }
                
               /* mapObj.append("use")
                    .attr("xlink:href", "#Map")
                    .data(mapObjArray);*/
                    //.attr("xlink:href", "#sea_-_back")
                    //.attr("xlink:href", "#gray_territory")
                    //.attr("xlink:href", "#white_territory")
                    //.attr("xlink:href", "#borders")
                    //.attr("xlink:href", "#border_Europe");
                
                for (var x = 0; x < totalMapObjects; x++)
                {
                    mapObj.append("use")
                    .data(mapObjArray)
                    .attr("xlink:href", "#" + mapObjArray[x])
                    .attr("cursor", "pointer")
                    .on("mousedown", mapMouseDown);
                }
                
                
                function mapMouseDown()
                {
                    console.log(this.href.baseVal);
                    //this.attr('fill', 'red');
                    $(this.href.baseVal).attr("fill", "green");
                }
                
                
                
            }
        }
        
    }]);
}(D3Test.Directives = D3Test.Directives || {} ));