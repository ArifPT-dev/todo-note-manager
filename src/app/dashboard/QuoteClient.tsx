'use client';
import { useEffect, useState } from 'react';

export default function QuoteClient() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('/api/quote');
        const data = await res.json();
        setQuote(data.quote);
      } catch (err) {
        setQuote('เกิดข้อผิดพลาดในการโหลด');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="text-center mt-4 italic text-gray-700">
      {loading ? 'กำลังโหลดคำคม...' : `“${quote}”`}
    </div>
  );
}
