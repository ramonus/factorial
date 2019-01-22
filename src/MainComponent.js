/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import TitleComponent from './TitleComponent';
import { Step1Component, NumberFactorComponent } from './StartComponent';
import StyleDesignComponent from './StyleDesignComponent';
import DisplayDesignComponent from './DisplayDesignComponent';
import history from './history';
import './MainComponent.css'

export default class MainComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            factors: null,
            options: null,
        };
    }
    _selectFactorsHandler = (factors) => {
        this.setState({factors},() => {
            history.push("/style/"+factors);
        });
    }
    _select_design_handler = (options) => {
        this.setState({options}, () => {
            history.push("/display");
        });
    }
    render(){
        return(
            <div className="container">
                <TitleComponent />
                <Router basename="/" history={history}>
                    <Switch>
                        <Route exact path="/" component={Step1Component} />
                        <Route exact path="/factors" render={(props) => (
                            <NumberFactorComponent 
                            onClick={this._selectFactorsHandler.bind(this)} />
                            )} />
                        <Route exact path="/style/:factors" render={(props) => (
                            <StyleDesignComponent
                            factors={props.match.params.factors}
                            onClick={this._select_design_handler.bind(this)} />
                            )} />
                        <Route exact path="/display" render={(props) => (
                            <DisplayDesignComponent 
                            factors={this.state.factors}
                            options={this.state.options}
                            randomize={this.state.randomize}/>
                        )} />
                    </Switch>
                </Router>
                <div className="content_container">
                    <h1>Ramon</h1>
                </div>
            </div>
        );
    }
}