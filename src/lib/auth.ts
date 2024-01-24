// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { compare } from "bcrypt";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "./db";

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(db),
//     session: {
//         strategy: 'jwt'
//     },
//     providers: [
//         CredentialsProvider({
//             type: 'credentials',
//             credentials: {},
//             async authorize(credentials) {
//                 // try {
//                 const { username, password } = credentials as {
//                     username: string;
//                     password: string;
//                 };

//                 if (!username || !password) {
//                     console.log('No have username or password');
//                     return null;
//                 }

//                 let logintype;
//                 let passwordMatch;

//                 const existingUserName = await db.userDetail.findUnique({
//                     where: { UserName: username },
//                 })
//                 if (existingUserName) {
//                     logintype = "UserName";
//                     passwordMatch = await compare(password, existingUserName?.UserPassword);
//                 }

//                 const existingUserPhone = await db.userDetail.findUnique({
//                     where: { UserPhone: username }
//                 })
//                 if (existingUserPhone) {
//                     logintype = "UserPhone";
//                     passwordMatch = await compare(password, existingUserPhone?.UserPassword);
//                 }

//                 const existingUserEmail = await db.userDetail.findUnique({
//                     where: { UserEmail: username }
//                 })
//                 if (existingUserEmail) {
//                     logintype = "UserEmail";
//                     passwordMatch = await compare(password, existingUserEmail?.UserPassword);
//                 }

//                 if (!passwordMatch) {
//                     console.log('Password not match');
//                     return null;
//                 }

//                 if (!existingUserName && !existingUserPhone && !existingUserEmail) {
//                     console.log('Can not find any account in database');
//                     return null;
//                 }

//                 let userForm;
//                 if (logintype == "UserName") {
//                     userForm = {
//                         UserID: existingUserPhone?.UserID,
//                         UserName: existingUserName?.UserName,
//                         UserEmail: existingUserName?.UserEmail,
//                         UserPhone: existingUserName?.UserPhone,
//                         UserPassword: existingUserName?.UserPassword,
//                         UserJoinedDate: existingUserName?.UserJoinedDate,
//                         UserPictureURL: existingUserName?.UserPictureURL,
//                     }
//                 }
//                 else if (logintype == "UserEmail") {
//                     userForm = {
//                         UserID: existingUserPhone?.UserID,
//                         UserName: existingUserEmail?.UserName,
//                         UserEmail: existingUserEmail?.UserEmail,
//                         UserPhone: existingUserEmail?.UserPhone,
//                         UserPassword: existingUserEmail?.UserPassword,
//                         UserJoinedDate: existingUserEmail?.UserJoinedDate,
//                         UserPictureURL: existingUserEmail?.UserPictureURL,
//                     }
//                 }
//                 else if (logintype == "UserPhone") {
//                     userForm = {
//                         UserID: existingUserPhone?.UserID,
//                         UserName: existingUserPhone?.UserName,
//                         UserEmail: existingUserPhone?.UserEmail,
//                         UserPhone: existingUserPhone?.UserPhone,
//                         UserPassword: existingUserPhone?.UserPassword,
//                         UserJoinedDate: existingUserPhone?.UserJoinedDate,
//                         UserPictureURL: existingUserPhone?.UserPictureURL,
//                     }
//                 }
//                 return {
//                     id: `${userForm?.UserID}`,
//                     username: userForm?.UserName,
//                     password: userForm?.UserPassword
//                     // UserName: userForm?.UserName,
//                     // UserEmail: userForm?.UserEmail,
//                     // UserPhone: userForm?.UserPhone,
//                     // UserPassword: userForm?.UserPassword,
//                     // UserJoinedDate: userForm?.UserJoinedDate,
//                     // UserPictureURL: userForm?.UserPictureURL,
//                 }

//                 // } catch (error) {
//                 //     console.log(error);
//                 // }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/signin'
//     },
// }

// // UserID         Int             @id @default(autoincrement())
// // UserName       String          @unique
// // UserEmail      String          @unique
// // UserPhone      String?         @unique
// // UserPassword   String          @db.VarChar(60)
// // UserJoinedDate DateTime        @default(now())
// // UserPictureURL String?         @unique
// // UserLastLogin  DateTime        @updatedAt
// // WebsiteDetail  WebsiteDetail[]