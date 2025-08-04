import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminPanel = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
