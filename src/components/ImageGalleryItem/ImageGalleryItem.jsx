import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { IMG, Item } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ picture }) => {
  const [showModal, setShowModal] = useState(false);

  //Открытие/закрытие модалки
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Item className="gallery-item">
        <IMG
          onClick={toggleModal}
          src={picture.webformatURL}
          alt={picture.tags}
        />
      </Item>
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeUrlImage={picture.largeImageURL}
          tag={picture.tags}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;
