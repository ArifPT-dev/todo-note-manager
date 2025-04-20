import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.id) },
  });

  if (!todo || todo.userId !== user.id) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  await prisma.todo.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'Todo deleted' });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { title } = await req.json();

  try {
    const updated = await prisma.todo.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json({ todo: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
