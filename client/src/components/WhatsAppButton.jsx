import React from 'react';

const WhatsAppButton = ({ phoneNumber }) => {
  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
      title="Chat on WhatsApp"
    >
      💬
    </a>
  );
};

export default WhatsAppButton;
