import React, { Component } from "react";
import history from './history';
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
    _titleClickHandler = () => {
        history.push("/");
    }
    render(){
        return(
            <div className="title_container">
                <div className="title_text"
                    onClick={this._titleClickHandler.bind(this)}>
                    {this.state.title||"Factorial Design"}
                </div>
            </div>
        );
    }
}