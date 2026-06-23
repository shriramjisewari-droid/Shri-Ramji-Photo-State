import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../api';
import { FaFilter, FaSearch } from 'react-icons/fa';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId) => {
    console.log('Adding to cart:', productId);
    // Cart logic here
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-accent">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary to-secondary py-12 px-4 text-white"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🛍️ Our Shop</h1>
          <p className="text-lg">Discover our exclusive collection of premium photo products</p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 h-fit"
          >
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <FaFilter /> Filters
            </h2>

            {/* Search */}
            <div className="mb-6">
              <label className="block font-bold text-primary mb-2">Search</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block font-bold text-primary mb-3">Categories</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  <span>All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={cat._id}
                      checked={selectedCategory === cat._id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block font-bold text-primary mb-3">Price Range</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="text-gray-600 text-sm">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block font-bold text-primary mb-3">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-600">No products found</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
