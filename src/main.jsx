/* eslint-disable */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AuthProvider from '/context/AuthProvider.jsx';
import App from './App.jsx'

import "./scss/main.scss";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>  
          <Route path="/*" element={<App />} />
        </Routes>  
      </AuthProvider>
    </Router>
  </StrictMode>,
)
