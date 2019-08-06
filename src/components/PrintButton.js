
import React from 'react';

export default function PrintButton (props){
    return(
        <button class="no-print" id="print-button"onClick={props.printScreen}>Print</button>
    )
}

