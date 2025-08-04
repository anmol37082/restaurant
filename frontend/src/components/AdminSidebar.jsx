// src/components/AdminSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login'); // Redirect to login page
  };

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-between p-3"
      style={{ width: '220px', height: '100vh', position: 'fixed' }}
    >
      <div>
        <h4 className="text-center mb-4">🍴 Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink
              to="/add-menu"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active text-warning' : 'text-white'}`
              }
            >
              🍽️ Add Menu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active text-warning' : 'text-white'}`
              }
            >
              📦 Order Details
            </NavLink>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="btn btn-outline-light mt-4"
        style={{ width: '100%' }}
      >
        🔓 Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
