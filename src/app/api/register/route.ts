import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, confirmPassword } = body;

    if (!email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'รหัสผ่านไม่ตรงกัน' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'อีเมลนี้ถูกใช้ไปแล้ว' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'สมัครสมาชิกสำเร็จ', user: { id: newUser.id, email: newUser.email } });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' }, { status: 500 });
  }
}
