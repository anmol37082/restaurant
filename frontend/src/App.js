import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import AddMenu from './components/AddMenu';
import OrderList from './components/OrderList';
import Home from './pages/Home';
import Menu from './pages/Menu';

const App = () => {
  return (
    <Router>
      <Header /> {/* ✅ Only here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Private admin panel with sidebar and nested routes */}
        <Route
          path="/adminpanel"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        >
          <Route index element={<AddMenu />} /> {/* ✅ default route */}
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
