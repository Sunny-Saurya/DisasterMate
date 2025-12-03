import React from 'react';

const CustomButton = ({ onClick, children, variant = 'primary', className = '' }) => {
    let baseStyle = "py-3 px-6 rounded-xl font-semibold transition duration-300 transform hover:scale-[1.01] shadow-lg";
    let colorStyle = "";

    switch (variant) {
        case 'primary':
            colorStyle = "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300";
            break;
        case 'secondary':
            colorStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400";
            break;
        case 'outline':
            colorStyle = "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-200";
            break;
        case 'danger':
            colorStyle = "bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300";
            break;
        default:
            colorStyle = "bg-indigo-600 text-white hover:bg-indigo-700";
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${colorStyle} ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;