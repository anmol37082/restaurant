import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <div className={styles.sidebarContent}>
      <div className={styles.sidebarHeader}>
        <h4>🍴 Admin Panel</h4>
      </div>
      
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/admin/add-menu"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            onClick={onClose}
          >
            🍽️ Add Menu
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            onClick={onClose}
          >
            📦 Order Details
          </NavLink>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        🔓 Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
