'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardClient() {
  const router = useRouter();
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch('https://zenquotes.io/api/today');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuote(`${data[0].q} — ${data[0].a}`);
        } else {
          setQuote('ไม่สามารถดึงคำคมได้ในขณะนี้');
        }
      } catch (err) {
        setQuote('เกิดข้อผิดพลาดในการดึงคำคม');
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">แดชบอร์ด</h1>
        {loading ? (
          <p className="text-gray-500">กำลังโหลดคำคม...</p>
        ) : (
          <blockquote className="italic text-gray-700 mb-6">“{quote}”</blockquote>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/todos')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            รายการสิ่งที่ต้องทำ
          </button>
          <button
            onClick={() => router.push('/notes')}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            โน้ตของฉัน
          </button>
        </div>
      </div>
    </div>
  );
}