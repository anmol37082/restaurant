import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Menu.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dishes`);
        setDishes(response.data);
      } catch (err) {
        console.error('Failed to fetch dishes:', err);
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.menuPage}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>Our Culinary Creations</h1>
            <p>Discover a world of flavors crafted with passion and the finest ingredients</p>
          </div>
        </section>

        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              Our Menu
              <span className={styles.sectionTitleDecoration}></span>
            </h2>

            <div className={styles.menuGrid}>
              {dishes.map((dish) => (
                <div key={dish._id} className={styles.menuCard}>
                  <div className={styles.cardImgContainer}>
                    <img 
                      src={`${process.env.REACT_APP_API_URL}/uploads/${dish.image}`} 
                      alt={dish.name}
                      loading="lazy"
                    />
                    <span className={styles.priceBadge}>
                      ₹{dish.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{dish.name}</h3>
                    <p className={styles.cardText}>{dish.description || 'Delicious chef special preparation'}</p>
                    <div className={styles.cardFooter}>
                      <Link 
                        to={`/order/${dish._id}`} 
                        className={styles.orderBtn}
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Menu;