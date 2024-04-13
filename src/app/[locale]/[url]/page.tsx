import DetailsBox from "@/components/detailsbox";
import React from "react";

export default async function Details({ params }: any) {
  console.log(params.url);

  // Check if params.url is defined before attempting to decode it
  const websiteURL = params.url || "";
  const decodedWebsiteURL = websiteURL ? decodeURIComponent(websiteURL) : "";

  console.log(decodedWebsiteURL);
  return <DetailsBox websiteUrl={decodedWebsiteURL} />;
}
