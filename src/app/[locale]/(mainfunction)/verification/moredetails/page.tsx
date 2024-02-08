import { getScopedI18n } from "../../../../../locales/server";
import SearchBarMain from "@/components/searchbar/searchbarmain";
import Moredetail from "@/components/moredetail/Moredetail";

export default async function verification() {
  const t = await getScopedI18n('verificationpage');
  // const url = 'https://www.google.com';
  // const url = 'br-icloud.com.br';

  return (
    <>
      <Moredetail />
    </>
  );
}
