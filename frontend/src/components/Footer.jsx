import { FaPhone, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-5" style={{ backgroundColor: '#2c3e50' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-4" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem' }}>Apna Restaurant</h5>
            <p style={{ fontFamily: "'Montserrat', sans-serif" }}>Experience the finest dining with our carefully crafted menu and exceptional service.</p>
            <div className="mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact Us</h5>
            <ul className="list-unstyled" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <li className="mb-2"><FaMapMarkerAlt className="me-2" /> new market,anupgarh</li>
              <li className="mb-2"><FaPhone className="me-2" /> +91 7851037082</li>
              <li><FaClock className="me-2" /> Open: 10AM - 10PM</li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Newsletter</h5>
            <p style={{ fontFamily: "'Montserrat', sans-serif" }}>Subscribe to get updates on special offers</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your Email" />
              <button className="btn btn-primary" type="button" style={{ fontFamily: "'Montserrat', sans-serif" }}>Subscribe</button>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>&copy; {new Date().getFullYear()} Apna Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;