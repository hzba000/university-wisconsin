import React from 'react';
import $ from 'jquery'; 
import * as jsPDF from 'jspdf'

import DonutRace from './DonutRace'
import DonutProgram from './DonutProgram'
import Information from './Information'
import Tuition from './Tuition'
import PrintButton from './PrintButton'
import DownloadData from './DownloadData'
import DownloadPdf from './DownloadPdf'
import Spinner from './Spinner'

require('dotenv').config()

let programDataArray = [];
let ethnicityDataArray = [];
let parentDataArray = [];

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
            schoolsize: '',
            racewhite: null,
            racehispanic: null,
            raceasian: null,
            raceblack: null,
            programdata: null,
            ethnicitydata: null,
            parentdata: null,
            fetchstatus: "loading",
        }
        this.fetchData = this.fetchData.bind(this);
        this.printScreen = this.printScreen.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.downloadPdf = this.downloadPdf.bind(this);
    }

    downloadPdf(){
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML($('html').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
    
        doc.save('wisconsin-data.pdf');
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

        var csv = 'Data\n';
        data.forEach(function(row) {
                csv += row.join(','+"\n")+"\n";
                csv += "\n";
        });

        var hiddenElement = document.getElementById('dummy_download');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'wisconsin-data.csv';
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
                        parentDataArray.push(newObject);
                    }

                    for (let key in myJson.results[0].latest.academics.program_percentage){
                        let newObject = {}
                        let name = 'name';
                        let value = 'value';
                        newObject[name] = key;
                        newObject[value] = myJson.results[0].latest.academics.program_percentage[key].toFixed(3) ;
                        programDataArray.push(newObject);
                    }

                    //This is not a for loop, because the other races values made it hard to understand the racial breakup at the school
                    ethnicityDataArray.push({"name":"Black","value":myJson.results[0].latest.student.demographics.race_ethnicity.black},{"name":"White","value":myJson.results[0].latest.student.demographics.race_ethnicity.white},{"name":"Hispanic","value":myJson.results[0].latest.student.demographics.race_ethnicity.hispanic},{"name":"Asian","value":myJson.results[0].latest.student.demographics.race_ethnicity.asian})


                this.setState({
                        programdata: programDataArray,
                        parentdata: parentDataArray,
                        // ethnicitydata: ethnicityDataArray,
                        schoolname: myJson.results[0].school.name,
                        schoolurl: myJson.results[0].school.school_url,
                        schoolcity: myJson.results[0].school.city,
                        schoolstate: myJson.results[0].school.state,
                        schoolzip: myJson.results[0].school.zip,
                        schoolsize: myJson.results[0].latest.student.size,
                        racewhite: myJson.results[0].latest.student.demographics.race_ethnicity.white,
                        racehispanic: myJson.results[0].latest.student.demographics.race_ethnicity.hispanic,
                        raceasian: myJson.results[0].latest.student.demographics.race_ethnicity.asian,
                        raceblack: myJson.results[0].latest.student.demographics.race_ethnicity.black,
                })
            })
            .then(this.setState({fetchstatus:"done"}))
    }

    render(){
        const schoolSizeProp = this.state.schoolsize;
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
        const fetchStatusProp = this.state.fetchstatus;
        // const ethnicityDataProp = this.state.ethnicityDataProp;

        if(this.state.fetchstatus === "loading"){
            return(
                <Spinner fetchStatusProp={fetchStatusProp} />
            )
        }

        if(this.state.fetchstatus === "done"){
            return(
                <div className="parent">
                    <div className="button-horizontal">
                        <PrintButton printScreen = {this.printScreen}/>
                        <DownloadData downloadData={this.downloadData}/>
                        <DownloadPdf downloadPdf={this.downloadPdf}/>
                    </div>
                    <Information 
                        schoolNameProp={schoolNameProp} 
                        schoolUrlProp={schoolUrlProp} 
                        schoolCityProp={schoolCityProp}
                        schoolStateProp={schoolStateProp}
                        schoolZipProp={schoolZipProp}
                        schoolSizeProp = {schoolSizeProp}
                    />
                    <div className="flex-container-graphs">
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
                </div>
            )
        }

           
    }

}
