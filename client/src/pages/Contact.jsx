import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
  return (
    <div className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <SectionTitle eyebrow="Contact" title="Talk to the Ocean Pearl Hotel team." description="Use the form or reach us directly with the details below." />
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-ocean-900">Contact Details</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <p className="flex items-start gap-3"><FaMapMarkerAlt className="mt-1 text-gold" /> 12 Ocean Pearl Drive, Seaside Bay, Coastal City</p>
              <p className="flex items-center gap-3"><FaPhoneAlt className="text-gold" /> +1 (555) 123-4567</p>
              <p className="flex items-center gap-3"><FaEnvelope className="text-gold" /> hello@oceanpearlhotel.com</p>
            </div>
            <a href="https://wa.me/15551234567" className="btn-primary mt-6 inline-flex items-center gap-2">
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-glow">
            <div className="border-b border-slate-100 bg-ocean-50 px-6 py-4">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-ocean-800">Google Map Placeholder</p>
            </div>
            <div className="flex min-h-[320px] items-center justify-center bg-gradient-to-br from-sky-50 to-ocean-100 p-8 text-center text-slate-600">
              <div>
                <p className="text-lg font-semibold text-ocean-900">Embedded map area</p>
                <p className="mt-2 text-sm">Replace this block with a Google Maps embed for production use.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}