import { NextResponse } from "next/server";

export async function GET() {
  const keys = ["AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET", "AUTH_GOOGLE_ID", "AUTH_GOOGLE_SECRET", "AUTH_SECRET", "NEXTAUTH_SECRET", "NEXTAUTH_URL"];
  const result: Record<string, { present: boolean; length: number; preview: string }> = {};
  for (const key of keys) {
    const val = process.env[key] || "";
    result[key] = { present: val.length > 0, length: val.length, preview: val.substring(0, 15) };
  }
  return NextResponse.json(result);
}
