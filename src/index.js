import React from 'react';
import ReactDOM from 'react-dom';
import LocalizedStrings from 'react-localization';
import Component from './components/component.js'
import './index.css';
import './components/navbar/navbar.css';
import { BrowserRouter } from 'react-router-dom'






ReactDOM.render(
  <BrowserRouter>
    <Component />
  </BrowserRouter>,
  document.getElementById('root')
);
