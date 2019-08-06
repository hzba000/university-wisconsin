
import React from 'react';

export default function DownloadData (props){

    return(
        <div>
            <button onClick={props.downloadData}>Download CSV</button> 
            <a id="dummy_download"></a>
        </div>
    )
}

