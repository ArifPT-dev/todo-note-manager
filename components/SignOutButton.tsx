'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="text-sm bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-100"
    >
      ออกจากระบบ
    </button>
  );
}
