import { 
  FaUtensils, FaBars, FaTimes, FaHome, 
  FaHamburger, FaInfoCircle, FaClipboardList, 
  FaUser, FaUserShield // 👈 Added Admin icon
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

const Header = ({ subtitle = '' }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/menu', icon: <FaHamburger />, label: 'Menu' },
    { path: '/about', icon: <FaInfoCircle />, label: 'About' },
    { path: '/my-orders', icon: <FaClipboardList />, label: 'My Orders' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo/Brand */}
        <div 
          className={styles.logoContainer}
          onClick={() => handleNavigation('/')}
          role="button"
          tabIndex={0}
        >
          <FaUtensils className={styles.logoIcon} />
          <h1 className={styles.logoText}>Apna Restaurant</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <button 
              key={item.path}
              className={styles.navButton}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Profile Icon */}
          <button
            className={styles.profileButton}
            onClick={() => handleNavigation('/profile')}
            aria-label="Profile"
          >
            <FaUser className={styles.profileIcon} />
          </button>

          {/* ✅ Admin Button */}
          {/* <button
            className={styles.profileButton}
            onClick={() => handleNavigation('/admin')}
            aria-label="Admin Login"
          >
            <FaUserShield className={styles.profileIcon} />
          </button> */}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <FaTimes className={styles.menuCloseIcon} />
          ) : (
            <FaBars className={styles.menuOpenIcon} />
          )}
        </button>

        {/* Mobile Navigation */}
        <div 
          ref={menuRef}
          className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
        >
          {navItems.map((item) => (
            <button 
              key={item.path}
              className={styles.mobileNavButton}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* Profile in Mobile Menu */}
          <button 
            className={styles.mobileNavButton}
            onClick={() => handleNavigation('/profile')}
          >
            <FaUser />
            <span>Profile</span>
          </button>

          {/* ✅ Admin in Mobile Menu */}
          {/* <button 
            className={styles.mobileNavButton}
            onClick={() => handleNavigation('/admin')}
          >
            <FaUserShield />
            <span>Admin</span>
          </button> */}
        </div>
      </div>

      {/* Subtitle (optional) */}
      {subtitle && (
        <div className={styles.subtitleContainer}>
          <h2 className={styles.subtitleText}>{subtitle}</h2>
        </div>
      )}
    </header>
  );
};

export default Header;
