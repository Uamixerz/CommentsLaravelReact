import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter} from "react-router-dom";
import "lightbox2/dist/js/lightbox"
import "lightbox2/dist/css/lightbox.css"
import {jwtDecode} from "jwt-decode";
import http from './http';
import {Provider} from "react-redux";
import { store } from './store';


if (localStorage.token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
    const user = jwtDecode(localStorage.token);
    store.dispatch({
        type: 'LOGIN_USER',
        payload: {
            email: user.email,
            name: user.name,
            image: user.image,
            id: user.id
        },
    });
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
