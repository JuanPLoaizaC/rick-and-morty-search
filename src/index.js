import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UseManageCharacters } from './hooks/useManageCharacters.tsx';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <UseManageCharacters>
        <App />
      </UseManageCharacters>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
