import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") || "overview";
  const country = searchParams.get("country");
  const region = searchParams.get("region");

  try {
    if (view === "overview") {
      const [total, unique, countries, pages] = await Promise.all([
        kv.get<number>("visits:total"),
        kv.get<number>("visits:unique"),
        kv.hgetall<Record<string, number>>("visits:countries"),
        kv.hgetall<Record<string, number>>("visits:pages"),
      ]);

      // Last 30 days
      const daily: Record<string, number> = {};
      const today = new Date();
      const keys: string[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        keys.push(d.toISOString().split("T")[0]);
      }

      const pipeline = kv.pipeline();
      keys.forEach((k) => pipeline.get(`visits:daily:${k}`));
      const results = await pipeline.exec();
      keys.forEach((k, i) => {
        daily[k] = (results[i] as number) || 0;
      });

      return NextResponse.json({
        total: total || 0,
        unique: unique || 0,
        countries: countries || {},
        pages: pages || {},
        daily,
      });
    }

    if (view === "regions" && country) {
      const regions =
        (await kv.hgetall<Record<string, number>>(
          `visits:regions:${country}`,
        )) || {};
      return NextResponse.json({ country, regions });
    }

    if (view === "cities" && country && region) {
      const cities =
        (await kv.hgetall<Record<string, number>>(
          `visits:cities:${country}:${region}`,
        )) || {};
      return NextResponse.json({ country, region, cities });
    }

    return NextResponse.json({ error: "Invalid view" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Analytics unavailable — KV not configured" },
      { status: 500 },
    );
  }
}
