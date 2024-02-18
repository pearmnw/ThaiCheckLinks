import SearchBarMain from "@/components/searchbar/searchbarmain";
import { getScopedI18n } from "../../locales/server";
import WebsiteTable from '@/components/homepage/homepagetable';
export default async function Home() {
  const t = await getScopedI18n("homepage");
  return (
    <>
      {/* TODO: Catagory selection, Search function, Details list component */}
      <div className="text-center text-[48px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#144EE3] via-[#02006D] to-[#144EE3]">
        {t("title")}
        <div className="flex justify-center text-center text-[24px] font-light leading-normal text-transparent bg-clip-text bg-[#011E52] px-[10rem] pb-6 ">
          {t("caption")}
        </div>
        <SearchBarMain />
        {/* Create a condition by icon Search for data / search for verification on component*/}
        <WebsiteTable />
      </div>
    </>
  );
}
