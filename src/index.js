import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import FetchMovies from './components/movies';

ReactDOM.render( < FetchMovies / > , document.getElementById('root'));
registerServiceWorker();