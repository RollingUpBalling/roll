import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Main />
        </Layout>
      </div>
    );
  }
}

export default App;
