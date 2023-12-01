import { NextRequest, NextResponse } from 'next/server';
import { authService } from '../(authService)';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  console.log({ email, password });
  try {
    const user = authService.registerUser({ email, password });
    console.log({ user });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
