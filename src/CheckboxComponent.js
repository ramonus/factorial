import React, { Component } from 'react';
import "./CheckboxComponent.css";

export default class CheckboxComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.checked||false,
        };
    }
    _onChangeHandler = () => {
        let checked = this.state.checked;
        if(checked){
            checked = false;
        }else{
            checked = true;
        }
        this.setState({checked}, () => {
            if(this.props.onChange){
                this.props.onChange(checked);
            }
        });
    }
    render(){
        return(
            <div className="checkbox_container">
                <input type="checkbox" id="test1"
                onChange={this._onChangeHandler.bind(this)}
                />
                <label for="test1">{this.props.text||null}</label>
            </div>
        );
    }
}