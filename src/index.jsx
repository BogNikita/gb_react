import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Router from './components/Router.jsx';
import rootReducer from './components/store/reducer/rootReducer.js';
import './style/message.css';
import middlewares from './components/middlewares';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const history = createBrowserHistory();

const persistConfig = {
    key: 'geekmessanger',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['messagesReducer', 'chatReducer'],
 };

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(persistReducer(persistConfig,rootReducer(history)), compose(applyMiddleware(routerMiddleware(history),...middlewares), composeEnhancers()));
const persistor = persistStore(store);

ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Router/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    

    document.getElementById('root')
);