import Link from "next/link";
import { getScopedI18n } from "../../../../locales/server";

export default async function Signin() {
  const t = await getScopedI18n("signinpage");
  return (
    <>
      <div className="text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("signin")}
        </span>
      </div>
      <div className="mx-auto w-full">
        <form className="space-y-3" action="#" method="POST">
          <div className="pt-4 pb-0">
            <label
              htmlFor="username"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("username")}
            </label>
            <input
              id="username"
              name="username"
              type="username"
              placeholder={t("text1")}
              autoComplete="username"
              required
              className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex focus:ring-2 focus:ring-inset focus:ring-[#144EE3] sm:text-sm sm:leading-6"
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder={t("text2")}
              autoComplete="current-password"
              required
              className="w-[24rem] h-12 px-4 py-1 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex focus:ring-2 focus:ring-inset focus:ring-[#144EE3] sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            className="w-[24rem] h-12 px-6 py-3 bg-[#02016D] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight hover: bg-[]"
          >
            {t("signin")}
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-gray-500">
          {t("signupmes")}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            &nbsp;{t("signup")}
          </Link>
        </p>
      </div>
    </>
  );
}
