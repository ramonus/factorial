import React, { Component } from 'react';
import "./StartComponent.css";

export default class StartComponent extends Component{

    render(){
        return(
            <div className="start_design_container">
                <div className="start_design_title">
                    Choose what you want to do:
                </div>
                <div className="choose_option_container">
                <CreateNewDesignComponent 
                    onClick={() => console.log("Clicked!")}/>
                </div>
                <div style={{display: 'inline-block'}}>
                    test
                </div>
            </div>
        );
    }
}

class CreateNewDesignComponent extends Component{
    _onClickHandler = () => {
        if(this.props.onClick){
            this.props.onClick();
        }
    }
    render(){
        return(
            <div className="new_design_container">
                <span className="new_design_button">
                    <i className="fa fa-plus"></i>
                </span>
            </div>
        );
    }
}