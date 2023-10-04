import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalImage, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeUrlImage, tag }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // will unMount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose(); // Закрываем модальное окно при клике на фон
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalImage className="modal">
        <img src={largeUrlImage} alt={tag} />
      </ModalImage>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
