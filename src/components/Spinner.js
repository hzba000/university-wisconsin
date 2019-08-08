import React from 'react';
import loader from './loader.png';

export default function Spinner(props){
    return(
        <div className="spinner">
            <img src={loader} alt="loader"/>
        </div>
    );
};

