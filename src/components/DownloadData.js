
import React from 'react';

export default function DownloadData (props){
    return(
        <div>
            <button className="no-print" onClick={props.downloadData}>Download CSV</button>
            {/* for firefox */}
            <a id="dummy_download"></a>
        </div>
    )
}

