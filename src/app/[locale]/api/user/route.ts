import { db } from "@/lib/db";
import { hash } from 'bcrypt';
import { NextResponse } from "next/server";

// model UserDetail {
//     UserID         Int             @id @default(autoincrement())
//     UserName       String          @db.VarChar(128)
//     UserEmail      String          @db.VarChar(128)
//     UserPhone      String?         @db.VarChar(25)
//     UserPassword   String          @db.VarChar(60)
//     UserJoinedDate DateTime        @db.Timestamptz(6)
//     UserPictureURL String          @db.VarChar(256)
//     UserLastLogin  DateTime        @db.Timestamptz(6)
//     WebsiteDetail  WebsiteDetail[]
//   }

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const confirmpw;
        const { username, email, userphone, password } = body;

        // check if email, username, password
        const existingUserByEmail = await db.userDetail.findUnique({
            where: { UserEmail: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
        }

        const existingUserByUserName = await db.userDetail.findUnique({
            where: { UserName: username }
        });
        if (existingUserByUserName) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
        }

        const existingUserByPhone = await db.userDetail.findUnique({
            where: { UserPhone: username }
        });
        if (existingUserByUserName) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
        }

        if (password != confirmpw) {
            return NextResponse.json({ user: null, message: "Your password is not match" }, { status: 409 })
        }


        const hashedPassword = await hash(password, 10)
        const newUser = await db.userDetail.create({
            data: {
                username,
                email,
                userphone,
                password: hashedPassword,
            }
        });
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "User created fail" }, { status: 500 });
    }
}

// export async function GET() {
//     console.log('success');
//     return NextResponse.json({ success: true })
// }
