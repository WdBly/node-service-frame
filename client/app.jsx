import React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import RoutesComponent from "./router";
import configureStore from "./redux/store";
const store = configureStore(window.REDUX_STATE);

import "./common/less/style.less";

const rootDom = document.getElementById("APP");

if (module.hot) {
    module.hot.accept()
}

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <RoutesComponent />
        </BrowserRouter>
    </Provider>,
    rootDom
);


