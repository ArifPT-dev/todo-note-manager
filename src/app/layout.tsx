import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'To-Do & Note Manager',
  description: 'จัดการชีวิตด้วยสิ่งที่ต้องทำและโน้ตส่วนตัว',
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="th">
      <body className={inter.className}>
        <Navbar userEmail={session?.user?.email ?? ''} />
        <main>{children}</main>
        <footer className="text-center text-gray-100 text-sm py-3 bg-green-500 mt-0">
          © 2025 To-Do & Note Manager. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

