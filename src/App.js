import React, { Component } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Search } from './app/search/Search.tsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={ <Search /> } />
        </Routes>
      </div>
    );
  }
}

export default App;
