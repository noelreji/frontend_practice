import React, { useEffect, useState } from 'react';
import ProductMetaCSS from '@styles/product_meta.module.css';
import Gallery from '@component/Gallery.jsx';
import Portal from './Portal';

function Product_meta() {
  const [mediaList, setMediaList] = useState([]);
  const [selectImage, setSelectImage] = useState(0); // Default to 0 to ensure there is an initial image
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    // Import all image files from the assets/product_images directory
    const imageAndVideoModules = import.meta.glob('../assets/product_images/*');
    const media = {};

    for (const path in imageAndVideoModules) {
      media[path] = imageAndVideoModules[path]().then(module => module.default);
    }

    // Wait for all image promises to resolve
    Promise.all(Object.values(media))
      .then(results => {
        const imageEntries = Object.keys(media).map((key, index) => ({
          src: results[index],
          path: key
        }));
        setMediaList(imageEntries);
      })
      .catch(error => {
        console.error('Error loading images:', error);
      });
  }, []);

  const controlIndexImage = (type, index) => {
    setSelectImage( prevIndex => {
      switch (type) {
        case 0:
          return (prevIndex + 1) % mediaList.length; // Cycle through images
        case 1:
          return (prevIndex - 1 + mediaList.length) % mediaList.length; // Cycle through images
        case 2:
          return index;
        default:
          return prevIndex;
      }
    });
  };

  function scrollContainer(amount) {
    const container = document.querySelector(`.${ProductMetaCSS.all_images}`);
    container.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
  }

  const handleImageClick = () => {
    setShowGallery(true);
  };


  return (
    <div className={`${ProductMetaCSS.container} ${showGallery ? ProductMetaCSS.blurred : ''}`}>
      <div className={ProductMetaCSS.metaContainer}>
        <section className={ProductMetaCSS.path}>
          <h5>{"Store > Games > Stardew Valley"}</h5>
        </section>
        <br />

        <section className={ProductMetaCSS.metaData}>
          <section className={ProductMetaCSS.sectionImage}>
            {mediaList.length > 0 && (
              <div className={ProductMetaCSS.main_image_container}>
                <img
                  src={mediaList[selectImage].src}
                  alt="product image"
                  className={ProductMetaCSS.main_image}
                  onClick={handleImageClick}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={ProductMetaCSS.left_toggle} width="32" role="presentation" color="white" alt="" onClick={() => controlIndexImage(1)}><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M14.3 16l12.4 11.7-4.5 4.3L5.3 16 22.2 0l4.5 4.3z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={ProductMetaCSS.right_toggle} width="32" role="presentation" color="white" alt="" onClick={() => controlIndexImage(0)}><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M5.3 4.3L9.8 0l16.9 16L9.8 32l-4.5-4.3L17.7 16z"></path></svg>
              </div>
            )}

            <div className={ProductMetaCSS.all_images_container}>
              <button className={ProductMetaCSS.scroll_button_left} onClick={() => scrollContainer(-100)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={ProductMetaCSS.left_toggle} width="32" role="presentation" color="white" alt=""><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M14.3 16l12.4 11.7-4.5 4.3L5.3 16 22.2 0l4.5 4.3z"></path></svg>
              </button>
              <div className={ProductMetaCSS.all_images}>
                {mediaList.map((img, index) => (
                  <div key={index} className={ProductMetaCSS.image_container}>
                    <img onClick={() => controlIndexImage(2, index)} src={img.src} alt="" className={ProductMetaCSS.image} />
                    <div className={ProductMetaCSS.hover_popup} />
                  </div>
                ))}
              </div>
              <button className={ProductMetaCSS.scroll_button_right} onClick={() => scrollContainer(100)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={ProductMetaCSS.right_toggle} width="32" role="presentation" color="white" alt=""><path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M5.3 4.3L9.8 0l16.9 16L9.8 32l-4.5-4.3L17.7 16z"></path></svg>
              </button>
            </div>
          </section>

          <div className={ProductMetaCSS.product_price_meta}>
            {/* Add product price meta content here */}
          </div>
        </section>

        <section className={ProductMetaCSS.resources}>
          {/* Add resources content here */}
        </section>
        <section className={ProductMetaCSS.genre}>
          {/* Add genre content here */}
        </section>
      </div>

      {
        showGallery && 
        
        (
        <Portal>
          <Gallery/>
        </Portal>)
      }

    </div>

  );
}

export default Product_meta;
