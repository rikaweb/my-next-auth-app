import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { attachmentId } = req.query;

  if (!attachmentId || typeof attachmentId !== "string") {
    return res.status(400).json({ error: "Attachment ID is required" });
  }

  try {
    // Call the ASP.NET endpoint
    const response = await fetch(
      `https://test-x.cpacanada.ca/GenericHandlers/CPACHandler.ashx?AttachmentID=${attachmentId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the file");
    }

    // Set the response headers to prompt a download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="report.pdf"');

    // Stream the file to the client
    response.body.pipe(res);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
}
