import * as d3 from "d3";
import React from 'react';
import DonutRace from './DonutRace'
import DonutProgram from './DonutProgram'
import Information from './Information'
import Tuition from './Tuition'
import PrintButton from './PrintButton'
import DownloadData from './DownloadData'

let programDataArray = [];
let ethnicityDataArray = [];
let parentDataArray = [];


require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;


export default class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            schoolname: '',
            schoolurl: '',
            schoolcity: '',
            schoolstate: '',
            schoolzip: '',
            racewhite: null,
            racehispanic: null,
            raceasian: null,
            raceblack: null,
            programdata: null,
            ethnicitydata: null,
            parentdata: null,
        }
        this.fetchData = this.fetchData.bind(this);
        this.printScreen = this.printScreen.bind(this);
        this.downloadData = this.downloadData.bind(this);
    }

    componentWillMount(){
        this.fetchData();
    }

    printScreen(){
        window.print();
    }

    downloadData(){
        let formatParentArray = [];
        let formatProgramArray = [];
        let formatEthnicityArray = [];
        for(let i=0; i<programDataArray.length; i++){
            formatProgramArray.push(Object.values(programDataArray[i]))
        }
        for(let i=0; i<parentDataArray.length; i++){
            formatParentArray.push(Object.values(parentDataArray[i]))
        }
        for(let i=0; i<ethnicityDataArray.length; i++){
            formatEthnicityArray.push(Object.values(ethnicityDataArray[i]))
        }

        var data = [
            formatParentArray,
            formatProgramArray,
            formatEthnicityArray
         ];
         console.log(this.state.ethnicitydata)
        var csv = 'Parent Education Level\n';
        data.forEach(function(row) {
                csv += row.join(',')+"\n";
                csv += "\n";
        });
        console.log("hello")
        console.log(csv);
        var hiddenElement = document.getElementById('dummy_download');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'people.csv';
        hiddenElement.click();
    }

    fetchData(){
        fetch(`https://cors-anywhere.herokuapp.com/https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=${API_KEY}`)
            .then(response => {
                 return response.json();
            })
            .then(myJson => {
                    for (let key in myJson.results[0].latest.student.share_firstgeneration_parents){
                        let newObject = {}
                        let name = 'name';
                        let value = 'value';
                        newObject[name] = key;
                        newObject[value] = myJson.results[0].latest.student.share_firstgeneration_parents[key].toFixed(3) ;
                        // newObject[key] = myJson.results[0].latest.academics.program_percentage[key] 
                        parentDataArray.push(newObject);
                    }

                    for (let key in myJson.results[0].latest.academics.program_percentage){
                        let newObject = {}
                        let name = 'name';
                        let value = 'value';
                        newObject[name] = key;
                        newObject[value] = myJson.results[0].latest.academics.program_percentage[key].toFixed(3) ;
                        // newObject[key] = myJson.results[0].latest.academics.program_percentage[key] 
                        programDataArray.push(newObject);
                    }

                    ethnicityDataArray.push({"name":"Black","value":myJson.results[0].latest.student.demographics.race_ethnicity.black},{"name":"White","value":myJson.results[0].latest.student.demographics.race_ethnicity.white},{"name":"Hispanic","value":myJson.results[0].latest.student.demographics.race_ethnicity.hispanic},{"name":"Asian","value":myJson.results[0].latest.student.demographics.race_ethnicity.asian})

                    // for (let key in myJson.results[0].latest.student.demographics.race_ethnicity){
                    //     let newObject = {}
                    //     let name = 'name';
                    //     let value = 'value';
                    //     newObject[name] = key;
                    //     newObject[value] = myJson.results[0].latest.student.demographics.race_ethnicity[key] ;
                    //     // newObject[key] = myJson.results[0].latest.academics.program_percentage[key] 
                    //     ethnicityDataArray.push(newObject);
                    // }
                

                // console.log(myJson.results[0].latest.academics.program_percentage);
                console.log(programDataArray);
                console.log(parentDataArray);

                this.setState(
                    {
                        programdata: programDataArray,
                        parentdata: parentDataArray,
                        // ethnicitydata: ethnicityDataArray,
                        schoolname: myJson.results[0].school.name,
                        schoolurl: myJson.results[0].school.school_url,
                        schoolcity: myJson.results[0].school.city,
                        schoolstate: myJson.results[0].school.state,
                        schoolzip: myJson.results[0].school.zip,
                        racewhite: myJson.results[0].latest.student.demographics.race_ethnicity.white,
                        racehispanic: myJson.results[0].latest.student.demographics.race_ethnicity.hispanic,
                        raceasian: myJson.results[0].latest.student.demographics.race_ethnicity.asian,
                        raceblack: myJson.results[0].latest.student.demographics.race_ethnicity.black,
                        racehispanic: myJson.results[0].latest.student.demographics.race_ethnicity.hispanic,
                        raceasian: myJson.results[0].latest.student.demographics.race_ethnicity.asian,
                        raceblack: myJson.results[0].latest.student.demographics.race_ethnicity.black
                    })

                // console.log(JSON.stringify(myJson));
                console.log(myJson.results[0].school.name)
                console.log(myJson.results[0].school.school_url)
                console.log(myJson.results[0].school.city)
                console.log(myJson.results[0].school.state)
                console.log(myJson.results[0].school.zip)
                console.log(myJson.results[0].latest.student.size)
                console.log("Grad Students" + myJson.results[0].latest.student.grad_students)

                console.log("WHITE"+myJson.results[0].latest.student.demographics.race_ethnicity.white)
                console.log("HISPANIC"+myJson.results[0].latest.student.demographics.race_ethnicity.hispanic)
                console.log("ASIAN" + myJson.results[0].latest.student.demographics.race_ethnicity.asian)
                console.log("BLACK" + myJson.results[0].latest.student.demographics.race_ethnicity.black)


                console.log(myJson.results[0].latest.academics.program_percentage.education)
                console.log(myJson.results[0].latest.cost.tuition.out_of_state)
                console.log(myJson.results[0].latest.cost.tuition.in_state)

                console.log(myJson.results[0].latest.student.share_firstgeneration_parents)



                //put races in array and loop over them to populate graph
                //Use a bar chart for academic programs
                
//                 "nhpi": 0.001,
// "non_resident_alien": 0.0913,
// "black_2000": 0.0205,
// "aian_2000": 0.0047,
// "hispanic_prior_2009": 0,
// "black": 0.0211,
// "asian": 0.0599,
// "api_2000": 0.0413, X
// "hispanic_2000": 0.0218, X
// "unknown_2000": 0, X
// "unknown": 0.008, X
// "white_non_hispanic": 0, X
// "black_non_hispanic": 0, X
// "asian_pacific_islander": 0, X
// "white": 0.7318, X
// "two_or_more": 0.0328, X
// "hispanic": 0.0521, X
// "aian": 0.002, X
// "aian_prior_2009": 0, X
// "white_2000": 0.8708 X



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
        const schoolNameProp = this.state.schoolname;
        const schoolUrlProp = this.state.schoolurl;
        const schoolCityProp = this.state.schoolcity;
        const schoolStateProp = this.state.schoolstate;
        const schoolZipProp = this.state.schoolzip;
        const raceWhiteProp = this.state.racewhite;
        const raceHispanicProp = this.state.racehispanic;
        const raceAsianProp = this.state.raceasian;
        const raceBlackProp = this.state.raceblack;
        const programDataProp = this.state.programdata;
        const parentDataProp = this.state.parentdata;
        // const ethnicityDataProp = this.state.ethnicityDataProp;
        console.log(programDataProp)

        return(
            <div class="parent">
                <div className="flex-container">
                <DonutRace 
                    raceWhiteProp={raceWhiteProp}
                    raceHispanicProp={raceHispanicProp}
                    raceAsianProp={raceAsianProp}
                    raceBlackProp={raceBlackProp}
                    // ethnicityDataProp={ethnicityDataProp}
                />
                <DonutProgram programDataProp={programDataProp} raceWhiteProp={raceWhiteProp}/>
                <Tuition parentDataProp={parentDataProp} raceWhiteProp={raceWhiteProp}/>
                </div>
                <PrintButton printScreen = {this.printScreen}/>
                <DownloadData downloadData={this.downloadData}/>
                <Information 
                    schoolNameProp={schoolNameProp} 
                    schoolUrlProp={schoolUrlProp} 
                    schoolCityProp={schoolCityProp}
                    schoolStateProp={schoolStateProp}
                    schoolZipProp={schoolZipProp}
                />
            </div>
        )
    }

}
