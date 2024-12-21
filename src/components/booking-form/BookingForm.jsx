import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../index.css';
import styles from './BookingForm.module.css';

const BookingForm = ({ camperId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: null,
    comment: '',
  });
  const [loading, setLoading] = useState(false);

  const filterDate = (date) => {
    const today = new Date();
    return date >= today;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.date) {
        throw new Error('All required fields must be filled out.');
      }

      console.log('Booking data:', { ...formData, camperId });

      toast.success('Booking request submitted successfully!', {
        position: 'top-center',
        style: {
          fontSize: '16px',
          borderRadius: '10px',
          padding: '15px 25px',
        },
      });

      // Сброс формы
      setFormData({
        name: '',
        email: '',
        date: null,
        comment: '',
      });
    } catch (error) {
      // Уведомление об ошибке
      toast.error(error.message || 'Failed to submit the booking request.', {
        position: 'bottom-center',
        style: {
          fontSize: '16px',
          borderRadius: '10px',
          padding: '15px 25px',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          title="Please enter a valid email address."
          required
        />
        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            placeholderText="Booking date*"
            dateFormat="dd-MM-yyyy"
            className={`${styles.input} ${styles.datepicker}`}
            calendarClassName="react-datepicker"
            filterDate={filterDate}
            required
          />
        </div>
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  camperId: PropTypes.string.isRequired,
};

export default BookingForm;
