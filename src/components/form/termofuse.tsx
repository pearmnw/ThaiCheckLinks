"use client";
import { useScopedI18n } from "@/locales/client";

const TermOfUse = () => {
  const t = useScopedI18n("termofusepage");
  return (
    <div className="p-4 md:p-5 text-justify space-y-4">
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-400">
        {t("generaltermtitle")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("generaltermtxt1")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("generaltermtxt2")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("generaltermtxt3")}
      </p>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-400">
        {t("license")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("licensetxt")}
      </p>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-400">
        {t("definition")}
      </h2>
      <h3 className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("deftxt1")}
      </h3>
      <p className="indent-5 list-disc text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ul className="list-disc pl-10">
          <li>{t("deftxt2")}</li>
          <li>{t("deftxt3")}</li>
          <li>{t("deftxt4")}</li>
          <li>{t("deftxt5")}</li>
          <li>{t("deftxt6")}</li>
          <li>{t("deftxt7")}</li>
          <li>{t("deftxt8")}</li>
          <li>{t("deftxt9")}</li>
          <li>{t("deftxt10")}</li>
          <li>{t("deftxt11")}</li>
          <li>{t("deftxt12")}</li>
        </ul>
      </p>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-400">
        {t("restrictions")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("restxt1")}
      </p>
      <p className="indent-5 list-disc text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ul className="list-disc pl-10">
          <li>{t("restxt2")}</li>
          <li>{t("restxt3")}</li>
          <li>{t("restxt4")}</li>
        </ul>
      </p>
      <p className="text-xl font-semibold text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("suggest")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("sugtxt1")}
      </p>
      <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
        {t("consent")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("contxt1")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("mod")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("modtxt1")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("update")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("updatetxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("third")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("thirdtxt1")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("link")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("linktxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("cookies")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("cookistxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("change")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("changetxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("termter")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("termtertxt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("termtertxt2")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("indem")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("indemtxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("nowan")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("nowantxt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("nowantxt2")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("limit")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("limittxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("sever")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("severtxt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("severtxt2")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("waiver")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("waivertxt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("waivertxt2")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("amend")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("amendtxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("entire")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("entiretxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("uptoteam")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("uptoteamtxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("intell")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("intelltxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("agreement")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("agreementtxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("notice")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("noticetxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("binding")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("bindingtxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("submiss")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("submisstxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("typo")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("typotxt")}
      </p>
      <p className=" leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("miscel")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("misceltxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("disclaimer")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("disclaimertxt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("disclaimertxt2")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {t("contact")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{t("contacttxt")}
        <ul className="list-disc pl-10">
          <li>{t("contacttxt2")}</li>
        </ul>
      </p>
    </div>
  );
};

export default TermOfUse;
