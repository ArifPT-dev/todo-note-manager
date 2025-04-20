'use client';

import { useState } from 'react';
import TooltipText from '@/components/TooltipText';

type NoteCardProps = {
  id: number;
  content: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
};

export default function NoteCard({ id, content, onDelete, onUpdate }: NoteCardProps) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (editedContent.trim() && editedContent !== content) {
      onUpdate(id, editedContent.trim());
    }
    setEditing(false);
  };

  return (
    <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl shadow-sm">
      {/* ✅ ห่อด้วย div และเพิ่ม min-w-0 เพื่อไม่ให้ทะลุ */}
      <div className="flex-1 min-w-0 mr-4">
        {editing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm text-gray-400"
          />
        ) : (
          <TooltipText text={content} />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 ml-0 sm:ml-4 shrink-0 text-right sm:text-left">
        {editing ? (
          <button
            onClick={handleSave}
            className="text-sm text-green-600 hover:underline"
          >
            บันทึก
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            แก้ไข
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="text-sm text-red-500 hover:underline"
        >
          ลบ
        </button>
      </div>
    </div>
  );
}
