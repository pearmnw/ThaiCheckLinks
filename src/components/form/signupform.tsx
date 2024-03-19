"use client";

import { useScopedI18n } from "@/locales/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { generateUsername } from "unique-username-generator";
import Loader from "../loading/Loader";

// Modal.setAppElement("#__next");

const SignUpForm = () => {
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

  // const handleChange = (event: { target: { value: any; checked: any } }) => {
  //   const { value, checked } = event.target;

  //   if (checked) {
  //     setValue([value]);
  //   }
  // };

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

    // Check if each field is filled in by the user
    if (!formInput.username) {
      hasErrors = true;
      inputError.username = t("errfield");
    }
    if (!formInput.email) {
      hasErrors = true;
      inputError.email = t("errfield");
    }
    if (!formInput.password) {
      hasErrors = true;
      inputError.password = t("errfield");
    }
    if (!formInput.confirmpassword) {
      hasErrors = true;
      inputError.confirmpassword = t("errfield");
    }

    if (formInput.email != "") {
      const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

      // Check if email match the pattern
      if (!emailpattern.test(formInput.email)) {
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
      // check if phone number is least than 10
      if (formInput.phonenumber.length < 10) {
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

    // setFormError(inputError);
    // setFormInput((prevState) => ({
    //   ...prevState,
    //   successMsg: t("successmsg"),
    // }));
    // onSubmit();

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
        <div id="__next" className="m-0 text-start mx-auto w-full">
          <form onSubmit={validateFormInput}>
            <div className="pt-4">
              <p className="flex">
                <label className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]">
                  {t("username")}&nbsp;
                </label>
                <label className="block text-sm font-semibold leading-6 text-[#787B93] mb-[-20px]">
                  {t("warntext")}
                </label>
              </p>
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
                  // required
                  className="w-[24rem] py-3 h-12 text-light focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
                <button onClick={aiSetName} className="items-center">
                  <img
                    className="h-auto w-auto"
                    src="/aiicon.svg"
                    alt="image description"
                  />
                </button>
              </div>
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.username}
              </p>
            </div>

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
                  // required
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
                className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]"
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
                  // required
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
                className="block text-sm font-semibold leading-6 text-gray-900 mb-[-20px]"
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
                  // required
                  className="w-[24rem] h-12 focus:outline-none bg-transparent justify-start items-center inline-flex sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.confirmpassword}
              </p>
            </div>

            <div className="pt-3 text-justify text-sm text-gray-500">
              <div className="flex flex-wrap justify-center">
                <input
                  title="consent"
                  id="link-checkbox"
                  type="checkbox"
                  value="consent"
                  onChange={handleChange}
                  className="w-6 h-6 bg-gray-100 border-gray-300 roundedfocus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="px-4">
                  {t("consent1")}
                  <button
                    onClick={openModalTOU}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    &nbsp;{t("termofuse")}
                  </button>
                  <Modal
                    isOpen={isModalOpenTOU}
                    onRequestClose={closeModalTOU}
                    contentLabel="Example Modal"
                  >
                    {/* Your form content goes here */}
                    <div className="justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {t("termofuse")}
                          </h3>
                          <button
                            type="button"
                            onClick={closeModalTOU}
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
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5 space-y-4">
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            General Terms
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            By accessing and placing an order with
                            ThaiScamLinks, you confirm that you are in agreement
                            with and bound by the terms of service contained in
                            the Terms & Conditions outlined below. These terms
                            apply to the entire website and any email or other
                            type of communication between you and ThaiScamLinks.
                            <br></br>
                            <br></br>
                            Under no circumstances shall the ThaiScamLinks team
                            be liable for any direct, indirect, special,
                            incidental, or consequential damages, including, but
                            not limited to, loss of data or profit, arising out
                            of the use, or the inability to use, the materials
                            on this site, even if ThaiScamLinks team or an
                            authorized representative has been advised of the
                            possibility of such damages. If your use of
                            materials from this site results in the need for
                            servicing, repair, or correction of equipment or
                            data, you assume any costs thereof.
                            <br></br>
                            <br></br>
                            ThaiScamLinks will not be responsible for any
                            outcome that may occur during the usage of our
                            resources. We reserve the right to change prices and
                            revise the resource usage policy at any moment.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            License
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`ThaiScamLinks. grants you a revocable, non-exclusive,
                        non-transferable, limited license to download, install,
                        and use the website strictly in accordance with the
                        terms of this Agreement. These Terms & Conditions are a
                        contract between you and ThaiScamLinks. ("we," “our,” or
                        "us") grants you a revocable, non-exclusive,
                        non-transferable, limited license to download, install,
                        and use the website strictly in accordance with the
                        terms of this Agreement.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Definitions and key terms
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            For this Terms & Conditions:
                          </p>
                          <p className="indent-5 list-disc text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <li>
                              Cookie: a small amount of data generated by a
                              website and saved by your web browser. It is used
                              to identify your browser, provide analytics, and
                              remember information about you such as your
                              language preference or login information.
                            </li>
                            <li>
                              Company: When this policy mentions “Company,”
                              “we,” “us,” or “our,” it refers to ThaiScamLinks
                              which is responsible for your information under
                              this Privacy Policy.
                            </li>
                            <li>
                              Country: where ThaiScamLinks or the
                              owners/founders of ThaiScamLinks are based, in
                              this case, Thailand.
                            </li>
                            <li>
                              Customer: refers to the company, organization, or
                              person that signs up to use the ThaiScamLinks
                              Service to manage the relationships with your
                              consumers or service users.
                            </li>
                            <li>
                              Device: any internet-connected device such as a
                              phone, tablet, computer, or any other device that
                              can be used to visit ThaiScamLinks and use the
                              services.
                            </li>
                            <li>
                              IP address: Every device connected to the Internet
                              is assigned a number known as an Internet protocol
                              (IP) address. These numbers are usually assigned
                              in geographic blocks. An IP address can often be
                              used to identify the location from which a device
                              is connecting to the Internet.
                            </li>
                            <li>
                              Personal Data: any information that directly,
                              indirectly, or in connection with other
                              information — including a personal identification
                              number — allows for the identification or
                              identifiability of a natural person.
                            </li>
                            <li>
                              Service: refers to the service provided by
                              ThaiScamLinks as described in the relative terms
                              (if available) and on this platform.
                            </li>
                            <li>
                              Third-party service: refers to advertisers,
                              contest sponsors, promotional and marketing
                              partners, and others who provide our content or
                              whose products or services we think may interest
                              you.
                            </li>
                            <li>
                              Website: ThaiScamLinks’s site, which can be
                              accessed via this URL: www.thaiscamlinks.com.
                            </li>
                            <li>
                              You: a person or entity that is registered with
                              ThaiScamLinks to use the Services.
                            </li>
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Restrictions
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            You agree not to, and you will not permit others to;
                          </p>
                          <p className="indent-5 list-disc text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <li>
                              License, sell, rent, lease, assign, distribute,
                              transmit, host, outsource, disclose, or otherwise
                              commercially exploit the service or make the
                              platform available to any third party.
                            </li>
                            <li>
                              Modify, make derivative works of, disassemble,
                              decrypt, reverse compile, or reverse engineer any
                              part of the service.
                            </li>
                            <li>
                              Modify, make derivative works of, disassemble,
                              decrypt, reverse compile, or reverse engineer any
                              part of the service.
                            </li>
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Return and Refund Policy
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`Thanks for shopping with us. We appreciate the fact that
                        you like to buy the stuff we build. We also want to make
                        sure you have a rewarding experience while you're
                        exploring, evaluating, and purchasing our products.`}
                            <br></br>
                            <br></br>
                            {`As with any shopping experience, there are terms and
                        conditions that apply to transactions at our company.
                        We'll be as brief as our attorneys will allow. The main
                        thing to remember is that by placing an order or making
                        a purchase from us, you agree to the terms along with
                        our Privacy Policy. If, for any reason, You are not
                        completely satisfied with any good or service that we
                        provide, don't hesitate to contact us and we will
                        discuss any of the issues you are going through with our
                        product.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Your Suggestions
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`Any feedback, comments, ideas, improvements, or
                        suggestions (collectively, "Suggestions") provided by
                        you to us with respect to the service shall remain the
                        sole and exclusive property of us. We shall be free to
                        use, copy, modify, publish, or redistribute the
                        Suggestions for any purpose and in any way without any
                        credit or any compensation to you.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Your Consent
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`We've updated our Terms & Conditions to provide you with
                        complete transparency into what is being set when you
                        visit our site and how it's being used. By using our
                        service, registering an account, or making a purchase,
                        you hereby consent to our Terms & Conditions.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Modifications to Our Service
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            We reserve the right to modify, suspend, or
                            discontinue, temporarily or permanently, the service
                            or any service to which it connects, with or without
                            notice and without liability to you.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Updates to Our Service
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`We may from time to time provide enhancements or
                        improvements to the features/ functionality of the
                        service, which may include patches, bug fixes, updates,
                        upgrades, and other modifications ("Updates"). Updates
                        may modify or delete certain features and/or
                        functionalities of the service. You agree that we have
                        no obligation to (i) provide any Updates, or (ii)
                        continue to provide or enable any particular features
                        and/or functionalities of the service to you. You
                        further agree that all Updates will be (i) deemed to
                        constitute an integral part of the service, and (ii)
                        subject to the terms and conditions of this Agreement.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Third-Party Services
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`We may display, include, or make available third-party
                        content (including data, information, applications, and
                        other products and services) or provide links to
                        third-party websites or services ("Third-Party
                        Services"). You acknowledge and agree that we shall not
                        be responsible for any Third-Party Services, including
                        their accuracy, completeness, timeliness, validity,
                        copyright compliance, legality, decency, quality, or any
                        other aspect thereof. We do not assume and shall not
                        have any liability or responsibility to you or any other
                        person or entity for any Third-Party Services.
                        Third-party services and links thereto are provided
                        solely as a convenience to you and you access and use
                        them entirely at your own risk and subject to such third
                        parties’ terms and conditions.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Links to Other Websites
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`Our service may contain links to other websites that are
                        not operated by Us. If You click on a third-party link,
                        You will be directed to that third-party's site. We
                        strongly advise You to review the Terms & Conditions of
                        every site You visit. We have no control over and assume
                        no responsibility for the content, Terms & Conditions,
                        or practices of any third-party sites or services.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Cookies
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`We use "Cookies" to identify the areas of our website
                        that you have visited. A Cookie is a small piece of data
                        stored on your computer or mobile device by your web
                        browser. We use Cookies to enhance the performance and
                        functionality of our service but are non-essential to
                        their use. However, without these cookies, certain
                        functionality like videos may become unavailable or you
                        would be required to enter your login details every time
                        you visit our platform as we would not be able to
                        remember that you had logged in previously. Most web
                        browsers can be set to disable the use of Cookies.
                        However, if you disable Cookies, you may not be able to
                        access functionality on our website correctly or at all.
                        We never place Personally Identifiable Information in
                        Cookies.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Changes To Our Terms & Conditions
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            You acknowledge and agree that we may stop
                            (permanently or temporarily) providing the Service
                            (or any features within the Service) to you or to
                            users generally at our sole discretion, without
                            prior notice to you. You may stop using the Service
                            at any time. You do not need to specifically inform
                            us when you stop using the Service. You acknowledge
                            and agree that if we disable access to your account,
                            you may be prevented from accessing the Service,
                            your account details, or any files or other
                            materials which is contained in your account. If we
                            decide to change our Terms & Conditions, we will
                            post those changes on this page, and/or update the
                            Terms & Conditions modification date below.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Term and Termination
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`This Agreement shall remain in effect until terminated
                        by you or us. We may, in its sole discretion, at any
                        time and for any or no reason, suspend or terminate this
                        Agreement with or without prior notice. This Agreement
                        will terminate immediately, without prior notice from
                        us, in the event that you fail to comply with any
                        provision of this Agreement. You may also terminate this
                        Agreement by deleting the service and all copies thereof
                        from your computer. Upon termination of this Agreement,
                        you shall cease all use of the service and delete all
                        copies of the service from your computer. Termination of
                        this Agreement will not limit any of our rights or
                        remedies at law or in equity in case of breach by you
                        (during the term of this Agreement) of any of your
                        obligations under the present Agreement.`}
                            <br></br>
                            <br></br>
                            {`If you are a copyright owner or such owner's agent and
                        believe any material from us constitutes an infringement
                        on your copyright, please contact us setting forth the
                        following information: (a) a physical or electronic
                        signature of the copyright owner or a person authorized
                        to act on his behalf; (b) identification of the material
                        that is claimed to be infringing; (c) your contact
                        information, including your address, telephone number,
                        and an email; (d) a statement by you that you have a
                        good faith belief that use of the material is not
                        authorized by the copyright owners; and (e) the
                        statement that the information in the notification is
                        accurate, and, under penalty of perjury you are
                        authorized to act on behalf of the owner.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Indemnification
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            {`You agree to indemnify and hold us and our parents, subsidiaries, affiliates, officers, employees, agents, partners, and licensors (if any) harmless from any claim or demand, including reasonable attorneys' fees, due to or arising out of your: (a) use of the service; (b) violation of this Agreement or any law or regulation; or (c) violation of any right of a third party.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            No Warranties
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`The service is provided to you "AS IS" and "AS
                        AVAILABLE" and with all faults and defects without
                        warranty of any kind. To the maximum extent permitted
                        under applicable law, we, on our own behalf and on
                        behalf of our affiliates and our respective licensors
                        and service providers, expressly disclaims all
                        warranties, whether express, implied, statutory, or
                        otherwise, with respect to the service, including all
                        implied warranties of merchantability, fitness for a
                        particular purpose, title and non-infringement, and
                        warranties that may arise out of course of dealing,
                        course of performance, usage or trade practice. Without
                        limitation to the foregoing, we provide no warranty or
                        undertaking, and makes no representation of any kind
                        that the service will meet your requirements, achieve
                        any intended results, be compatible or work with any
                        other software, websites, systems, or services, operate
                        without interruption, meet any performance or
                        reliability standards or be error-free or that any
                        errors or defects can or will be corrected.`}
                            <br></br>
                            <br></br>
                            {`Without limiting the foregoing, neither we nor any
                        provider makes any representation or warranty of any
                        kind, express or implied: (i) as to the operation or
                        availability of the service, or the information,
                        content, and materials or products included thereon;
                        (ii) that the service will be uninterrupted or
                        error-free; (iii) as to the accuracy, reliability, or
                        currency of any information or content provided through
                        the service; or (iv) that the service, its servers, the
                        content, or e-mails sent from or on behalf of us are
                        free of viruses, scripts, trojan horses, worms, malware,
                        timebombs or other harmful components. Some
                        jurisdictions do not allow the exclusion of or
                        limitations on implied warranties or the limitations on
                        the applicable statutory rights of a consumer, so some
                        or all of the above exclusions and limitations may not
                        apply to you.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Limitation of Liability
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Notwithstanding any damages that you might incur,
                            the entire liability of us and any of our suppliers
                            under any provision of this Agreement and your
                            exclusive remedy for all of the foregoing shall be
                            limited to the amount actually paid by you for the
                            service. To the maximum extent permitted by
                            applicable law, in no event shall we or our
                            suppliers be liable for any special, incidental,
                            indirect, or consequential damages whatsoever
                            (including, but not limited to, damages for loss of
                            profits, for loss of data or other information, for
                            business interruption, for personal injury, for loss
                            of privacy arising out of or in any way related to
                            the use of or inability to use the service,
                            third-party software and/or third-party hardware
                            used with the service, or otherwise in connection
                            with any provision of this Agreement), even if we or
                            any supplier has been advised of the possibility of
                            such damages and even if the remedy fails of its
                            essential purpose. Some states/jurisdictions do not
                            allow the exclusion or limitation of incidental or
                            consequential damages, so the above limitation or
                            exclusion may not apply to you.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Severability
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            If any provision of this Agreement is held to be
                            unenforceable or invalid, such provision will be
                            changed and interpreted to accomplish the objectives
                            of such provision to the greatest extent possible
                            under applicable law and the remaining provisions
                            will continue in full force and effect.
                            <br></br>
                            <br></br>
                            This Agreement, together with the Privacy Policy and
                            any other legal notices published by us on the
                            Services, shall constitute the entire agreement
                            between you and us concerning the Services. If any
                            provision of this Agreement is deemed invalid by a
                            court of competent jurisdiction, the invalidity of
                            such provision shall not affect the validity of the
                            remaining provisions of this Agreement, which shall
                            remain in full force and effect. No waiver of any
                            term of this Agreement shall be deemed a further or
                            continuing waiver of such term or any other term,
                            and our failure to assert any right or provision
                            under this Agreement shall not constitute a waiver
                            of such right or provision. YOU AND US AGREE THAT
                            ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE
                            SERVICES MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE
                            CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF
                            ACTION IS PERMANENTLY BARRED.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Waiver
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            {`Except as provided herein, the failure to exercise a
                        right or to require the performance of an obligation
                        under this Agreement shall not effect a party's ability
                        to exercise such right or require such performance at
                        any time thereafter nor shall be the waiver of a breach
                        constitute waiver of any subsequent breach.`}
                            <br></br>
                            <br></br>
                            No failure to exercise, and no delay in exercising,
                            on the part of either party, any right or any power
                            under this Agreement shall operate as a waiver of
                            that right or power. Nor shall any single or partial
                            exercise of any right or power under this Agreement
                            preclude further exercise of that or any other right
                            granted herein. In the event of a conflict between
                            this Agreement and any applicable purchase or other
                            terms, the terms of this Agreement shall govern.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Amendments to this Agreement
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            {`We reserve the right, at its sole discretion, to modify
                        or replace this Agreement at any time. If a revision is
                        material we will provide at least 30 days' notice prior
                        to any new terms taking effect. What constitutes a
                        material change will be determined at our sole
                        discretion. By continuing to access or use our service
                        after any revisions become effective, you agree to be
                        bound by the revised terms. If you do not agree to the
                        new terms, you are no longer authorized to use our
                        service.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Entire Agreement
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The Agreement constitutes the entire agreement
                            between you and us regarding your use of the service
                            and supersedes all prior and contemporaneous written
                            or oral agreements between you and us. You may be
                            subject to additional terms and conditions that
                            apply when you use or purchase other services from
                            us, which we will provide to you at the time of such
                            use or purchase.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Updates to Our Terms
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            We may change our Service and policies, and we may
                            need to make changes to these Terms so that they
                            accurately reflect our Service and policies. Unless
                            otherwise required by law, we will notify you (for
                            example, through our Service) before we make change
                            to these Terms and give you an opportunity to review
                            them before they go into effect. Then, if you
                            continue to use the Service, you will be bound by
                            the updated Terms. If you do not want to agree to
                            these or any updated Terms, you can delete your
                            account.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Intellectual Property
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Our platform and its entire contents, features, and
                            functionality (including but not limited to all
                            information, software, text, displays, images, video
                            and audio, and the design, selection, and
                            arrangement thereof), are owned by us, its licensors
                            or other providers of such material and are
                            protected by Thailand and international copyright,
                            trademark, patent, trade secret and other
                            intellectual property or proprietary rights laws.
                            The material may not be copied, modified,
                            reproduced, downloaded, or distributed in any way,
                            in whole or in part, without the express prior
                            written permission of us, unless and except as is
                            expressly provided in these Terms & Conditions. Any
                            unauthorized use of the material is prohibited.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Agreement to Arbitrate
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`This section applies to any dispute EXCEPT IT DOESN'T
                        INCLUDE A DISPUTE RELATING TO CLAIMS FOR INJUNCTIVE OR
                        EQUITABLE RELIEF REGARDING THE ENFORCEMENT OR VALIDITY
                        OF YOUR OR’s INTELLECTUAL PROPERTY RIGHTS. The term
                        “dispute” means any dispute, action, or other
                        controversy between you and us concerning the Services
                        or this agreement, whether in contract, warranty, tort,
                        statute, regulation, ordinance, or any other legal or
                        equitable basis. “Dispute” will be given the broadest
                        possible meaning allowable under law.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Notice of Dispute
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`In the event of a dispute, you or us must give the other
                        a Notice of Dispute, which is a written statement that
                        sets forth the name, address, and contact information of
                        the party giving it, the facts giving rise to the
                        dispute, and the relief requested. You must send any
                        Notice of Dispute via email to: . We will send any
                        Notice of Dispute to you by mail to your address if we
                        have it, or otherwise to your email address. You and us
                        will attempt to resolve any dispute through informal
                        negotiation within sixty (60) days from the date the
                        Notice of Dispute is sent. After sixty (60) days, you or
                        us may commence arbitration.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Binding Arbitration
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`If you and us don’t resolve any dispute by informal
                        negotiation, any other effort to resolve the dispute
                        will be conducted exclusively by binding arbitration as
                        described in this section. You are giving up the right
                        to litigate (or participate in as a party or class
                        member) all disputes in court before a judge or jury.
                        The dispute shall be settled by binding arbitration in
                        accordance with the commercial arbitration rules of the
                        American Arbitration Association. Either party may seek
                        any interim or preliminary injunctive relief from any
                        court of competent jurisdiction, as necessary to protect
                        the party's rights or property pending the completion of
                        arbitration. Any and all legal, accounting, and other
                        costs, fees, and expenses incurred by the prevailing
                        party shall be borne by the non-prevailing party.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Submissions and Privacy
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            In the event that you submit or post any ideas,
                            creative suggestions, designs, photographs,
                            information, advertisements, data, or proposals,
                            including ideas for new or improved products,
                            services, features, technologies, or promotions, you
                            expressly agree that such submissions will
                            automatically be treated as non-confidential and
                            non-proprietary and will become the sole property of
                            us without any compensation or credit to you
                            whatsoever. We and our affiliates shall have no
                            obligations concerning such submissions or posts and
                            may use the ideas contained in such submissions or
                            posts for any purposes in any medium in perpetuity,
                            including, but not limited to, developing,
                            manufacturing, and marketing products and services
                            using such ideas.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Promotions
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            We may, from time to time, include contests,
                            promotions, sweepstakes, or other activities
                            (“Promotions”) that require you to submit material
                            or information concerning yourself. Please note that
                            all Promotions may be governed by separate rules
                            that may contain certain eligibility requirements,
                            such as restrictions as to age and geographic
                            location. You are responsible to read all Promotions
                            rules to determine whether or not you are eligible
                            to participate. If you enter any Promotion, you
                            agree to abide by and comply with all Promotions
                            Rules. Additional terms and conditions may apply to
                            purchases of goods or services on or through the
                            Services, which terms and conditions are made a part
                            of this Agreement by this reference.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Typographical Errors
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            In the event a product and/or service is listed at
                            an incorrect price or with incorrect information due
                            to typographical error, we shall have the right to
                            refuse or cancel any orders placed for the product
                            and/ or service listed at the incorrect price. We
                            shall have the right to refuse or cancel any such
                            order whether or not the order has been confirmed
                            and your credit card charged. If your credit card
                            has already been charged for the purchase and your
                            order is canceled, we shall immediately issue a
                            credit to your credit card account or other payment
                            account in the amount of the charge.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Miscellaneous
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            If for any reason a court of competent jurisdiction
                            finds any provision or portion of these Terms &
                            Conditions to be unenforceable, the remainder of
                            these Terms & Conditions will continue in full force
                            and effect. Any waiver of any provision of these
                            Terms & Conditions will be effective only if in
                            writing and signed by an authorized representative
                            of us. We will be entitled to injunctive or other
                            equitable relief (without the obligations of posting
                            any bond or surety) in the event of any breach or
                            anticipatory breach by you. We operate and control
                            our Service from our offices in Thailand. The
                            Service is not intended for distribution to or use
                            by any person or entity in any jurisdiction or
                            country where such distribution or use would be
                            contrary to law or regulation. Accordingly, those
                            persons who choose to access our Service from other
                            locations do so on their own initiative and are
                            solely responsible for compliance with local laws,
                            if and to the extent local laws are applicable.
                            These Terms & Conditions (which include and
                            incorporate our Privacy Policy) contains the entire
                            understanding and supersedes all prior
                            understandings, between you and us concerning its
                            subject matter, and cannot be changed or modified by
                            you. The section headings used in this Agreement are
                            for convenience only and will not be given any legal
                            import.
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Disclaimer
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            We are not responsible for any content, code, or any
                            other imprecision. We do not provide warranties or
                            guarantees. In no event shall we be liable for any
                            special, direct, indirect, consequential, or
                            incidental damages or any damages whatsoever,
                            whether in an action of contract, negligence, or
                            other tort, arising out of or in connection with the
                            use of the Service or the contents of the Service.
                            We reserve the right to make additions, deletions,
                            or modifications to the contents of the Service at
                            any time without prior notice.
                            <br></br>
                            <br></br>
                            {`Our Service and its contents are provided "as is" and
                        "as available" without any warranty or representations
                        of any kind, whether express or implied. We are a
                        distributor and not a publisher of the content supplied
                        by third parties; as such, the developer exercises no
                        editorial control over such content and makes no
                        warranty or representation as to the accuracy,
                        reliability, or currency of any information, content,
                        service, or merchandise provided through or accessible
                        via our Service. Without limiting the foregoing, We
                        specifically disclaim all warranties and representations
                        in any content transmitted on or in connection with our
                        Service or on sites that may appear as links on our
                        Service, or in the products provided as a part of, or
                        otherwise in connection with, our Service, including
                        without limitation any warranties of merchantability,
                        fitness for a particular purpose or non-infringement of
                        third party rights. No oral advice or written
                        information given by us or any of its affiliates,
                        employees, officers, directors, agents, or the like will
                        create a warranty. Price and availability information is
                        subject to change without notice. Without limiting the
                        foregoing, we do not warrant that our Service will be
                        uninterrupted, uncorrupted, timely, or error-free.`}
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                            Contact Us
                          </p>
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {`Don't hesitate to contact us if you have any questions.`}
                            <li>Via Email: capcap241023@gmail.com</li>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Modal>
                  &nbsp;{t("and")}
                  <button
                    onClick={openModalPP}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    &nbsp;{t("privacypolicy")}
                  </button>
                  <Modal
                    isOpen={isModalOpenPP}
                    onRequestClose={closeModalPP}
                    contentLabel="Example Modal"
                  >
                    {/* Your form content goes here */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {t("privacypolicy")}
                        </h3>
                        <button
                          onClick={closeModalPP}
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
                      {/* <!-- Modal body --> */}
                      <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Privacy Policy
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {`ThaiScamLinks ("we," "our," or "us") is committed to
                      protecting your privacy. This Privacy Policy explains how
                      your personal information is collected, used, and
                      disclosed by ThaiScamLinks. This Privacy Policy applies to
                      our website, www.ThaiScamLinks.com, and its associated
                      subdomains (collectively, our "Service"). By accessing or
                      using our Service, you signify that you have read,
                      understood, and agree to our collection, storage, use, and
                      disclosure of your personal information as described in
                      this Privacy Policy and our Terms of Service.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Definitions and key terms
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          To help explain things as clearly as possible in this
                          Privacy Policy, every time any of these terms are
                          referenced, are strictly defined as:
                        </p>
                        <p className="indent-5 list-disc text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <li>
                            Cookie: a small amount of data generated by a
                            website and saved by your web browser. It is used to
                            identify your browser, provide analytics, and
                            remember information about you such as your language
                            preference or login information.
                          </li>
                          <li>
                            Company: When this policy mentions “Company,” “we,”
                            “us,” or “our,” it refers to ThaiScamLinks which is
                            responsible for your information under this Privacy
                            Policy.
                          </li>
                          <li>
                            Country: where ThaiScamLinks or the owners/founders
                            of ThaiScamLinks are based, in this case, Thailand.
                          </li>
                          <li>
                            Customer: refers to the company, organization, or
                            person that signs up to use the ThaiScamLinks
                            Service to manage the relationships with your
                            consumers or service users.
                          </li>
                          <li>
                            Device: any internet-connected device such as a
                            phone, tablet, computer, or any other device that
                            can be used to visit ThaiScamLinks and use the
                            services.
                          </li>
                          <li>
                            IP address: Every device connected to the Internet
                            is assigned a number known as an Internet protocol
                            (IP) address. These numbers are usually assigned in
                            geographic blocks. An IP address can often be used
                            to identify the location from which a device is
                            connecting to the Internet.
                          </li>
                          <li>
                            Personnel: refers to those individuals who are
                            employed by ThaiScamLinks or are under contract to
                            perform a service on behalf of one of the parties.
                          </li>
                          <li>
                            Personal Data: any information that directly,
                            indirectly, or in connection with other information
                            — including a personal identification number —
                            allows for the identification or identifiability of
                            a natural person.
                          </li>
                          <li>
                            Service: refers to the service provided by
                            ThaiScamLinks as described in the relative terms (if
                            available) and on this platform.
                          </li>
                          <li>
                            Third-party service: refers to advertisers, contest
                            sponsors, promotional and marketing partners, and
                            others who provide our content or whose products or
                            services we think may interest you.
                          </li>
                          <li>
                            Website: ThaiScamLinks’s site, which can be accessed
                            via this URL: www.ThaiScamLinks.com.
                          </li>
                          <li>
                            You: a person or entity that is registered with
                            ThaiScamLinks to use the Services.
                          </li>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          What Information Do We Collect?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          We collect information from you when you visit our
                          service, register, place an order, subscribe to our
                          newsletter, respond to a survey, or fill out a form.
                        </p>
                        <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <li>Name / Username</li>
                          <li>Phone Numbers</li>
                          <li>Email Addresses</li>
                          <li>Password</li>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          How Do We Use The Information We Collect?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          Any of the information we collect from you may be used
                          in one of the following ways:
                        </p>
                        <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <li>
                            To personalize your experience (your information
                            helps us to better respond to your individual needs)
                          </li>
                          <li>
                            To improve our service (we continually strive to
                            improve our service offerings based on the
                            information and feedback we receive from you)
                          </li>
                          <li>
                            To improve customer service (your information helps
                            us to more effectively respond to your customer
                            service requests and support needs)
                          </li>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Could my information be transferred to other
                          countries?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          We are incorporated in Thailand. Information collected
                          via our website, through direct interactions with you,
                          or from the use of our help services may be
                          transferred from time to time to our offices or
                          personnel, or to third parties, located throughout the
                          world, and may be viewed and hosted anywhere in the
                          world, including countries that may not have laws of
                          general applicability regulating the use and transfer
                          of such data. To the fullest extent allowed by
                          applicable law, by using any of the above, you
                          voluntarily consent to the trans-border transfer and
                          hosting of such information.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Is the information collected through our service
                          secure?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          We take precautions to protect the security of your
                          information. We have physical, electronic, and
                          managerial procedures to help safeguard, prevent
                          unauthorized access, maintain data security, and
                          correctly use your information. However, neither
                          people nor security systems are foolproof, including
                          encryption systems. In addition, people can commit
                          intentional crimes, make mistakes, or fail to follow
                          policies. Therefore, while we use reasonable efforts
                          to protect your personal information, we cannot
                          guarantee its absolute security. If applicable law
                          imposes any non-disclaimable duty to protect your
                          personal information, you agree that intentional
                          misconduct will be the standard used to measure our
                          compliance with that duty.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Can I update or correct my information?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          Of course! You can be able to update your data via the
                          profile page.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          How Long Do We Keep Your Information?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {`We keep your information only so long as we need it to
                      provide service to you and fulfill the purposes described
                      in this policy. This is also the case for anyone that we
                      share your information with and who carries out services
                      on our behalf. When we no longer need to use your
                      information and there is no need for us to keep it to
                      comply with our legal or regulatory obligations, we'll
                      either remove it from our systems or depersonalize it so
                      that we can't identify you.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Governing Law
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          The laws of Thailand, excluding its conflicts of law
                          rules, shall govern this Agreement and your use of our
                          service. Your use of our service may also be subject
                          to other local, state, national, or international
                          laws.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Your Consent
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          By using our service, registering an account, you
                          consent to this Privacy Policy.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Cookies
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {`We use "Cookies" to identify the areas of our website that
                      you have visited. A Cookie is a small piece of data stored
                      on your computer or mobile device by your web browser. We
                      use Cookies to personalize the Content that you see on our
                      website. Most web browsers can be set to disable the use
                      of Cookies. However, if you disable Cookies, you may not
                      be able to access functionality on our website correctly
                      or at all. We never place Personally Identifiable
                      Information in Cookies.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Kids’ Privacy
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          We do not address anyone under the age of 13. We do
                          not knowingly collect personally identifiable
                          information from anyone under the age of 13. If You
                          are a parent or guardian and You are aware that Your
                          child has provided Us with Personal Data, please
                          contact us. If We become aware that We have collected
                          Personal Data from anyone under the age of 13 without
                          verification of parental consent, We take steps to
                          remove that information from our servers.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Changes To Our Privacy Policy
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          If we decide to change our privacy policy, we will
                          post those changes on this page, and/or update the
                          Privacy Policy modification date below.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Tracking Technologies
                        </p>
                        <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <li>Cookies</li>
                          We use Cookies to enhance the performance and
                          functionality of our service but are non-essential to
                          their use. However, without these cookies, certain
                          functionality like videos may become unavailable or
                          you would be required to enter your login details
                          every time you visit our service as we would not be
                          able to remember that you had logged in previously.
                          <li>Local Storage</li>
                          Local Storage sometimes known as DOM storage, provides
                          web apps with methods and protocols for storing
                          client-side data. Web storage supports persistent data
                          storage, similar to cookies but with a greatly
                          enhanced capacity and no information stored in the
                          HTTP request header.
                          <li>Sessions</li>
                          {`uses "Sessions" to identify the areas of our website that
                      you have visited. A Session is a small piece of data
                      stored on your computer or mobile device by your web
                      browser.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Information about the Personal Data Protection Act
                          (PDPA) of Thailand
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          We may be collecting and using information from you if
                          you are in Thailand, and in this section of our
                          Privacy Policy, we are going to explain exactly how
                          and why this data is collected, and how we maintain
                          this data under protection from being replicated or
                          used in the wrong way.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          What is PDPA?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {`PDPA is a comprehensive privacy and data protection law in
                      Thailand that regulates how individuals' data is protected
                      by companies and enhances the control that individuals
                      have over their personal data.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          What is personal data?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          Personal data, as defined by PDPA, refers to any
                          information relating to an identifiable individual.
                          PDPA covers a broad spectrum of information that could
                          be used, either alone or in combination with other
                          pieces of information, to identify a person. Examples
                          include but are not limited to, name, contact details,
                          financial information, biometric data, IP addresses,
                          and more.
                          <br></br>
                          <br></br>
                          The Data Protection Principles outlined in PDPA
                          include requirements such as:
                        </p>
                        <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <li>
                            Personal data collected must be processed in a fair,
                            legal, and transparent way and should only be used
                            in a way that a person would reasonably expect.
                          </li>
                          <li>
                            Personal data should only be collected to fulfill a
                            specific purpose, and it should only be used for
                            that purpose. Organizations must specify why they
                            need the personal data when they collect it.
                          </li>
                          <li>
                            Personal data should be held no longer than
                            necessary to fulfill its purpose.
                          </li>
                          Individuals covered by PDPA have the right to access
                          their own personal data. They can also request a copy
                          of their data, and that their data be updated,
                          deleted, restricted, or transferred to another
                          organization.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Why is PDPA important?
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {`PDPA introduces new requirements regarding how companies
                      should protect individuals’ personal data that they
                      collect and process. It emphasizes compliance through
                      increased enforcement and imposes penalties for breaches.
                      Beyond these legal requirements, we believe that
                      respecting your data privacy is crucial. At [Your Company
                      Name], we have robust security and privacy practices in
                      place that go beyond the PDPA regulations.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          {`Individual Data Subject's Rights - Data Access, Portability, and Deletion`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          We are committed to helping our customers meet the
                          data subject rights requirements of PDPA.
                          ThaiScamLinks.com processes or stores all personal
                          data in fully vetted, PDPA-compliant vendors. We
                          retain all conversation and personal data for up to
                          2024, unless your account is deleted. In such cases,
                          we dispose of all data in accordance with our Terms of
                          Service and Privacy Policy, but we will not hold it
                          for longer than 2025.
                          <br></br>
                          <br></br>
                          {`We acknowledge the importance of providing individuals
                      with the ability to access, update, retrieve, and remove
                      personal data. We have designed our systems to be
                      self-service from the start, ensuring that you have access
                      to your data and your customer's data. Our customer
                      support team is here to assist you with any questions you
                      may have about working with the PDPA.`}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-[20px]">
                          Contact Us
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          {`Don't hesitate to contact us if you have any questions.`}
                          <li>Via Email: capcap241023@gmail.com</li>
                        </p>
                      </div>
                    </div>
                    <form>{/* Form fields and controls */}</form>
                  </Modal>
                  <div className="white-space">{t("consent2")}</div>
                </div>
              </div>
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-red-600">
                {formError.consent}
              </p>
              <p className="text-[12px] font-[500] mt-[6px] ml-[8px] text-green-500">
                {formInput.successMsg}
              </p>
            </div>
            <button
              type="submit"
              className="w-[24rem] h-12 px-6 py-3 bg-[#02016D] rounded-2xl justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium leading-tight hover: bg-[]"
            >
              {t("signup")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
