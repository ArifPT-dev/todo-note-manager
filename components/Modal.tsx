'use client';

import { ReactNode } from 'react';

type ModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ title = 'รายละเอียด', children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="text-gray-700 break-words">{children}</div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
