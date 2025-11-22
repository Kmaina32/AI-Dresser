
import React from 'react';

// A geometric Lion Head icon for Geo Studio
const LionIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Main Head Shape (Hexagonal Base) */}
        <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Ears */}
        <path d="M7 2L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 2L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Eyes */}
        <path d="M8.5 10L10.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 10L13.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Nose/Snout */}
        <path d="M12 14L10.5 16.5H13.5L12 14Z" fill="currentColor"/>
        <path d="M12 16.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Mane/Whiskers Details */}
        <path d="M3 7L6 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <path d="M21 7L18 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    </svg>
);

export const GeoLogo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <LionIcon className="w-8 h-8 text-amber-400" />
            <span className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-playfair">
                Geo Studio
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
    
    // SVG markup as a string with the Lion Path
    const svgString = `
      <svg width="${logoWidth}" height="${logoHeight}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .logo-text { font-family: 'Playfair Display', serif; font-size: ${fontSize}px; fill: rgba(255, 255, 255, 0.9); }
          .lion-icon { stroke: rgba(255, 255, 255, 0.9); fill: none; }
          .lion-nose { fill: rgba(255, 255, 255, 0.9); }
        </style>
        <g transform="translate(0, ${ (logoHeight - iconSize) / 2}) scale(${iconSize / 24})">
             <path class="lion-icon" d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path class="lion-icon" d="M7 2L5 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path class="lion-icon" d="M17 2L19 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path class="lion-icon" d="M8.5 10L10.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path class="lion-icon" d="M15.5 10L13.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path class="lion-nose" d="M12 14L10.5 16.5H13.5L12 14Z"/>
             <path class="lion-icon" d="M12 16.5V19.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path class="lion-icon" d="M3 7L6 10" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
             <path class="lion-icon" d="M21 7L18 10" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
        </g>
        <text x="${textX}" y="${textY}" class="logo-text" dominant-baseline="middle">Geo Studio</text>
      </svg>
    `;

    // Encode the SVG string for use in a data URL
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
