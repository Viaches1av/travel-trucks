import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  // Определяем, ограничивать контейнер или нет
  const isWideNavbar = location.pathname === '/'; // Если HomePage

  return (
    <div className={isWideNavbar ? styles.wrapperWide : styles.wrapper}>
      <div className={isWideNavbar ? styles.navbarWide : `${styles.navbar} container`}>
        <div className={styles.logo}>
          <span className={styles.logoHalf}>Travel</span>
          Trucks
        </div>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
