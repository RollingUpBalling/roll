import React from 'react';
import { Route } from 'react-router-dom';
import Main from './containers/Main/Main';


const routing = props =>{
    

    return (
        <>
            <Route path="/" exact>
                <Main/>
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