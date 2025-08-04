import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });

  const userId = localStorage.getItem('userId');
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!userId) {
      alert("🔒 Please login before placing an order.");
      navigate('/profile');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/user/${userId}`);
        setCustomer({
          name: res.data.name || '',
          email: res.data.email || '',
          address: res.data.address || ''
        });
      } catch (err) {
        console.error('❌ Failed to fetch user data');
      }
    };

    const fetchDish = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/dishes`);
        const item = res.data.find(d => d._id === id);
        setDish(item);
      } catch (err) {
        console.error('❌ Failed to fetch dish:', err);
      }
    };

    fetchUser();
    fetchDish();
  }, [id, navigate, userId, API_BASE_URL]);

  const handleSubmitOrder = async () => {
    const totalPrice = dish.price * quantity;

    const payload = {
      dishName: dish.name,
      quantity,
      totalPrice,
      customerName: customer.name,
      email: customer.email,
      address: customer.address,
      userId
    };

    try {
      await axios.post(`${API_BASE_URL}/api/orders`, payload);
      alert("✅ Order placed! Check your email.");
      setQuantity(1);
    } catch (err) {
      console.error("❌ Order failed:", err.response?.data || err.message);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!dish) {
    return (
      <div className={`${styles.menuPage} container text-center py-5`}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.menuPage} container py-4`}>
        <Header subtitle="Order Your Favorite Dish" />
        <div className="row g-4 mt-3">
          {/* Dish Card */}
          <div className="col-lg-6">
            <div className="card h-100 border-0 shadow" style={{ borderRadius: '15px' }}>
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img
                  src={`${API_BASE_URL}/uploads/${dish.image}`}
                  className="card-img-top"
                  alt={dish.name}
                  loading="lazy"
                  style={{ objectFit: 'cover', objectPosition: 'center', height: '100%' }}
                />
                <div className={styles.priceBadge}>₹{dish.price}</div>
              </div>
              <div className="card-body text-center">
                <h2 className="mb-3">{dish.name}</h2>
                <p className="lead text-muted">{dish.description || 'Chef special preparation'}</p>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="col-lg-6">
            <div className="card shadow border-0 h-100" style={{ borderRadius: '15px', borderTop: '3px solid #e67e22' }}>
              <div className="card-header bg-dark text-white">
                <h3 className="mb-0">Order Details</h3>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitOrder();
                }}>
                  {/* Quantity */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Quantity</label>
                    <div className="input-group">
                      <button 
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >-</button>
                      <input
                        type="number"
                        min="1"
                        className="form-control text-center"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      />
                      <button 
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity(quantity + 1)}
                      >+</button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="alert mb-4" style={{ background: '#f8f9fa', borderLeft: '4px solid #e67e22' }}>
                    <h5>Total: <span className="float-end text-danger">₹{(dish.price * quantity).toFixed(2)}</span></h5>
                  </div>

                  {/* User Info */}
                  <h4 className="mb-3 pb-2 border-bottom border-warning">Customer Information</h4>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={customer.name}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={customer.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Delivery Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter full address"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold"
                    disabled={!customer.address}
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
