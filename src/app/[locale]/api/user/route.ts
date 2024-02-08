import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);
        const { UserName, UserEmail, UserPhone, UserPassword } = body;

        let newUser: any;

        if (UserPhone) {
            const existingUserByUserName = await db.userDetail.findUnique({
                where: { UserName: UserName }
            });

            if (existingUserByUserName) {
                return NextResponse.json({ UserDetail: null, message: "User with this Username already exists" }, { status: 409 })
            }

            // check if email, username, password
            const existingUserByEmail = await db.userDetail.findUnique({
                where: { UserEmail: UserEmail }
            });
            if (existingUserByEmail) {
                return NextResponse.json({ UserDetail: null, message: "User with this Email already exists" }, { status: 409 })
            }

            const existingUserByPhone = await db.userDetail.findFirst({
                where: { UserPhone: UserPhone }
            });
            if (existingUserByPhone) {
                return NextResponse.json({ UserDetail: null, message: "User with this Phonenumber already exists" }, { status: 409 })
            }

            const hashedPassword = await hash(UserPassword, 10)
            newUser = await db.userDetail.create({
                data: {
                    UserName,
                    UserEmail,
                    UserPhone,
                    UserPassword: hashedPassword
                }
            });
        }
        else {
            const existingUserByUserName = await db.userDetail.findUnique({
                where: { UserName: UserName }
            });

            if (existingUserByUserName) {
                return NextResponse.json({ UserDetail: null, message: "User with this Username already exists" }, { status: 409 })
            }

            // check if email, username, password
            const existingUserByEmail = await db.userDetail.findUnique({
                where: { UserEmail: UserEmail }
            });
            if (existingUserByEmail) {
                return NextResponse.json({ UserDetail: null, message: "User with this Email already exists" }, { status: 409 })
            }


            const hashedPassword = await hash(UserPassword, 10)
            newUser = await db.userDetail.create({
                data: {
                    UserName,
                    UserEmail,
                    UserPhone,
                    UserPassword: hashedPassword
                }
            });
        }

        return NextResponse.json({ UserDetail: newUser, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

// export async function GET() {
//     console.log('success');
//     return NextResponse.json({ success: true })
// }
