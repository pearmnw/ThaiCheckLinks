"use client";

import { useScopedI18n } from "@/locales/client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../loading/Loader";

const SignInForm = () => {
  const e = useScopedI18n("errormessage");
  const t = useScopedI18n("signinpage");
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    // setShowPassword(!showPassword);
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // console.log(formInput);
    try {
      setIsLoading(true);
      const signInData = await signIn("credentials", {
        username: formInput.username,
        password: formInput.password,
        redirect: false,
      });
      console.log(signInData);
      const prevpath = localStorage.getItem("prevpath");
      if (signInData?.ok) {
        setIsLoading(false);
        router.refresh();
        if (prevpath === "signup") {
          router.push("/report");
          localStorage.setItem("prevpath", "signin");
        } else {
          router.back();
        }
        router.refresh();
        toast.success(e("signinsuccess"));
      } else {
        setIsLoading(false);
        console.log("SignIn Failed");
        toast.error(signInData?.error!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const enterSubmit = async (event: any) => {
    event.preventDefault();
    if (formInput.username == "" || formInput.password == "") {
      toast.error(e("errnoinfosignin"));
    } else {
      handleSubmit(event);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-12">
          <Loader />
        </div>
      )}
      <div className={`${isLoading ? "opacity-20" : ""}`}>
        <div className="mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-3">
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
                value={formInput.username}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    enterSubmit(e);
                  }
                }}
                type="text"
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
              <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex relative">
                <input
                  id="password"
                  value={formInput.password}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                  name="password"
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("text2")}
                  required
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      enterSubmit(e);
                    }
                  }}
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
                <button
                  className="absolute inset-y-0 right-0 px-4 text-gray-500 focus:outline-none"
                  onClick={(event) => {
                    event.preventDefault(); // This line prevents the default form submission
                    togglePasswordVisibility();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      enterSubmit(e);
                    }
                  }}
                >
                  {showPassword ? (
                    <svg
                      className="h-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-[24rem] h-12 px-6 py-3 bg-[#02016D] hover:border-[#134BDE] hover:bg-[#134BDE] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight hover: bg-[]"
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
      </div>
    </>
  );
};
export default SignInForm;
