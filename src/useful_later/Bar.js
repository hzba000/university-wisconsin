import * as d3 from "d3";


var dataset = [
    {month: "Jan", pizzas: 10000},
    {month: "Feb", pizzas: 20000},
    {month: "Mar", pizzas: 40000},
    {month: "Apr", pizzas: 30000},
    {month: "May", pizzas: 30000},
    {month: "Jun", pizzas: 50000},
    {month: "Jul", pizzas: 30000},
    {month: "Aug", pizzas: 50000},
    {month: "Sep", pizzas: 60000},
    {month: "Oct", pizzas: 20000},
    {month: "Nov", pizzas: 10000},
    {month: "Dec", pizzas: 90000},
];
// Notice the change of dataset

// Calculate Margins and canvas dimensions
var margin = {top: 40, right: 40, bottom: 40, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Notice the change of Scale to Band and how the scale now starts at zero
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);

var y = d3.scaleLinear()
    .range([height, 0]);

var svg = d3.select("body").append("svg")
    .style("background-color", '#888')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
  x.domain(dataset.map(function(d) { return d.month; }));
  y.domain([0, d3.max(dataset, function(d) { return d.pizzas; })]);

// Axes
  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));
  // Labels
  svg.append("text")
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .attr("transform", "translate("+ (margin.left - 108 ) +","+(height/2)+")rotate(-90)")  
            .text("Pizzas");

  svg.append("text")
            .style("font-size", "14px")
            .attr("text-anchor", "middle") 
            .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom -74))+")")
            .text("Month");

  //  Chart Title
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 20 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Pizza consumption");
// Adding Bars
  svg.selectAll(".bar")
      .data(dataset)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.month); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.pizzas); })
      .attr("height", function(d) { return height - y(d.pizzas); });



// See also :
//https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4