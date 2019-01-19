/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TitleComponent from './TitleComponent';
import { Step1Component, NumberFactorComponent } from './StartComponent';
import StyleDesignComponent from './StyleDesignComponent';
import history from './history';
import './MainComponent.css'

export default class MainComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
        };
    }
    _selectFactorsHandler = (factors) => {
        this.setState({factors},() => {
            console.log("Changing to style!");
            history.push("/factors");
            console.log("Changed to style:",history);
        });
    }
    render(){
        return(
            <div className="container">
                <TitleComponent />
                <HashRouter basename="/">
                    <Switch>
                        <Route exact path="/" component={Step1Component} />
                        <Route exact path="/factors" render={(props) => (
                            <NumberFactorComponent 
                            onClick={this._selectFactorsHandler.bind(this)} />
                            )} />
                        <Route exact path="/style" render={(props) => (
                            <StyleDesignComponent 
                            factors={this.state.factors}
                            onClick={(obj) => console.log("Obj:",obj)} />
                            )} />
                    </Switch>
                </HashRouter>
                <div className="content_container">
                    <h1>Ramon</h1>
                </div>
            </div>
        );
    }
}