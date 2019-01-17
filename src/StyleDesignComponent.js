import React, { Component } from 'react';
import "./StyleDesignComponent.css";

const f = (runs,resolution) => {return {runs,resolution}};
const available_designs = {
    2: [f(4,"full")],
    3: [f(4,"III"),f(8,"full")],
    4: [f(8,"IV"),f(16,"full")],
    5: [f(8,"III"),f(16,"V"),f(32,"full")],
    6: [f(8,"III"),f(16,"IV"),f(32,"VI"),f(64,"full")],
    7: [f(8,"III"),f(16,"IV"),f(32,"IV"),f(64,"VII"),f(128,"full")],
    8: [f(16,"IV"),f(32,"IV"),f(64,"V"),f(128,"VIII")],
    9: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"VI")],
    10: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"V")],
    11: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"V")],
    12: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
    13: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
    14: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
    15: [f(16,"III"),f(32,"IV"),f(64,"IV"),f(128,"IV")],
};
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
        console.log("Available designs:",available_designs);
        let table = [];
        let obj = available_designs[this.state.factors];
        console.log("Obj before sort:",obj);
        obj.sort((a,b) => {
            return a.runs-b.runs;
        });
        console.log("Obj:",obj);
        let k = 0;
        obj.forEach(i => {
            console.log(i);
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