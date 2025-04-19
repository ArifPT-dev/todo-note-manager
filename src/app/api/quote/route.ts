import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    const data = await res.json();
    return NextResponse.json({ quote: data.slip.advice });
  } catch (err) {
    return NextResponse.json({ quote: 'ดึงคำแนะนำไม่สำเร็จ' });
  }
}
