import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Loader from '../../components/loader/Loader'
import BookingForm from '../../components/booking-form/BookingForm'
import Details from '../../components/details/Details'
import Reviews from '../../components/reviews/Reviews'
import { fetchCamperById } from '../../redux/campersSlice'
import styles from './CamperDetailPage.module.css'

const CamperDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentCamper, status } = useSelector((state) => state.campers)

  const [activeTab, setActiveTab] = useState('features')
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const tabsRef = useRef([])

  useEffect(() => {
    dispatch(fetchCamperById(id))
  }, [dispatch, id])

  // Установка позиции индикатора после загрузки текущего Camper
  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeTabElement =
        activeTab === 'features' ? tabsRef.current[0] : tabsRef.current[1]
      if (activeTabElement) {
        const offsetLeft = activeTabElement.offsetLeft
        const width = activeTabElement.offsetWidth

        setIndicatorStyle({
          transform: `translateX(${offsetLeft}px)`,
          width: `${width}px`,
        })
      }
    }

    if (tabsRef.current[0] && tabsRef.current[1]) {
      updateIndicatorPosition()
    }
  }, [activeTab, currentCamper])

  if (status === 'loading' || !currentCamper) {
    return <Loader />
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {/* Верхняя часть */}
        <section className={styles.header}>
          <h1 className={styles.name}>{currentCamper.name}</h1>
          <div className={styles.ratingLocation}>
            <span className={styles.rating}>
              <svg className={styles.icon}>
                <use href='/sprite.svg#icon-star1'></use>
              </svg>
              {currentCamper.rating.toFixed(1)}{' '}
              <span className={styles.commentsCount}>
                ({currentCamper.reviews.length} Reviews)
              </span>
            </span>
            <span>
              <svg className={styles.icon}>
                <use href='/sprite.svg#icon-map'></use>
              </svg>
              {currentCamper.location}
            </span>
          </div>

          <p className={styles.price}>€{currentCamper.price.toFixed(2)}</p>
        </section>

        {/* Галерея */}
        <section className={styles.gallery}>
          {currentCamper.gallery?.length > 0 ? (
            currentCamper.gallery.map((image, index) => (
              <img
                key={index}
                src={image.original}
                alt={`${currentCamper.name} - ${index + 1}`}
                className={styles.galleryImage}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </section>

        {/* Описание */}
        <section className={styles.description}>
          <p>{currentCamper.description}</p>
        </section>

        {/* Кнопки переключения вкладок */}
        <section className={styles.tabs}>
          <button
            ref={(el) => (tabsRef.current[0] = el)}
            className={`${styles.tabButton} ${
              activeTab === 'features' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            ref={(el) => (tabsRef.current[1] = el)}
            className={`${styles.tabButton} ${
              activeTab === 'reviews' ? styles.active : ''
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <div className={styles.indicator} style={indicatorStyle}></div>
        </section>

        {/* Контент вкладок */}
        <div className={styles.content}>
          <div className={styles.leftContent}>
            {activeTab === 'features' && <Details camper={currentCamper} />}
            {activeTab === 'reviews' && (
              <Reviews reviews={currentCamper.reviews} />
            )}
          </div>
          <div className={styles.rightContent}>
            <BookingForm camperId={currentCamper.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CamperDetailPage
