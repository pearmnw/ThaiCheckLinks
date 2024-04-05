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
                // backgroundImage: `url(${backgroundImage.src})`,
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

// toast.custom((t) => (
//   <div className="flex align-middle items-center justify-center w-full h-screen">
//     <div
//       className={`${
//         t.visible ? "animate-enter" : "animate-leave"
//       } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//     >
//       <div className="flex-1 w-0 p-4">
//         <div className="flex items-start">
//           <div className="flex-shrink-0 pt-0.5"></div>
//           <div className="ml-3 flex-1">
//             <p className="text-sm font-medium text-gray-900">
//               {e("reporterrwebsiteinact")}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="flex border-l border-gray-200">
//         <button
//           onClick={() => toast.dismiss(t.id)}
//           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// ));
