import Modal from 'components/Modal/Modal';
import React, { Component } from 'react';
import { IMG, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  //Открытие/закрытие модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { picture } = this.props; // получили пропс от Арр

    return (
      <>
        <Item className="gallery-item">
          <IMG
            onClick={this.toggleModal}
            src={picture.webformatURL}
            alt={picture.tags}
          />
        </Item>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeUrlImage={picture.largeImageURL}
            tag={picture.tags}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
