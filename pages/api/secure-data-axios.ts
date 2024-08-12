import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.SECURE_API_KEY; // Use environment variable for sensitive data

  try {
    const response = await axios.get("https://reqres.in/api/users?page=2", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // The data is already parsed by axios, so no need for .json()
    const data = response.data;

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
