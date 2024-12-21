import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favoritesSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(camper.id);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(camper.id));
    const message = isFavorite
      ? `${camper.name} removed from favorites.`
      : `${camper.name} added to favorites.`;
    toast(message, { type: isFavorite ? 'error' : 'success' });
  };

  const imageUrl =
    camper.gallery?.[0]?.original ||
    'https://via.placeholder.com/400x200?text=Travel+Trucks';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={camper.name || 'Camper'}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <h3 className={styles.cardTitle}>{camper.name}</h3>
          <div className={styles.priceRow}>
            <p className={styles.cardPrice}>€{camper.price.toFixed(2)}</p>
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={handleFavoriteToggle}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className={styles.icon}>
                <use
                  href={`/sprite.svg#${
                    isFavorite ? 'icon-favorite2' : 'icon-favorite1'
                  }`}
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.ratingLocation}>
          <p className={styles.cardRating}>
            <svg className={styles.icon}>
              <use href='/sprite.svg#icon-star1' />
            </svg>
            {camper.rating.toFixed(1)} ({camper.reviews.length} Reviews)
          </p>
          <p className={styles.cardLocation}>
            <svg className={styles.icon}>
              <use href='/sprite.svg#icon-map' />
            </svg>
            {camper.location}
          </p>
        </div>
        <p className={styles.cardDescription}>{camper.description}</p>
        <div className={styles.cardTags}>
          {camper.transmission && (
            <span className={styles.tag}>
              <svg className={styles.icon}>
                <use href='/sprite.svg#icon-automatic' />
              </svg>
              {camper.transmission}
            </span>
          )}
          {camper.AC && (
            <span className={styles.tag}>
              <svg className={styles.icon}>
                <use href='/sprite.svg#icon-AC' />
              </svg>
              AC
            </span>
          )}
          {camper.kitchen && (
            <span className={styles.tag}>
              <svg className={styles.icon}>
                <use href='/sprite.svg#icon-kitchen' />
              </svg>
              Kitchen
            </span>
          )}
        </div>
        <Link to={`/catalog/${camper.id}`}>
          <button className={styles.cardButton}>Show more</button>
        </Link>
      </div>
    </div>
  );
};

CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        original: PropTypes.string,
      })
    ),
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string,
        reviewer_rating: PropTypes.number,
        comment: PropTypes.string,
      })
    ).isRequired,
    transmission: PropTypes.string,
    AC: PropTypes.bool,
    kitchen: PropTypes.bool,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CamperCard;
