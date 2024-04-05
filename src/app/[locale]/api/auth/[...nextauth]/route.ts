import { db } from "@/lib/db";
import { getScopedI18n } from "@/locales/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function signin(credentials: any) {
    try {
        const t = await getScopedI18n("errormessage");
        // const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const usernamepattern = /^[a-zA-Z0-9]/;
        // const phonenumpattern = /^[0-9]/;

        if (usernamepattern.test(credentials.username)) {
            const existingUserName = await db.userDetail.findFirst({
                // where: { UserName: credentials.username },
                where: { UserName: credentials.username },
            })
            console.log(existingUserName);
            if (!existingUserName) {
                throw { status: 409, message: t("errsigninusername") };
            }
            const passwordMatch = await compare(credentials.password, existingUserName?.UserPassword);
            if (!passwordMatch) {
                // return NextResponse.json({message: "Password not match" }, { status: 409 })
                throw { status: 409, message: t("errsigninpassword") };
            }
            return existingUserName;
        }
    } catch (error) {
        console.log(error);
        console.log("error while logging in.");
        throw error;
    }

}

export const authOptions: AuthOptions = {
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
            async authorize(credentials): Promise<any> {
                try {
                    const t = await getScopedI18n("errormessage");
                    const user = await signin(credentials);
                    if (user) {
                        return {

                            id: `${user?.UserID}`,
                            name: user?.UserName,
                            email: user?.UserEmail,
                            userphone: user?.UserPhone,
                            password: user?.UserPassword,

                        };
                    }
                    else {
                        throw new Error(t("errsigninsystem"))
                    }


                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            // on login if a user is passed, we set that data to this token
            user && (token.user = user);
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

