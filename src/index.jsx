import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { createStore, compose } from 'redux';
import Router from './components/Router.jsx';
import rootReducer from './components/store/reducer/rootReducer.js';
import './style/message.css';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(rootReducer, composeEnhancers())

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    </Provider>,
    

    document.getElementById('root')
);