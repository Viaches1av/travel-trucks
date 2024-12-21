import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './FilterForm.module.css';

const FilterForm = ({ onFilter, initialFilters }) => {
  const vehicleTypeMapping = useMemo(
    () => ({
      panelTruck: 'van',
      fullyIntegrated: 'integrated',
      alcove: 'alcove',
    }),
    []
  );

  const reverseVehicleTypeMapping = {
    van: 'panelTruck',
    integrated: 'fullyIntegrated',
    alcove: 'alcove',
  };

  // Инициализация фильтров
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          location: '',
          form: '',
          AC: false,
          bathroom: false,
          kitchen: false,
          TV: false,
          radio: false,
          water: false,
          ...initialFilters,
        };
  });

  // Сохранение фильтров в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  // Применение initialFilters только если они изменились
  useEffect(() => {
    if (initialFilters && Object.keys(initialFilters).length > 0) {
      setFilters((prev) => ({
        ...prev,
        ...initialFilters,
        form: initialFilters.form ? vehicleTypeMapping[initialFilters.form] : '',
      }));
    }
  }, [initialFilters, vehicleTypeMapping]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = key === 'form' ? reverseVehicleTypeMapping[value] : value;
        }
        return acc;
      },
      {}
    );
    onFilter(activeFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      location: '',
      form: '',
      AC: false,
      bathroom: false,
      kitchen: false,
      TV: false,
      radio: false,
      water: false,
    };
    setFilters(resetFilters);
    onFilter(resetFilters); // Вызываем onFilter сразу после сброса
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Location */}
      <div className={styles.section}>
        <p className={styles.filtersTitle}>Location</p>
        <div className={styles.inputWrapper}>
          <svg className={styles.icon}>
            <use href='/sprite.svg#icon-map'></use>
          </svg>
          <input
            type='text'
            name='location'
            value={filters.location}
            onChange={handleChange}
            placeholder='City'
            className={styles.input}
          />
        </div>
      </div>

      {/* Vehicle Equipment */}
      <div className={styles.section}>
        <p className={styles.filtersTitle}>Filters</p>
        <label className={styles.label}>Vehicle Equipment</label>
        <div className={styles.checkboxGrid}>
          {['AC', 'bathroom', 'kitchen', 'TV', 'radio', 'water'].map((key) => (
            <label
              key={key}
              className={`${styles.checkbox} ${filters[key] ? styles.active : ''}`}
            >
              <input
                type='checkbox'
                name={key}
                checked={filters[key] || false}
                onChange={handleChange}
              />
              <svg className={styles.icon}>
                <use href={`/sprite.svg#icon-${key}`}></use>
              </svg>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle Type */}
      <div className={styles.section}>
        <label className={styles.label}>Vehicle Type</label>
        <div className={styles.radioGrid}>
          {['all', 'van', 'integrated', 'alcove'].map((key) => (
            <label
              key={key}
              className={`${styles.radio} ${
                filters.form === (key === 'all' ? '' : key) ? styles.active : ''
              }`}
            >
              <input
                type='radio'
                name='form'
                value={key === 'all' ? '' : key}
                checked={filters.form === (key === 'all' ? '' : key)}
                onChange={handleChange}
              />
              <svg className={styles.icon}>
                <use
                  href={`/sprite.svg#icon-${
                    key === 'all' ? 'square1' : key
                  }`}
                ></use>
              </svg>
              {key === 'all'
                ? 'All Types'
                : key.replace(/-/g, ' ').toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button type='submit' className={styles.button}>
          Search
        </button>
        <button
          type='button'
          className={styles.buttonSecondary}
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

FilterForm.propTypes = {
  onFilter: PropTypes.func.isRequired,
  initialFilters: PropTypes.object,
};

export default FilterForm;
