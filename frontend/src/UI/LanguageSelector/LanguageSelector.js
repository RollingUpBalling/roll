import React from 'react';

import Aux from '../../hoc/Auxillary//Auxillary';

import classes from './LanguageSelector.module.css';

const languageSelector = ( props ) => (
    <Aux>
        <div className={classes.LanguageSelector} onClick={props.clicked}>
            {props.language}
        </div>
        {props.show ? 
        (<div className={classes.DropMenu}>
            <ul>
                <li onClick={props.ENChange}>en</li>
                <li onClick={props.RUChange}>ru</li>
            </ul>
        </div>) : null}
    </Aux>
);

export default languageSelector;