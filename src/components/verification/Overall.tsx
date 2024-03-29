import { useScopedI18n } from "@/locales/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import ReportForm from "../reportpage/reportform";
import CircularProgressBar from "./overall/CircularProgressBar";
import RiskMeasurement from "./overall/RiskMeasurement";

const Overall = ({ url, metaWebsite, currentPercent, verifySuccess }: any) => {
  const t = useScopedI18n("verificationpage");
  const userInfo = useSession();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  if (userInfo.data?.user) {
    return (
      <section
        className="flex flex-col gap-3 justify-center items-start px-8 py-8 border-b-2 border-custom-black"
        id="myOverall"
      >
        <div className="flex flex-col justify-center items-start text-custom-black gap-5 w-full">
          <h2 className="text-3xl font-bold">{t("overall-title")}</h2>
          <h3 className="text-3xl font-medium text-custom-blue">
            {t("overall-subtitle")}
          </h3>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 w-full">
          {/* TODO: Calculate the Score */}
          <CircularProgressBar />
          <RiskMeasurement />
          {/* <Link href="/report"> */}
          <div id="modal-root">
            <button
              onClick={() => setShowModal(true)}
              className="bg-custom-black rounded-3xl text-white shadow-xl p-2 w-64 text-lg font-semibold hover:border-[#134BDE] hover:bg-[#134BDE]"
            >
              {t("report")}
            </button>
            <Modal
              isOpen={showModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              {/* Your form content goes here */}
              <div className="justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t("report")}
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
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
                    <ReportForm
                      url={url}
                      metaWebsite={metaWebsite}
                      currentPercent={currentPercent}
                      verifySuccess={verifySuccess}
                    />
                  </div>
                </div>
              </div>
            </Modal>
          </div>
          {/* </Link> */}
          <h5 className="text-gray-400 font-semibold text-lg">
            *{t("click-here")}
          </h5>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className="flex flex-col gap-3 justify-center items-start px-8 py-8 border-b-2 border-custom-black"
        id="myOverall"
      >
        <div className="flex flex-col justify-center items-start text-custom-black gap-5 w-full">
          <h2 className="text-3xl font-bold">{t("overall-title")}</h2>
          <h3 className="text-3xl font-medium text-custom-blue">
            {t("overall-subtitle")}
          </h3>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 w-full">
          {/* TODO: Calculate the Score */}
          <CircularProgressBar />
          <RiskMeasurement />
          <Link href="/report">
            <button className="bg-custom-black rounded-3xl text-white shadow-xl p-2 w-64 text-lg font-semibold">
              {t("report")}
            </button>
          </Link>
          <h5 className="text-gray-400 font-semibold text-lg">
            *{t("click-here")}
          </h5>
        </div>
      </section>
    );
  }
};

export default Overall;
