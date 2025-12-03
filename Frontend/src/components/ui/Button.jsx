import React from 'react';
import { THEME } from '../../theme/themeConfig';

const Button = ({ children, variant = "primary", onClick, className = "", fullWidth = false, icon: Icon }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm";
    const widthStyles = fullWidth ? "w-full" : "";
    const variantStyles = variant === "outline" 
        ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200" 
        : THEME[variant] || THEME.primary;

    return (
        <button 
            onClick={onClick} 
            className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
        >
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {children}
        </button>
    );
};

export default Button;