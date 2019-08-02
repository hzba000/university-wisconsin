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
    }

    fetchData(){
        fetch(`https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=${API_KEY}`)
            .then(function(response) {
                 return response.json();
            })
            .then(function(myJson) {
                // console.log(JSON.stringify(myJson));
                console.log(myJson.results[0].school.name)
                console.log(myJson.results[0].school.school_url)
                console.log(myJson.results[0].school.city)
                console.log(myJson.results[0].school.state)
                console.log(myJson.results[0].school.zip)
                console.log(myJson.results[0].latest.student.size)
                console.log("Grad Students" + myJson.results[0].latest.student.grad_students)
                console.log(myJson.results[0].latest.student.demographics.race_ethnicity.white)
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
        return(<p>From Landing</p>)
    }
}