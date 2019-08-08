
import React from 'react';

export default function Information (props){
    return(
        <div className="information no-print">
            <h1> University of Wisconsin Data </h1>
            <div className="flex-information-container">
                <div> <h2>School Name:</h2> <p>{props.schoolNameProp}</p> </div>
                <div> <h2>School URL:</h2> <p>{props.schoolUrlProp}</p> </div>
                <div> <h2>School City:</h2> <p>{props.schoolCityProp}</p> </div>
                <div> <h2>School State:</h2> <p>{props.schoolStateProp}</p> </div>
                <div> <h2>School Zip:</h2> <p>{props.schoolZipProp}</p> </div>
                <div> <h2>School Size:</h2> <p>{props.schoolSizeProp}</p> </div>
            </div>
        </div>
    )
}

