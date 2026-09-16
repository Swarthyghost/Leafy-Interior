import { createHash } from "crypto";
import { NextResponse } from "next/server";

// Signed uploads keep CLOUDINARY_API_SECRET server-only — it must never reach
// the browser, unlike an unsigned upload preset.
export async function POST() {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server." },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `timestamp=${timestamp}`;
  const signature = createHash("sha1").update(paramsToSign + apiSecret).digest("hex");

  return NextResponse.json({ timestamp, signature, apiKey, cloudName });
}
