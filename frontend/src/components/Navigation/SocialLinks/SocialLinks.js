import React from 'react';

import classes from './SocialLinks.module.css';

const socialLinks = () => (
    <div className={classes.SocialLinks}>
        <a href="https://web.telegram.org/">
            <div 
                className="fa fa-telegram" 
                aria-hidden="true"></div>
        </a>
        <a href="https://www.instagram.com/">
            <div 
                className="fa fa-instagram" 
                aria-hidden="true"></div>
        </a>
        <a href="https://vk.com">
            <div 
                className="fa fa-vk" 
                aria-hidden="true"></div>
        </a>
    </div>
);

export default socialLinks;