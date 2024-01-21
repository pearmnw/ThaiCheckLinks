import Link from "next/link";
import { getScopedI18n } from "../../../../locales/server";

export default async function Signup() {
  const t = await getScopedI18n("signuppage");
  return (
    <>
      <div className="text-center text-[48px] font-extrabold">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
          {t("signup")}
        </span>
      </div>
      <div className="mx-auto w-full">
        <form className="space-y-3" action="#" method="POST">
          <div className="pt-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("username")}
            </label>
            <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
              <input
                id="username"
                name="username"
                type="username"
                placeholder={t("usertext")}
                autoComplete="username"
                required
                className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
              />
              <button className="items-center">
                <img
                  className="h-auto w-auto"
                  src="/aiicon.svg"
                  alt="image description"
                />
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="gmail"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("gmail")}
            </label>
            <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
              <input
                id="gmail"
                name="gmail"
                type="gmail"
                placeholder={t("gmtext")}
                autoComplete="gmail"
                required
                className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phonenumber"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("phonenum")}
            </label>
            <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
              <input
                id="phonenumber"
                name="phonenumber"
                type="phonenumber"
                placeholder={t("phntext")}
                autoComplete="phonenumber"
                required
                className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("password")}
            </label>
            <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
              <input
                id="password"
                name="password"
                type="password"
                placeholder={t("pwtext")}
                autoComplete="current-password"
                required
                className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
              />
              <button>
                <svg
                  className="w-[20px] h-[20px] text-stone-300 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t("confirm")}
            </label>
            <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="confirmpassword"
                placeholder={t("cftext")}
                autoComplete="confirmpassword"
                required
                className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
              />
              <button>
                <svg
                  className="w-[20px] h-[20px] text-stone-300 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="pt-2 text-justify text-sm text-gray-500">
            <div className="flex flex-wrap justify-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-6 h-6 bg-gray-100 border-gray-300 roundedfocus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="px-4">
                {t("consent1")}
                <Link
                  href="/termofuse"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  &nbsp;{t("termofuse")}
                </Link>
                &nbsp;{t("and")}
                <Link
                  href="/privacypolicy"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  &nbsp; {t("privacypolicy")}
                </Link>
                <div className="white-space">{t("consent2")}</div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-[24rem] h-12 px-6 py-3 bg-[#02016D] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight hover: bg-[]"
          >
            {t("signup")}
          </button>
        </form>
      </div>
    </>
  );
}

// Eye Icon
{
  /* <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
      <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
      <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
    </g>
  </svg> */
}

// Eye-Slash Icon
{
  /* <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
  </svg> */
}
