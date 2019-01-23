import React, { Component } from 'react';
import ButtonComponent from './ButtonComponents';
import './EditComponent.css';

export default class EditComponent extends Component{
    constructor(props){
        super(props);
        
        let factor, finfo, visible = this.props;
        this.state = {
            factor: factor||"Default",
            finfo: finfo||{name:props.factor,low:-1,high:1},
            visible,
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
    static getDerivedStateFromProps(nextProps, prevState){
        console.log("Calling getDerivedStateFromProps");
        if(nextProps.factor!==prevState.factor){
            return {
                factor: nextProps.factor,
                finfo: nextProps.finfo,
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
                            let nobj = this.state.finfo;
                            nobj.name = e.target.value;
                            this.setState({finfo:nobj});
                        }} 
                        value={this.state.finfo?this.state.finfo.name:"Default"}/>
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
                            value={this.state.finfo?this.state.finfo.low:-1} />
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
                            value={this.state.finfo?this.state.finfo.high:1} />
                    </div>
                    </div>
                    <ButtonComponent value="Cancel" onClick={this._onCancelHandler.bind(this)} />
                    <ButtonComponent value="Save" onClick={this._onSaveHandler.bind(this)} />
                </div>
            </div>
        );
    }
}