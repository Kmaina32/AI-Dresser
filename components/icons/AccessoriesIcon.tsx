import React from 'react';

export const AccessoriesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5C12 4.5 13.5 6 15 7.5s3 1.5 3 1.5l-3.75 3.75L9 15l-3.75-3.75C5.25 11.25 7.5 9 9 7.5s3-3 3-3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 15 3 3m0 0 3-3m-3 3V3" />
    </svg>
);