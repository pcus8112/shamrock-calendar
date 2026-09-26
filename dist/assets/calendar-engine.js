const LUNISOLAR_EPOCH_JD = 347997.5;
const SHAMROCK_EPOCH_CYCLE_YEAR = 1188;

const RANGE_START = Object.freeze({ year: -2573, month: 10, day: 31 });
const RANGE_END = Object.freeze({ year: 2427, month: 11, day: 20 });

const COMMON_MONTH_NAMES = Object.freeze([
  "Samhain", "Nollaig", "Eanáir", "Feabhra", "Márta", "Aibreán",
  "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair"
]);

const LEAP_MONTH_NAMES = Object.freeze([
  "Samhain", "Nollaig", "Eanáir", "Feabhra II", "Feabhra I", "Márta", "Aibreán",
  "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair"
]);

const FESTIVALS = Object.freeze([
  { key: "samhain", name: "Samhain", solarMonth: 11, solarDay: 1, lunarMonth: "Samhain" },
  { key: "imbolc", name: "Imbolc", solarMonth: 2, solarDay: 1, lunarMonth: leap => leap ? "Feabhra I" : "Feabhra" },
  { key: "bealtaine", name: "Bealtaine", solarMonth: 5, solarDay: 1, lunarMonth: "Bealtaine" },
  { key: "lunasa", name: "Lúnasa", solarMonth: 8, solarDay: 1, lunarMonth: "Lúnasa" }
]);

function floorMod(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function compareDates(a, b) {
  return Math.sign(a.year - b.year || a.month - b.month || a.day - b.day);
}

function isRevisedJulianLeapYear(year) {
  if (floorMod(year, 4) !== 0) return false;
  if (floorMod(year, 100) !== 0) return true;
  const remainder = floorMod(year, 900);
  return remainder === 200 || remainder === 600;
}

function revisedJulianMonthLength(year, month) {
  const lengths = [31, isRevisedJulianLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return lengths[month - 1] ?? 0;
}

function isValidRevisedJulianDate(year, month, day) {
  return Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day)
    && month >= 1 && month <= 12 && day >= 1 && day <= revisedJulianMonthLength(year, month);
}

function daysBeforeRevisedJulianYear(year) {
  const completedYears = year - 1;
  return 365 * completedYears
    + Math.floor(completedYears / 4)
    - Math.floor(completedYears / 100)
    + Math.floor((completedYears + 700) / 900)
    + Math.floor((completedYears + 300) / 900);
}

function revisedJulianToJd(year, month, day) {
  if (!isValidRevisedJulianDate(year, month, day)) throw new RangeError("Invalid Revised Julian date");
  let dayOfYear = day - 1;
  for (let currentMonth = 1; currentMonth < month; currentMonth += 1) {
    dayOfYear += revisedJulianMonthLength(year, currentMonth);
  }
  return 1721425.5 + daysBeforeRevisedJulianYear(year) + dayOfYear;
}

function jdToRevisedJulian(jd) {
  let year = Math.floor((jd - 1721425.5) / 365.242222) + 1;
  while (revisedJulianToJd(year + 1, 1, 1) <= jd) year += 1;
  while (revisedJulianToJd(year, 1, 1) > jd) year -= 1;
  let remainder = Math.floor(jd - revisedJulianToJd(year, 1, 1));
  let month = 1;
  while (remainder >= revisedJulianMonthLength(year, month)) {
    remainder -= revisedJulianMonthLength(year, month);
    month += 1;
  }
  return { year, month, day: remainder + 1 };
}

function isCycleLeapYear(year) {
  return floorMod(7 * year + 1, 19) < 7;
}

function firstNewYearDelay(year) {
  const elapsedMonths = Math.floor((235 * year - 234) / 19);
  const parts = 12084 + 13753 * elapsedMonths;
  let day = elapsedMonths * 29 + Math.floor(parts / 25920);
  if (floorMod(3 * (day + 1), 7) < 3) day += 1;
  return day;
}

function secondNewYearDelay(year) {
  const previous = firstNewYearDelay(year - 1);
  const present = firstNewYearDelay(year);
  const next = firstNewYearDelay(year + 1);
  if (next - present === 356) return 2;
  if (present - previous === 382) return 1;
  return 0;
}

function cycleNewYearJd(year) {
  return LUNISOLAR_EPOCH_JD + firstNewYearDelay(year) + secondNewYearDelay(year);
}

function cycleYearDays(year) {
  return cycleNewYearJd(year + 1) - cycleNewYearJd(year);
}

function hasLongFinalMonth(year) {
  return cycleYearDays(year) % 10 === 5;
}

function hasShortFirstMonth(year) {
  return cycleYearDays(year) % 10 === 3;
}

function cycleMonthDays(year, month) {
  if ([2, 4, 6, 10, 13].includes(month)) return 29;
  if (month === 8) return hasLongFinalMonth(year) ? 30 : 29;
  if (month === 9) return hasShortFirstMonth(year) ? 29 : 30;
  if (month === 12 && !isCycleLeapYear(year)) return 29;
  return 30;
}

function cycleDateToJd(year, month, day) {
  let jd = cycleNewYearJd(year);
  if (month < 7) {
    for (let cursor = 7; cursor <= (isCycleLeapYear(year) ? 13 : 12); cursor += 1) {
      jd += cycleMonthDays(year, cursor);
    }
    for (let cursor = 1; cursor < month; cursor += 1) jd += cycleMonthDays(year, cursor);
  } else {
    for (let cursor = 7; cursor < month; cursor += 1) jd += cycleMonthDays(year, cursor);
  }
  return jd + day - 1;
}

function jdToCycleDate(jd) {
  let year = Math.floor((jd - LUNISOLAR_EPOCH_JD) / 365.2468) + 1;
  while (jd >= cycleNewYearJd(year + 1)) year += 1;
  while (jd < cycleNewYearJd(year)) year -= 1;
  const order = isCycleLeapYear(year)
    ? [7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6]
    : [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  let month = order[0];
  for (const candidate of order) {
    if (cycleDateToJd(year, candidate, 1) <= jd) month = candidate;
  }
  return {
    year,
    month,
    day: Math.floor(jd - cycleDateToJd(year, month, 1)) + 1
  };
}

function shamrockMonthsForYear(shamrockYear) {
  const baseCycleYear = SHAMROCK_EPOCH_CYCLE_YEAR + shamrockYear - 1;
  const yearDays = cycleYearDays(baseCycleYear);
  const leap = isCycleLeapYear(baseCycleYear);
  const firstMonthDays = yearDays % 10 === 3 ? 29 : 30;
  const finalMonthDays = yearDays % 10 === 5 ? 30 : 29;
  const lengths = leap
    ? [firstMonthDays, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, finalMonthDays]
    : [firstMonthDays, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, finalMonthDays];
  const names = leap ? LEAP_MONTH_NAMES : COMMON_MONTH_NAMES;
  const months = names.map((name, index) => ({
    number: index + 1,
    name,
    days: lengths[index],
    leapMonth: name === "Feabhra II",
    festivalMonth: name === "Feabhra" || name === "Feabhra I"
  }));
  const calculatedDays = months.reduce((sum, month) => sum + month.days, 0);
  if (calculatedDays !== yearDays) throw new RangeError("Shamrock year structure does not match its year type");
  return { months, leap, yearDays, baseCycleYear };
}

const CALENDAR_ANCHOR_JD = cycleDateToJd(SHAMROCK_EPOCH_CYCLE_YEAR, 9, 1);
const SHAMROCK_YEAR_STARTS = [null, CALENDAR_ANCHOR_JD];
for (let shamrockYear = 1; shamrockYear <= 5000; shamrockYear += 1) {
  SHAMROCK_YEAR_STARTS[shamrockYear + 1] = SHAMROCK_YEAR_STARTS[shamrockYear]
    + shamrockMonthsForYear(shamrockYear).yearDays;
}

function shamrockYearStartJd(shamrockYear) {
  if (!Number.isInteger(shamrockYear) || shamrockYear < 1 || shamrockYear > 5001) {
    throw new RangeError("Shamrock year is outside the supported range");
  }
  return SHAMROCK_YEAR_STARTS[shamrockYear];
}

function shamrockYearEndJd(shamrockYear) {
  if (!Number.isInteger(shamrockYear) || shamrockYear < 1 || shamrockYear > 5000) {
    throw new RangeError("Shamrock year is outside the supported range");
  }
  return shamrockYearStartJd(shamrockYear + 1) - 1;
}

function shamrockDateToJd(shamrockYear, monthName, day = 1) {
  const structure = shamrockMonthsForYear(shamrockYear);
  const monthIndex = structure.months.findIndex(month => month.name === monthName);
  if (monthIndex < 0) throw new RangeError("Unknown Shamrock month");
  const month = structure.months[monthIndex];
  if (!Number.isInteger(day) || day < 1 || day > month.days) throw new RangeError("Invalid Shamrock day");
  const elapsedDays = structure.months.slice(0, monthIndex).reduce((sum, entry) => sum + entry.days, 0);
  return shamrockYearStartJd(shamrockYear) + elapsedDays + day - 1;
}

function jdToShamrockDate(jd) {
  if (jd < SHAMROCK_YEAR_STARTS[1] || jd >= SHAMROCK_YEAR_STARTS[5001]) {
    throw new RangeError("Date is outside the supported Shamrock era");
  }
  let low = 1;
  let high = 5000;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (jd < SHAMROCK_YEAR_STARTS[middle]) high = middle - 1;
    else if (jd >= SHAMROCK_YEAR_STARTS[middle + 1]) low = middle + 1;
    else {
      const structure = shamrockMonthsForYear(middle);
      let remaining = Math.floor(jd - SHAMROCK_YEAR_STARTS[middle]);
      for (const month of structure.months) {
        if (remaining < month.days) {
          return {
            year: middle,
            month: month.number,
            monthName: month.name,
            day: remaining + 1,
            leap: structure.leap,
            leapMonth: month.leapMonth,
            festivalMonth: month.festivalMonth,
            yearDays: structure.yearDays,
            baseCycleYear: structure.baseCycleYear
          };
        }
        remaining -= month.days;
      }
    }
  }
  throw new RangeError("Unable to resolve Shamrock date");
}

function festivalForCivilJd(civilJd, likelyShamrockYear) {
  for (const shamrockYear of [likelyShamrockYear - 1, likelyShamrockYear, likelyShamrockYear + 1]) {
    if (shamrockYear < 1 || shamrockYear > 5000) continue;
    const structure = shamrockMonthsForYear(shamrockYear);
    for (const festival of FESTIVALS) {
      const lunarMonth = typeof festival.lunarMonth === "function"
        ? festival.lunarMonth(structure.leap)
        : festival.lunarMonth;
      const lunarJd = shamrockDateToJd(shamrockYear, lunarMonth, 1);
      const lunarCivilDate = jdToRevisedJulian(lunarJd);
      const solarJd = revisedJulianToJd(lunarCivilDate.year, festival.solarMonth, festival.solarDay);
      const firstMainDayJd = Math.min(lunarJd, solarJd);
      const lastMainDayJd = Math.max(lunarJd, solarJd);
      const festivalStartJd = firstMainDayJd - 1;
      if (civilJd >= festivalStartJd && civilJd <= lastMainDayJd) {
        const dayNumber = civilJd - festivalStartJd;
        const datesCoincide = lunarJd === solarJd;
        return {
          key: festival.key,
          name: festival.name,
          dayNumber,
          datesCoincide,
          emphasized: datesCoincide && (dayNumber === 0 || dayNumber === 1),
          shamrockYear,
          lunarJd,
          solarJd
        };
      }
    }
  }
  return null;
}

const RANGE_START_JD = revisedJulianToJd(RANGE_START.year, RANGE_START.month, RANGE_START.day);
const RANGE_END_JD = revisedJulianToJd(RANGE_END.year, RANGE_END.month, RANGE_END.day);
const CALENDAR_START_JD = shamrockYearStartJd(1);
const CALENDAR_END_JD = shamrockYearEndJd(5000);

function convertRevisedJulianDate({ year, month, day }) {
  if (!isValidRevisedJulianDate(year, month, day)) {
    return { ok: false, error: "invalid-date" };
  }
  const civilJd = revisedJulianToJd(year, month, day);
  if (civilJd < RANGE_START_JD || civilJd > RANGE_END_JD) {
    return { ok: false, error: "out-of-range" };
  }

  // The supported era begins at sunset on the civil date before its first full day.
  // Its last supported civil date remains valid until sunset.
  let calculationJd = civilJd;
  let boundary = null;
  if (civilJd === RANGE_START_JD) {
    calculationJd = CALENDAR_START_JD;
    boundary = "opening-sunset";
  } else if (civilJd === RANGE_END_JD) {
    calculationJd = CALENDAR_END_JD;
    boundary = "closing-sunset";
  }

  const shamrock = jdToShamrockDate(calculationJd);
  const festival = festivalForCivilJd(civilJd, shamrock.year);
  return {
    ok: true,
    input: { year, month, day },
    civilJd,
    calculationJd,
    boundary,
    shamrock,
    festival
  };
}

window.ShamrockCalendarEngine = Object.freeze({
  RANGE_START,
  RANGE_END,
  COMMON_MONTH_NAMES,
  LEAP_MONTH_NAMES,
  compareDates,
  isRevisedJulianLeapYear,
  revisedJulianMonthLength,
  isValidRevisedJulianDate,
  revisedJulianToJd,
  jdToRevisedJulian,
  isCycleLeapYear,
  cycleYearDays,
  cycleMonthDays,
  cycleDateToJd,
  jdToCycleDate,
  shamrockMonthsForYear,
  shamrockDateToJd,
  jdToShamrockDate,
  shamrockYearStartJd,
  shamrockYearEndJd,
  festivalForCivilJd,
  convertRevisedJulianDate
});
