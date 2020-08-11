import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Route} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { AuthContext } from './context/auth-context';
import * as actionTypes from './store/actions';

import Layout from './hoc/Layout/Layout';
import Routes from './Routes';

let logoutTimer;
const ENDPOINT = "http://127.0.0.1:5000";

const App = (props) => {

  const [tok, setToken] = useState(false);
  const [tokenExperationTime, setTokenExperationTime] = useState();
  const [uid, setUserId] = useState();

  const storedData = JSON.parse(localStorage.getItem('userData'));
  const [balance,updateBalance] = useState(1)
  const [avatar,updateAvatar] = useState('')
  
  useEffect(() => {
    const getBalance = async () => {
      try {
          const response = await axios.get(ENDPOINT+'/getUser/' + JSON.parse(localStorage.getItem('userData')).userId + '/');
          updateBalance(response.data.balance);
          updateAvatar(response.data.avatar);
          props.setAvatar(response.data.avatar);
          props.setBalance(response.data.balance);
      } catch (error) { }
    }
    
    getBalance()
  },[localStorage.getItem('userData')])
  const login = useCallback((token, userId, experationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExpire = experationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExperationTime(tokenExpire);
    localStorage.setItem('experation', tokenExpire.toISOString());
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExperationTime(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('experation')
  }, []);

  useEffect(() => {
    if (tok && tokenExperationTime) {
      const remainingTime = tokenExperationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }
    else {
      clearTimeout(logoutTimer);
    }
  },
    [tok, logout, tokenExperationTime])

  useEffect(() => {
    const experation = localStorage.getItem('experation');
    if (storedData && experation && storedData.token && new Date(experation) > new Date()) {
      login(storedData.userId, storedData.token, new Date(experation));
    }
  },
    [login]);

  return (
      <AuthContext.Provider value={
        {
          isLoggedIn: !!tok,
          token: tok,
          userId: uid,
          login: login,
          logout: logout
        }
      }>
        <div style={{height: '100%',backgroundColor: '#20274b'}}>
          <Route>
          <Layout>
            <Routes/>
          </Layout>
          </Route>
        </div>
      </AuthContext.Provider>
  );

};

const mapStateToProps = state => {
  return {
    balance: state.bln.balance,
    avatar: state.ava.avatar
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setBalance : (value) => dispatch({type: actionTypes.SET_BALANCE, value: value}),
      setAvatar : (value) => dispatch({type: actionTypes.SET_AVATAR, value: value})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
