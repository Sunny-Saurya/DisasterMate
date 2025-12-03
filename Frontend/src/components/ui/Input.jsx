import React from 'react';
import { Lock } from 'lucide-react';

const Input = ({ label, type = "text", placeholder, value, onChange }) => (
    <div className="space-y-1">
        <label className="block text-sm font-semibold text-slate-700">{label}</label>
        <div className="relative">
            <input
                type={type}
                className="block w-full px-4 py-3 rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500 focus:bg-white transition-colors duration-200 sm:text-sm shadow-sm"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {type === 'password' && <Lock className="absolute right-3 top-3.5 h-4 w-4 text-slate-400" />}
        </div>
    </div>
);

export default Input;
