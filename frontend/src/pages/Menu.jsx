import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Menu.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dishes`)
      .then(res => {
        setDishes(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch dishes:', err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.menuContainer}>
        <h2 className={styles.heading}>Our Delicious Menu</h2>
        <div className={styles.menuGrid}>
          {dishes.map(dish => (
            <div key={dish._id} className={styles.card}>
              <img src={`${process.env.REACT_APP_API_URL}/uploads/${dish.image}`} alt={dish.name} className={styles.image} />
              <h3 className={styles.name}>{dish.name}</h3>
              <p className={styles.description}>{dish.description}</p>
              <p className={styles.price}>₹{dish.price}</p>
              <Link to={`/order/${dish._id}`} className={styles.orderBtn}>Order Now</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Menu;
