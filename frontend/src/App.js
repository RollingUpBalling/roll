import React, { useState, useCallback, useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import { AuthContext } from './context/auth-context';
import Routes from './Routes';
import './App.css';
import axios from 'axios'

let logoutTimer;
const ENDPOINT = "http://127.0.0.1:5000";
const App = () => {

  const [tok, setToken] = useState(false);
  const [tokenExperationTime, setTokenExperationTime] = useState();
  const [uid, setUserId] = useState();

  const storedData = JSON.parse(localStorage.getItem('userData'));
  const [balance,updateBalance] = useState(1)
  const getBalance = async () => {
      try {
          const response = await axios.get(ENDPOINT+'/getUser/' + JSON.parse(localStorage.getItem('userData')).userId + '/')
          updateBalance(response.data.balance)        
      } catch (error) { }
  }
  useEffect(() => {
    getBalance()
  },[])
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
      <div className="App">
        <Layout balance={balance} updateBalance={updateBalance}>
          <Routes updateBalance={updateBalance}/>
        </Layout>
      </div>
    </AuthContext.Provider>
  );

}


export default App;
