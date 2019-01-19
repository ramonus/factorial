import React, { Component } from 'react';
import "./StartComponent.css";
import ButtonComponent from "./ButtonComponents";
import StyleDesignComponent from './StyleDesignComponent';
import DisplayDesignComponent from "./DisplayDesignComponent";
import { Link } from 'react-router-dom';

export default class StartComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            step: 0,
            factors: 0,
            designStyle: null,
        };
    }
    _new_design_onClick_handler = () => {
        this.setState({step: 1});
    }
    _number_factors_select_handler = (factors) => {
        this.setState({factors,step: 2});
    }
    _style_design_select_handler = (designStyle) => {
        this.setState({designStyle,step: 3});
    }
    render(){
        let comp = null;
        switch(this.state.step){
            case 1:
                comp = (<NumberFactorComponent onClick={this._number_factors_select_handler.bind(this)}/>);
                break;
            case 2:
                comp = (<StyleDesignComponent factors={this.state.factors} onClick={this._style_design_select_handler.bind(this)}/>);
                break;
            case 3:
                comp = (<DisplayDesignComponent factors={this.state.factors} options={this.state.designStyle} />);
                break;
            default:
                comp = (<Step1Component onClick={this._new_design_onClick_handler.bind(this)} />);
                break;
        }
        return(
            <div>
                {comp}
            </div>
        );
    }
}
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
                        className="new_design_button">
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
        if(this.props.onClick){
            this.props.onClick(this.state.factors);
        }
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
