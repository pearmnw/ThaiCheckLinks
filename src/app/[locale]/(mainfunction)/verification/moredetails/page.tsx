import { getScopedI18n } from "../../../../../locales/server";
import Moredetail from "@/components/moredetail/Moredetail";
import React from "react";

export default async function verification() {
  const t = await getScopedI18n("verificationpage");
  // const url = 'https://www.google.com';
  // const url = 'br-icloud.com.br';

  return (
    <>
      <Moredetail />
    </>
  );
}
