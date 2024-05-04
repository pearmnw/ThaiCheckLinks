import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'th'];

const I18Middleware = createI18nMiddleware({
    locales,
    defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
    return I18Middleware(request)
}

export const config = {
    matcher: ['/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
