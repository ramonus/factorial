import React, { Component } from 'react';
import "./ButtonComponents.css";

export default class ButtonComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: this.props.value,
        };
    }
    _onClickHandler = () =>{
        if(this.props.onClick){
            this.props.onClick();
        }else{
            console.warn("Useless button");
        }
    }
    render(){
        return(
            <div className="btn"
                onClick={this._onClickHandler.bind(this)}>
                {this.state.text}
            </div>
        );
    }
}