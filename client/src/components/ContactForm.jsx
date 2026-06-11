import { useState } from 'react';
import api from '../api/axios';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await api.post('/contact', form);
      setMessage('Message sent successfully. Our team will get back to you soon.');
      setForm(initialState);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-glass p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="contactName">Name</label>
          <input id="contactName" name="name" value={form.name} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="label-field" htmlFor="contactEmail">Email</label>
          <input id="contactEmail" type="email" name="email" value={form.email} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="label-field" htmlFor="contactPhone">Phone</label>
          <input id="contactPhone" name="phone" value={form.phone} onChange={handleChange} className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="message">Message</label>
          <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="6" className="input-field" required />
        </div>
      </div>
      {message && <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
      {error && <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
