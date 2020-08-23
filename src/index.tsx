import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './Context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);
