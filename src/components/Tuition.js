import * as d3 from "d3";
import React from 'react';
require('dotenv').config()

export default class Tuition extends React.Component{
    constructor(props){
        super(props)
        this.state={}
        this.makeDonutGraph = this.makeDonutGraph.bind(this);
    }

   makeDonutGraph(){
        var data = this.props.parentDataProp;

        if(data){
            let raceNameArray = [];

        for(let i=0; i<data.length; i++){
            raceNameArray.push(data[i].name);
        }

        var text = "";
        var width = 260; 
        var height = 260;
        var thickness = 40;

        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeSet2);

        var svg = d3.select("#chart-tuition")
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
                        .text(`${`${(d.data.value*100).toFixed(2)+'%'}`}`)
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
        var Svg = d3.select("#legend-tuition")

        // create a list of keys


        // Usually you have a color scale in your chart already
        var colorLegend = d3.scaleOrdinal()
                            .domain(raceNameArray)
                            .range(d3.schemeSet2);

        // Add one dot in the legend for each name.
        Svg.selectAll("mydots")
        .data(raceNameArray)
        .enter()
        .append("circle")
        .attr("cx", 100)
        .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return colorLegend(d)})

        // Add one dot in the legend for each name.
        Svg.selectAll("mylabels")
        .data(raceNameArray)
        .enter()
        .append("text")
        .attr("x", 120)
        .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return colorLegend(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        }
   }

    render(){
        this.makeDonutGraph();
        return(
            <div className="flex-container-donut-tuition">
                <h1 className="graph-header">Tuition</h1>
                <div id="chart-tuition" className="printable"></div>
                <svg id="legend-tuition"></svg>
            </div>
        )
    }
}

