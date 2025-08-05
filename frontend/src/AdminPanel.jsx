// AdminPanel.jsx
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';

const AdminPanel = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: '220px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
