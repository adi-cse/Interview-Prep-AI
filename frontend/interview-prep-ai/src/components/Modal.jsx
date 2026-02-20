import React from 'react';

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/40 backdrop-blur-sm">

      <div className="relative flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden w-[90%] md:w-auto max-h-[90vh]">

        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}

        <button
          type="button"
          className="text-gray-400 hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;
