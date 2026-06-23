import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.get(`${API_URL}/admin/enquiries`, config);
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.put(`${API_URL}/admin/enquiries/${id}/read`, {}, config);
      fetchEnquiries();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        await axios.delete(`${API_URL}/admin/enquiries/${id}`, config);
        fetchEnquiries();
        setSelectedEnquiry(null);
      } catch (error) {
        console.error('Error deleting enquiry:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Customer Enquiries</h1>
          <p className="text-gray-600 mt-2">Total Enquiries: {enquiries.length}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enquiries List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  No enquiries yet
                </div>
              ) : (
                <div className="divide-y">
                  {enquiries.map((enquiry) => (
                    <div
                      key={enquiry._id}
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className={`p-6 cursor-pointer hover:bg-gray-50 transition ${
                        selectedEnquiry?._id === enquiry._id ? 'bg-blue-50 border-l-4 border-primary' : ''
                      } ${
                        !enquiry.isRead ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-primary">{enquiry.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{enquiry.phone}</p>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(enquiry.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          enquiry.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {enquiry.isRead ? '✓ Read' : 'New'}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-3 line-clamp-2">{enquiry.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enquiry Details */}
          {selectedEnquiry && (
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-primary">Details</h2>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Name</p>
                  <p className="text-primary font-bold">{selectedEnquiry.name}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm font-semibold">Phone</p>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="text-secondary font-bold hover:underline"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>

                <div>
                  <p className="text-gray-600 text-sm font-semibold">Email</p>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-secondary font-bold hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>

                <div>
                  <p className="text-gray-600 text-sm font-semibold">Message</p>
                  <p className="text-gray-700 mt-2">{selectedEnquiry.message}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm font-semibold">Received</p>
                  <p className="text-gray-700">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                </div>

                <div className="pt-4 space-y-2 border-t">
                  {!selectedEnquiry.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(selectedEnquiry._id)}
                      className="btn-primary w-full"
                    >
                      Mark as Read
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary block text-center"
                  >
                    Chat on WhatsApp
                  </a>

                  <button
                    onClick={() => handleDeleteEnquiry(selectedEnquiry._id)}
                    className="btn-outline w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;
