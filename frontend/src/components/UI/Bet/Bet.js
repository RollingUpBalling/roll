import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import axios from 'axios'
import classes from './Bet.module.css';

import ErrorModal from '../ErrorModal/ErrorModal';
import socket from '../../../socket';
import * as actionTypes from '../../../store/actions';

const ENDPOINT = "http://127.0.0.1:5000";

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
    const [canRetrieve,updateRetrieveState] = useState(true)
    const [userBet,updateUserBet] = useState()
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
                console.log(data)
                data.bets.forEach(bet => {
                    if (bet.user._id === JSON.parse(localStorage.getItem('userData')).userId) {
                        console.log(!Boolean(bet.won))
                        updateRetrieveState(canRetrieve => (!Boolean(bet.won)))
                        updateUserBet(userBet => ({...bet}))
                    }
                });
            }
            catch (e) {}
        })

    }, [])

    useEffect(() => {
       
        if (gameState === 'finished') {
            updateId('')
            updateUserBet()
            updateRetrieveState(true)
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
            props.clearBetValue();
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

    // if (gameId) {
    //     if (gameState === 'active') {
    //         if (userBet) {
    //             if (canRetrieve) {
    //                 <button onClick={retrieveBet} className={classes.Bet}>
    //                     Retrieve bet
    //                 </button>
    //             } else {
    //                 <button onClick={() => makeNewBet(gameId)} className={classes.Bet} disabled>
    //                     GAME IS IN PROGRESS...
    //                 </button>
    //             }
    //         } else {
    //             <button onClick={() => makeNewBet(gameId)} className={classes.Bet} disabled>
    //                 GAME IS IN PROGRESS...
    //             </button>
    //         }
    //     } else {

    //     }
    // }

    return (
        <>
            <ErrorModal error={error} onClear={handleError} /> {/* setting error from useState */}

            <div>
                
    {!gameId && 
    <button 
    disabled={props.betValue <=0 || props.betValue == null} 
    onClick={createGame} 
    className={classes.Bet}>
        START ${Number(props.betValue).toFixed(2)}
    </button>}
                {gameId 
                    ? gameState === 'active' 
                        ? userBet
                            ? canRetrieve
                                ? <button onClick={retrieveBet} className={classes.Bet}>Retrieve bet</button>
                                : <button onClick={() => makeNewBet(gameId)} className={classes.Bet} disabled>GAME IS IN PROGRESS...</button> 
                            : <button onClick={() => makeNewBet(gameId)} className={classes.Bet} disabled>GAME IS IN PROGRESS...</button> 
    
                        : gameState === 'makingBets' 
                            ? userBet 
                                ? <button className={classes.Bet}>waiting for game to start</button>
                                : <button onClick={() => makeNewBet(gameId)} className={classes.Bet}>Place your bet</button>
                            : gameState === 'crashed'
                                ? <button disabled className={classes.Bet}>GAME FINISHED</button>
                                : null
                    : null
 
                }
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