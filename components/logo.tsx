import React from 'react';

// A simple, elegant lion head SVG.
const LionHeadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M14.5 13.9C14.5 13.9 16.5 13.4 18.5 14.4C20.5 15.4 21.5 17.4 21.5 17.4C21.5 17.4 20 18.9 18 20.4C16 21.9 14.5 22.9 14.5 22.9L13.5 19.9C13.5 19.9 14.5 19.4 16 18.4C17.5 17.4 18.5 16.4 18.5 16.4C18.5 16.4 17.5 15.9 16.5 15.4C15.5 14.9 14.5 14.4 14.5 14.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 13.9C9.5 13.9 7.5 13.4 5.5 14.4C3.5 15.4 2.5 17.4 2.5 17.4C2.5 17.4 4 18.9 6 20.4C8 21.9 9.5 22.9 9.5 22.9L10.5 19.9C10.5 19.9 9.5 19.4 8 18.4C6.5 17.4 5.5 16.4 5.5 16.4C5.5 16.4 6.5 15.9 7.5 15.4C8.5 14.9 9.5 14.4 9.5 14.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 1.5C12 1.5 12.5 4.5 10.5 6.5C8.5 8.5 6.5 9 6.5 9C6.5 9 8.5 10 10 11.5C11.5 13 12 14.5 12 14.5C12 14.5 12.5 13 14 11.5C15.5 10 17.5 9 17.5 9C17.5 9 15.5 8.5 13.5 6.5C11.5 4.5 12 1.5 12 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const LionLogo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <LionHeadIcon className="w-8 h-8 text-amber-400" />
            <span className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-playfair">
                Lion's Apparel
            </span>
        </div>
    );
};


export const getLogoSvgDataUrl = (imageWidth: number): string => {
    const logoScaleFactor = Math.min(0.25, 400 / imageWidth); // Logo width is 25% of image width, max 400px
    const logoWidth = imageWidth * logoScaleFactor;
    const logoHeight = logoWidth * (1 / 4); // Aspect ratio 4:1
    const iconSize = logoHeight * 0.9;
    const fontSize = logoHeight * 0.5;
    const textY = logoHeight / 2;
    const textX = iconSize + (logoHeight * 0.2);
    
    // SVG markup as a string
    const svgString = `
      <svg width="${logoWidth}" height="${logoHeight}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .logo-text { font-family: 'Playfair Display', serif; font-size: ${fontSize}px; fill: rgba(255, 255, 255, 0.9); }
          .lion-icon { stroke: rgba(255, 255, 255, 0.9); }
        </style>
        <g transform="translate(0, ${ (logoHeight - iconSize) / 2}) scale(${iconSize / 24})">
            <path class="lion-icon" d="M14.5 13.9C14.5 13.9 16.5 13.4 18.5 14.4C20.5 15.4 21.5 17.4 21.5 17.4C21.5 17.4 20 18.9 18 20.4C16 21.9 14.5 22.9 14.5 22.9L13.5 19.9C13.5 19.9 14.5 19.4 16 18.4C17.5 17.4 18.5 16.4 18.5 16.4C18.5 16.4 17.5 15.9 16.5 15.4C15.5 14.9 14.5 14.4 14.5 14.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path class="lion-icon" d="M9.5 13.9C9.5 13.9 7.5 13.4 5.5 14.4C3.5 15.4 2.5 17.4 2.5 17.4C2.5 17.4 4 18.9 6 20.4C8 21.9 9.5 22.9 9.5 22.9L10.5 19.9C10.5 19.9 9.5 19.4 8 18.4C6.5 17.4 5.5 16.4 5.5 16.4C5.5 16.4 6.5 15.9 7.5 15.4C8.5 14.9 9.5 14.4 9.5 14.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path class="lion-icon" d="M12 1.5C12 1.5 12.5 4.5 10.5 6.5C8.5 8.5 6.5 9 6.5 9C6.5 9 8.5 10 10 11.5C11.5 13 12 14.5 12 14.5C12 14.5 12.5 13 14 11.5C15.5 10 17.5 9 17.5 9C17.5 9 15.5 8.5 13.5 6.5C11.5 4.5 12 1.5 12 1.5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </g>
        <text x="${textX}" y="${textY}" class="logo-text" dominant-baseline="middle">Lion's Apparel</text>
      </svg>
    `;

    // Encode the SVG string for use in a data URL
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
};