
import React from 'react';

export default function Information (props){
    return(
        <div className="information no-print">
            <h1 class="school-name"> University of Wisconsin-Madison</h1>
            <div className="flex-information-container">
                {/* <div> <h2>School Name:</h2> <p>{props.schoolNameProp}</p> </div> */}
                <div className="flex-vertical"> <h2>Website</h2> <p>{props.schoolUrlProp}</p> </div>
                <div className="flex-vertical"> <h2>City</h2> <p>{props.schoolCityProp}</p> </div>
                <div  className="flex-vertical"> <h2>State</h2> <p>{props.schoolStateProp}</p> </div>
                <div  className="flex-vertical"> <h2>Zip</h2> <p>{props.schoolZipProp}</p> </div>
                <div  className="flex-vertical"> <h2>Population</h2> <p>{props.schoolSizeProp}</p> </div>
            </div>
        </div>
    )
}

