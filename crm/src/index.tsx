import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';

import { LoginPage, OrdersPage, EmployeePage, ServicesPage, CustomersPage } from './pages';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={< App />}>
            <Route index element={<OrdersPage />}></Route>
            <Route path='/Employee' element={<EmployeePage />}></Route>
            <Route path='/Services' element={<ServicesPage />}></Route>
            <Route path='/Customers' element={<CustomersPage />}></Route>
          </Route>

          <Route path='/Login' element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
