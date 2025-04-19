// /app/api/notes/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { id: 'desc' },
  });

  return NextResponse.json({ notes }); // ✅ ห่อใน object
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { content } = body;

  if (!content || content.trim() === '') {
    return NextResponse.json({ error: 'Note content is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const note = await prisma.note.create({
    data: {
      content: content.trim(),
      userId: user.id,
    },
  });

  return NextResponse.json({ note }); // ✅ สำคัญที่สุด!
}