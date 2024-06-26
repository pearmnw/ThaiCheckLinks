"use client";
import NavBar from "@/components/navbar/NavBar";
// Layout that will show in every pages such as Header. Bg, footer(No have for now)
import { Toaster } from "react-hot-toast";
import { I18nProviderClient, useCurrentLocale } from "../../locales/client";
import NextAuthProvider from "../providers";
import "./globals.css";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentLocale = useCurrentLocale();

  return (
    <html lang="en">
      <I18nProviderClient locale={currentLocale}>
        <body className="overflow-auto scroll-py-5 scroll-px-5">
          <NextAuthProvider>
            <NavBar />
            <div
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Toaster position="top-center" />
              <div className="pt-6">{children}</div>
            </div>
          </NextAuthProvider>
        </body>
      </I18nProviderClient>
    </html>
  );
}
