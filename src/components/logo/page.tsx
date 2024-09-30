'use client'; 

import React from 'react';
import './Logo.scss'

const Logo: React.FC = () => {
    return (
        <div className="logo">
            <img src="https://e7.pngegg.com/pngimages/600/348/png-clipart-shopping-cart-online-shopping-shopping-cart-text-logo.png" alt="Dmart Logo" />
            <div className="logo-text">
                <div className="company-name">Dmart</div>
                <div className="tagline">Shop now</div>
            </div>
        </div>
    );
}

export default Logo;
