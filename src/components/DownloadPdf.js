
import React from 'react';

export default function DownloadPdf (props){
    return(
        <div>
            <button id="cmd" className="no-print" onClick={props.downloadPdf} >Generate PDF</button>
        </div>
    )
}

