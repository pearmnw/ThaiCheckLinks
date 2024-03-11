import "next-auth";
declare module "next-auth" {
    interface User {
        userphone: string
        password: string
    }
    interface Session {
        user: User & {
            userphone: string
            password: string
        }
        token: {
            userphone: string
            password: string
        }
    }
}