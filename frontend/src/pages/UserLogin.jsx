import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaKey, FaSignInAlt, FaCheck } from 'react-icons/fa';
import styles from './UserLogin.module.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  const sendOTP = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/send-otp`, { email });
      setOtpSent(true);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('❌ Failed to send OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userEmail', email);
      setMessage('✅ Login successful!');
      window.location.href = '/';
    } catch (err) {
      setMessage('❌ Invalid OTP');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <h3><FaSignInAlt className={styles.headerIcon} /> User Login</h3>
          <p>Enter your email to receive OTP</p>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              <FaEnvelope className={styles.inputIcon} />
              Email Address
            </label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="example@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {otpSent && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaKey className={styles.inputIcon} />
                OTP Verification
              </label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
            </div>
          )}

          {!otpSent ? (
            <button className={styles.primaryButton} onClick={sendOTP}>
              <FaEnvelope className={styles.buttonIcon} />
              Send OTP
            </button>
          ) : (
            <button className={styles.successButton} onClick={verifyOTP}>
              <FaCheck className={styles.buttonIcon} />
              Verify OTP
            </button>
          )}

          {message && (
            <div className={`${styles.message} ${message.includes('❌') ? styles.error : styles.success}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
