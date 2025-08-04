import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import Header from '../components/Header'; // Assuming you have a Header component
import Footer from '../components/Footer';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/dishes').then(res => setDishes(res.data));
  }, []);

  return (
    <div className={styles.menuPage}>
      <Header title="Our Signature Dishes" />
      
      {/* Hero Section */}
      <section className="py-5" style={{ 
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4) center/cover',
        color: 'white'
      }}>
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Our Signature Dishes</h2>
          <p className="lead" style={{ fontFamily: "'Montserrat', sans-serif" }}>Experience culinary excellence with our handcrafted dishes</p>
        </div>
      </section>

      {/* Menu Section */}
      <main className="container my-5">
        <div className="text-center mb-5">
          <h2 className="position-relative d-inline-block" style={{ 
            fontFamily: "'Playfair Display', serif",
            paddingBottom: '10px'
          }}>
            Our Specialties
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '3px',
              background: '#ff6b6b'
            }}></span>
          </h2>
          <p className="text-muted" style={{ fontFamily: "'Montserrat', sans-serif" }}>Made with love and premium ingredients</p>
        </div>

        <div className="row g-4">
          {dishes.map(dish => (
            <div key={dish._id} className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 shadow-sm" style={{
                transition: 'all 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '200px',
                  flexShrink: 0
                }}>
                  <img 
                    src={`http://localhost:5000/uploads/${dish.image}`} 
                    className="card-img-top" 
                    alt={dish.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    ₹{dish.price}
                  </div>
                </div>
                <div className="card-body" style={{
                  padding: '1.25rem',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h5 className="card-title" style={{ 
                    fontFamily: "'Dancing Script', cursive", 
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    color: '#333'
                  }}>
                    {dish.name}
                  </h5>
                  <p className="card-text" style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.9rem',
                    color: '#666',
                    marginBottom: '1rem',
                    flexGrow: 1
                  }}>
                    {dish.description || 'Chef-crafted dish prepared with premium ingredients'}
                  </p>
                  <button 
                    className="btn w-100 mt-auto"
                    onClick={() => navigate(`/order/${dish._id}`)}
                    style={{ 
                      background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                      border: 'none',
                      color: 'white',
                      padding: '8px 0',
                      borderRadius: '6px',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 5px rgba(255, 107, 107, 0.3)',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;