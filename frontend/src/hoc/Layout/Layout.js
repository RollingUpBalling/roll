import React from 'react';

import Aux from '../Auxillary/Auxillary';

import classes from './Layout.module.css';

const layout = ( props ) => {
    return (
        <Aux>
            <div className={classes.Layout}>
                LOGO 
            </div> 
           {props.children}
        </Aux>
    );
};

export default layout;