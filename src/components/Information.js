
import React from 'react';

export default function Information (props){
    return(
        <div className="information no-print">
            <p> School Name: {props.schoolNameProp} </p>
            <p> School URL: {props.schoolUrlProp} </p>
            <p> School City: {props.schoolCityProp} </p>
            <p> School State: {props.schoolStateProp} </p>
            <p> School Zip: {props.schoolZipProp} </p>




        </div>
    )
}

// Information.defaultProps = {guessProp: "Not guessed yet"};