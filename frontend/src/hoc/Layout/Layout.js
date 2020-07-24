import React from 'react';

import Aux from '../Auxillary/Auxillary';
import Main from '../../containers/Main/Main';

import classes from './Layout.module.css';

const layout = ( props ) => {
    return (
        <Aux>
            <div className={classes.Layout}>
                LOGO 
            </div> 
            <Main />
        </Aux>
    );
};

export default layout;