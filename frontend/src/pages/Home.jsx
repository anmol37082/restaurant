import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Menu.module.css';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/api/dishes`).then(res => {
      setDishes(res.data.slice(0, 7));
    });
  }, [API]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    setStartTime(performance.now());
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.scrollBehavior = 'auto';
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
    sliderRef.current.style.scrollBehavior = 'smooth';
  };

  const onMouseUp = () => {
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
    sliderRef.current.style.scrollBehavior = 'smooth';

    const endTime = performance.now();
    const timeDiff = endTime - startTime;
    if (timeDiff < 100) {
      const velocity = (scrollLeft - sliderRef.current.scrollLeft) / timeDiff;
      const momentum = velocity * 100;
      const targetScroll = sliderRef.current.scrollLeft - momentum;
      smoothScrollTo(sliderRef.current, targetScroll, 1000);
    }
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const smoothScrollTo = (element, target, duration) => {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);
      element.scrollLeft = start + change * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const easeOutQuad = (t) => t * (2 - t);

  return (
    <div className={styles.menuPage}>
      <Header />

      {/* Hero Section */}
      <section
        className={`${styles.heroSection} py-5`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4)'
        }}
      >
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Authentic Indian Cuisine
          </h1>
          <p className="lead" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Experience the rich flavors of India
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-fluid px-0 my-5">
        <div
          className="card rounded-0 border-0 shadow-sm"
          style={{
            backgroundColor: '#fff',
            borderLeft: '5px solid #e67e22',
            borderRight: '5px solid #e67e22'
          }}
        >
          <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4 px-3">
              <h2
                className={`${styles.sectionTitle} position-relative d-inline-block m-0`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Special Dishes
                <span className={styles.sectionTitleDecoration}></span>
              </h2>
              <button
                className={`${styles.viewFullMenuBtn} btn d-flex align-items-center`}
                onClick={() => navigate('/menu')}
              >
                View Full Menu <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            className={`${styles.sliderContainer}`}
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            <div className={`${styles.sliderTrack} d-flex`}>
              {dishes.map((dish) => (
                <div key={dish._id} className={`${styles.menuCardWrapper} flex-shrink-0`}>
                  <div className={`${styles.menuCard} card h-100 border-0 mx-2`}>
                    <div className={styles.cardImgContainer} style={{ height: '180px' }}>
                      <img
                        src={`${API}/uploads/${dish.image}`}
                        className="card-img-top"
                        alt={dish.name}
                        loading="lazy"
                      />
                      <div className={styles.priceBadge}>₹{dish.price}</div>
                    </div>
                    <div className="card-body">
                      <h5 className={styles.cardTitle} style={{ fontFamily: "'Dancing Script', cursive" }}>
                        {dish.name}
                      </h5>
                      <p className={styles.cardText}>
                        {dish.description || 'Chef special preparation'}
                      </p>
                      <button
                        className={`${styles.orderBtn} btn w-100 mt-auto`}
                        onClick={() => navigate(`/order/${dish._id}`)}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container py-3">{/* Extra space or content */}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
