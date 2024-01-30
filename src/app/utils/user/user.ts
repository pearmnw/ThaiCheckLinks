import { db } from "@/lib/db";

export const getUserByUserName = async (UserName: string) => {
    try {
        const user = await db.userDetail.findFirst({ where: { UserName: UserName } });
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
};

export const getUserByEmail = async (UserEmail: string) => {
    try {
        const user = await db.userDetail.findUnique({ where: { UserEmail } });

        return user;
    } catch {
        return null;
    }
};