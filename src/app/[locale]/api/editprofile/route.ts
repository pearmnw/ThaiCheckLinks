import { updateUserAllInfo, updateUserEmail, updateUserName, updateUserPhone } from "@/app/utils/user/updateUser";
import { db } from "@/lib/db";
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
// const session = getServerSession(authOptions);

export async function PUT(req: Request) {
    try {

        const body = await req.json();
        console.log(body);
        const { CurrentUser, UserName, UserEmail, UserPhone, UserPassword } = body;

        if (UserName && UserEmail && UserPhone && UserPassword) {
            const existingUserByUserName = await db.userDetail.findUnique({
                where: { UserName: UserName }
            });
            if (existingUserByUserName) {
                return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
            }
            else {
                const updateresult = await updateUserAllInfo(CurrentUser, body);
                console.log(updateresult);
                return NextResponse.json({ UserDetail: updateresult, message: "User edit successfully" }, { status: 201 });
            }
        }

        else if (!UserName && !UserEmail && !UserPhone && !UserPassword) {
            return NextResponse.json({ user: null, message: "Require some information for update" }, { status: 409 })
        }
        else {
            let updateresult;
            if (UserEmail) {
                // check if email, username, password
                const existingUserByEmail = await db.userDetail.findUnique({
                    where: { UserEmail: UserEmail }
                });
                if (existingUserByEmail) {
                    return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
                }
                else {
                    updateresult = await updateUserEmail(CurrentUser, UserEmail);
                    console.log(updateresult);
                    // return NextResponse.json({ UserDetail: updateresult, message: "User edit successfully" }, { status: 201 });
                }
            }

            if (UserPhone) {
                const existingUserByPhone = await db.userDetail.findUnique({
                    where: { UserPhone: UserPhone }
                });
                if (existingUserByPhone) {
                    return NextResponse.json({ user: null, message: "User with this phonenumber already exists" }, { status: 409 })

                }
                else {
                    updateresult = await updateUserPhone(CurrentUser, UserPhone);
                    console.log(updateresult);
                    // return NextResponse.json({ UserDetail: updateresult, message: "User edit successfully" }, { status: 201 });

                }
            }

            if (UserPassword) {
                console.log("updatePassword1")
                updateresult = await UserPassword(CurrentUser, UserPassword);
                console.log(updateresult);
                // return updateresult;
            }

            if (UserName) {
                const existingUserByUserName = await db.userDetail.findUnique({
                    where: { UserName: UserName }
                });
                if (existingUserByUserName) {
                    return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
                }
                else {
                    updateresult = await updateUserName(CurrentUser, UserName);
                    console.log(updateresult);
                    // return NextResponse.json({ UserDetail: updateresult, message: "User edit successfully" }, { status: 201 });
                }
            }

            return NextResponse.json({ UserDetail: updateresult, message: "User edit successfully" }, { status: 201 });
        }

        // console.log(updateUser);
        // if (updateUser) {
        // }
        // else {
        //     throw new Error("Something Wrong!!");
        // }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
