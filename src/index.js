import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
