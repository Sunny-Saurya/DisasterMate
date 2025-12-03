import React from 'react';

const CustomCard = ({ children, className = '' }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl ${className}`}>
        {children}
    </div>
);

export default CustomCard;
