import * as d3 from "d3";
import React from 'react';
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;

// ----------------------------------------------------------

export default class DonutRace extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.makeDonutGraph = this.makeDonutGraph.bind(this);
    }

   componentDidMount(){
      
   }

   makeDonutGraph(){
    console.log(this.props.raceWhiteProp)
    console.log(this.props.raceWhiteProp)
    var data = [
        {name: "White", value: this.props.raceWhiteProp},
        {name: "Hispanic", value: this.props.raceHispanicProp},
        {name: "Asian", value: this.props.raceAsianProp},
        {name: "Black", value: this.props.raceBlackProp}


        // {name: "UK", value: 20},
        // {name: "Canada", value: 30},
        // {name: "Maxico", value: 10},
      ];
      var text = "";
      
      var width = 260; 
      var height = 260;
      var thickness = 40;
      var duration = 750;
      
      var radius = Math.min(width, height) / 2;
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      
      var svg = d3.select("#chart")
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);
      
      var g = svg.append('g')
      .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');
      
      
      var arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
      
      var pie = d3.pie()
      .value(function(d) { return d.value; })
      .sort(null);
      
      var path = g.selectAll('path')
      .data(pie(data))
      .enter()
      .append("g")
      .on("mouseover", function(d) {             
            let g = d3.select(this)
              .style("cursor", "pointer")
              .style("fill", "black")
              .append("g")
              .attr("class", "text-group");
       
            g.append("text")
              .attr("class", "name-text")
              .text(`${d.data.name}`)
              .attr('text-anchor', 'middle')
              .attr('dy', '-1.2em');
        
            g.append("text")
              .attr("class", "value-text")
              .text(`${d.data.value}`)
              .attr('text-anchor', 'middle')
              .attr('dy', '.6em');
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")  
              .style("fill", color(this._current))
              .select(".text-group").remove();
          })
        .append('path')
        .attr('d', arc)
        .attr('fill', (d,i) => color(i))
        .on("mouseover", function(d) {
            d3.select(this)     
              .style("cursor", "pointer")
              .style("fill", "black");
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")  
              .style("fill", color(this._current));
          })
        .each(function(d, i) { this._current = i; });
    
      g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text(text);
    // *******************************
    
    // select the svg area
    var Svg = d3.select("#legend")
    
    // create a list of keys
    var keys = ["Mister A", "Brigitte", "Eleonore", "Another friend", "Batman"]
    
    // Usually you have a color scale in your chart already
    var colorLegend = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeCategory10);
    
    // Add one dot in the legend for each name.
    Svg.selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return colorLegend(d)})
    
    // Add one dot in the legend for each name.
    Svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 120)
    .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return colorLegend(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
   }

    render(){
        this.makeDonutGraph();
        return(
            <div>
                <div id="chart"></div>
                <svg id="legend"></svg>
            </div>
        )
    }
}

DonutRace.defaultProps = {raceWhiteProp: 20};
