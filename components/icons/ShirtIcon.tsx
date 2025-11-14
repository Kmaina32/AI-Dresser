import React from 'react';

export const ShirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v1.5m-3-1.5v1.5M15 9.75v1.5M5.25 11.25H18.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-3.31 0-6 2.69-6 6v1.5a.75.75 0 0 0 .75.75h10.5a.75.75 0 0 0 .75-.75v-1.5c0-3.31-2.69-6-6-6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 11.25 6 21.75h12l.75-10.5M5.25 11.25h13.5" />
    </svg>
);