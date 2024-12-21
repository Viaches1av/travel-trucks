import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/campersSlice';
import Navbar from '../../components/navbar/Navbar';
import FilterForm from '../../components/filter-form/FilterForm';
import CamperCard from '../../components/camper-card/CamperCard';
import Loader from '../../components/loader/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { list = [], status } = useSelector((state) => state.campers);
  const [filters, setFilters] = useState({});
  const [displayedCampers, setDisplayedCampers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(list)) {
      setDisplayedCampers(list.slice(0, visibleCount));
    }
  }, [list, visibleCount]);

  useEffect(() => {
    if (Array.isArray(list)) {
      let result = list;

      if (filters.location) {
        result = result.filter((item) =>
          item.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.form) {
        result = result.filter((item) => item.form === filters.form);
      }

      Object.keys(filters).forEach((key) => {
        if (filters[key] === true) {
          result = result.filter((item) => item[key] === true);
        }
      });

      setDisplayedCampers(result.slice(0, visibleCount));
    }
  }, [filters, list, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setVisibleCount(4);
  };

  return (
    <div>
      <div className="wrapper">
        <Navbar />
      </div>
      <div className="container">
        <div className={styles.catalog}>
          <aside className={styles.filter}>
            <FilterForm onFilter={handleFilter} initialFilters={filters} />
          </aside>
          <main className={styles.main}>
            {status === 'loading' && <Loader />}
            {status === 'failed' && (
              <p>Failed to load campers. Please try again later.</p>
            )}
            {status === 'succeeded' &&
              displayedCampers.map((camper) => (
                <CamperCard
                  key={camper.id}
                  camper={camper}
                />
              ))}
            {status === 'succeeded' && displayedCampers.length < list.length && (
              <button onClick={loadMore} className={styles.loadMore}>
                Load more
              </button>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
