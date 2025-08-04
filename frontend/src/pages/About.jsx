import { FaUtensils, FaClock, FaMapMarkerAlt, FaPhone, FaAward, FaUsers } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Assuming you have a Footer component
import styles from './Menu.module.css'; // Reusing your existing styles

const About = () => {
  return (
    
    <div className={styles.menuPage}>
      <Header/>
      
      {/* Hero Section */}
      <section className={`${styles.heroSection} py-5`} style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
      }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Apna Restaurant
          </h1>
          <p className="lead" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Tradition & Passion Since 2010
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container my-5 py-4">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className={`${styles.sectionTitle} position-relative d-inline-block mb-4`} style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Story
              <span className={styles.sectionTitleDecoration}></span>
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.1rem', lineHeight: '1.8' }}>
              Founded in 2010, Apna Restaurant began as a small family-owned eatery in Mumbai. 
              What started as a humble kitchen serving traditional recipes has grown into 
              an award-winning dining destination, while still maintaining our core values 
              of authenticity, quality, and warm hospitality.
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.1rem', lineHeight: '1.8' }}>
              Our chefs combine generations of culinary wisdom with modern techniques to 
              create dishes that honor tradition while exciting contemporary palates. 
              Every ingredient is sourced with care, and every dish tells a story.
            </p>
          </div>
          <div className="col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Restaurant interior" 
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} position-relative d-inline-block mb-5 text-center`} style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Values
            <span className={styles.sectionTitleDecoration}></span>
          </h2>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body text-center p-4">
                  <FaAward className="mb-3" size={40} style={{ color: '#e67e22' }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Quality</h4>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    We use only the freshest ingredients and traditional cooking methods
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body text-center p-4">
                  <FaUsers className="mb-3" size={40} style={{ color: '#e67e22' }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Community</h4>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    We're proud to be part of the local community that supports us
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
                <div className="card-body text-center p-4">
                  <FaUtensils className="mb-3" size={40} style={{ color: '#e67e22' }} />
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Tradition</h4>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Preserving authentic flavors while innovating for today's diners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="container my-5 py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className={`${styles.sectionTitle} position-relative d-inline-block mb-4`} style={{ fontFamily: "'Playfair Display', serif" }}>
              Visit Us
              <span className={styles.sectionTitleDecoration}></span>
            </h2>
            
            <div className="row mt-4">
              <div className="col-md-4 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <FaMapMarkerAlt size={30} className="mb-2" style={{ color: '#e67e22' }} />
                  <h5 style={{ fontFamily: "'Montserrat', sans-serif" }}>Location</h5>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    new market<br />
                    anupgarh, India 335701
                  </p>
                </div>
              </div>
              
              <div className="col-md-4 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <FaClock size={30} className="mb-2" style={{ color: '#e67e22' }} />
                  <h5 style={{ fontFamily: "'Montserrat', sans-serif" }}>Hours</h5>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Monday - Sunday<br />
                    10:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
              
              <div className="col-md-4 mb-4">
                <div className="d-flex flex-column align-items-center">
                  <FaPhone size={30} className="mb-2" style={{ color: '#e67e22' }} />
                  <h5 style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact</h5>
                  <p style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    +91 7851037082<br />
                    info@apnarestaurant.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;