import React from 'react';

const Badge = ({ level, children }) => {
    const colors = {
        critical: "bg-red-100 text-red-700 border-red-200",
        moderate: "bg-amber-100 text-amber-700 border-amber-200",
        safe: "bg-emerald-100 text-emerald-700 border-emerald-200",
        neutral: "bg-slate-100 text-slate-600 border-slate-200"
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors[level] || colors.neutral}`}>
            {children}
        </span>
    );
};

export default Badge;
