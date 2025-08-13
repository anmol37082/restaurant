import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css'; // Make sure this CSS module exists
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      console.log('Attempting login with API URL:', apiUrl);
      
      const res = await axios.post(`${apiUrl}/api/admin/login`, {
        email,
        password
      });
      
      console.log('Login response:', res.data);
      
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin'); // Redirect to admin dashboard
      }
    } catch (err) {
      console.error('Login error:', err);
      
      let errorMessage = 'Login failed. ';
      if (err.response) {
        // Server responded with error
        errorMessage += err.response.data.message || 'Server error';
      } else if (err.request) {
        // Request was made but no response
        errorMessage += 'Cannot connect to server. Please check if the server is running.';
      } else {
        // Something else happened
        errorMessage += 'An unexpected error occurred.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.adminLoginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h3>🔐 Admin Portal</h3>
          <p>Restaurant Management System</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
