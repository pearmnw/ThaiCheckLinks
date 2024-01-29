"use client";
import NavBar from "@/components/navbar/NavBar";
// Layout that will show in every pages such as Header. Bg, footer(No have for now)
import backgroundImage from "../../../public/Swirl.png";
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
        <body className="overflow-auto" style={{height:"1000rem"}}>
          <NextAuthProvider>
            <NavBar />
            <div
              style={{
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="pt-9">{children}</div>
            </div>
          </NextAuthProvider>
        </body>
      </I18nProviderClient>
    </html>
  );
}
