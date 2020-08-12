import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Bomb from '../Bomb/Bomb';
import BettingsPlace from '../BettingsPlace/BettingsPlace';
import GameStat from '../../components/GameStat/GameStat';
import BetCard from '../../components/UI/Bet/BetCard/BetCard';
import LastCrashes from '../../components/LastCrashes/LastCrashes';
import BetSum from '../../components/BetSum/BetSum';

import classes from './Main.module.css';
import socket from '../../socket';
import * as actionTypes from '../../store/actions';



const Main = props => {
    
    const [bets, addBet] = useState([]);
    const [koefs, addKoef] = useState([]);
    const [betsNum, addBetNum] = useState(0);
    const [bank, addToBank] = useState(0);
    const [userBet,updateUserBet] = useState()


    useEffect(() => {
        
        socket.on('addBet', data=>{
            
            addBet(bets => [...bets,data.bet]);
            addToBank(bank => bank + data.bet.amount);
            addBetNum(betsNum => betsNum + 1);
            try {
                if (data.bet.user === JSON.parse(localStorage.getItem('userData')).userId) {
                    updateUserBet(data.bet)
                }
            }
            catch (e) {}
        })
        socket.on('getBets',data=>{
            try {
                data.bets.forEach(bet => {
                    if (bet.user === JSON.parse(localStorage.getItem('userData')).userId) {
                        updateUserBet(bet)
                    }
                });
            }
            catch (e) {}
            addBet(bets => [...bets,...data.bets]);
            addToBank(data.gameAmount);
            addBetNum(data.users);
        })
        socket.on('newPhase',data => {
            if (data.state === 'finished') {
                addBetNum(0)
                addToBank(0)
                addBet([])
                updateUserBet()
            }
        })
        socket.on('gameResults',data => {
            addBet(data.bets)
            try {
                data.bets.forEach(bet => {
                    if (bet.user._id === JSON.parse(localStorage.getItem('userData')).userId && bet.won) {
                        props.setBalance(bet.user.balance);
                    }
                });
                
            }
            
            catch (e) {}
        })
        socket.on('koefs', data =>{
            addKoef(data.koefs);
        })
    },[])

    useEffect(() => {
        
        socket.on('timerFinish',data => {
            try {
                if (!userBet.won && userBet.koef <= parseFloat(data.koef / 1000 + '.' + data.koef % 1000 / 100) ) {
                    const updatedBet = userBet
                    updatedBet.won = true
                    updateUserBet(userBet => ({...userBet,won:true}))
                    
                    socket.emit('betWon',{
                        bet:userBet
                    })
                }
            }
            catch (e) {}
        })
    },[userBet])

    useEffect(() => {

        socket.once('changeBet',data => {
            try {
                if (data.bet.user._id === JSON.parse(localStorage.getItem('userData')).userId) {
                    updateUserBet(data.bet)
                }
            } catch (error) { }

            addBet(
                bets.map((item,index) => (
                    item._id === data.bet._id ? data.bet : item
                ))
            )
        })
        // socket.once('changeBet',data => {
        //     addBet(
        //         bets.map((item,index) => (
        //             item._id === data.bet._id ? data.bet : item
        //         ))
        //     )
        // })
    },[bets])

   

        return (
                <div className={classes.Main}>
                    <div className={classes.LeftSide}>
                       <Bomb bets={betsNum} />
                       <LastCrashes koefs={koefs} />
                       <BetSum />
                    </div>
                    <div className={classes.RightSide}>
                        <BettingsPlace betInfo={userBet}/>
                        <GameStat bank={bank} betCount={betsNum} />
                        <div className={classes.BetCards}>
                            {bets.map((betInfo,index) => (
                                
                                betInfo.won === undefined
                                ?   <>
                                    <BetCard 
                                    betInfo={betInfo} 
                                    key={index}
                                     />
                                    </>
                                :   betInfo.won 
                                    ?   <>
                                        <BetCard 
                                        betInfo={betInfo} 
                                        key={index}
                                        status='Success' />
                                        </>
                                    :   <>
                                        <BetCard 
                                        betInfo={betInfo} 
                                        key={index}
                                        status='Failed' />
                                    </>
                            ))
                            }
                        </div>
                    </div>
                </div>

        );
    
};

const mapStateToProps = state => {
    return {
        balance: state.bln.balance
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setBalance: (value) => dispatch({type: actionTypes.SET_BALANCE, value: value})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

