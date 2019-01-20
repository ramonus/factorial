import React, { Component } from 'react';
import history from './history';
import "./DisplayDesignComponent.css";

export default class DisplayDesignComponent extends Component{
    constructor(props){
        super(props);
        let coef = null;
        if(props.options&props.factors){
            coef = this.props.factors-Math.log(this.props.options.runs)/Math.log(2);
        }
        if(!this.props.options|!this.props.factors){
            history.replace("/");
        }
        this.state = {
            options: this.props.options||{runs:0,resolution:"full"},
            factors: this.props.factors||0,
            coef: coef||0,
            factorNames: {},
        };
    }
    componentDidMount(){
        window.scrollTo(0,0);
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
            cells.push(<div key={0}className="display_design_cell">{i+1}</div>);
            for(let j=0;j<this.state.factors-this.state.coef;j++){
                let s = sample(2**j);
                let next = s[i%s.length];
                cells.push(<div key={j+1}className="display_design_cell">{next}</div>);
            }
            let fin = (
                <div key={i}className="display_design_row">
                {cells}
                </div>
            );
            content.push(fin);
        }
        return content;
    }
    _generate_header = () => {
        let content = [<div key={0}className="display_design_cell names">Run</div>];
        for(let i=0;i<this.state.factors-this.state.coef;i++){
            let vname = this.state.factorNames[i]?this.state.factorNames[i]:words[i];
            content.push(
                <div key={i+1}className="display_design_cell names">{vname}</div>
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
const words = "ABCDEFG";