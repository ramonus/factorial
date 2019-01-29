import React, { Component } from 'react';
import history from './history';
import EditComponent from './EditComponent';
import { getDesignData, words } from './core';
import RunDisplayComponent from './RunDisplayComponent';
import "./DisplayDesignComponent.css";
import ButtonComponent from './ButtonComponents';

export default class DisplayDesignComponent extends Component{
    constructor(props){
        super(props);
        let coef = (this.props.factors||0)-Math.log(this.props.options?this.props.options.runs:0)/Math.log(2);
        if(!this.props.options|!this.props.factors){
            history.replace("/");
        }
        this.state = {
            options: this.props.options||{runs:0,resolution:"full"},
            factors: this.props.factors||0,
            coef: coef||0,
            factorNames: {A: {name: "Temp",low: 25, high: 30}},
            edit_factor: null,
            ready: false,
        };
        this.data = Array(this.state.options.runs);
    }
    componentDidMount(){
        window.scrollTo(0,0);
    }
    _inputResponseHandler = () => {
        this.setState({ready: this._checkAllResponses()});
    }
    _generate_content = () => {
        let data = getDesignData(this.state.factors,this.state.options);
        let ddata = [];
        let available_order = [];
        for(let i=1;i<=this.state.options.runs;i++){
            available_order.push(i);
        }
        for(let i=0;i<data.length;i++){
            let nord= null;
            if(this.state.options.randomize){
                let ord = null, itg = null;
                while(!ord){
                    itg = Math.floor(Math.random()*available_order.length);
                    ord = available_order[itg];
                }
                nord = ord;
                delete available_order[itg];
            }
            ddata.push(
                <RunDisplayComponent 
                    ref={(ref) => this.data[i] = ref}
                    key={i}
                    data={data[i]}
                    factorNames={this.state.factorNames}
                    ord={nord}
                    onInput={this._inputResponseHandler.bind(this)}/>
                );
        }
        return ddata;
    }
    _generate_header = () => {
        let content = [<div key={0}className="display_design_cell names">Run</div>];
        if(this.state.options.randomize){
            content.push(<div key={-1} className="display_design_cell names">Order</div>);
        }
        for(let i=0;i<this.state.factors-this.state.coef;i++){
            let vname = this.state.factorNames[words[i]]?this.state.factorNames[words[i]].name:words[i];
            content.push(
                <div key={i+1}
                    className="display_design_cell names"
                    data-tooltip="Click to edit factor"
                    onClick={this._editFactorHandler.bind(this,i)}
                    data-tooltip-position="top">
                    {vname}
                </div>
            );
        }
        content.push(<div key={-2}className="display_design_cell names">Response</div>);
        return (
            <div className="display_design_row">
                {content}
            </div>
        );
    }
    _saveFactorEditHandler = (factor,finfo) => {
        let nobj = this.state.factorNames;
        nobj[factor] = finfo;
        this.setState({factorNames: nobj,edit_factor: null});
    }
    _editFactorHandler = (fi) => {
        this.setState({edit_factor:fi+1});
    }
    _checkAllResponses = () => {
        for(let i=0;i<this.data.length;i++){
            if(this.data[i]){
                if(!this.data[i].state.data.response){
                    return false; 
                }
            }
        }
        return true;
    }
    render(){
        let table_content = this._generate_content();
        let header = this._generate_header();
        let editcomponent = null;
        if(this.state.edit_factor){
            editcomponent = (
                <EditComponent 
                    factor={words[this.state.edit_factor-1]}
                    finfo={this.state.factorNames[words[this.state.edit_factor-1]]}
                    onClick={this._saveFactorEditHandler.bind(this)} 
                    onCancel={() => {
                        this.setState({edit_factor: null});
                        
                }}/>
            );
        }
        return(
            <div className="display_design_container">
                {editcomponent}
                <div className="display_design_title">
                    Design<br/>
                    2^{this.state.coef!=0?"("+this.state.factors+"-"+this.state.coef+")":this.state.factors}
                </div>
                {
                    this.state.ready?<ButtonComponent value="Analyze" />:null
                }
                <div className="display_design_table">
                    {header}
                    {table_content}
                </div>
            </div>
        );
    }
}