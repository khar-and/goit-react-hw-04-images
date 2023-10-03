import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { Ul } from './ImageGallery.styled';

const ImageGallery = ({ pictures }) => {
  return (
    <Ul>
      {pictures.map(picture => (
        <ImageGalleryItem key={picture.id} picture={picture} />
      ))}
    </Ul>
  );
};

export default ImageGallery;
