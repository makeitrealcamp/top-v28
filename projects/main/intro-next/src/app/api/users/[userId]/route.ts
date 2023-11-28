import { NextRequest, NextResponse } from 'next/server';

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const { searchParams } = new URL(request.url);
    console.log({ params });
    const id = params.id;
    console.log(id);

    return new NextResponse(JSON.stringify({ message: 'Success', id }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}