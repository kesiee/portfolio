import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const path = request.nextUrl.pathname;

  // Don't track the analytics page itself
  if (path === "/analytics") return response;

  // Vercel sets these headers at the edge
  const country = request.headers.get("x-vercel-ip-country") || "Unknown";
  const region = request.headers.get("x-vercel-ip-country-region") || "Unknown";
  let city = request.headers.get("x-vercel-ip-city") || "Unknown";
  try { city = decodeURIComponent(city); } catch { /* keep raw value */ }
  const today = new Date().toISOString().split("T")[0];

  const isNewVisitor = !request.cookies.has("_vid");
  if (isNewVisitor) {
    response.cookies.set("_vid", crypto.randomUUID(), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  try {
    const pipeline = kv.pipeline();
    pipeline.incr("visits:total");
    pipeline.incr(`visits:daily:${today}`);
    pipeline.hincrby("visits:countries", country, 1);
    pipeline.hincrby(`visits:regions:${country}`, region, 1);
    pipeline.hincrby(`visits:cities:${country}:${region}`, city, 1);
    pipeline.hincrby("visits:pages", path, 1);
    if (isNewVisitor) {
      pipeline.incr("visits:unique");
    }
    await pipeline.exec();
  } catch {
    // KV not configured or unavailable — don't block the page
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico|.*\\..*).*)" ],
};
