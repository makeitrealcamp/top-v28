import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prismaClient';

export async function GET(request: NextRequest) {
  const tasks = prisma.task.findMany();

  return NextResponse.json({ tasks });
}
