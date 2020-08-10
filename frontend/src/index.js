import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import betValueReducer from './store/reducers/betValueReducer';
import balanceReducer from './store/reducers/balanceReducer';
import avatarReducer from './store/reducers/avatarReducer'

const rootReducer = combineReducers({
  bv: betValueReducer,
  bln: balanceReducer,
  ava:avatarReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
