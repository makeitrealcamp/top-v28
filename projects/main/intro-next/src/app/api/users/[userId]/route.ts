import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    console.log({searchParams});
    const id = searchParams.get('id')
    console.log(id);
  return NextResponse.json({ message:''});
}