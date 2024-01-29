import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'th'];
// const privatePages = ['/report'];

const I18Middleware = createI18nMiddleware({
    //     locales: ['en', 'th'],
    locales,
    defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
    return I18Middleware(request)
}

export const config = {
    matcher: ['/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
