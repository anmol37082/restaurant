// src/AdminPanel.jsx
import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '220px', padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
