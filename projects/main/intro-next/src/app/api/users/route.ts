import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    console.log({searchParams});
    const id = searchParams.get('id')
    console.log(id);
    // zod validate user

  // call getUserService


  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  const usersJson = await users.json();
  return NextResponse.json({ usersJson});
}

export function POST() {
  return NextResponse.json({ message: 'post users' });
}

export function PUT() {
  return NextResponse.json({ message: 'put users' });
}

export function DELETE() {
  return NextResponse.json({ message: 'delete users' });
}
