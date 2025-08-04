// AdminPanel.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AddMenu from './pages/AddMenu';
import OrderList from './pages/OrderList';

const AdminPanel = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: '220px' }}>
        <Routes>
          {/* ✅ Default route: redirects /admin to /admin/add-menu */}
          <Route path="/" element={<Navigate to="add-menu" />} />
          
          {/* ✅ Other admin routes */}
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="orders" element={<OrderList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
