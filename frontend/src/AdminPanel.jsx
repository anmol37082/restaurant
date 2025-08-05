// AdminPanel.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AddMenu from './pages/AddMenu';
import OrderList from './pages/OrderList';

const AdminPanel = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: '220px' }}>
        <Routes>
          {/* Redirect /admin to /admin/add-menu */}
          <Route index element={<Navigate to="add-menu" replace />} />
          {/* Add Menu Page */}
          <Route path="add-menu" element={<AddMenu />} />
          {/* Orders Page */}
          <Route path="orders" element={<OrderList />} />
          {/* Catch-all: Redirect unknown admin routes to add-menu */}
          <Route path="*" element={<Navigate to="add-menu" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
