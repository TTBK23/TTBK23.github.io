function plotWealthData(ageData, wealthSeriesData) {

    // define graph dimensions
    var m = [80, 80, 80, 80]; // margins
    var w = 1000 - m[1] - m[3]; // width
    var h = 400 - m[0] - m[2]; // height

//    var data = [[1, 2],[2, 6],[3, 5]];

    var data = [];
    for(let j=0; j<wealthSeriesData.length; j++) {
        data[j] = [];
        for(let i=0; i<ageData.length; i++) {
            data[j].push([ageData[i], wealthSeriesData[j][i]]);
        }
    }

    var x = d3.scaleLinear().domain([20, 90]).range([0, w]);
    var y = d3.scaleLinear().domain([0, 3000000]).range([h, 0]);

    var line = d3.line()
    .x(function(d) {return x(d[0]);})
    .y(function(d) {return y(d[1]);})

    d3.select("#graph").selectAll("*").remove();
    var graph = d3.select("#graph").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    var xAxis = d3.axisBottom(x).tickSize(4);//.tickSubdivide(true);
    graph.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

    var yAxis = d3.axisLeft(y).ticks(4);
    graph.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,0)")
    .call(yAxis);

    let c = ["gray", "red", "orange", "green", "lightgreen"];

    for(let j=0; j<wealthSeriesData.length; j++) {
        graph.append("svg:path")
        .attr("d", line(data[j]))
        .attr("stroke", c[j]);
    }
}
