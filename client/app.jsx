import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import RoutesComponent from "./router";
import store from "./redux/store";

import "./common/less/style.less";

const rootDom = document.getElementById("APP");

if (module.hot) {
    module.hot.accept()
}

render(
    <Provider store={store}>
        <BrowserRouter>
            <RoutesComponent />
        </BrowserRouter>
    </Provider>,
    rootDom
);


