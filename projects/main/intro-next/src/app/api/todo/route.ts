import { prisma } from '@/libs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();


  const data = await prisma.todo.create({
    data: {
      title,
    },
  });
  try {
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}


export async function GET(request: NextRequest) {
    const data = await prisma.todo.findMany();
    try {
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
        return NextResponse.json({ error: error.message });
        }
    }
}