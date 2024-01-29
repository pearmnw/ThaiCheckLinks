import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function signin(credentials) {
    try {
        const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const usernamepattern = /^[a-zA-Z0-9]/;
        const phonenumpattern = /^[0-9]/;

        if (usernamepattern.test(credentials.username)) {
            const existingUserName = await db.userDetail.findUnique({
                where: { UserName: credentials.username },
            })
            console.log(existingUserName);
            if (!existingUserName) {
                // return NextResponse.json({message: "This username not exists" }, { status: 409 })
                throw new Error("Wrong username");
            }
            const passwordMatch = await compare(credentials.password, existingUserName?.UserPassword);
            if (!passwordMatch) {
                // return NextResponse.json({message: "Password not match" }, { status: 409 })
                throw new Error("Wrong password");
            }
            return existingUserName;
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
    callbacks: {
        jwt: async ({ token, account, user }) => {
            // on login if a user is passed, we set that data to this token
            user && (token.user = user);
            // console.log(token);
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user as any;
            console.log(session)
            return session;
        },
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.method + req.url)
    // console.log(res)
    return await NextAuth(req, res, authOptions)
}

// const handler = (authOptions);

export { handler as GET, handler as POST };

