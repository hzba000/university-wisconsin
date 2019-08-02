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
        console.log(API_KEY);
        this.fetchData();
    }

    fetchData(){
        fetch(`https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=${API_KEY}`)
            .then(function(response) {
                 return response.json();
            })
            .then(function(myJson) {
                console.log(JSON.stringify(myJson));
            });
    }

    render(){
        return(<p>From Landing</p>)
    }
}