import React, { ReactNode, useState, useEffect } from "react";
import Button from "./Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 backdrop-blur-xl transition-opacity duration-300 ${
          isClosing ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      ></div>

      <div
        className={`relative z-10 p-8 bg-white/70 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl w-11/12 max-w-md h-auto transform transition-transform duration-300 ${
          isClosing ? "animate-slideDown" : "animate-slideUp"
        }`}
      >
        <Button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
          icon={
            <XCircleIcon className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-200" />
          }
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
