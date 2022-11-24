import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { UserLoginPage } from './pages/UserLoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <TopBarComponent /> */}
        <Routes>
          <Route path="/user" element={<UserLoginPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/userDashboard" 
                 element={
                    <PrivateRoute role="User">
                      <UserDashboardPage />  
                    </PrivateRoute>
                    }/>
          <Route path="/adminDashboard" 
                 element={
                    <PrivateRoute role="Admin">
                      <AdminDashboardPage />  
                    </PrivateRoute>
                    }/>
          
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
