'use client';

import { useEffect, useState } from 'react';
import NoteCard from './components/NoteCard';

type Note = {
  id: number;
  content: string;
};

export default function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(Array.isArray(data.notes) ? data.notes : []);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการโหลดโน้ต:', err);
        setNotes([]); // fallback กันพัง
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newNote }),
      });

      if (res.ok) {
        const data = await res.json();
        setNotes([data.note, ...notes]);
        setNewNote('');
      }
    } catch (err) {
      console.error('เพิ่มโน้ตไม่สำเร็จ:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error('ลบโน้ตไม่สำเร็จ:', err);
    }
  };

  const handleUpdate = async (id: number, content: string) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, content } : note))
      );
    } catch (err) {
      console.error('อัปเดตโน้ตไม่สำเร็จ:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">โน้ตของฉัน</h1>
        <div className="flex flex-col sm:flex-row gap-2 mb-6 text-gray-400">
          <textarea
            placeholder="เขียนโน้ตของคุณ..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={2}
            className="w-full sm:flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm sm:text-base"
          />
          <button
            onClick={handleAddNote}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm sm:text-base"
          >
            เพิ่ม
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">กำลังโหลด...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500">ยังไม่มีโน้ต</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                content={note.content}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
