import { NextRequest, NextResponse } from 'next/server';
import { authService } from '../(authService)';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = authService.registerUser({ email, password });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
