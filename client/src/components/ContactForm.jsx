import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Contact form ready. Connect this to the backend API to store messages.');
    setForm(initialState);
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
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Send Message</button>
    </form>
  );
}