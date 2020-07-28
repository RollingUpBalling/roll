import React from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Modal from '../Modal/Modal';

import classes from './SettingsButton.module.css';

const settingsButton = (props) => {
        return(
            <Aux>
                <div 
                    className={classes.SettingsButton}
                    onClick={props.settingsHandler} >
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <Modal 
                show={props.showSettings} 
                modalClosed={props.closeSettings} 
                changeAnimation={props.changeAnimation}
                animation={props.animation}/>
            </Aux>
        );
}

export default settingsButton;