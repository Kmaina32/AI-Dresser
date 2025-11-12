import React from 'react';

export const PortraitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 3.75h13.5m-13.5 16.5h13.5M3.75 5.25v13.5" />
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
);
