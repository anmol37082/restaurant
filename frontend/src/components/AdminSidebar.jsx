import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className={styles.mobileToggle}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
                onClick={closeSidebar}
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
                onClick={closeSidebar}
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
      </div>
    </>
  );
};

export default AdminSidebar;
