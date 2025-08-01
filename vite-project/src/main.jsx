import { React, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App isLogged = {false}/>
  </BrowserRouter>
);
