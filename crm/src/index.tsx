import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';

import { LoginPage, OrdersPage, EmployeePage, ServicesPage, CustomersPage } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='page'>
      <BrowserRouter>
        <ConfigProvider locale={ruRU}>
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
        </ConfigProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
