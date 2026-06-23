import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    isFeatured: false,
    isVisible: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.post(`${API_URL}/admin/products`, formData, config);
      setFormData({ name: '', description: '', price: '', category: '', isFeatured: false, isVisible: true });
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        await axios.delete(`${API_URL}/admin/products/${id}`, config);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.put(`${API_URL}/admin/products/${id}`, 
        { isVisible: !currentStatus }, 
        config
      );
      fetchProducts();
    } catch (error) {
      console.error('Error updating product visibility:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Manage Products</h1>
            <p className="text-gray-600 mt-2">Total Products: {products.length}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-secondary"
          >
            {showForm ? '✕ Cancel' : '+ Add New Product'}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name *"
                  required
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price *"
                  required
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description *"
                required
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              ></textarea>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-primary font-semibold">Mark as Featured</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.isVisible}
                    onChange={handleChange}
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-primary font-semibold">Visible on Website</span>
                </label>
              </div>

              <button type="submit" className="btn-primary w-full">
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {products.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No products yet. Add your first product!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-primary font-bold">Image</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Name</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Category</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Price</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Status</th>
                    <th className="px-6 py-4 text-left text-primary font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          📸
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">₹{product.price}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleVisibility(product._id, product.isVisible)}
                          className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                            product.isVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {product.isVisible ? '✓ Visible' : '✗ Hidden'}
                        </button>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 font-bold">Edit</button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900 font-bold"
                        >
                          Delete
                        </button>
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

export default AdminProducts;
