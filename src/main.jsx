import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import './styles/global.css';

import HomePage from './pages/home-page/HomePage';
import CatalogPage from './pages/catalog-page/CatalogPage';
import CamperDetailPage from './pages/camper-detail-page/CamperDetailPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      {/* ToastContainer размещён вне Routes */}
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/catalog/:id' element={<CamperDetailPage />} />
      </Routes>
    </Router>
  </Provider>
);

