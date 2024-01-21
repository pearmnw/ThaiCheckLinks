import { createI18nClient } from "next-international/client";

export const {
    useI18n,
    useScopedI18n,
    useChangeLocale,
    I18nProviderClient,
    useCurrentLocale,
} = createI18nClient({
    en: () => import('./en'),
    th: () => import('./th'),
})