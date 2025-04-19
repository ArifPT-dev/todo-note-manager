'use client';

import { useState } from 'react';
import TooltipText from '@/components/TooltipText';

type Todo = {
  id: number;
  title: string;
};

export default function TodosClient() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const todo = { id: Date.now(), title: newTodo.trim() };
    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">สิ่งที่ต้องทำ</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
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
                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm"
              >
                {/* ✅ ใช้ TooltipText แทน <span> */}
                <TooltipText text={todo.title} />

                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
