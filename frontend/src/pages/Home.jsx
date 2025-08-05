import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get('https://apna-resturant.onrender.com/api/menu')
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.heading}>Welcome to Our Restaurant</h1>
        <p className={styles.subheading}>Order your favorite dishes now!</p>
        <div className={styles.cardGrid}>
          {dishes.map((dish) => (
            <div key={dish._id} className={styles.card}>
              <img
                src={`https://apna-resturant.onrender.com/uploads/${dish.image}`}
                alt={dish.name}
                className={styles.cardImage}
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{dish.name}</h5>
                <p className={`${styles.cardText} ${styles.textTruncate3}`}>
                  {dish.description || 'Chef special preparation'}
                </p>
                <p className={styles.price}>₹{dish.price}</p>
                <Link to={`/order/${dish._id}`} className={styles.orderButton}>
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
