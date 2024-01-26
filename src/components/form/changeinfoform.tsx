"use client";

import { useScopedI18n } from "@/locales/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChangeInfoForm = () => {
  const t = useScopedI18n("signuppage");
  const router = useRouter();
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

  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const [checkedValues, setValue] = useState({});

  const handleChange = (event: { target: { value: any; checked: any } }) => {
    const { value, checked } = event.target;

    if (checked) {
      setValue([value]);
    }
  };

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

    // Check if the password is match the pattern
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

    if (checkedValues != "consent") {
      console.log("No consent");
      setFormError({
        ...inputError,
        consent: t("errconsent"),
      });
      setFormInput((prevState) => ({
        ...prevState,
        successMsg: "",
      }));
      return;
    }

    setFormError(inputError);
    setFormInput((prevState) => ({
      ...prevState,
      successMsg: t("successmsg"),
    }));
    onSubmit();
  };

  const onSubmit = async () => {
    // const res = await fetch("api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     UserName: formInput.username,
    //     UserEmail: formInput.email,
    //     UserPhone: formInput.phonenumber,
    //     UserPassword: formInput.password,
    //   }),
    // });
    // if (res.ok) {
    //   router.push("/signin");
    // } else {
    //   console.error("registration failed");
    // }
  };

  return (
    <div className="m-0 mx-auto w-full">
      <form onSubmit={validateFormInput}>
        <div className="flex justify-center pt-7 pb-5 items-center justify-center">
          <img
            className="w-[18rem] h-[18rem] rounded-full"
            src="/apichaya.jpg"
            alt="Rounded avatar"
          ></img>
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
              placeholder={t("usertext")}
              required
              className="w-[24rem] py-3 h-12 text-light focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
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
              placeholder={t("emtext")}
              required
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
              placeholder={t("phntext")}
              autoComplete="phonenumber"
              // required
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
          <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
            <input
              id="password"
              value={formInput.password}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="password"
              type="password"
              placeholder={t("pwtext")}
              required
              className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
            />
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
          <div className="w-[24rem] h-12 px-4 py-3 bg-white rounded-2xl border border-stone-300 justify-start items-center gap-4 inline-flex">
            <input
              id="confirmpassword"
              value={formInput.confirmpassword}
              onChange={({ target }) => {
                handleUserInput(target.name, target.value);
              }}
              name="confirmpassword"
              type="password"
              placeholder={t("cftext")}
              required
              className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
            />
          </div>
          <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
            {formError.confirmpassword}
          </p>
        </div>
        <div className="py-6">
          <button
            type="submit"
            className="w-[24rem] h-12 px-6 py-5 bg-[#02016D] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight hover: bg-[]"
          >
            Edit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeInfoForm;