
import React from 'react';

export default function DownloadPdf (props){
    return(
        <div>
            {/* <div id="content">
                <h3>Generate PDF files in client-side JavaScript</h3>
                <p>href="https://parall.ax/products/jspdf#"</p>
                <p>Or refer to the YouTube video: https://www.youtube.com/watch?v=CnprxD_sJFE</p>
            </div>

            <div id="editor"></div> */}

            <button id="cmd" onClick={props.downloadPdf} >Generate PDF</button>
        </div>
    )
}

