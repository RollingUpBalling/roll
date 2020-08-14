import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import axios from 'axios'
import classes from './Bet.module.css';

import ErrorModal from '../ErrorModal/ErrorModal';
import Spinner from '../../UI/Spinner/Spinner';
import socket from '../../../socket';
import * as actionTypes from '../../../store/actions';

const ENDPOINT = "https://roll-back-end.herokuapp.com";

const MakeBetButton = props => {
    
    let context
    try {
        context = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
            }
        }
    } catch (error) { }
    
    const [gameState,updateGameState] = useState('makingBets')
    const [gameKoef,updateGameKoef] = useState()
    const [canRetrieve,updateRetrieveState] = useState(true)
    const [userBet,updateUserBet] = useState();
    const [clicked , setClicked] = useState(false);
    const [gameId, updateId] = useState()
    const [error, setError] = useState();
    

    useEffect(() => {
        
        socket.on('recieveGameInfo', data => {
            updateId(data.gameId)
            updateGameState(data.state)
        });
        socket.on('newPhase',data => {
            
            updateGameState(data.state)
        })

        socket.on('getBets',data=>{
            try {
                data.bets.forEach(bet => {
                    if (bet.user._id === JSON.parse(localStorage.getItem('userData')).userId) {
                        updateRetrieveState(canRetrieve => (!Boolean(bet.won)))
                        updateUserBet(userBet => ({...bet}))
                    }
                });
            }
            catch (e) {}
        })

        socket.on('timerFinish', (data) => {
            updateGameKoef((gameKoef) => parseFloat(data.koef / 1000 + '.' + data.koef % 1000 / 100))
        });

    }, [])

    useEffect(() => {
       
        if (gameState === 'finished') {
            updateId('');
            updateUserBet();
            updateRetrieveState(true);
            setClicked(false);
            updateGameKoef()
        }

       
    
    },[gameState])

    useEffect(() => {
        try {
            socket.on(JSON.parse(localStorage.getItem('userData')).userId,response => {
                updateRetrieveState(false)
            })
        } catch (error) { }
        
    },[])

    

    const handleError = () => {
        setError(null);
    };

    const createGame = async () => {
        try {
            if (!localStorage.getItem('userData')) {
                return setError('Please login to continue')
            }
            const game = await axios.post(ENDPOINT + '/createGame/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token
                }
            })
            if (game) {
               makeNewBet(game.data.gameId)
            }
            setClicked(true);
        }
        catch (err) {
            
            if (!err.response) {
                return setError('unexpected error happened from game')
            }
            return setError(err.response.data.message);

        }

    }

    const makeNewBet = async (id) => {
        try {
            if (!id) {
                
                id = gameId
            }
            if (!localStorage.getItem('userData')) {
                return setError('Please login to continue')
            }
            const response = await axios.post(ENDPOINT + '/makeBet/', {
                gameID: id,
                userId: JSON.parse(localStorage.getItem('userData')).userId,
                koef: props.koef,
                amount: props.betValue
            }, context)
            if (response.data.bet.user._id === JSON.parse(localStorage.getItem('userData')).userId) { 
                updateUserBet(response.data.bet)
                props.setBalance(response.data.bet.user.balance);
            }
        }
        catch (err) {

            return setError(JSON.stringify(err.response.data.message) || 'unexpected error happened from bet');

        }
    }

    const retrieveBet = async () => {
        try {
            updateRetrieveState(false)
            const response = await axios.put(ENDPOINT + '/retrieveWinningBet/',{
                id:userBet._id
            },context)
            props.setBalance(response.data.balance);
        }
        catch (err) {
            return setError('error')
        }
    }

    const createBetButton = () => {
        let onClinkEvent
        let text
        let disabled = false
        if (!gameId) {
            onClinkEvent = createGame
            text = 'START $0'
        }
        else if (gameState === 'active' && userBet && canRetrieve) {
            onClinkEvent = retrieveBet
            text = 'Retrieve bet'
        }
        else if ((gameState === 'active' && userBet && !canRetrieve) || (gameState === 'active' && !userBet)) {
            text = 'GAME IS IN PROGRESS...'
            disabled = true
        }
        else if (gameState === 'makingBets' && userBet) {
            text = 'waiting for game to start'
        }
        else if (gameState === 'makingBets' && !userBet) {
            onClinkEvent = () => makeNewBet(gameId)
            text = 'Place your bet'
        }
        else if(gameState === 'crashed') {
            text = 'GAME FINISHED'
        }
        return <button onClick={onClinkEvent} disabled={disabled} className={classes.Bet}>{text}</button>
    }

    return (
        <>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}

            <div>             
    {!gameId && 
    <button 
    disabled={props.betValue <=0 || props.betValue == null } 
    onClick={createGame} 
    className={classes.Bet}>
        START ${Number(props.betValue).toFixed(2)}
    </button>}
                {gameId 
                    ? gameState === 'active' 
                        ? userBet
                            ? canRetrieve
                                ? <button onClick={retrieveBet} className={classes.Bet}>Retrieve bet  ~ $ {Number(props.betValue * gameKoef).toFixed(2)}</button>
                                : <button className={classes.Bet} disabled>YOU WIN ~ ${props.betInfo ? (props.betInfo.retrieveKoef * props.betValue).toFixed(2) : null}</button> 
                            : <button onClick={() => makeNewBet(gameId)} className={classes.Bet} disabled>GAME IS IN PROGRESS...</button> 
    
                        : gameState === 'makingBets' 
                            ? userBet 
                                ? <button className={classes.Bet} disabled>Waiting for game to start</button>
                                : <button onClick={() => makeNewBet(gameId)} disabled={clicked} className={classes.Bet}>Place your bet</button>
                            : gameState === 'crashed'
                                ? <button disabled className={classes.Bet}>GAME FINISHED</button>
                                : null
                    : null
 
                }
                {/* {createBetButton()} */}
            </div>
        </>              
    )
}

const mapStateToProps = state => {
    return {
        balance: state.bln.balance,
        betValue: state.bv.betValue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setBalance: (value) => dispatch({type: actionTypes.SET_BALANCE, value: value}),
        clearBetValue: () => dispatch({type: actionTypes.CLEAR_BET_VALUE})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeBetButton);