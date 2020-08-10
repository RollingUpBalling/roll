import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from '../ErrorModal/BackDrop';
import classes from './DepositModal.module.css';


const ModalOverlay = (props) => {
    const content =
        (
            <div className={classes.Modal}>
                <header className={classes.ModalHeader}>
                    <h2>Choose deposit sum</h2>
                </header>
                <form onSubmit={
                    props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
                }>
                    <div className={classes.ModalContent}>
                        {props.children}
                    </div>
                    <footer className={classes.ModalFooter}>
                        pay with Visa & MasterCard
                    </footer>
                </form>
            </div>
        );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const depositModal = (props) => {
    return (
        <>
            {props.show && <BackDrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                timeout={200}
                classNames='modal'
                mountOnEnter
                unmountOnExit
            >
                <ModalOverlay {...props} />
                  
            </CSSTransition>
        </>
    )
};

export default depositModal;