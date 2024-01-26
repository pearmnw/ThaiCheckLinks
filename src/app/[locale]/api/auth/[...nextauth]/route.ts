import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function signin(credentials) {
    try {
        // const existingUserName = await db.userDetail.findUnique({
        //     where: { UserName: credentials.username },
        // })
        // if (!existingUserName) throw new Error("Wrong Credentials")
        // const passwordMatch = await compare(credentials.password, existingUserName?.UserPassword);
        // if (!passwordMatch) throw new Error("Wrong password");
        // return existingUserName;
        const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const usernamepattern = /^[a-zA-Z0-9]/;
        const phonenumpattern = /^[0-9]/;

        if (usernamepattern.test(credentials.username)) {
            const existingUserName = await db.userDetail.findUnique({
                where: { UserName: credentials.username },
            })
            if (!existingUserName) throw new Error("This Username was not exits")
            const passwordMatch = await compare(credentials.password, existingUserName?.UserPassword);
            if (!passwordMatch) throw new Error("Wrong password");
            return existingUserName;
        } else if (phonenumpattern.test(credentials.username)) {
            const existingUserPhone = await db.userDetail.findUnique({
                where: { UserPhone: credentials.username },
            })
            if (!existingUserPhone) throw new Error("Wrong Credentials")
            const passwordMatch = await compare(credentials.password, existingUserPhone?.UserPassword);
            if (!passwordMatch) throw new Error("Wrong password");
            return existingUserPhone;
        }
        else if (emailpattern.test(credentials.username)) {
            const existingUserEmail = await db.userDetail.findUnique({
                where: { UserPhone: credentials.username },
            })
            if (!existingUserEmail) throw new Error("Wrong Credentials")
            const passwordMatch = await compare(credentials.password, existingUserEmail?.UserPassword);
            if (!passwordMatch) throw new Error("Wrong password");
            return existingUserEmail;
        }
        else {
            throw new Error("Wrong Credentials")
        }
    } catch (error) {
        console.log(error);
        console.log("error while logging in.");
    }

}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/signin',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {
                try {
                    const user = await signin(credentials);
                    console.log({ credentials })
                    console.log(user);
                    // return user;
                    return {
                        id: `${user?.UserID}`,
                        name: user?.UserName,
                        email: user?.UserEmail
                    }

                } catch (error) {
                    throw new Error("Failed to signin.");
                }
            },
        })
    ],
    // callbacks: {
    //     async jwt({ token }) {
    //         console.log(token);
    //         return token;
    //     },
    //     async session({ session, token }) {
    //         return {
    //             ...session,
    //             user: {
    //                 ...session.user,
    //                 username: token.username
    //             }
    //         }
    //     }
    // }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.method + req.url)
    // console.log(res)
    return await NextAuth(req, res, authOptions)
}

// const handler = (authOptions);

export { handler as GET, handler as POST };

