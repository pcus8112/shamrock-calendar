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
  { key: "samhain", name: "Samhain", emoji: "🎃", solarMonth: 11, solarDay: 1, lunarMonth: "Samhain" },
  { key: "imbolc", name: "Imbolc", emoji: "🕯️", solarMonth: 2, solarDay: 1, lunarMonth: "Feabhra" },
  { key: "bealtaine", name: "Bealtaine", emoji: "🔥", solarMonth: 5, solarDay: 1, lunarMonth: "Bealtaine" },
  { key: "lunasa", name: "Lúnasa", emoji: "🌾", solarMonth: 8, solarDay: 1, lunarMonth: "Lúnasa" }
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
  const leap = isCycleLeapYear(baseCycleYear);
  const names = leap ? LEAP_MONTH_NAMES : COMMON_MONTH_NAMES;
  const cycleMonths = leap
    ? [9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8]
    : [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
  const months = names.map((name, index) => {
    const cycleMonth = cycleMonths[index];
    const cycleYear = cycleMonth === 7 || cycleMonth === 8 ? baseCycleYear + 1 : baseCycleYear;
    return {
      number: index + 1,
      name,
      days: cycleMonthDays(cycleYear, cycleMonth),
      cycleYear,
      cycleMonth,
      leapMonth: name === "Feabhra II",
      festivalMonth: name === "Feabhra" || name === "Feabhra I"
    };
  });
  const yearDays = months.reduce((sum, month) => sum + month.days, 0);
  return { months, leap, yearDays, baseCycleYear };
}

const CALENDAR_ANCHOR_JD = cycleDateToJd(SHAMROCK_EPOCH_CYCLE_YEAR, 9, 1);

function shamrockYearStartJd(shamrockYear) {
  if (!Number.isInteger(shamrockYear) || shamrockYear < 1 || shamrockYear > 5001) {
    throw new RangeError("Shamrock year is outside the supported range");
  }
  return cycleDateToJd(SHAMROCK_EPOCH_CYCLE_YEAR + shamrockYear - 1, 9, 1);
}

function shamrockYearEndJd(shamrockYear) {
  if (!Number.isInteger(shamrockYear) || shamrockYear < 1 || shamrockYear > 5000) {
    throw new RangeError("Shamrock year is outside the supported range");
  }
  return shamrockYearStartJd(shamrockYear + 1) - 1;
}

function shamrockDateToJd(shamrockYear, monthName, day = 1) {
  const structure = shamrockMonthsForYear(shamrockYear);
  const normalizedName = monthName === "Feabhra" && structure.leap ? "Feabhra I" : monthName;
  const month = structure.months.find(entry => entry.name === normalizedName);
  if (!month) throw new RangeError("Unknown Shamrock month");
  if (!Number.isInteger(day) || day < 1 || day > month.days) throw new RangeError("Invalid Shamrock day");
  return cycleDateToJd(month.cycleYear, month.cycleMonth, day);
}

function jdToShamrockDate(jd) {
  if (jd < shamrockYearStartJd(1) || jd >= shamrockYearStartJd(5001)) {
    throw new RangeError("Date is outside the supported Shamrock era");
  }
  const cycle = jdToCycleDate(jd);
  const shamrockYear = cycle.month === 7 || cycle.month === 8
    ? cycle.year - SHAMROCK_EPOCH_CYCLE_YEAR
    : cycle.year - SHAMROCK_EPOCH_CYCLE_YEAR + 1;
  const structure = shamrockMonthsForYear(shamrockYear);
  const month = structure.months.find(entry => entry.cycleYear === cycle.year && entry.cycleMonth === cycle.month);
  if (!month) throw new RangeError("Unable to resolve Shamrock month");
  return {
    year: shamrockYear,
    month: month.number,
    monthName: month.name,
    day: cycle.day,
    monthDays: month.days,
    leap: structure.leap,
    leapMonth: month.leapMonth,
    festivalMonth: month.festivalMonth,
    yearDays: structure.yearDays,
    baseCycleYear: structure.baseCycleYear
  };
}

function weekdayForJd(jd) {
  return floorMod(Math.floor(jd + 1.5), 7);
}

function moonPhaseForDay(day) {
  if (day === 1 || day >= 29) return "new";
  if (day >= 14 && day <= 16) return "full";
  if (day >= 2 && day <= 13) return "waxing";
  return "waning";
}

function festivalForShamrockJd(shamrockJd, likelyShamrockYear) {
  for (const shamrockYear of [likelyShamrockYear - 1, likelyShamrockYear, likelyShamrockYear + 1]) {
    if (shamrockYear < 1 || shamrockYear > 5000) continue;
    const structure = shamrockMonthsForYear(shamrockYear);
    for (const festival of FESTIVALS) {
      const lunarMonth = festival.key === "imbolc" && structure.leap ? "Feabhra I" : festival.lunarMonth;
      const lunarJd = shamrockDateToJd(shamrockYear, lunarMonth, 1);
      const lunarCivilDate = jdToRevisedJulian(lunarJd);
      const solarJd = revisedJulianToJd(lunarCivilDate.year, festival.solarMonth, festival.solarDay);
      const firstMainDayJd = Math.min(lunarJd, solarJd);
      const lastMainDayJd = Math.max(lunarJd, solarJd);
      const festivalStartJd = firstMainDayJd - 1;
      if (shamrockJd >= festivalStartJd && shamrockJd <= lastMainDayJd) {
        const dayNumber = shamrockJd - festivalStartJd;
        const datesCoincide = lunarJd === solarJd;
        return {
          key: festival.key,
          name: festival.name,
          emoji: festival.emoji,
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

function festivalForCivilJd(civilJd, likelyShamrockYear) {
  return festivalForShamrockJd(civilJd, likelyShamrockYear);
}

const RANGE_START_JD = revisedJulianToJd(RANGE_START.year, RANGE_START.month, RANGE_START.day);
const RANGE_END_JD = revisedJulianToJd(RANGE_END.year, RANGE_END.month, RANGE_END.day);
const CALENDAR_START_JD = shamrockYearStartJd(1);
const CALENDAR_END_JD = shamrockYearEndJd(5000);

function periodForShamrockJd(shamrockJd) {
  if (shamrockJd < CALENDAR_START_JD || shamrockJd > CALENDAR_END_JD) return null;
  const shamrock = jdToShamrockDate(shamrockJd);
  return {
    shamrockJd,
    shamrock,
    weekday: weekdayForJd(shamrockJd),
    moonPhase: moonPhaseForDay(shamrock.day),
    festival: festivalForShamrockJd(shamrockJd, shamrock.year)
  };
}

function convertRevisedJulianDate({ year, month, day }) {
  if (!isValidRevisedJulianDate(year, month, day)) {
    return { ok: false, error: "invalid-date" };
  }
  const civilJd = revisedJulianToJd(year, month, day);
  if (civilJd < RANGE_START_JD || civilJd > RANGE_END_JD) {
    return { ok: false, error: "out-of-range" };
  }

  const beforeSunset = periodForShamrockJd(civilJd);
  const afterSunset = periodForShamrockJd(civilJd + 1);
  const primaryPeriod = beforeSunset || afterSunset;
  const boundary = beforeSunset ? (afterSunset ? null : "closing-sunset") : "opening-sunset";
  return {
    ok: true,
    input: { year, month, day },
    civilJd,
    calculationJd: primaryPeriod.shamrockJd,
    boundary,
    weekday: weekdayForJd(civilJd),
    beforeSunset,
    afterSunset,
    shamrock: primaryPeriod.shamrock,
    festival: primaryPeriod.festival
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
  weekdayForJd,
  moonPhaseForDay,
  periodForShamrockJd,
  festivalForShamrockJd,
  festivalForCivilJd,
  convertRevisedJulianDate
});
