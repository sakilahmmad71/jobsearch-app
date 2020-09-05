import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Homepage from './components/Homepage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <Homepage />
    </Provider>,
    document.getElementById('root')
);
