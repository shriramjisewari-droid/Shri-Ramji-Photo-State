import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    totalGalleryImages: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [productsRes, enquiriesRes, galleryRes] = await Promise.all([
        axios.get(`${API_URL}/products`, config),
        axios.get(`${API_URL}/admin/enquiries`, config),
        axios.get(`${API_URL}/gallery`, config)
      ]);

      setStats({
        totalProducts: productsRes.data.length,
        totalEnquiries: enquiriesRes.data.length,
        totalGalleryImages: galleryRes.data.length
      });

      setRecentEnquiries(enquiriesRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening in your studio.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-4xl font-bold text-primary mt-2">{stats.totalProducts}</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-secondary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">Total Enquiries</p>
                <p className="text-4xl font-bold text-secondary mt-2">{stats.totalEnquiries}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-primary">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">Gallery Images</p>
                <p className="text-4xl font-bold text-primary mt-2">{stats.totalGalleryImages}</p>
              </div>
              <div className="text-4xl">🎨</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            to="/admin/products"
            className="bg-primary text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
          >
            <div className="text-4xl mb-2">📸</div>
            <h3 className="text-lg font-bold">Manage Products</h3>
            <p className="text-sm mt-2 text-gray-200">Add, edit, delete products</p>
          </Link>

          <Link 
            to="/admin/enquiries"
            className="bg-secondary text-primary rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
          >
            <div className="text-4xl mb-2">💬</div>
            <h3 className="text-lg font-bold">View Enquiries</h3>
            <p className="text-sm mt-2 text-gray-700">Review customer messages</p>
          </Link>

          <button 
            className="bg-gray-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center cursor-not-allowed"
            disabled
          >
            <div className="text-4xl mb-2">🖼️</div>
            <h3 className="text-lg font-bold">Upload Gallery</h3>
            <p className="text-sm mt-2 text-gray-300">Coming soon</p>
          </button>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h2 className="text-2xl font-bold">Recent Enquiries</h2>
          </div>
          
          {recentEnquiries.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No enquiries yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-primary font-bold">Name</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Phone</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Email</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Status</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{enquiry.name}</td>
                      <td className="px-6 py-4">{enquiry.phone}</td>
                      <td className="px-6 py-4">{enquiry.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                          enquiry.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {enquiry.isRead ? '✓ Read' : 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
