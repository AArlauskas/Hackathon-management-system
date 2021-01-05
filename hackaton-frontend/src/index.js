import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import background from "./Images/background.jpg";
require('react-virtualized-transfer/lib/css')

const divStyle = {
  position: "fixed",
  top: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  overflowY: "auto",
  color: "rgba(242, 245, 249)"
};

ReactDOM.render(
  <div style={divStyle}>
    <App />
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
