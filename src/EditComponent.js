import React, { Component } from 'react';
import ButtonComponent from './ButtonComponents';
import './EditComponent.css';

export default class EditComponent extends Component{
    constructor(props){
        super(props);
        let {factor, finfo} = this.props;
        this.state = {
            factor: factor||"Default",
            name: finfo?finfo.name:factor||"Default",
            high: finfo?finfo.high:1,
            low: finfo?finfo.low:-1,
        };
    }
    _onSaveHandler = () => {
        if(this.props.onClick){
            this.props.onClick(this.state.factor,{name: this.state.name, low: this.state.low, high: this.state.high});
        }
    }
    _onCancelHandler = () => {
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        console.log("Calling getDerivedStateFromProps");
        if(nextProps.factor!==prevState.factor){
            return {
                factor: nextProps.factor,
                name: nextProps.finfo.name,
                low: nextProps.finfo.low,
                high: nextProps.finfo.high,
            };
        }else{
            return null;
        }
    }
    render(){
        return(
            <div className="editbox_container">
                <div className="editbox_content">
                    <div className="editbox_text">
                        Factor Name
                    </div>
                    <input 
                        type="text" 
                        onChange={(e) => {
                            this.setState({name:e.target.value});
                        }}
                        onKeyPress={(e) => e.key==='Enter'?this._onSaveHandler():null}
                        value={this.state.name}/>
                    <div className="edit_levels_container">
                    <div>
                        <div className="editbox_text">
                            Low
                        </div>
                        <input
                            type="text"
                            onChange={(e) => {
                                this.setState({low: e.target.value});
                            }}
                            onKeyPress={(e) => e.key==='Enter'?this._onSaveHandler():null}
                            value={this.state.low} />
                    </div>
                    <div>
                        <div className="editbox_text">
                            High
                        </div>
                        <input
                            type="text"
                            onChange={(e) => {
                                this.setState({high: e.target.value});
                            }}
                            onKeyPress={(e) => e.key==='Enter'?this._onSaveHandler():null}
                            value={this.state.high} />
                    </div>
                    </div>
                    <ButtonComponent value="Cancel" onClick={this._onCancelHandler.bind(this)} />
                    <ButtonComponent value="Save" onClick={this._onSaveHandler.bind(this)} />
                </div>
            </div>
        );
    }
}