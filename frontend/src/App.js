// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import OrderPage from './pages/OrderPage';
import UserLogin from './pages/UserLogin';
import MyOrders from './pages/MyOrders';
import ProfilePage from './pages/profile';

import AdminLogin from './pages/AdminLogin';
import AdminPanel from './AdminPanel';
import AddMenu from './pages/AddMenu';
import OrderList from './pages/OrderList';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Routes under layout */}
        <Route
          path="/adminpanel"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        >
          <Route index element={<AddMenu />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
