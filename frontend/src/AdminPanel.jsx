// AdminPanel.jsx - Responsive Admin Panel
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-panel">
      {/* Mobile Header */}
      <div className="admin-header">
        <button 
          className="mobile-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <h1>Admin Panel</h1>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <AdminSidebar onClose={closeSidebar} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
