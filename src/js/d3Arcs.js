/**
 * Created by kchunter on 1/12/2015.
 */
var D3Tut = D3Tut || {};

D3Tut.init = function ()
{
    var data    = [10, 50, 30];
    var r       = 300;

    var color   =
        d3.scale.ordinal()
            .range(["#d81305", "#3044b5", "yellow"]);


    var canvas  =
        d3.select("body").append("svg")
            .attr("width", 1500)
            .attr("height", 1500);

    var group   =
        canvas.append("g")
            .attr("transform", "translate(300,300)");

    //arc path generator
    var arc     =
        d3.svg.arc()
            .innerRadius(0)//set inner radius to 0 to make it a pie chart
            .outerRadius(r);

    //layout
    var pie     =
        d3.layout.pie()
            .value(function (d)
            {
                return d;
            });

    //arc
    var arcs    =
        group.selectAll(".arc")
            .data(pie(data))//bind data but first put it in the pie layout
            .enter()
            .append("g")
            .attr("class", "arc");

    //append a path to each
    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function (d)
        {
            return color(d.data);
        });

    arcs.append("text")
        .attr("transform", function (d)
        {
            return "translate(" + arc.centroid(d) + ")";//puts the labels in the center
        })
        .attr("text-anchor", "middle")//sets text to middle
        .attr("font-size", "1.5em")
        .text(function (d)
        {
            return d.data;
        });

    /*var group =
        canvas.append("g")
            .attr("transform", "translate(100,100)");

    var r = 100; //outer radius
    var p = Math.PI * 2;//radian value for perimeter for full circle

    var arc =
        d3.svg.arc()
            .innerRadius(r -20)
            .outerRadius(r)
            .startAngle(0)
            .endAngle(p); //subtract 1 from p to remove one radian

    group.append("path")
        .attr("d", arc)*/
};