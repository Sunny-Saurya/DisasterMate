import React from 'react';

const Card = ({ children, className = "", hover = false }) => (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ${hover ? 'hover:shadow-md transition-shadow duration-300' : ''} ${className}`}>
        {children}
    </div>
);

export default Card;
