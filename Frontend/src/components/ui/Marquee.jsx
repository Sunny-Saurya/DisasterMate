import React from 'react';

const Marquee = ({ children, speed = 30, direction = 'left', className = '', pauseOnHover = true }) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <div
                className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{
                    animation: `marquee-${direction} ${speed}s linear infinite`,
                    width: 'fit-content'
                }}
            >
                <div className="flex shrink-0">
                    {children}
                </div>
                <div className="flex shrink-0" aria-hidden="true">
                    {children}
                </div>
            </div>
            <style jsx>{`
                @keyframes marquee-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                @keyframes marquee-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Marquee;
