'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { useState, useEffect } from 'react';

type Props = {
  text: string;
};

export default function TooltipText({ text }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ✅ ตรวจว่าเป็นมือถือไหม
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Tooltip.Provider delayDuration={300}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span
              className="truncate max-w-[75%] inline-block cursor-pointer text-gray-800"
              onClick={() => isMobile && setShowModal(true)}
            >
              {text}
            </span>
          </Tooltip.Trigger>
          {!isMobile && (
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                className="bg-black text-white text-xs px-2 py-1 rounded shadow z-50"
              >
                {text}
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* ✅ Modal แสดงข้อความเต็มบนมือถือ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4">รายละเอียด</h2>
            <p className="text-gray-700 break-words">{text}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </>
  );
}
