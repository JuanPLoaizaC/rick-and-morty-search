import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UseManageCharacters } from './hooks/useManageCharacters.tsx';

ReactDOM.render(
  <BrowserRouter>  
    <UseManageCharacters>
      <App />
    </UseManageCharacters>
  </BrowserRouter>,
  document.getElementById('root')
);
