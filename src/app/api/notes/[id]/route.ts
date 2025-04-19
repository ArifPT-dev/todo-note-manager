// /app/api/notes/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const noteId = parseInt(params.id);
  if (isNaN(noteId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const note = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!note || note.userId !== user.id) {
    return NextResponse.json({ error: 'Note not found or access denied' }, { status: 404 });
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  return NextResponse.json({ message: 'Note deleted successfully' });
}