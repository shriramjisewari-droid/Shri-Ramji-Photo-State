import React, { useState, useEffect } from 'react';
import { getDashboard } from '../../api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-accent py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 mb-2">Total Products</h3>
            <p className="text-4xl font-bold text-primary">{stats?.stats?.totalProducts || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 mb-2">Total Enquiries</h3>
            <p className="text-4xl font-bold text-primary">{stats?.stats?.totalEnquiries || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-600 mb-2">Gallery Images</h3>
            <p className="text-4xl font-bold text-primary">{stats?.stats?.totalGalleryImages || 0}</p>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-primary">Recent Enquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent">
                <tr>
                  <th className="px-6 py-3 text-left font-bold">Name</th>
                  <th className="px-6 py-3 text-left font-bold">Email</th>
                  <th className="px-6 py-3 text-left font-bold">Phone</th>
                  <th className="px-6 py-3 text-left font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentEnquiries?.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b hover:bg-accent">
                    <td className="px-6 py-3">{enquiry.name}</td>
                    <td className="px-6 py-3">{enquiry.email}</td>
                    <td className="px-6 py-3">{enquiry.phone}</td>
                    <td className="px-6 py-3">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
