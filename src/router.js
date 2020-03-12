import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { HashRouter, Route, Switch, hashHistory, Redirect } from 'react-router-dom';

import Login from 'views/login';
import Home from 'views/home';
import User from 'views/user';

const BasicRoute = () => (
    <HashRouter history={hashHistory}>
        <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRoute path='/' component={Protected} />
            <Route render={() => {
                return (
                    <Content>
                        <div className="not-found">
                            什么都没有呢~~~~~~~(⊙o⊙)
                        </div>
                    </Content>
                )
            }} />
        </Switch>
    </HashRouter>
);

class Protected extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/user" component={User} />
            </Switch>
        )
    }
}

const PrivateRoute = (
    ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props => {
                    const token = sessionStorage.getItem('token');
                    return (
                        !!token ? (
                            <Component {...props} />
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: '/login',
                                        state: { from: props.location }
                                    }}
                                />
                            )
                    )
                }}
            />
        )
    }
)

export default hot(module)(BasicRoute);