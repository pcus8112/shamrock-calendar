import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const engineSource = await readFile(new URL("../dist/assets/calendar-engine.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
new vm.Script(engineSource, { filename: "calendar-engine.js" }).runInContext(sandbox);
const {
  convertRevisedJulianDate,
  festivalForCivilJd,
  isRevisedJulianLeapYear,
  isValidRevisedJulianDate,
  revisedJulianToJd,
  jdToRevisedJulian,
  shamrockMonthsForYear,
  shamrockDateToJd,
  shamrockYearStartJd,
  shamrockYearEndJd,
  jdToShamrockDate
} = sandbox.window.ShamrockCalendarEngine;

const lower = convertRevisedJulianDate({ year: -2573, month: 10, day: 31 });
assert.equal(lower.ok, true);
assert.deepEqual(
  { year: lower.shamrock.year, month: lower.shamrock.monthName, day: lower.shamrock.day },
  { year: 1, month: "Samhain", day: 1 }
);
assert.equal(lower.boundary, "opening-sunset");
assert.equal(lower.festival.dayNumber, 0);
assert.equal(lower.festival.emphasized, true);

const lowerFullDay = convertRevisedJulianDate({ year: -2573, month: 11, day: 1 });
assert.equal(lowerFullDay.shamrock.year, 1);
assert.equal(lowerFullDay.shamrock.monthName, "Samhain");
assert.equal(lowerFullDay.shamrock.day, 1);
assert.equal(lowerFullDay.festival.dayNumber, 1);
assert.equal(lowerFullDay.festival.emphasized, true);

const upper = convertRevisedJulianDate({ year: 2427, month: 11, day: 20 });
assert.equal(upper.ok, true);
assert.deepEqual(
  { year: upper.shamrock.year, month: upper.shamrock.monthName, day: upper.shamrock.day },
  { year: 5000, month: "Deireadh Fómhair", day: 30 }
);
assert.equal(upper.boundary, "closing-sunset");
assert.equal(convertRevisedJulianDate({ year: -2573, month: 10, day: 30 }).error, "out-of-range");
assert.equal(convertRevisedJulianDate({ year: 2427, month: 11, day: 21 }).error, "out-of-range");

assert.equal(revisedJulianToJd(0, 12, 31) + 1, revisedJulianToJd(1, 1, 1));
assert.equal(JSON.stringify(jdToRevisedJulian(revisedJulianToJd(0, 12, 31))), JSON.stringify({ year: 0, month: 12, day: 31 }));
assert.equal(JSON.stringify(jdToRevisedJulian(revisedJulianToJd(1, 1, 1))), JSON.stringify({ year: 1, month: 1, day: 1 }));

assert.equal(isRevisedJulianLeapYear(2000), true);
assert.equal(isValidRevisedJulianDate(2000, 2, 29), true);
assert.equal(isValidRevisedJulianDate(2100, 2, 29), false);
assert.equal(convertRevisedJulianDate({ year: 2100, month: 2, day: 29 }).error, "invalid-date");

const yearTypeSamples = new Map();
for (let year = 1; year <= 5000 && yearTypeSamples.size < 6; year += 1) {
  const structure = shamrockMonthsForYear(year);
  yearTypeSamples.set(structure.yearDays, { year, structure });
}
for (const expectedType of [353, 354, 355, 383, 384, 385]) {
  assert.equal(yearTypeSamples.has(expectedType), true, `Missing sample for ${expectedType}-day year`);
  const { structure } = yearTypeSamples.get(expectedType);
  assert.equal(structure.months.reduce((sum, month) => sum + month.days, 0), expectedType);
  assert.equal(structure.months[0].name, "Samhain");
  assert.equal(structure.months[0].days, expectedType % 10 === 3 ? 29 : 30);
  assert.equal(structure.months.at(-1).name, "Deireadh Fómhair");
  assert.equal(structure.months.at(-1).days, expectedType % 10 === 5 ? 30 : 29);
}

for (let year = 1; year <= 5000; year += 1) {
  const structure = shamrockMonthsForYear(year);
  assert.ok([353, 354, 355, 383, 384, 385].includes(structure.yearDays));
  assert.equal(structure.months.reduce((sum, month) => sum + month.days, 0), structure.yearDays);
  assert.equal(shamrockYearEndJd(year) - shamrockYearStartJd(year) + 1, structure.yearDays);
  if (year < 5000) assert.equal(shamrockYearEndJd(year) + 1, shamrockYearStartJd(year + 1));
}

const leapSample = [...yearTypeSamples.values()].find(({ structure }) => structure.leap);
assert.ok(leapSample);
const feabhraII = leapSample.structure.months.find(month => month.name === "Feabhra II");
const feabhraI = leapSample.structure.months.find(month => month.name === "Feabhra I");
assert.deepEqual({ days: feabhraII.days, festivalMonth: feabhraII.festivalMonth }, { days: 30, festivalMonth: false });
assert.deepEqual({ days: feabhraI.days, festivalMonth: feabhraI.festivalMonth }, { days: 29, festivalMonth: true });
const feabhraIFirstJd = shamrockDateToJd(leapSample.year, "Feabhra I", 1);
const imbolc = festivalForCivilJd(feabhraIFirstJd, leapSample.year);
assert.equal(imbolc.name, "Imbolc");
assert.equal(imbolc.lunarJd, feabhraIFirstJd);
assert.notEqual(imbolc.lunarJd, shamrockDateToJd(leapSample.year, "Feabhra II", 1));

const normalSample = [...yearTypeSamples.values()].find(({ structure }) => !structure.leap);
const normalFeabhra = normalSample.structure.months.find(month => month.name === "Feabhra");
assert.deepEqual({ days: normalFeabhra.days, festivalMonth: normalFeabhra.festivalMonth }, { days: 29, festivalMonth: true });

for (const year of [1, 2, 19, 20, 4599, 4600, 4999]) {
  const lastDay = jdToShamrockDate(shamrockYearEndJd(year));
  const firstNext = jdToShamrockDate(shamrockYearStartJd(year + 1));
  assert.equal(lastDay.year, year);
  assert.equal(firstNext.year, year + 1);
  assert.equal(firstNext.monthName, "Samhain");
  assert.equal(firstNext.day, 1);
}

for (let year = 1; year <= 5000; year += 137) {
  const structure = shamrockMonthsForYear(year);
  for (const month of structure.months) {
    for (const day of [1, month.days]) {
      const jd = shamrockDateToJd(year, month.name, day);
      const resolved = jdToShamrockDate(jd);
      assert.deepEqual(
        { year: resolved.year, month: resolved.monthName, day: resolved.day },
        { year, month: month.name, day }
      );
    }
  }
}

const reference = convertRevisedJulianDate({ year: 2026, month: 11, day: 10 });
assert.deepEqual(
  { year: reference.shamrock.year, month: reference.shamrock.monthName, day: reference.shamrock.day, days: reference.shamrock.yearDays },
  { year: 4600, month: "Samhain", day: 1, days: 385 }
);

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../dist/assets/styles.css", import.meta.url), "utf8");
assert.equal(/type=["']date["']/i.test(html), false);
assert.equal(html.includes("🇺🇸") && html.includes("🇨🇦") && html.includes("🇩🇪"), true);
assert.equal(html.indexOf("🇺🇸") < html.indexOf("🇨🇦") && html.indexOf("🇨🇦") < html.indexOf("🇩🇪"), true);
assert.match(css, /@media \(max-width: 680px\)/);
assert.match(css, /@media \(max-width: 390px\)/);
assert.equal(/Hebr|Tischri|Kislew|Slonimski|235 months|235 Monate/i.test(html), false);

console.log("Shamrock Calendar: all tests passed.");
