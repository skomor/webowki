import React from 'react';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import { store } from './_helpersAndConstants/store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-add-to-calendar/dist/react-add-to-calendar.css'


render(

    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


reportWebVitals();
