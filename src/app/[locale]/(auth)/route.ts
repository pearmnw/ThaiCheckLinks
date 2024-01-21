import { NextResponse } from "next/server";

export async function GET() {
    console.log('success');
    return NextResponse.json({ success: true })
}