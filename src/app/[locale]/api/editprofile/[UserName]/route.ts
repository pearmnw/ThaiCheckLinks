import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }) => {
    try {
        const { UserName } = params;
        console.log(params);
        const res = await db.userDetail.findUnique({
            where: {
                UserName
            }
        });

        if (!res) {
            return NextResponse.json(
                { message: "Response not found", err },
                { status: 404 }
            )
        }

        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 });
    }
}