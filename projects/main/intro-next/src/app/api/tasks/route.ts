import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prismaClient';
import { NextApiRequest } from 'next';
import { TaskInput, TaskInputSchema } from './(domain)';
import { taskService } from './(services)';

export async function GET(request: NextApiRequest) {
  try {
    const tasks = await taskService.getTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  const userId = 1;
  // const userId = request.locals.user.id;
  try {
    const parseResult = await TaskInputSchema.safeParseAsync({
      title,
      description,
      userId,
    });

    if (!parseResult.success) {
      return NextResponse.json({ error: 'bad request' }, { status: 400 });
    }
    const newTask = await taskService.createTask(parseResult.data);

    return NextResponse.json({ newTask }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
