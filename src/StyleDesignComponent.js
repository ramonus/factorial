import React, { Component } from 'react';
import "./StyleDesignComponent.css";

export default class SelectDesignStyleComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            factors: this.props.factors,
        }
    }
    generate_table_content = () => {
        let table = [];
        for(let i=0;i<this.state.factors;i++){
            table.push(<div className="design_row"><div className="design_cell">Nº: {i+1}</div></div>);
        }
        return table;
    }
    render(){
        let table_content = this.generate_table_content();
        return(
            <div className="style_design_container">
                <div className="style_design_title">
                    Choose your design:
                </div>
                <div className="design_table">
                    {table_content}
                </div>
            </div>
        );
    }
}