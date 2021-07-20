import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Button, NumberButton } from './components/Button';

import "./services/firebase"


ReactDOM.render(
  <React.StrictMode>
    <App />
    < Button text = "Button 1" />
    <Button>
      {2}
    </Button>
    < Button />
    < Button />
    <NumberButton/>
  </React.StrictMode>,
  document.getElementById('root')
);