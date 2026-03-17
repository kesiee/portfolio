/** Country-code → approximate internet-user gender split (male %).
 *  Sources: ITU, World Bank, Statista — rounded estimates.
 *  "other" is set to a small fixed % as a playful inclusive nod. */
export const genderByCountry: Record<string, number> = {
  US: 50, CA: 50, GB: 51, DE: 53, FR: 51, AU: 50, NZ: 50,
  IN: 67, PK: 72, BD: 70, NG: 58, KE: 55, ZA: 52, EG: 62,
  CN: 56, JP: 53, KR: 52, BR: 50, MX: 50, AR: 50, CL: 50,
  RU: 48, UA: 48, PL: 52, SE: 50, NL: 50, IT: 54, ES: 51,
  TR: 58, SA: 64, AE: 68, PH: 48, ID: 52, TH: 50, VN: 52,
};

const GLOBAL_MALE = 55;

export function computeGenderProbability(
  countries: Record<string, number>,
): { male: number; female: number; other: number } {
  let totalVisits = 0;
  let weightedMale = 0;

  for (const [code, count] of Object.entries(countries)) {
    const malePct = genderByCountry[code] ?? GLOBAL_MALE;
    weightedMale += malePct * count;
    totalVisits += count;
  }

  if (totalVisits === 0) {
    return { male: 50, female: 48, other: 2 };
  }

  const male = Math.round(weightedMale / totalVisits);
  const other = 2; // fixed playful estimate
  const female = 100 - male - other;

  return { male, female: Math.max(female, 0), other };
}

/** Resolve ISO country code to display name using the browser Intl API. */
export function countryName(code: string): string {
  if (code === "Unknown") return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
