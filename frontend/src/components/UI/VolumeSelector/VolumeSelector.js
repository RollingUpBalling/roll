import React from 'react';

import classes from './VolumeSelector.module.css';

import SoundON from '../../../assets/images/volume/sound_on.png';
import SoundOFF from '../../../assets/images/volume/sound_off.png';

const volumeSelector = ( props ) => (
    <img 
    className={classes.VolumeSelector}
    alt="Change Volume"
    onClick = {props.clicked}
    src={props.volume ? SoundON : SoundOFF} />
);

export default volumeSelector;