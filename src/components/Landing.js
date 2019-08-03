import * as d3 from "d3";
import React from 'react';
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;


export default class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount(){
        this.fetchData();
        var data = [
            {name: "USA", value: 40},
            {name: "UK", value: 20},
            {name: "Canada", value: 30},
            {name: "Maxico", value: 10},
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
  .range(d3.schemeSet2);

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

    fetchData(){
        fetch(`https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=${API_KEY}`)
            .then(response => {
                 return response.json();
            })
            .then(myJson => {
                // console.log(JSON.stringify(myJson));
                console.log(myJson.results[0].school.name)
                console.log(myJson.results[0].school.school_url)
                console.log(myJson.results[0].school.city)
                console.log(myJson.results[0].school.state)
                console.log(myJson.results[0].school.zip)
                console.log(myJson.results[0].latest.student.size)
                console.log("Grad Students" + myJson.results[0].latest.student.grad_students)
                console.log(myJson.results[0].latest.student.demographics.race_ethnicity.white)
                console.log(myJson.results[0].latest.academics.program_percentage.education)
//                 "nhpi": 0.001,
// "non_resident_alien": 0.0913,
// "black_2000": 0.0205,
// "aian_2000": 0.0047,
// "hispanic_prior_2009": 0,
// "black": 0.0211,
// "asian": 0.0599,
// "api_2000": 0.0413,
// "hispanic_2000": 0.0218,
// "unknown_2000": 0,
// "unknown": 0.008,
// "white_non_hispanic": 0,
// "black_non_hispanic": 0,
// "asian_pacific_islander": 0,
// "white": 0.7318,
// "two_or_more": 0.0328,
// "hispanic": 0.0521,
// "aian": 0.002,
// "aian_prior_2009": 0,
// "white_2000": 0.8708



// "academics": {
//     "program_percentage": {
//     "education": 0.0166,
//     "mathematics": 0.0191,
//     "business_marketing": 0.15,
//     "communications_technology": 0,
//     "language": 0.0286,
//     "visual_performing": 0.0207,
//     "engineering_technology": 0,
//     "parks_recreation_fitness": 0.0129,
//     "agriculture": 0.0328,
//     "security_law_enforcement": 0,
//     "computer": 0.0354,
//     "precision_production": 0,
//     "humanities": 0,
//     "library": 0,
//     "psychology": 0.0363,
//     "social_science": 0.1014,
//     "legal": 0.0084,
//     "english": 0.0166,
//     "construction": 0,
//     "military": 0,
//     "communication": 0.0566,
//     "public_administration_social_service": 0.01,
//     "architecture": 0.0029,
//     "ethnic_cultural_gender": 0.0095,
//     "resources": 0.0178,
//     "health": 0.0548,
//     "engineering": 0.1332,
//     "history": 0.015,
//     "theology_religious_vocation": 0,
//     "transportation": 0,
//     "physical_science": 0.0225,
//     "science_technology": 0,
//     "biological": 0.1384,
//     "family_consumer_science": 0.0287,
//     "philosophy_religious": 0.0072,
//     "personal_culinary": 0,
//     "multidiscipline": 0.0247,
//     "mechanic_repair_technology": 0
//     }
            });
    }

    render(){
        return(
            <div>
                <div id="chart"></div>
                <svg id="legend"></svg>
            </div>
        )
    }
}