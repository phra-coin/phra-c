import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // optional, if you have a CSS file
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
