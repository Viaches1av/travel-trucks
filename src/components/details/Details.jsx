import PropTypes from 'prop-types';
import styles from './Details.module.css';

const Details = ({ camper }) => {
  const features = [
    { key: 'kitchen', label: 'Kitchen', icon: 'icon-kitchen' },
    { key: 'water', label: 'Water', icon: 'icon-water' },
    { key: 'gas', label: 'Gas', icon: 'icon-gas' },
    { key: 'AC', label: 'AC', icon: 'icon-AC' },
    { key: 'bathroom', label: 'Bathroom', icon: 'icon-bathroom' },
    { key: 'radio', label: 'Radio', icon: 'icon-radio' },
  ];

  return (
    <div className={styles.details}>
      {/* Теги */}
      <div className={styles.tags}>
        {features.map(
          (feature) =>
            camper[feature.key] && (
              <span key={feature.key} className={styles.tag}>
                <svg className={styles.icon}>
                  <use href={`/src/assets/sprite.svg#${feature.icon}`} />
                </svg>
                {feature.label}
              </span>
            )
        )}
      </div>

      {/* Заголовок с полосой */}
      <h2 className={styles.heading}>
        Vehicle Details
      </h2>

      {/* Колонки с характеристиками */}
      <div className={styles.columns}>
        <div className={styles.column}>
          <p>Transmission</p>
          <p>Engine</p>
          <p>Length</p>
          <p>Width</p>
          <p>Height</p>
          <p>Tank</p>
          <p>Consumption</p>
        </div>
        <div className={`${styles.column} ${styles.column2}`}>
          <p>{camper.transmission}</p>
          <p>{camper.engine}</p>
          <p>{camper.length}</p>
          <p>{camper.width}</p>
          <p>{camper.height}</p>
          <p>{camper.tank}</p>
          <p>{camper.consumption}</p>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  camper: PropTypes.shape({
    transmission: PropTypes.string,
    engine: PropTypes.string,
    length: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    tank: PropTypes.string,
    consumption: PropTypes.string,
    kitchen: PropTypes.bool,
    water: PropTypes.bool,
    gas: PropTypes.bool,
    AC: PropTypes.bool,
    bathroom: PropTypes.bool,
    radio: PropTypes.bool,
  }).isRequired,
};

export default Details;
