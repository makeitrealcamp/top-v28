import { prisma } from '@/libs/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

 try {
  const task = await prisma.task.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if(!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  return NextResponse.json({ task });

 } catch (error) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message });
  }

 }

}
