import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from  'react-redux';
import App from './App';
import { counter} from './index.redux';
//redux 异步，使用applyMiddleware和redux-thunk

const reduxDevtools=window.devToolsExtension?window.devToolsExtension():()=>{};
const store = createStore(counter,compose(
    applyMiddleware(thunk),
    reduxDevtools
));

// function render(){
    ReactDOM.render(
        (<Provider store={store}>
            <App/>
        </Provider>),
        document.getElementById('root'));
// }

// render();
// store.subscribe(render);//订阅