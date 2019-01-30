import React, { Component } from 'react';
import "./StartComponent.css";
import ButtonComponent from "./ButtonComponents";
import { Link } from 'react-router-dom';
export class Step1Component extends Component{
    render(){
        return(
            <div className="start_design_container">
                <div className="start_design_title">
                    Choose what you want to do:
                </div>
                <div className="choose_option_container">
                    <CreateNewDesignComponent 
                        route={"/factors"}/>
                </div>
            </div>
        );
    }
}
export class CreateNewDesignComponent extends Component{
    render(){
        return(
            <div className="new_design_container">
                <Link to={this.props.route} style={{ textDecoration: 'none' }}>
                    <div 
                        className="new_design_button"
                        data-tooltip="Start a new design" data-tooltip-position="right"
                        >
                        <i className="fa fa-plus"></i>
                    </div>
                </Link>
            </div>
        );
    }
}
export class NumberFactorComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            factors: 7,
        };
    }
    _onChooseHandler = () => {
        let fac = this.state.factors;
        if(fac>15){
            fac = 15;
        }else if(fac<2){
            fac = 2;
        }
        this.setState({factors: fac}, () => {    
            if(this.props.onClick){
                this.props.onClick(this.state.factors);
            }
        });
    }
    render(){
        return(
            <div className="start_design_container">
                <div className="start_design_title">
                    How many factors does your design need?
                </div>
                <div className="number_factor_chooser">
                    Factors: <input type="number" className="number_factor_spinner" min="2" max="15" step="1"
                        value={this.state.factors}
                        onChange={(e) => this.setState({factors: e.target.value})} />
                </div>
                <ButtonComponent value="Next" 
                    onClick={this._onChooseHandler.bind(this)}/>
            </div>
        );
    }
}
