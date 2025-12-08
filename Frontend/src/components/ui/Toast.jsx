import React, { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const types = {
        success: {
            icon: CheckCircle,
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-800',
            iconColor: 'text-emerald-600'
        },
        error: {
            icon: AlertCircle,
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-800',
            iconColor: 'text-red-600'
        },
        info: {
            icon: Info,
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            iconColor: 'text-blue-600'
        }
    };

    const config = types[type] || types.success;
    const Icon = config.icon;

    return (
        <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-right-5 duration-300">
            <div className={`${config.bg} ${config.border} border ${config.text} rounded-xl shadow-2xl p-4 pr-12 min-w-[320px] max-w-md relative`}>
                <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
                    <p className="font-medium text-sm leading-relaxed">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className={`absolute top-3 right-3 ${config.iconColor} hover:opacity-70 transition-opacity`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
