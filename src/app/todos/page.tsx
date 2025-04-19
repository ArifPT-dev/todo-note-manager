import { requireAuth } from '@/lib/requireAuth';
import TodosClient from './TodosClient';

export default async function TodosPage() {
  const session = await requireAuth(); // 🔐 redirect ถ้าไม่ได้ login

  return <TodosClient />;
}
