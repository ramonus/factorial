import React, { Component } from 'react';
import history from './history';
import EditComponent from './EditComponent';
import { getDesignData, words } from './core';
import "./DisplayDesignComponent.css";

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
        };
    }
    componentDidMount(){
        window.scrollTo(0,0);
    }
    _generate_content = () => {
        let data = getDesignData(this.state.factors,this.state.options);
        let ddata = [];
        let available_order = [];
        for(let i=1;i<=this.state.options.nruns;i++){
            available_order.push(i);
        }
        console.log("Factors:",this.state.factors,"Options:",this.state.options);
        console.log("Data:",data);
        for(let i=0;i<data.length;i++){
            let o = data[i];
            let k = Object.keys(o);
            let cfi = 0;
            let cells = [<div key={-1} className="display_design_cell">{i+1}</div>];
            if(this.state.options.randomize){
                let ord = null, itg = null;
                while(!ord){
                    itg = Math.floor(Math.random()*available_order.length);
                    ord = available_order[itg];
                }
                cells.push(<div key={-2} className="display_design_cell">{ord}</div>)
                delete available_order[itg];
            }
            while(k.indexOf(words[cfi])>-1){
                cells.push(<div key={cfi} className="display_design_cell">{o[words[cfi]]}</div>);
                cfi++;
            }
            let fin = (
                <div key={i} className="display_design_row">{cells}</div>
            );
            ddata.push(fin);
        }
        console.log("DData:",ddata);
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
        return (
            <div className="display_design_row">
                {content}
            </div>
        );
    }
    _saveFactorEditHandler = (factor,finfo) => {
        console.log("Recived:",factor,finfo);
        let nobj = this.state.factorNames;
        nobj[factor] = finfo;
        this.setState({factorNames: nobj,edit_factor: null});
    }
    _editFactorHandler = (fi) => {
        this.setState({edit_factor:fi+1});
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
                <div className="display_design_table">
                    {header}
                    {table_content}
                </div>
            </div>
        );
    }
}