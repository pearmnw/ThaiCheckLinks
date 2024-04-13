"use client";

import { useScopedI18n } from "@/locales/client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { generateUsername } from "unique-username-generator";
import Loader from "../loading/Loader";

const ChangeInfoForm = () => {
  const e = useScopedI18n("errormessage");
  const t = useScopedI18n("signuppage");
  const { data: session, status } = useSession();
  console.log(session?.user?.name);
  const router = useRouter();
  interface User {
    username: String;
    email: String;
    phonenumber: String | null;
    password: String;
  }
  // const router = useRouter();
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    successMsg: "",
  });

  const [formError, setFormError] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    errorMsg: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateFormInput = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Initialize an object to track input errors
    let inputError = {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmpassword: "",
      errorMsg: "",
      consent: "",
    };

    if (formInput.email) {
      const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

      // Check if email match the pattern
      if (!emailpattern.test(formInput.email)) {
        console.log("wrong email");
        setFormError({
          ...inputError,
          email: t("erremail"),
        });
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return;
      }
    }

    if (formInput.phonenumber) {
      // check if phone number is least than 10
      if (formInput.phonenumber.length < 10) {
        console.log("wrong phonenum");
        setFormError({
          ...inputError,
          phonenumber: t("errphone"),
        });
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return;
      }
    }

    // Check if the password is match the pattern
    if (formInput.password) {
      if (formInput.password.length < 8) {
        console.log("wrong pw1");
        setFormError({
          ...inputError,
          password: t("errpw1"),
        });
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return;
      }
      if (!/\d/.test(formInput.password)) {
        console.log("wrong pw2");
        setFormError({
          ...inputError,
          password: t("errpw2"),
        });
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return;
      }

      if (formInput.password !== formInput.confirmpassword) {
        // Check if password and confirmpassword is match
        console.log("wrong pw3");
        setFormError({
          ...inputError,
          confirmpassword: t("errconfirmpass"),
        });
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return;
      }
    }

    const updateuser = await onSubmit();
    if (updateuser) {
      setFormError(inputError);
      setFormInput((prevState) => ({
        ...prevState,
        successMsg: t("successmsg"),
      }));
      router.refresh();
      console.log(session?.user.email);
    } else {
      console.log("wrong pw3");
      setFormError({
        ...inputError,
        errorMsg: e("editerrinfo"),
      });
    }
  };

  const aiSetName = () => {
    const generatedUsername = generateUsername();
    setFormInput((prevState) => ({
      ...prevState,
      username: generatedUsername,
    }));
    console.log(generatedUsername);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("api/editprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CurrentUser: session?.user.name,
          UserName: formInput.username,
          UserEmail: formInput.email,
          UserPhone: formInput.phonenumber,
          UserPassword: formInput.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok && data) {
        setIsLoading(false);
        toast.success(data.message);
        // Fix: Redirect to signin page
        signOut({ redirect: false }); // Signout & Prevents automatic redirect
        router.push("/signin"); // Redirect to sign-in page
      } else {
        setIsLoading(false);
        console.log("Edit Failed");
        toast.error(data.message);
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return data;
      }
    } catch (error) {
      console.log(error);
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
        <div className="m-0 mx-auto w-full">
          <form onSubmit={validateFormInput}>
            <div className="flex justify-center pt-7 pb-5 items-center">
              <div className="relative w-[18rem] h-[18rem] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-[20rem] h-[20rem] text-gray-400 -left-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="pt-4">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                {t("username")}
              </label>
              <div className="m-0 py-0 w-[24rem] h-12 px-4 bg-white rounded-2xl border border-stone-300 justify-start items-center inline-flex">
                <input
                  id="username"
                  value={formInput.username}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                  name="username"
                  type="username"
                  placeholder={session?.user?.name ?? ""}
                  className="w-[24rem] py-3 h-12 text-light focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
                <button
                  onClick={(event) => {
                    event.preventDefault(); // This line prevents the default form submission
                    aiSetName();
                  }}
                  className="items-center"
                >
                  <img
                    className="h-auto w-auto"
                    src="/aiicon.svg"
                    alt="image description"
                  />
                </button>
              </div>
            </div>

            <div className="pt-3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {t("email")}
              </label>
              <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
                <input
                  id="email"
                  value={formInput.email}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                  name="email"
                  type="text"
                  placeholder={session?.user?.email ?? ""}
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.email}
              </p>
            </div>

            <div className="pt-3">
              <label
                htmlFor="phonenumber"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {t("phonenum")}
              </label>
              <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
                <input
                  id="phonenumber"
                  value={formInput.phonenumber}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                  name="phonenumber"
                  type="phonenumber"
                  placeholder={
                    session?.user?.userphone ?? ""
                      ? session?.user?.userphone ?? ""
                      : t("phntext")
                  }
                  autoComplete="phonenumber"
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.phonenumber}
              </p>
            </div>

            <div className="pt-3">
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
                  type={showPassword ? "text" : "password"}
                  placeholder={t("pwtext")}
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
                <button
                  className="absolute inset-y-0 right-0 px-4 text-gray-500 focus:outline-none"
                  onClick={(event) => {
                    event.preventDefault(); // This line prevents the default form submission
                    togglePasswordVisibility();
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
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.password}
              </p>
            </div>

            <div className="pt-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {t("confirm")}
              </label>
              <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex relative">
                <input
                  id="confirmpassword"
                  value={formInput.confirmpassword}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                  name="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("cftext")}
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
                <button
                  className="absolute inset-y-0 right-0 px-4 text-gray-500 focus:outline-none"
                  onClick={(event) => {
                    event.preventDefault(); // This line prevents the default form submission
                    toggleConfirmPasswordVisibility();
                  }}
                >
                  {showConfirmPassword ? (
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
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.confirmpassword}
              </p>
            </div>
            <p className="text-[12px] font-[500] mt-[2px] ml-[8px] text-green-500">
              {formInput.successMsg}
            </p>
            <div className="pt-4">
              <button
                type="submit"
                className="w-[24rem] h-12 px-6 py-5 bg-[#02016D] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight hover: bg-[]"
              >
                Edit Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeInfoForm;
