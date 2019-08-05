import * as d3 from "d3";
import React from 'react';
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;

// ----------------------------------------------------------

export default class Tuition extends React.Component{
    constructor(props){
        super(props)
        this.state={
            
        }
        this.makeBarGraph = this.makeBarGraph.bind(this);
    }

   componentDidMount(){
      
   }

   makeBarGraph(){

   }
    render(){
        this.makeBarGraph();
        return(
            <div>
                <svg id="chart"></svg>
            </div>
        )
    }
}

Tuition.defaultProps = {raceWhiteProp: 20};
