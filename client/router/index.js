import React, {Component} from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import routes from "./config"

class RoutesComponent extends Component {
    render() {
        return (
            <Switch>
                {
                    routes.map((route, k) => {
                        return (
                            <Route path={route.path}  key={k} require_sign={route.require_sign} exact={route.exact} 
                            component={route.component} />
                        )
                    })
                }
                <Redirect from='*' to='/login' />
            </Switch>
        );
    }
}

export default RoutesComponent;
