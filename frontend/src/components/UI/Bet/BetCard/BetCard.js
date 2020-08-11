import React from 'react';
import classes from './BetCard.module.css';

const BetCard = ( props ) => {

    let attachedClasses = [classes.BetCard];
    if (props.status === 'Success') {
        attachedClasses = [classes.BetCard, classes.Success];
    }
    else if (props.status === 'Failed') {
        attachedClasses = [classes.BetCard, classes.Failed];
    }

    return (
        <div className={attachedClasses.join(" ")}>
            <img 
                alt='Steam avatar'
                src={props.betInfo.user.avatar}/>
            <div className={classes.BetCount}>
                <span>{props.betInfo.amount}$</span>
            </div>
            {props.status === 'Success' ? <i className="fa fa-arrow-up" aria-hidden="true"></i> : null}
            {props.status === 'Failed' ? <i className="fa fa-arrow-down" aria-hidden="true"></i> : null}
            <div className={classes.GameStatusHeader}>
                {(props.status === 'Success') ? (
                            <>
                                <div className={classes.TotalWin}>
                                    {'$' + ((props.betInfo.retrieveKoef ? props.betInfo.retrieveKoef : props.betInfo.koef) * props.betInfo.amount).toFixed(2)}
                                </div>
                                <div className={classes.WinKoef}>
                                    {(props.betInfo.retrieveKoef ? props.betInfo.retrieveKoef : props.betInfo.koef) + 'x'}
                                </div>
                            </>
                        ) : null}
                {(props.status === 'Failed') ? (
                            <div className={classes.LoseKoef}>
                                {(props.betInfo.retrieveKoef ? props.betInfo.retrieveKoef : props.betInfo.koef) + 'x'}
                            </div>
                ) : null}
                {!props.status ? (
                    <div className={classes.GameStatus}>
                        <span>in game</span>
                    </div>) :  null}
            </div>

        </div>
    );
};

export default BetCard