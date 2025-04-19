import { requireAuth } from '@/lib/requireAuth';
import NotesClient from './NotesClient';

export default async function NotesPage() {
  const session = await requireAuth(); // 🔐 redirect ถ้าไม่ได้ login

  return <NotesClient />;
}
