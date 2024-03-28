"use client";
import { useScopedI18n } from "@/locales/client";

const PrivacyPolicy = () => {
  const t = useScopedI18n("termofusepage");
  const p = useScopedI18n("privacypolicypage");
  return (
    <div className="p-4 md:p-5 space-y-4 text-justify">
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("title")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("privacytxt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("definition")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("deftxt")}
      </p>
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
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic1")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic1txt")}
      </p>
      <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ul className="list-disc pl-10">
          <li>{p("topic1txt2")}</li>
          <li>{p("topic1txt3")}</li>
          <li>{p("topic1txt4")}</li>
          <li>{p("topic1txt5")}</li>
        </ul>
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic2")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic2txt")}
      </p>
      <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ul className="list-disc pl-10">
          <li>{p("topic2txt2")}</li>
          <li>{p("topic2txt3")}</li>
          <li>{p("topic2txt4")}</li>
        </ul>
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic3")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic3txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic4")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic4txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic5")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic5txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic6")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic6txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic7")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic7txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic8")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic8txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic9")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic9txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic10")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic10txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic11")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic11txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic12")}
      </p>
      <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ul className="list-disc pl-10">
          <li>{p("topic12txt")}</li>
          {p("topic12txt2")}
          <li>{p("topic12txt3")}</li>
          {p("topic12txt4")}
          <li>{p("topic12txt5")}</li>
        </ul>
        {p("topic12txt6")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic13")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic13txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic14")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic14txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic15")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic15txt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic15txt2")}
      </p>
      <p className="indent-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <ul className="list-disc pl-10">
          <li>{p("topic15txt3")}</li>
          <li>{p("topic15txt4")}</li>
          <li>{p("topic15txt5")}</li>
        </ul>
        {p("topic15txt6")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic16")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic16txt")}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xl font-semibold">
        {p("topic17")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic17txt")}
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        &nbsp; &nbsp;{p("topic17txt2")}
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

export default PrivacyPolicy;
