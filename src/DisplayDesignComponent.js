import React, { Component } from 'react';
import "./DisplayDesignComponent.css";

export default class DisplayDesignComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options,
            factors: this.props.factors,
            coef: this.props.factors-Math.log(this.props.options.runs)/Math.log(2),
            factorNames: {},
        };
    }
    
    _generate_content = () => {
        const sample = (n) => {
            let r = [];
            for(let i=0;i<n;i++){
                r.push(-1);
            }
            for(let i=0;i<n;i++){
                r.push(1);
            }
            return r;
        }
        const nruns = this.state.options.runs;
        const cfactors = this.state.factors-this.state.coef;
        let content = [];
        for(let i=0;i<nruns;i++){
            let cells = [];
            for(let j=0;j<this.state.factors-this.state.coef;j++){
                
                let s = sample(2**j);
                let next = s[i%s.length];
                cells.push(<div className="display_design_cell">{next}</div>);
            }
            let fin = (
                <div className="display_design_row">
                {cells}
                </div>
            );
            content.push(fin);
        }
        return content;
    }
    _generate_header = () => {
        let content = [];
        for(let i=0;i<this.state.factors-this.state.coef;i++){
            let vname = this.state.factorNames[i]?this.state.factorNames[i]:i;
            content.push(
                <div className="display_design_cell names">{vname}</div>
            );
        }
        return (
            <div className="display_design_row">
                {content}
            </div>
        );
    }
    render(){
        let table_content = this._generate_content();
        let header = this._generate_header();
        return(
            <div className="display_design_container">
            <div className="display_design_title">
            Design
            </div>
            <div className="display_design_table">
                {header}
                {table_content}
            </div>
            </div>
        );
    }
}