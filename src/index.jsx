import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import BaseRoute from './routes/BaseRoute';
import AuthProvider from './context/AuthProvider';
import { Toastify } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toastify/>
        <Routes>
          <Route path='/*' element={<BaseRoute/>}/>
        </Routes>
      </AuthProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);


