import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './containers/Main/Main';

const routing = props =>{
    

    return (
        <Router>
            {console.log(props)}
            <Route path="/" exact>
                <Main updateBalance={props.updateBalance}/>
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