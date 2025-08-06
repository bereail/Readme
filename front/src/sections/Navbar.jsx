import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        📚 README
      </Link>
      <div className={styles.links}>
        <Link
          to="/buscar-libro"
          className={`${styles.link} ${location.pathname === '/buscar-libro' ? styles.active : ''}`}
        >
          Buscar
        </Link>
        <Link
          to="/mis-lecturas"
          className={`${styles.link} ${location.pathname === '/mis-lecturas' ? styles.active : ''}`}
        >
          Mis Lecturas
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
