import React from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';

import classes from './LanguageSelector.module.css';

const languageSelector = ( props ) => (

    <Aux>
        <div className={classes.LanguageSelector} onClick={props.clicked}>
            {props.language}
            {console.log(props.show)}
            <div className={classes.DropMenu} style={{visibility: props.show ? "visible" : "hidden"}}>
                <ul>
                    <li onClick={props.ENChange}>en</li>
                    <li onClick={props.RUChange}>ru</li>
                </ul>
            </div>
        </div>
    </Aux>
);

export default languageSelector;