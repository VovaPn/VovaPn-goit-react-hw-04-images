import { createPortal } from 'react-dom';
import { Overlay, ModalContent, Image } from 'components/Modal/Modal.styled';
import { useEffect } from 'react';

const ModalRoot = document.querySelector('#modal-root');

export const Modal = ({ url, onClose }) => {
  useEffect(() => {
    const handleEscKeydown = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscKeydown);
    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onClose]);

  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <Image src={url} alt="" />
      </ModalContent>
    </Overlay>,
    ModalRoot
  );
};

export default Modal;
