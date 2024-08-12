// pages/api/getSealData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getWebTrustLogoSrc } from "../utils/getWebTrustLogoDetails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sealid } = req.query;
  const referer = req.headers["x-requested-referer"] || "";

  console.log("Received sealid:", sealid);
  console.log("Received referer:", referer);

  if (!sealid) {
    console.log("No sealid provided.");
    return res.status(400).json({ error: "Sealid parameter is required." });
  }

  try {
    console.log(`Fetching data for sealid: ${sealid}`);
    const apiResponse = await fetch(
      `https://cms-test-cm.cpacanada.ca/sitecore/api/webtrustseal?sealid=${sealid}`
    );

    console.log(`API response status: ${apiResponse.status}`);

    if (apiResponse.status === 404) {
      console.log(`Seal ID ${sealid} does not exist.`);
      return res
        .status(404)
        .json({ error: `Seal ID does not exist. ${sealid}` });
    }

    if (!apiResponse.ok) {
      console.log(`Error response from API: ${apiResponse.statusText}`);
      return res
        .status(apiResponse.status)
        .json({ error: apiResponse.statusText });
    }

    const sealDataArray = await apiResponse.json();
    console.log(`Seal data retrieved: ${JSON.stringify(sealDataArray)}`);

    if (!Array.isArray(sealDataArray) || sealDataArray.length === 0) {
      console.log(`Seal data is not an array or is empty.`);
      return res.status(404).json({ error: "Seal ID does not exist." });
    }

    const sealData = sealDataArray[0];

    const sealStatus = sealData.SealStatus;
    const sealExpiryDate = new Date(sealData.SealExpiryDate);
    const currentDate = new Date();

    if (sealStatus === "Expired") {
      return res.status(200).json({
        error:
          "The term of this seal has been completed and has now expired. If you have any questions, please contact the site owner where this link is contained.",
      });
    }

    if (sealStatus === "Revoke") {
      return res.status(200).json({
        error:
          "The WebTrust Principles and Criteria have not been fully met and this seal has been revoked.",
      });
    }

    if (sealStatus === "Historical") {
      return res.status(200).json({
        error: "This is a historical report for a prior audit period.",
      });
    }

    const domains = sealData.SealDomains.split("\n");
    const refererDomain = referer
      ? new URL(referer).hostname.toLowerCase()
      : "";

    // Check if the referer contains "cpacanada.ca" or any domain in SealDomains
    const isValidDomain =
      domains.some((domain) =>
        refererDomain.includes(domain.trim().toLowerCase())
      ) || refererDomain.includes("cpacanada.ca");

    if (!isValidDomain) {
      return res.status(403).json({ error: "Referer domain is not allowed." });
    }

    // Get logo src based on seal type
    const logoSrc = getWebTrustLogoSrc(sealData.SealType);

    // Handle the attachment URL
    let attachmentURL = "";
    const sealGUID = sealData.SealGUID;
    if (sealGUID) {
      const currentURL = new URL(req.headers.referer || "http://localhost");
      attachmentURL = `/api/download?attachmentId=${sealGUID}`;
    }

    return res.status(200).json({
      sealData,
      sealType: sealData.SealType,
      logoSrc,
      attachmentURL,
      message: "Seal data retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching seal data:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the seal data." });
  }
}
