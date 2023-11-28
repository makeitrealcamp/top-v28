import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prismaClient';
import { NextApiRequest } from 'next';

export async function GET(request: NextApiRequest) {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json({ tasks });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
interface TaskInput {
  title: string;
}

export async function POST(request: NextRequest) {
  const { title } = await request.json() as TaskInput; 
  try {

    const newTask = await prisma.task.create({
      data: {
        title,
      },
    });

    return NextResponse.json({ newTask });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
