import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './containers/Main/Main';
import Layout from './hoc/Layout/Layout';


const routing = props =>{
    

    return (
        <>
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
        </>
    );

};

export default routing;