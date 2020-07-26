import React from 'react';

import classes from './MenuLinks.module.css';

const menuLinks = (props) => {

    let attachedClasses = [classes.MenuLinks, classes.Close];
    if (props.open) {
        attachedClasses = [classes.MenuLinks, classes.Open];
    }
    return (
        <nav className={attachedClasses.join(" ")}>
        <ul>
            <li><a href='/'>History</a></li>
            <li><a href='/'>Support</a></li>
            <li><a href='/'>Bonuses</a></li>
            <li><a href='/'>Top</a></li>
        </ul>
    </nav>
    );
};

export default menuLinks;