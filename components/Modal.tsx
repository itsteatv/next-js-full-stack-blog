import React, { ReactNode } from "react";
import Button from "./Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300">
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>{" "}
      {/* Blur background */}
      <div className="relative flex justify-center z-10 p-6 bg-white rounded-lg shadow-lg w-11/12 h-[250px] max-w-[24rem]">
        <Button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
          icon={
            <XCircleIcon className="mr-3 mt-4 h-5 w-5 text-gray-400" />
          }
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
