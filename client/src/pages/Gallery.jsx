import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${API_URL}/gallery`);
        setGalleryImages(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Our Gallery</h1>
          <p className="text-lg text-gray-600">Showcase of our professional work</p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">Loading gallery...</div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p>Gallery coming soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div 
                key={image._id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="h-64 overflow-hidden bg-gray-200 relative">
                  {image.imageUrl ? (
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-5xl">📸</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-1">{image.title}</h3>
                  {image.tag && (
                    <span className="inline-block bg-secondary text-primary text-xs font-semibold px-2 py-1 rounded">
                      {image.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
