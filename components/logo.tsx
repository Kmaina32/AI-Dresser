
import React from 'react';

// A modern, abstract 'G' monogram representing Geo/Globe and AI/Studio
const GeoMonogramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* The main 'G' shape that looks like an open circle */}
        <path 
            d="M19.9999 12C19.9999 16.4183 16.4182 20 11.9999 20C7.58163 20 3.9999 16.4183 3.9999 12C3.9999 7.58172 7.58163 4 11.9999 4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        {/* The inner bar of the 'G' */}
        <path d="M12 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* The inner "spark" or "pupil" representing AI/Creativity */}
        <path d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z" fill="currentColor"/>
    </svg>
);


export const GeoLogo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`flex items-center gap-3 ${className || ''}`}>
            <GeoMonogramIcon className="w-7 h-7 text-accent" />
            <div className="text-xl md:text-2xl font-bold text-center font-headline">
                <span className="text-foreground">Geo</span><span className="text-muted-foreground">Studio</span>
            </div>
        </div>
    );
};

export const getLogoSvgDataUrl = (imageWidth: number): string => {
    // Increased logoScaleFactor from 0.25 to 0.45 to make the watermark larger
    const logoScaleFactor = Math.min(0.45, 800 / imageWidth); 
    const logoWidth = imageWidth * logoScaleFactor;
    const logoHeight = logoWidth * (1 / 4); // Aspect ratio 4:1
    const iconSize = logoHeight * 0.9;
    const fontSize = logoHeight * 0.5;
    const textY = logoHeight / 2;
    const textX = iconSize + (logoHeight * 0.2);
    
    // SVG markup as a string with the new Monogram Path
    const svgString = `
      <svg width="${logoWidth}" height="${logoHeight}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .logo-text { font-family: 'Space Grotesk', serif; font-size: ${fontSize}px; font-weight: bold; }
          .logo-geo { fill: rgba(255, 255, 255, 0.95); }
          .logo-studio { fill: rgba(161, 161, 170, 0.95); }
          .icon-path { stroke: rgba(245, 158, 11, 0.95); fill: none; }
          .icon-pupil { fill: rgba(245, 158, 11, 0.95); }
        </style>
        <g transform="translate(0, ${ (logoHeight - iconSize) / 2}) scale(${iconSize / 24})">
            <path class="icon-path" d="M19.9999 12C19.9999 16.4183 16.4182 20 11.9999 20C7.58163 20 3.9999 16.4183 3.9999 12C3.9999 7.58172 7.58163 4 11.9999 4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-path" d="M12 12H20" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="icon-pupil" d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"/>
        </g>
        <text x="${textX}" y="${textY}" class="logo-text" dominant-baseline="middle">
            <tspan class="logo-geo">Geo</tspan><tspan class="logo-studio">Studio</tspan>
        </text>
      </svg>
    `;

    // Encode the SVG string for use in a data URL
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
