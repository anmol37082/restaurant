import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './MyOrders.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userId] = useState(localStorage.getItem('userId') || '');

  // Wrap fetchMyOrders in useCallback to memoize it
  const fetchMyOrders = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/my-orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Fetch orders failed", err);
    }
  }, [userId]); // Add dependencies here

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/cancel`, {
        reason: "Order cancelled by customer"
      });
      alert("✅ Order cancelled");
      fetchMyOrders();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Cancel failed");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMyOrders();
    }
  }, [userId, fetchMyOrders]);

  const formatTimeLeft = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const minutesDiff = Math.floor((now - created) / (1000 * 60));
    return minutesDiff <= 10 ? `${10 - minutesDiff} min left` : 'Expired';
  };

  return (
    <>
      <Header/>
      
      <div className={styles.myOrdersContainer}>
        <div className={styles.header}>
          <h3>🛒 My Orders</h3>
          <p>Track your food orders</p>
        </div>

        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            <img src="/empty-orders.svg" alt="No orders" className={styles.emptyImage} />
            <p>You haven't placed any orders yet</p>
            <button className={styles.ctaButton} onClick={() => window.location.href = '/menu'}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map(order => {
              const canCancel = order.status === 'Pending' && 
                              Math.floor((new Date() - new Date(order.createdAt)) / (1000 * 60)) <= 10;

              return (
                <div key={order._id} className={styles.orderCard}>
                  <div className={styles.cardHeader}>
                    <h4>{order.dishName}</h4>
                    <span className={`${styles.statusBadge} ${
                      order.status === 'Cancelled' ? styles.cancelled : 
                      order.status === 'Delivered' ? styles.delivered : styles.pending
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.orderDetail}>
                      <span>Quantity:</span>
                      <span>{order.quantity}</span>
                    </div>
                    <div className={styles.orderDetail}>
                      <span>Total:</span>
                      <span>₹{order.totalPrice}</span>
                    </div>
                    <div className={styles.orderDetail}>
                      <span>Order Time:</span>
                      <span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div className={styles.orderDetail}>
                      <span>Time Left:</span>
                      <span className={styles.timeLeft}>
                        {order.status === 'Pending' ? formatTimeLeft(order.createdAt) : '-'}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    {canCancel ? (
                      <button 
                        className={styles.cancelButton}
                        onClick={() => handleCancel(order._id)}
                      >
                        Cancel Order
                      </button>
                    ) : order.status === 'Pending' ? (
                      <button className={styles.disabledButton} disabled>
                        Cancel Time Expired
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default MyOrders;