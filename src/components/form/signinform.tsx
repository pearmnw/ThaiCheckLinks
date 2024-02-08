"use client";

import { useScopedI18n } from "@/locales/client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

const SignInForm = () => {
  const t = useScopedI18n("signinpage");
  const router = useRouter();

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // console.log(formInput);
    try {
      const signInData = await signIn("credentials", {
        username: formInput.username,
        password: formInput.password,
        redirect: false,
      });
      console.log(signInData);
      if (signInData?.ok) {
        router.refresh();
        router.push("/report");
        router.refresh();
      } else {
        console.log("SignIn Failed");
        // toast.error(signInData?.error);
      }
      // if (signInData?.error) {
      //   console.log(signInData.error);
      //   return;
      // } else {
      //   router.refresh();
      //   router.push("/report");
      //   router.refresh();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <input
            id="password"
            name="password"
            value={formInput.password}
            onChange={({ target }) => {
              handleUserInput(target.name, target.value);
            }}
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
  );
};
export default SignInForm;
