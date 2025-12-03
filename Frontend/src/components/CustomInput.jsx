import React from 'react';

const CustomInput = ({ id, label, type = 'text', value, onChange, placeholder = '', error }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150`}
            required
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

export default CustomInput;
