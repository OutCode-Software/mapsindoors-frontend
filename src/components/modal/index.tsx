import React, { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 300); // Adjust the duration as needed
  };

  if (!isOpen && !isAnimating) {
    return null;
  }

  return (
    <div className={`modal ${isAnimating ? "animating" : ""}`}>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
