import React, { Component } from 'react';
import TitleComponent from './TitleComponent';
import StartComponent from './StartComponent';
import './MainComponent.css'

export default class MainComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container">
                <TitleComponent />
                <StartComponent />
                <div className="content_container">
                    <h1>Ramon</h1>
                </div>
            </div>
        );
    }
}
