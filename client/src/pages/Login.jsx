import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('oceanPearlAdminToken', data.token);
      localStorage.setItem('oceanPearlAdminLoggedIn', 'true');
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-pad">
      <div className="container-page flex min-h-[70vh] items-center justify-center">
        <form onSubmit={handleSubmit} className="card-glass w-full max-w-md p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Admin Login</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ocean-900">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Sign in to manage rooms, bookings, messages, and gallery content.</p>
          <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-900">
            Sample credentials: admin@oceanpearlhotel.com / admin123
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="label-field" htmlFor="loginEmail">Email</label>
              <input id="loginEmail" type="email" name="email" value={form.email} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="label-field" htmlFor="loginPassword">Password</label>
              <input id="loginPassword" type="password" name="password" value={form.password} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          {error && <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
