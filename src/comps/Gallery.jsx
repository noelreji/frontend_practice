import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import galleryCSS from '@styles/gallery.module.css';

const Gallery = () => {
  

  return (
    <div className={galleryCSS.galleryContainer} >

        <div className={galleryCSS.galleryShowcase}>

            <div className={galleryCSS.closeIcon}>
        
            </div>
        </div>

        <div className={galleryCSS.galleryResource}>

        </div>

        
    </div>
  );
};

export default Gallery;