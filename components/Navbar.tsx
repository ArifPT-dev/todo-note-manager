'use client';

import Link from 'next/link';
import Image from 'next/image'; // ✅ import เพิ่ม
import { SignOutButton } from '@/components/SignOutButton';
import { useState } from 'react';

export default function Navbar({ userEmail }: { userEmail?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white px-6 py-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-xl font-bold flex items-center gap-2">
          <Image src="/favicon.png" alt="Logo" width={28} height={28} />
          To-Do & Note Manager
        </div>

        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>

        <div className="hidden sm:flex gap-4 items-center">
          <Link href="/dashboard" className="hover:underline">หน้าแรก</Link>
          <Link href="/todos" className="hover:underline">สิ่งที่ต้องทำ</Link>
          <Link href="/notes" className="hover:underline">โน้ต</Link>
          {userEmail && (
            <>
              <span className="text-sm hidden md:inline">👋 {userEmail}</span>
              <SignOutButton />
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden flex flex-col gap-2 mt-3 px-3">
          <Link href="/dashboard">หน้าแรก</Link>
          <Link href="/todos">สิ่งที่ต้องทำ</Link>
          <Link href="/notes">โน้ต</Link>
          {userEmail && (
            <>
              <span className="text-sm">👋 {userEmail}</span>
              <SignOutButton />
            </>
          )}
        </div>
      )}
    </nav>
  );
}