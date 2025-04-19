import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'To-Do & Note Manager',
  description: 'จัดการชีวิตด้วยสิ่งที่ต้องทำและโน้ตส่วนตัว',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="th">
      <body className={inter.className}>
        <Navbar userEmail={session?.user?.email ?? ''} />
        <main>{children}</main>

        {/* ✅ Footer แบบง่าย */}
        <footer className="text-center text-gray-500 text-sm py-6 bg-gray-100 mt-8">
          © 2025 To-Do & Note Manager. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

