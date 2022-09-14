import React from "react";
import AuthForm from "./AuthForm";

const Modal = ({ closeModal }) => {
  return (
    <div className="modalBG">
      <div>
        <div className="mb-5">
          <span className="font-bold text-2xl">Create your account</span>
        </div>
        <AuthForm closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Modal;
