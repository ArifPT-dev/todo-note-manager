'use client';

import { useState, useEffect } from 'react';
import TooltipText from '@/components/TooltipText';

type Todo = {
  id: number;
  title: string;
};

export default function TodosClient() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/todos');
        const data = await res.json();
        setTodos(Array.isArray(data.todos) ? data.todos : []);
      } catch (err) {
        console.error('โหลด To-do ไม่สำเร็จ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });
      const data = await res.json();
      setTodos([data.todo, ...todos]);
      setNewTodo('');
    } catch (err) {
      console.error('เพิ่ม To-do ไม่สำเร็จ:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('ลบ To-do ไม่สำเร็จ:', err);
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editedTitle.trim()) return;
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editedTitle }),
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: editedTitle } : todo
        )
      );
      setEditingId(null);
      setEditedTitle('');
    } catch (err) {
      console.error('อัปเดต To-do ไม่สำเร็จ:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">สิ่งที่ต้องทำ</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6 text-gray-400">
          <input
            type="text"
            placeholder="พิมพ์สิ่งที่ต้องทำ..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full sm:flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />
          <button
            onClick={handleAddTodo}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm sm:text-base"
          >
            เพิ่ม
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">กำลังโหลด...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-400">ยังไม่มีสิ่งที่ต้องทำ</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
              key={todo.id}
              className="flex justify-between items-start bg-gray-50 p-4 rounded-xl shadow-sm"
            >
              {/* ✅ เพิ่ม max-w และ break-words ในกล่องแสดงข้อความ */}
              <div className="flex-1 mr-4 max-w-[75%] overflow-hidden break-words">
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm text-gray-400"
                  />
                ) : (
                  <TooltipText text={todo.title} />
                )}
              </div>
            
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 ml-4 shrink-0 text-right sm:text-left">
                {editingId === todo.id ? (
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="text-sm text-green-600 hover:underline"
                  >
                    บันทึก
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditedTitle(todo.title);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    แก้ไข
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  ลบ
                </button>
              </div>
            </li>            
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
