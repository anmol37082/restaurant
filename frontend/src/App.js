// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import AdminLogin from './pages/AdminLogin';
import Menu from './pages/Menu';
import OrderPage from './pages/OrderPage';
import About from './pages/About';
import Header from './components/Header';
import Home from './pages/Home';
import AdminSidebar from './components/AdminSidebar';
import AddMenu from './pages/AddMenu';
import OrderList from './pages/OrderList';
import UserLogin from './pages/UserLogin';
import MyOrders from './pages/MyOrders';
import ProfilePage from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/admin/add-menu" element={<OrderList />} />
        <Route path="/AdminSidebar" element={<AdminSidebar />} />


      </Routes>
    </Router>
  );
}

export default App;
