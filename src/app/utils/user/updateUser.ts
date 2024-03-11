import { db } from "@/lib/db";
import { hash } from "bcrypt";

export const updateUserAllInfo = async (currentUser: any, body: any) => {
    try {
        const { UserName, UserEmail, UserPhone, UserPassword } = body;
        const hashedPassword = await hash(UserPassword, 10)
        const result = await db.userDetail.update({
            where: {
                UserName: currentUser
            },
            data: {
                UserName: UserName,
                UserEmail: UserEmail,
                UserPhone: UserPhone,
                UserPassword: hashedPassword
            }
        })
        return result;
    } catch (error) {
        return error;
    }
}

export const updateUserName = async (currentUser: any, username: any) => {
    try {
        console.log("updateUserName");
        const result = await db.userDetail.update({
            where: {
                UserName: currentUser
            },
            data: {
                UserName: username,
            }
        })
        return result;
    } catch (error) {
        return error;
    }
}

export const updateUserEmail = async (currentUser: any, useremail: any) => {
    try {
        console.log("updateUserEmail");
        const result = await db.userDetail.update({
            where: {
                UserName: currentUser
            },
            data: {
                UserEmail: useremail,
            }
        })
        return result;
    } catch (error) {
        return error;
    }
}

export const updateUserPhone = async (currentUser: any, userphone: any) => {
    try {
        console.log("updateUserPhone");
        const result = await db.userDetail.update({
            where: {
                UserName: currentUser
            },
            data: {
                UserPhone: userphone,
            }
        })
        return result;
    } catch (error) {
        return error;
    }
}

export const updatePassword = async (currentUser: any, userpassword: any) => {
    try {
        const hashedPassword = await hash(userpassword, 10)
        const result = await db.userDetail.update({
            where: {
                UserName: currentUser
            },
            data: {
                UserPassword: hashedPassword
            }
        })
        return result;
    } catch (error) {
        return error;
    }
}