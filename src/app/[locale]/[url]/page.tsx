// import DetailsBox from "@/components/detailsbox";
// import { getScopedI18n } from "@/locales/server";

// export default async function Details() {
//   const t = await getScopedI18n("detailpage");
//   // const url = "";
//   return (
//     <>
//         <DetailsBox />
//     </>
//   );
// }

// import DetailsBox from "@/components/detailsbox";
// import { getScopedI18n } from "@/locales/server";
// import { getServerSideProps } from "./[detail]"; // Import getServerSideProps from [detail].js

// export default async function Details() {
//   const t = await getScopedI18n("detailpage");

//   // Fetch data using getServerSideProps
//   const { props } = await getServerSideProps({ params: { detail: 'your-detail-value' } });

//   return (
//     <>
//       <DetailsBox websiteUrl={props.websiteUrl} />
//     </>
//   );
// }

// import DetailsBox from "@/components/detailsbox";
// import { getScopedI18n } from "@/locales/server";
// import { GetServerSideProps } from 'next'; // Import GetServerSideProps
// import { useRouter } from 'next/router';

// interface PageProps {
//   websiteUrl: string;
// }

// const Details: React.FC<PageProps> = ({ websiteUrl }) => {
//   const router = useRouter();
//   const t = getScopedI18n("detailpage");

//   return (
//     <>
//       <DetailsBox websiteUrl={websiteUrl} />
//     </>
//   );
// };

// export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
//   const websiteUrl = context.params?.detail;
//   if (!websiteUrl || typeof websiteUrl !== 'string') {
//     return {
//       notFound: true,
//     };
//   }
//   return { props: { websiteUrl } };
// };

// import DetailsBox from "@/components/detailsbox";
// import { getScopedI18n } from "@/locales/server";
// import { useRouter } from 'next/router';

// export default async function Details() {
//   const t = await getScopedI18n("detailpage");
//   const router = useRouter();
//   const { url } = router.query;
//   console.log(url)

//   // Check if url is null before attempting to decode it
//   const websiteURL = url ? decodeURIComponent(url as string) : '';
//   console.log(websiteURL)

//   return (
//     <>
//       <DetailsBox websiteUrl={websiteURL} />
//     </>
//   );
// }

// import DetailsBox from "@/components/detailsbox";
// // import { getScopedI18n } from "@/locales/server";
// import { useRouter } from 'next/router';

// const Details = () => {
//   // const t = await getScopedI18n("detailpage");
//   const router = useRouter();
//   const { url } = router.query;
//   console.log(url)

//   // Check if url is null before attempting to decode it
//   const websiteURL = url ? decodeURIComponent(url as string) : '';
//   console.log(websiteURL)

//   return (

//       <DetailsBox websiteUrl={websiteURL} />

//   )
// }

// export default Details

// import DetailsBox from "@/components/detailsbox";

// export default function Details({
//   params,
// }: {
//   params: { websiteURL: string };
// }) {
//   const { websiteURL } = params;
//   const decodedWebsiteURL = decodeURIComponent(websiteURL);

//   console.log(websiteURL);

//   return <DetailsBox websiteUrl='https://www.bbc.com'/>;
// }

// import DetailsBox from "@/components/detailsbox";
// import { useRouter } from 'next/router';

// export default function Details() {
//   const router = useRouter();
//   const { query } = router;
//   const websiteURL = (query as { url?: string }).url || ''; // Access query parameter

//   // Ensure websiteURL is decoded
//   const decodedWebsiteURL = typeof websiteURL === 'string' ? decodeURIComponent(websiteURL) : '';

//   console.log(decodedWebsiteURL);

//   return <DetailsBox websiteUrl={decodedWebsiteURL} />;
// }

import DetailsBox from "@/components/detailsbox";

export default async function Details({ params }: any) {
  console.log(params.url);

  // Check if params.url is defined before attempting to decode it
  const websiteURL = params.url || "";
  const decodedWebsiteURL = websiteURL ? decodeURIComponent(websiteURL) : "";

  console.log(decodedWebsiteURL);
  return <DetailsBox websiteUrl={decodedWebsiteURL} />;
}
