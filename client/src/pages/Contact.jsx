import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${API_URL}/enquiry`, formData);
      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Error submitting enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with our team for any inquiries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
            
            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                ✓ Thank you! We'll contact you soon.
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-primary font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">📍 Address</h3>
              <p className="text-gray-600 text-lg">
                Shri Ramji Photo State<br/>
                Main Bazaar<br/>
                Jaipur, Rajasthan 302001<br/>
                India
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">☎️ Phone</h3>
              <a href="tel:+919876543210" className="text-lg font-semibold text-secondary hover:text-primary">
                +91 9876543210
              </a>
              <p className="text-gray-600 mt-2">Available 10 AM - 8 PM</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">📧 Email</h3>
              <a href="mailto:info@shriramjiphoto.com" className="text-lg font-semibold text-secondary hover:text-primary">
                info@shriramjiphoto.com
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">⏰ Working Hours</h3>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-semibold">Monday - Saturday:</span> 10:00 AM - 8:00 PM</p>
                <p><span className="font-semibold">Sunday:</span> 2:00 PM - 8:00 PM</p>
                <p><span className="font-semibold">Holidays:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            title="Shri Ramji Photo State Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5384892819307!2d75.81681632346904!3d26.912434523156346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5c5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
