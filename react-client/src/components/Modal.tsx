import React, { ReactElement } from "react";
import "./Modal.css";

const Modal = ({ children, closeModal, modalState }: any): ReactElement | null => {
  if (!modalState) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-window">
        <header className="modal-header">
          <button className="delete" onClick={closeModal} />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
