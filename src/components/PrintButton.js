
import React from 'react';

export default function PrintButton (props){
    return(
        <button className="no-print button" id="print-button" onClick={props.printScreen}>Print</button>
    )
}

