"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[locale]/api/auth/[...nextauth]/route";
import { updateUserEmail, updateUserName, updateUserPhone } from "../utils/user/updateUser";

export const updateProfile = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions)
        const getSession = await JSON.stringify(session, null, 2);
        console.log(getSession);
        const jsSession = await JSON.parse(getSession);
        console.log(jsSession);
        console.log(jsSession.user.id);

        const body = await req.json();
        console.log(body);
        const { UserName, UserEmail, UserPhone, UserPassword } = body;

        if (UserName) {
            const existingUserByUserName = await db.userDetail.findUnique({
                where: { UserName: UserName }
            });
            if (existingUserByUserName) {
                return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
            }
            else {
                const updateresult = await updateUserName(jsSession.user.id, UserName);
                console.log(updateresult);
                return updateresult;
            }
        }

        if (UserEmail) {
            // check if email, username, password
            const existingUserByEmail = await db.userDetail.findUnique({
                where: { UserEmail: UserEmail }
            });
            if (existingUserByEmail) {
                return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
            }
            else {
                const updateresult = await updateUserEmail(jsSession.user.id, UserName);
                console.log(updateresult);
                return updateresult;
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
                const updateresult = await updateUserPhone(jsSession.user.id, UserName);
                console.log(updateresult);
                return updateresult;
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
                const updateresult = await updateUserPhone(jsSession.user.id, UserName);
                console.log(updateresult);
                return updateresult;
            }
        }

        if (UserPassword) {
            const updateresult = await updateUserPhone(jsSession.user.id, UserName);
            console.log(updateresult);
            return updateresult;
        }

    }
    catch (error) {
        console.log(error);
    }
}