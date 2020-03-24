import React, { Component } from 'react';
import Layout from './components/Layouts/Layout';
import Burger from './components/Burger/Burger';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Burger></Burger>
        </Layout>
      </div>
    );
  }
}

export default App;
