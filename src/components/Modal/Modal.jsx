import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalImage, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); // Закрываем модальное окно при клике на фон
    }
  };

  render() {
    const { largeUrlImage, tag } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImage className="modal">
          <img src={largeUrlImage} alt={tag} />
        </ModalImage>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
