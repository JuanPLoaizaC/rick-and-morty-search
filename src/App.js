import React, { Component } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Search } from './components/search/Search.tsx';
import { Character } from './app/character/Character.tsx';

class App extends Component {
  render() {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Search />
        </div>
        <div className="col-span-2">
          <Routes>
            <Route path='/character/:id' element={<Character />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
