import React from 'react';
import styles from './Footer.module.css'; // Importas el módulo como un objeto

const Footer = () => {
  return (
    <footer className={styles.footer}> {/* Usas la clase desde el objeto */}
      <p>📚 README - Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
