import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import App from './pages/App';

const isProduction = process.env.NODE_ENV === "production";

const store = isProduction
    ? compose(applyMiddleware(reduxThunk))(createStore)(rootReducer)
    : compose(
        applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f,
    )(createStore)(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('app')
);
