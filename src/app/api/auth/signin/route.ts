import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body; 
  if (!email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  } 

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // @ts-ignore
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Success Login', user }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}