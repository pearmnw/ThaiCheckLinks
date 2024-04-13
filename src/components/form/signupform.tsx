"use client";

import { useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { generateUsername } from "unique-username-generator";
import Loader from "../loading/Loader";
import PrivacyPolicy from "./privacypolicy";
import TermOfUse from "./termofuse";

// Modal.setAppElement("#__next");

const SignUpForm = () => {
  const t = useScopedI18n("signuppage");
  const u = useScopedI18n("termofusepage");
  const router = useRouter();
  const prevpath =
    typeof localStorage !== "undefined" &&
    localStorage.getItem("prevpath") !== "signin"
      ? localStorage.setItem("prevpath", "signup")
      : null;
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
    consent: "",
  });

  // Declare user input
  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Consent check state
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleChange = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedValues((prevValues) => [...prevValues, value]); // Add the value to the array of checked values
    } else {
      setCheckedValues((prevValues) =>
        prevValues.filter((val) => val !== value)
      ); // Remove the value from the array of checked values if unchecked
    }
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let hasErrors = false;

  const validateFormInput = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Initialize an object to track input errors
    let inputError = {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmpassword: "",
      consent: "",
    };

    if (formInput.email != "") {
      // Edit email pattern already
      const emailpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      // Check if email match the pattern
      if (
        !emailpattern.test(formInput.email) ||
        formInput.email.includes(".com.com") ||
        formInput.email.includes("@@") ||
        formInput.email.includes("..")
      ) {
        console.log("wrong email");
        hasErrors = true;
        inputError.email = t("erremail");
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
      }
    }

    if (formInput.phonenumber) {
      // check if phone number is least than 10 or more than 10
      if (
        formInput.phonenumber.length < 10 ||
        formInput.phonenumber.length > 10
      ) {
        hasErrors = true;
        console.log("wrong phonenum");
        inputError.phonenumber = t("errphone");
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
      }
    }

    // Check if the password is match the pattern
    if (formInput.password) {
      if (formInput.password.length < 8) {
        console.log("wrong pw1");
        hasErrors = true;
        inputError.password = t("errpw1");
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
      }

      if (!/\d/.test(formInput.password)) {
        console.log("wrong pw2");
        hasErrors = true;
        inputError.password = t("errpw2");
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
      }

      if (formInput.password !== formInput.confirmpassword) {
        // Check if password and confirmpassword is match
        console.log("wrong pw3");
        hasErrors = true;
        inputError.confirmpassword = t("errconfirmpass");
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
      }
    }

    if (!checkedValues || !checkedValues.includes("consent")) {
      console.log("No consent");
      hasErrors = true;
      inputError.consent = t("errconsent");
      setFormInput((prevState) => ({
        ...prevState,
        successMsg: "",
      }));
    }

    console.log("hasErrors:", hasErrors);

    if (!hasErrors) {
      setFormError((prevState) => ({
        ...prevState,
        username: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: "",
        consent: "",
      }));
      setFormInput((prevState) => ({
        ...prevState,
        successMsg: t("successmsg"),
      }));
      onSubmit();
    } else {
      setFormError(inputError);
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
      const res = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: formInput.username,
          UserEmail: formInput.email,
          UserPhone: formInput.phonenumber,
          UserPassword: formInput.password,
        }),
      });
      const data = await res.json();
      console.log(JSON.stringify(data));
      if (res.ok) {
        setIsLoading(false);
        toast.success(data.message);
        router.push("/signin");
      } else {
        setIsLoading(false);
        console.log("SignUp Failed");
        toast.error(data.message);
        setFormInput((prevState) => ({
          ...prevState,
          successMsg: "",
        }));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Model term of use & privacy policy
  const [isModalOpenTOU, setIsModalOpenTOU] = useState(false);
  // Function to open the modal
  const openModalTOU = () => {
    setIsModalOpenTOU(true);
  };

  // Function to close the modal
  const closeModalTOU = () => {
    setIsModalOpenTOU(false);
  };

  const [isModalOpenPP, setIsModalOpenPP] = useState(false);
  // Function to open the modal
  const openModalPP = () => {
    setIsModalOpenPP(true);
  };

  // Function to close the modal
  const closeModalPP = () => {
    setIsModalOpenPP(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-12">
          <Loader />
        </div>
      )}
      <div className={`${isLoading ? "opacity-20" : ""}`}>
        <div className="justify-center items-center h-screen m-0 text-start mx-auto w-full">
          <form onSubmit={validateFormInput}>
            {/* <div className=""> */}
            <div className="p-0 m-0">
              <label className="block text-sm font-semibold text-gray-900 pt-3 mb-[-20px]">
                {t("username")}&nbsp;
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
                  placeholder={t("usertext")}
                  required
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                  className="w-full py-3 h-12 text-light focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
                <button
                  onClick={(event) => {
                    event.preventDefault(); // This line prevents the default form submission
                    aiSetName();
                  }}
                  id="AI Generater"
                  name="AI Generater"
                  className="flex items-center"
                >
                  <div className="flex flex-col items-center h-auto w-10">
                    <img
                      className="h-auto w-auto items-center justify-items-center"
                      src="/aiicon.svg"
                      alt="image description"
                    />
                    <p className="text-[8px] font-semibold text-[#787B93]">
                      {t("AItxt2")}
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <span className="block text-start text-[12px] font-semibold text-[#787B93]">
              {t("warntext")}
            </span>
            {/* </div> */}

            <div className="pt-3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]"
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
                  placeholder={t("emtext")}
                  required
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-[12px] font-[500] ml-[8px] text-red-600">
                {formError.email}
              </p>
            </div>

            <div className="pt-3">
              <label
                htmlFor="phonenumber"
                className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]"
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
                  placeholder={t("phntext")}
                  autoComplete="phonenumber"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-[12px] font-[500] ml-[8px] text-red-600">
                {formError.phonenumber}
              </p>
            </div>

            <div className="pt-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]"
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
                  placeholder={t("pwtext")}
                  required
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
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
              <p className="text-[12px] font-[500] ml-[8px] text-red-600">
                {formError.password}
              </p>
            </div>

            <div className="pt-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]"
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
                  // type="password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("cftext")}
                  required
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                    }
                  }}
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
              <p className="text-[12px] font-[500] ml-[8px] text-red-600">
                {formError.confirmpassword}
              </p>
            </div>

            <div className="pt-3 pb-0 text-justify text-sm text-gray-500">
              <div className="flex flex-wrap justify-center items-start">
                <div className="pt-2">
                  <input
                    title="consent"
                    id="link-checkbox"
                    type="checkbox"
                    value="consent"
                    onChange={handleChange}
                    className="w-6 h-6 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="pl-2 pr-4 text-[13px]">
                  {t("consent1")}
                  <button
                    // onClick={openModalTOU}
                    onClick={(event) => {
                      event.preventDefault(); // This line prevents the default form submission
                      openModalTOU();
                    }}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    &nbsp;{u("title")}
                  </button>
                  <Modal
                    isOpen={isModalOpenTOU}
                    onRequestClose={closeModalTOU}
                    contentLabel="Example Modal"
                    shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
                    shouldCloseOnEsc={false} // Prevent closing on escape key press
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust overlay styles if needed
                      },
                      content: {
                        width: "80%", // Adjust width as needed
                        maxWidth: "90rem", // Set maximum width if desired
                        height: "auto", // Adjust height as needed
                        maxHeight: "80%", // Set maximum height if desired
                        margin: "auto", // Center the modal horizontally
                      },
                    }}
                  >
                    {/* Your form content goes here */}
                    <div className="justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {u("title")}
                          </h3>
                          <button
                            type="button"
                            // onClick={closeModalTOU}
                            onClick={(event) => {
                              event.preventDefault(); // This line prevents the default form submission
                              closeModalTOU();
                            }}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>
                        <TermOfUse />
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                            data-modal-hide="default-modal"
                            type="button"
                            onClick={(event) => {
                              event.preventDefault(); // This line prevents the default form submission
                              closeModalTOU();
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] text-lg px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            {u("accept")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                  &nbsp;{t("and")}
                  <button
                    // onClick={openModalPP}
                    onClick={(event) => {
                      event.preventDefault(); // This line prevents the default form submission
                      openModalPP();
                    }}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    &nbsp;{t("privacypolicy")}
                  </button>
                  <Modal
                    isOpen={isModalOpenPP}
                    onRequestClose={closeModalPP}
                    contentLabel="Example Modal"
                    shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
                    shouldCloseOnEsc={false} // Prevent closing on escape key press
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust overlay styles if needed
                      },
                      content: {
                        width: "80%", // Adjust width as needed
                        maxWidth: "90rem", // Set maximum width if desired
                        height: "auto", // Adjust height as needed
                        maxHeight: "80%", // Set maximum height if desired
                        margin: "auto", // Center the modal horizontally
                      },
                    }}
                  >
                    {/* Your form content goes here */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {t("privacypolicy")}
                        </h3>
                        <button
                          // onClick={closeModalPP}
                          onClick={(event) => {
                            event.preventDefault(); // This line prevents the default form submission
                            closeModalPP();
                          }}
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <PrivacyPolicy />
                      <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          onClick={(event) => {
                            event.preventDefault(); // This line prevents the default form submission
                            closeModalPP();
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] text-lg px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {u("accept")}
                        </button>
                      </div>
                    </div>
                    <form>{/* Form fields and controls */}</form>
                  </Modal>
                  <div className="white-space">{t("consent2")}</div>
                </div>
              </div>
              <p className="text-[12px] font-[500] ml-[8px] text-red-600">
                {formError.consent}
              </p>
              <p className="text-[12px] font-[500] ml-[8px] text-green-500">
                {formInput.successMsg}
              </p>
            </div>
            <div className="mt-[-15px] pb-1">
              <button
                type="submit"
                className="w-[24rem] h-12 px-6 bg-[#02016D] hover:border-[#134BDE] hover:bg-[#134BDE] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight"
              >
                {t("signup")}
              </button>
            </div>
          </form>
          <p className="pt-0 pb-0 text-center text-sm text-gray-500">
            {t("have")}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              &nbsp;{t("signin")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
