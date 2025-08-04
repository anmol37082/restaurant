import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import AddMenu from './pages/AddMenu';
import OrderList from './pages/OrderList';
import Home from './pages/Home';
import Menu from './pages/Menu';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<AdminLogin />} />

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
      <Footer />
    </Router>
  );
};

export default App;
