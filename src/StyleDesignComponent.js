import React, { Component } from 'react';
import "./StyleDesignComponent.css";
import { available_designs } from './core';


export default class SelectDesignStyleComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            factors: this.props.factors,
        }
    }
    _onRowClickHandler = (obj) => {
        if(this.props.onClick){
            this.props.onClick(obj);
        }
    }
    generate_table_content = () => {
        let table = [];
        let obj = available_designs[this.state.factors];
        obj.sort((a,b) => {
            return a.runs-b.runs;
        });
        let k = 0;
        obj.forEach(i => {
            table.push(<div key={k} onClick={this._onRowClickHandler.bind(this,i)} className="design_row"><div className="design_cell">{i.runs}</div><div className="design_cell">{i.resolution}</div></div>);
            k++;
        });
        return table;
    }
    render(){
        let table_content = this.generate_table_content();
        return(
            <div className="style_design_container">
                <div className="style_design_title">
                    Choose your design:
                    <br />
                    {this.state.factors} factors
                </div>
                <div className="design_table">
                    <div className="design_row">
                        <div className="design_cell">
                            Runs
                        </div>
                        <div className="design_cell">
                            Resolution
                        </div>
                    </div>
                    {table_content}
                </div>
            </div>
        );
    }
}