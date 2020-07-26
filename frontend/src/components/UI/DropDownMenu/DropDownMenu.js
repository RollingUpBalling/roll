import React from 'react';

import classes from './DropDownMenu.module.css';
import MenuLinks from '../../UI/DropDownMenu/MenuLinks/MenuLinks';

const dropDownMenu = ( props ) => {
    return (
        <div className={classes.DropDownMenu} onClick={props.clicked}>
            <div></div> 
            <div></div>
            <div></div>
            <MenuLinks open={props.show}/>
        </div>
    );
};

export default dropDownMenu;