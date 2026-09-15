/**
 * Convert safe standalone numeric fractions (e.g. 3/4, -5/8, 12 / 25)
 * into $\frac{…}{…}$ so a KaTeX pass renders them as stacked fractions.
 *
 * Protected contexts (left as-is):
 *  - inline code spans (`...`)
 *  - URLs / file paths (contain :// or start with /)
 *  - date-like patterns (m/d, m/d/y, m/d/yyyy)
 *  - already-delimited math ($...$, $$...$$, \[...\], \(...\))
 *  - fractions that are already \frac{}{} LaTeX
 */
export default function normalizeFractions(text) {
  if (!text) return text;

  const placeholders = [];
  const ph = (s) => { const id = `\uE000${placeholders.length}\uE001`; placeholders.push(s); return id; };

  let result = text;

  // 1. Protect inline code spans
  result = result.replace(/`[^`]+`/g, m => ph(m));
  // 2. Protect existing math delimiters
  result = result.replace(/\$\$[\s\S]*?\$\$/g, m => ph(m));
  result = result.replace(/\$[^$]+?\$/g, m => ph(m));
  result = result.replace(/\\\[[\s\S]*?\\\]/g, m => ph(m));
  result = result.replace(/\\\([^)]+\\\)/g, m => ph(m));
  // 3. Protect URLs and file paths
  result = result.replace(/(?:https?:\/\/|www\.)\S+/gi, m => ph(m));
  // 4. Protect date-like patterns with year: m/d/yy, m/d/yyyy
  result = result.replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, m => ph(m));

  // Convert standalone numeric fractions: optional negative, integer numerator/denominator
  result = result.replace(
    /(?<![a-zA-Z\d.$/\\])(-?\d+)\s*\/\s*(\d+)(?![a-zA-Z\d.$/])/g,
    (_, num, den) => `$\\frac{${num}}{${den}}$`
  );

  // Restore protected tokens (use function replacer to avoid $ interpolation)
  placeholders.forEach((original, i) => {
    result = result.replace(`\uE000${i}\uE001`, () => original);
  });

  return result;
}
