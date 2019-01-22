import React, { Component } from 'react';
import history from './history';
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
        let content = [];
        let available_order = [];
        for(let i=1;i<=nruns;i++){
            available_order.push(i);
        }
        for(let i=0;i<nruns;i++){
            let cells = [];
            cells.push(<div key={0}className="display_design_cell">{i+1}</div>);
            if(this.state.options.randomize){
                let ord = null, itg = null;
                while(!ord){
                    itg = Math.floor(Math.random()*available_order.length);
                    ord = available_order[itg];
                }                
                console.log("Length_avaliable:",available_order.length)
                console.log("Index choosen:",itg)
                console.log("Order_choosen:",ord);
                cells.push(<div key={-1} className="display_design_cell">{ord}</div>);
                delete available_order[itg];
                console.log("Available after deletion:",available_order);
            }
            for(let j=0;j<this.state.factors-this.state.coef;j++){
                let s = sample(2**j);
                let next = s[i%s.length];
                if(this.state.factorNames[words[j]]){
                    if(next==-1){
                        next = this.state.factorNames[words[j]].low;
                    }else if(next==1){
                        next = this.state.factorNames[words[j]].high;
                    }
                }
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
        if(this.state.options.randomize){
            content.push(<div key={-1} className="display_design_cell names">Order</div>);
        }
        for(let i=0;i<this.state.factors-this.state.coef;i++){
            let vname = this.state.factorNames[words[i]]?this.state.factorNames[words[i]].name:words[i];
            content.push(
                <div key={i+1} data-tooltip={"Factor "+words[i]} data-tooltip-position="top" className="display_design_cell names">{vname}</div>
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