import React from 'react';
import Landing from './components/Landing'

export class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div><Landing /></div>
        )
    }
}
