import "next-auth";
declare module "next-auth" {
    interface User {
        userphone: string
    }
    interface Session {
        user: User & {
            userphone: string
        }
        token: {
            userphone: string
        }
    }
}