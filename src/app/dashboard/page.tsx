import QuoteClient from './QuoteClient';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">แดชบอร์ด</h1>

        {/* ดึงคำคม */}
        <QuoteClient />

        <div className="flex justify-center gap-4">
          <a href="/todos" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
            รายการสิ่งที่ต้องทำ
          </a>
          <a href="/notes" className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
            โน้ตของฉัน
          </a>
        </div>
      </div>
    </div>
  );
}
