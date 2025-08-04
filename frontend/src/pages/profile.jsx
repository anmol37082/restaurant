import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHome, FaSignOutAlt, FaSave, FaKey } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './ProfilePage.module.css'; // Create this CSS module

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
          setUserName(res.data.name || '');
          setUserAddress(res.data.address || '');
        } catch (err) {
          console.error('❌ Failed to fetch profile:', err);
        }
      }
    };
    getProfile();
  }, [userId]);

  const sendOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email: loginEmail });
      setOtpSent(true);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('❌ Failed to send OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: loginEmail,
        otp
      });

      const { userId, email, name, address } = res.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', email);

      setUserId(userId);
      setUserEmail(email);
      setUserName(name || '');
      setUserAddress(address || '');
      setMessage('✅ Login successful!');

      navigate('/my-orders');
    } catch (err) {
      setMessage('❌ Invalid OTP');
    }
  };

  const handleSave = async () => {
    if (!userName || !userAddress) {
      return alert('Please fill in name and address');
    }

    try {
      await axios.put('http://localhost:5000/api/auth/update-profile', {
        userId,
        name: userName,
        address: userAddress
      });

      localStorage.setItem('userName', userName);
      localStorage.setItem('userAddress', userAddress);

      alert('✅ Profile updated successfully!');
      navigate('/');
    } catch (err) {
      alert('❌ Failed to update profile in database');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserId('');
    setUserEmail('');
    setUserName('');
    setUserAddress('');
    setLoginEmail('');
    setOtp('');
    setOtpSent(false);
    alert('Logged out!');
    navigate('/');
  };

  return (
    <>
      <Header subtitle="My Profile" />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <FaUser className={styles.profileIcon} />
            <h4>My Profile</h4>
          </div>
          
          <div className={styles.cardBody}>
            {!userId ? (
              <div className={styles.loginForm}>
                <h5 className={styles.loginTitle}>Login to Your Account</h5>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaEnvelope className={styles.inputIcon} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="example@email.com"
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
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                )}

                {!otpSent ? (
                  <button className={styles.primaryButton} onClick={sendOTP}>
                    Send OTP
                  </button>
                ) : (
                  <button className={styles.successButton} onClick={verifyOTP}>
                    Verify & Login
                  </button>
                )}

                {message && (
                  <div className={`${styles.alert} ${message.includes('❌') ? styles.alertDanger : styles.alertSuccess}`}>
                    {message}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.profileForm}>
                <div className={styles.userEmail}>
                  <FaEnvelope className={styles.emailIcon} />
                  <span>{userEmail}</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaUser className={styles.inputIcon} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaHome className={styles.inputIcon} />
                    Delivery Address
                  </label>
                  <textarea
                    className={`${styles.formInput} ${styles.addressInput}`}
                    rows="3"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  ></textarea>
                </div>

                <div className={styles.buttonGroup}>
                  <button className={styles.saveButton} onClick={handleSave}>
                    <FaSave className={styles.buttonIcon} />
                    Save Profile
                  </button>
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    <FaSignOutAlt className={styles.buttonIcon} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;