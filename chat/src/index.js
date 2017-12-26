import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';

import reducer from './reducer';
import './config'

import Login from "./container/login/login";
import Register from "./container/register/register";
import AuthRoute from "./component/authroute/authroute";
//redux 异步，使用applyMiddleware和redux-thunk
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {};

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    reduxDevtools
));

function Boss(){
    return <h2>Boss</h2>;
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss}></Route>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
