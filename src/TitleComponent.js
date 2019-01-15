import React, { Component } from "react";
import "./TitleComponent.css"
export default class TitleComponent extends Component{
    constructor(props){
        super(props);
        let t = null;
        if(props.title){
            t = props.title;
        }
        this.state = {
            title: t,
        }
    }
    render(){
        return(
            <div className="title_container">
                <div className="title_text">
                    {this.state.title||"Factorial Design"}
                </div>
            </div>
        );
    }
}