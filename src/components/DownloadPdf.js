
import React from 'react';

export default function DownloadPdf (props){
    return(
        <div>
            <button id="cmd" className="no-print button" onClick={props.downloadPdf} >Generate PDF</button>
        </div>
    )
}

