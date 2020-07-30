import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './containers/Main/Main';

const routing = () =>{
    

    return (
        <Router>
            <Route path="/" exact>
                <Main />
            </Route>
            <Route path="/history" exact>

            </Route>
            <Route path="/bonus" exact>
            </Route>
            <Route path="/support" exact>

            </Route>
            <Route path="/top" exact>

            </Route>
        </Router>
    );

};

export default routing;