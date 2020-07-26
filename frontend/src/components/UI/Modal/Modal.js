import React, { Component } from 'react';

import classes from './Modal.module.css';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';
import Switcher from './Switcher/Switcher';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children)
    }
    
    render() {
    return (
        <Aux>
            <Backdrop  
            show={this.props.show} 
            clicked={this.props.modalClosed}/>
        <div 
        className={classes.Modal}
        style={{
            transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : this.props.show ? '1' : '0'
        }}>
            <h1>Settings</h1>
            <Switcher label="Site animations"/>
            <Switcher label="Enable stickers"/>
            <Switcher label="Stickers autoplay"/>
            <Switcher label="Streamer mode"/>
            <Switcher label="Alternative currency"/>
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        </Aux>
    );
    }
};

export default Modal;