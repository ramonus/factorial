import React, { Component } from 'react';
import {words} from './core';

export default class RunDisplayComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            ord: props.ord,
            factorNames: this.props.factorNames||{},
        };
        this.response = React.createRef();
    }
    _getResponse = () => {
        console.log("Response:",this.response.innerHTML);
    }
    _generateCells = () => {
        let cells = [<div key={-1}className="display_design_cell">{this.state.data.n+1}</div>];
        if(this.state.ord){
            cells.push(<div key={-2} className="display_design_cell">{this.state.ord}</div>);
        }
        const k = Object.keys(this.state.data);
        let cfi = 0;
        while(k.indexOf(words[cfi])>-1){
            let fa = words[cfi];
            let next = this.state.data[fa];
            if(this.state.factorNames[fa]){
                let lv = next==-1?"low":"high";
                next = this.state.factorNames[fa][lv];
            }
            cells.push(<div key={cfi}className="display_design_cell">{next}</div>)
            cfi++;
        }
        cells.push(
            <div
                ref={(ref) => this.response = ref}
                key={cfi}
                className="display_design_cell response_cell"
                contentEditable={true}>
            </div>
        );        
        return cells;
    }
    render(){
        let cells = this._generateCells();
        return(
            <div key={this.state.data.n}
                className="display_design_row">
                {cells}
            </div>
        );
    }
}