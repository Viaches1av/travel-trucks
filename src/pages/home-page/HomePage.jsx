import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link to='/catalog' className={styles.cta}>
            View Now
          </Link>
        </div>
      </main>
    </div>
  )
}

export default HomePage
