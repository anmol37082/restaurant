import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './OrderList.module.css'; // Make sure this CSS module exists

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      setError('Failed to fetch orders. Please check your server/API.');
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${id}/status`);
      fetchOrders();
    } catch (err) {
      console.error("❌ Delivery update failed", err);
      alert("Failed to update delivery status.");
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("❌ Cancel this order?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orders/${id}/cancel`);
        fetchOrders();
      } catch (err) {
        console.error("❌ Cancel failed", err);
        alert("Failed to cancel order.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("🗑️ Delete this delivered order?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orders/${id}/delete`);
        fetchOrders();
      } catch (err) {
        console.error("❌ Delete failed", err);
        alert("Failed to delete order.");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.orderContainer}>
      <div className={styles.header}>
        <h3>📦 Order Management</h3>
        <p>View and manage customer orders</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : orders.length === 0 ? (
        <div className={styles.empty}>No orders found.</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Address</th>
                <th>Dish</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td>{order.address}</td>
                  <td>{order.dishName}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${
                      order.status === 'Delivered' ? styles.delivered : 
                      order.status === 'Cancelled' ? styles.cancelled : styles.pending
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                      <div className={styles.buttonGroup}>
                        <button 
                          className={styles.deliverButton}
                          onClick={() => handleDeliver(order._id)}
                        >
                          Deliver
                        </button>
                        <button 
                          className={styles.cancelButton}
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {order.status === 'Delivered' && (
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
