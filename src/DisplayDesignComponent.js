import React, { Component } from 'react';
import "./DisplayDesignComponent.css";

export default class DisplayDesignComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options,
            factors: this.props.factors,
        };
    }
    
    _generate_content = () => {
        const coef = this.state.factors-Math.log(this.state.options.runs)/Math.log(2);
        const nruns = this.state.options.runs;
        let content = [];
        for(let i=0;i<nruns;i++){
            content.push(
                <div className="display_design_row">
                    
                </div>
            )
        }

    }
    render(){
        let table_content = this._generate_content();
        return(
            <div className="display_design_container">
            <div className="display_design_title">
            </div>
            <div className="display_design_table">
                {table_content}
            </div>
            </div>
        );
    }
}