import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import reducers from "./reducer";
import "./config";
import "./index.css";
import Login from "./container/login/login";
import Register from "./container/register/register";
// import Boss from "./container/boss/boss";
import BossInfo from "./container/bossinfo/bossinfo";
// import Genius from "./container/genius/genius";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import AuthRoute from "./component/authroute/authroute";
import Dashboard from "./component/dashboard/dashboard";
import Chat from "./component/chat/chat";
//redux 异步，使用applyMiddleware和redux-thunk

const reduxDevtools = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), reduxDevtools)
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
