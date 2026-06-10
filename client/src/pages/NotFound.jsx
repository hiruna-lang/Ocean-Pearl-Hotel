import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section-pad">
      <div className="container-page text-center">
        <h1 className="font-display text-5xl font-bold text-ocean-900">404</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Return Home</Link>
      </div>
    </div>
  );
}