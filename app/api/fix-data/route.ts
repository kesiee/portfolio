import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

/** One-time route to fix URL-encoded Redis keys. Delete this file after running once. */
export async function GET() {
  const fixed: string[] = [];

  try {
    // Find all region hashes and fix city hashes
    const countries = await kv.hgetall<Record<string, number>>("visits:countries");
    if (!countries) return NextResponse.json({ fixed: [], message: "No data" });

    for (const country of Object.keys(countries)) {
      const regions = await kv.hgetall<Record<string, number>>(`visits:regions:${country}`);
      if (!regions) continue;

      for (const region of Object.keys(regions)) {
        const cityKey = `visits:cities:${country}:${region}`;
        const cities = await kv.hgetall<Record<string, number>>(cityKey);
        if (!cities) continue;

        for (const [city, count] of Object.entries(cities)) {
          let decoded: string;
          try {
            decoded = decodeURIComponent(city);
          } catch {
            continue;
          }

          if (decoded !== city) {
            // Move count from encoded key to decoded key
            await kv.hincrby(cityKey, decoded, count);
            await kv.hdel(cityKey, city);
            fixed.push(`${cityKey}: "${city}" → "${decoded}" (${count})`);
          }
        }
      }
    }

    return NextResponse.json({ fixed, message: "Done. Delete app/api/fix-data/route.ts now." });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
