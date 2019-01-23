import React, { Component } from 'react';
import ButtonComponent from './ButtonComponents';
import './EditComponent.css';

export default class EditComponent extends Component{
    constructor(props){
        super(props);
        
        let fact = props.factor;
        let finf = props.finfo;
        this.state = {
            factor: fact||"A",
            finfo: finf||{name:props.factor,low:-1,high:1},
            visible: this.props.visible,
        };
    }
    _onSaveHandler = () => {
        this.setState({visible:"false"},() => {
            if(this.props.onClick){
                this.props.onClick(this.state.factor,this.state.finfo);
            }
        });
    }
    _onCancelHandler = () => {
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }
    render(){
        return(
            <div className="editbox_container"visible={this.state.visible}>
                <div className="editbox_text">
                    Factor Name
                </div>
                <input 
                    type="text" 
                    onChange={(e) => {
                        let nobj = this.state.finfo;
                        nobj.name = e.target.value;
                        this.setState({finfo:nobj});
                    }} 
                    value={this.state.finfo.name}/>
                <div className="edit_levels_container">
                <div>
                    <div className="editbox_text">
                        Low
                    </div>
                    <input
                        type="text"
                        onChange={(e) => {
                            let nobj = this.state.finfo;
                            nobj.low = e.target.value;
                            this.setState({finfo: nobj});
                        }}
                        value={this.state.finfo.low} />
                </div>
                <div>
                    <div className="editbox_text">
                        High
                    </div>
                    <input
                        type="text"
                        onChange={(e) => {
                            let nobj = this.state.finfo;
                            nobj.high = e.target.value;
                            this.setState({finfo: nobj});
                        }}
                        value={this.state.finfo.high} />
                </div>
                </div>
                <ButtonComponent value="Cancel" onClick={this._onCancelHandler.bind(this)} />
                <ButtonComponent value="Save" onClick={this._onSaveHandler.bind(this)} />
            </div>
        );
    }
}