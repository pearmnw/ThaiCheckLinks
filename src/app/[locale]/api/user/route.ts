import { getScopedI18n } from '@/locales/server';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function POST(req: Request) {
    try {
        const t = await getScopedI18n("errormessage");
        const body = await req.json();
        console.log(body);
        const { UserName, UserEmail, UserPhone, UserPassword } = body;

        // Common code for both cases
        const existingUserByUserName = await db.userDetail.findUnique({
            where: { UserName: UserName }
        });

        if (existingUserByUserName) {
            return NextResponse.json({ UserDetail: null, message: t("errmessuserexist") }, { status: 409 })
        }

        // Check if email, username, password
        const existingUserByEmail = await db.userDetail.findUnique({
            where: { UserEmail: UserEmail }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ UserDetail: null, message: t("errmessemailexist") }, { status: 409 })
        }

        // Rest of the code for both cases

        if (UserPhone) {
            const existingUserByPhone = await db.userDetail.findFirst({
                where: { UserPhone: UserPhone }
            });
            if (existingUserByPhone) {
                return NextResponse.json({ UserDetail: null, message: t("errmessphoneexist") }, { status: 409 })
            }
        }

        // Code specific to the if-else block
        const hashedPassword = await hash(UserPassword, 10)
        const newUser = await db.userDetail.create({
            data: {
                UserName: UserName,
                UserEmail: UserEmail,
                UserPhone: UserPhone,
                UserPassword: hashedPassword
            }
        });

        // Return response
        return NextResponse.json(
            { UserDetail: newUser, message: t("usersuccess") },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

// export async function GET() {
//     console.log('success');
//     return NextResponse.json({ success: true })
// }
