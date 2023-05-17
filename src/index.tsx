import React from 'react';
import ReactDOM from 'react-dom/client';
import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import './index.css';
import App from './components/app/app';
import {rootReducer} from "./services/reducers";
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
