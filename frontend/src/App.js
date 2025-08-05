// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import AdminLogin from './pages/AdminLogin';
import Menu from './pages/Menu';
import OrderPage from './pages/OrderPage';
import About from './pages/About';
import Header from './components/Header';
import Home from './pages/Home';
import AddMenu from './pages/AddMenu';
import OrderList from './pages/OrderList';
import UserLogin from './pages/UserLogin';
import MyOrders from './pages/MyOrders';
import ProfilePage from './pages/profile';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import PrivateRoute

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* ✅ Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ✅ Protected Admin Panel with Sidebar */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="add-menu" />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="orders" element={<OrderList />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
