import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {VotingProvider} from './context/VotingContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VotingProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </VotingProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
