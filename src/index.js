import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable/symbol';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import reportWebVitals from './reportWebVitals';

window.renderServiceRequestCityworks = (containerId, history) => {
  ReactDOM.render(
    <BrowserRouter
      navigator={history}
      location={history.location}
      basename='/service-request-cityworks/'
    >
      <App />
    </BrowserRouter>,
    document.getElementById(containerId)
  );
};

window.unmountServiceRequestCityworks = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

const defaultHistory = createBrowserHistory();

if (!document.getElementById('ServiceRequestCityworks-container')) {
  ReactDOM.render(
    <BrowserRouter
      navigator={defaultHistory}
      location={defaultHistory.location}
      basename='/service-request-cityworks/'
    >
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
