import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router';
import store from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as firebase from 'firebase'


ReactDOM.render(
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor} >
            <Router>
                <ReactRouter />
            </Router>
        </PersistGate>
    </Provider>
    ,
    document.getElementById('root'));

var firebaseConfig = {
    apiKey: "AIzaSyC1Gv7JO-S5WlZGdoy8WKuegC-pakTC2Kg",
    authDomain: "college-form-b25f5.firebaseapp.com",
    projectId: "college-form-b25f5",
    storageBucket: "college-form-b25f5.appspot.com",
    messagingSenderId: "1046069003094",
    appId: "1:1046069003094:web:50ce9bdeac1f5e45658cf7",
    measurementId: "G-SJSNC8GPV0"
};
// Initialize Firebase
if (firebase.default.apps.length > 0) {
    firebase.default.initializeApp(firebaseConfig);
}
