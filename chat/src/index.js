import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';

import App from './App';
import {addGun, counter, removeGun,addGunAsync} from './index.redux';
//redux 异步，使用applyMiddleware和redux-thunk

const reduxDevtools=window.devToolsExtension?window.devToolsExtension():()=>{};
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    reduxDevtools
));

function render(){
    ReactDOM.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync}/>, document.getElementById('root'));
}

render();
store.subscribe(render);//订阅