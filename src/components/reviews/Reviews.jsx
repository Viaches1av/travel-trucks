import PropTypes from 'prop-types';
import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews?.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            {/* Аватарка и имя */}
            <div className={styles.header}>
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.reviewer_name}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {review.reviewer_name?.charAt(0).toUpperCase() || 'A'}
                </div>
              )}
              <div>
                <p className={styles.name}>{review.reviewer_name || 'Anonymous'}</p>
                <div className={styles.rating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={styles.star}
                      aria-hidden="true"
                    >
                      <use
                        href={`/sprite.svg#${i < review.reviewer_rating ? 'icon-star1' : 'icon-star0'}`}
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            {/* Комментарий */}
            <p className={styles.comment}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p className={styles.noReviews}>No reviews available for this camper.</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      reviewer_name: PropTypes.string,
      reviewer_rating: PropTypes.number,
      comment: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
};

export default Reviews;
