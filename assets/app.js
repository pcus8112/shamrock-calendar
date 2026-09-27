(() => {
const {
  RANGE_START,
  RANGE_END,
  convertRevisedJulianDate
} = window.ShamrockCalendarEngine;

const messages = {
  en: {
    "meta.title": "Shamrock Calendar — A joyful lunisolar calendar",
    "meta.description": "Convert a Revised Julian civil date into the modern lunisolar Shamrock Calendar.",
    "a11y.skip": "Skip to the calculator",
    "brand.product": "A Singer Shamrock calendar system",
    "lang.group": "Choose language",
    "lang.en": "English (United States)",
    "lang.fr": "French (Canada)",
    "lang.de": "German",
    "current.label": "Stonehenge reference · updated at 00:00 GMT",
    "hero.eyebrow": "A modern lunisolar calendar",
    "hero.titleA": "A new year",
    "hero.titleB": "under the moon.",
    "hero.lead": "Twelve Irish month names, a thirteenth month when needed, and Halloween as a joyful New Year.",
    "hero.spanCivil": "31 October 2574 BCE, evening — 20 November 2427 CE, evening",
    "hero.spanShamrock": "1 Samhain, Year 1 — 29 Deireadh Fómhair, Year 5000",
    "calc.kicker": "Calendar converter",
    "calc.title": "Find your Shamrock date",
    "calc.basis": "Revised Julian input",
    "calc.button": "Calculate",
    "calc.range": "Valid range: 31 October 2574 BCE, evening, to 20 November 2427 CE, evening.",
    "field.day": "Day",
    "field.month": "Month",
    "field.year": "Year",
    "field.era": "Era",
    "era.ce": "CE",
    "era.bce": "BCE",
    "result.label": "Your Shamrock date",
    "result.selected": "Selected date",
    "result.before": "Before sunset",
    "result.after": "After sunset",
    "result.untilSunset": "Until sunset",
    "result.fromSunset": "From sunset onward",
    "result.sunset": "The selected civil date has two Shamrock dates because the Shamrock day changes at sunset.",
    "result.opening": "The supported calendar begins at sunset on this date.",
    "result.closing": "The supported calendar ends at sunset on this date.",
    "phase.new": "New-moon phase",
    "phase.waxing": "Waxing moon",
    "phase.full": "Full-moon phase",
    "phase.waning": "Waning moon",
    "festival.day": "{name} festival day {day}",
    "festival.coincides": "Solar and lunar dates coincide",
    "error.required": "Enter a day and a positive year.",
    "error.invalid": "That date does not exist in the Revised Julian calendar.",
    "error.range": "That date is outside the supported range: 31 October 2574 BCE to 20 November 2427 CE.",
    "about.kicker": "The essentials",
    "about.title": "Moon rhythm. Solar footing.",
    "about.modernTitle": "Modern by design",
    "about.modernText": "Shamrock Calendar is a playful modern system, not a claimed reconstruction of an ancient Celtic calendar.",
    "about.newYearTitle": "Halloween is New Year",
    "about.newYearText": "The year begins on the evening of 31 October. Samhain, Imbolc, Bealtaine and Lúnasa are marked with 🍀 and their seasonal symbol.",
    "about.basisTitle": "A precise civil basis",
    "about.basisText": "The Revised Julian calendar stays about ten times closer to the tropical year than the Gregorian calendar. Before 1600 the two dates may differ here by roughly one or two days; from 1 March 1600 through this calculator’s range they agree.",
    "about.sunset": "No location is requested: sunset is the calendar principle, not an improvised local sunset calculation.",
    "footer.brand": "A brand of Pierre Christian Ulrich Singer · Entrepreneur individuel (EI)",
    "footer.product": "Shamrock Calendar · modern calendar system"
  },
  fr: {
    "meta.title": "Shamrock Calendar — Un calendrier luni-solaire joyeux",
    "meta.description": "Convertissez une date civile du calendrier julien révisé dans le Shamrock Calendar luni-solaire moderne.",
    "a11y.skip": "Aller au calculateur",
    "brand.product": "Un système calendaire Singer Shamrock",
    "lang.group": "Choisir la langue",
    "lang.en": "Anglais (États-Unis)",
    "lang.fr": "Français (Canada)",
    "lang.de": "Allemand",
    "current.label": "Repère de Stonehenge · mise à jour à 00 h 00 GMT",
    "hero.eyebrow": "Un calendrier luni-solaire moderne",
    "hero.titleA": "Une nouvelle année",
    "hero.titleB": "sous la lune.",
    "hero.lead": "Douze noms de mois irlandais, un treizième mois au besoin et l’Halloween comme joyeux Nouvel An.",
    "hero.spanCivil": "31 octobre 2574 av. J.-C., au soir — 20 novembre 2427 apr. J.-C., au soir",
    "hero.spanShamrock": "1 Samhain, année 1 — 29 Deireadh Fómhair, année 5000",
    "calc.kicker": "Convertisseur de calendrier",
    "calc.title": "Trouvez votre date Shamrock",
    "calc.basis": "Saisie julienne révisée",
    "calc.button": "Calculer",
    "calc.range": "Période valide : du soir du 31 octobre 2574 av. J.-C. au soir du 20 novembre 2427 apr. J.-C.",
    "field.day": "Jour",
    "field.month": "Mois",
    "field.year": "Année",
    "field.era": "Ère",
    "era.ce": "apr. J.-C.",
    "era.bce": "av. J.-C.",
    "result.label": "Votre date Shamrock",
    "result.selected": "Date choisie",
    "result.before": "Avant le coucher du soleil",
    "result.after": "Après le coucher du soleil",
    "result.untilSunset": "Jusqu’au coucher du soleil",
    "result.fromSunset": "À partir du coucher du soleil",
    "result.sunset": "La date civile choisie correspond à deux dates Shamrock, car le jour Shamrock change au coucher du soleil.",
    "result.opening": "La période prise en charge commence au coucher du soleil à cette date.",
    "result.closing": "La période prise en charge se termine au coucher du soleil à cette date.",
    "phase.new": "Phase de nouvelle lune",
    "phase.waxing": "Lune croissante",
    "phase.full": "Phase de pleine lune",
    "phase.waning": "Lune décroissante",
    "festival.day": "Jour {day} de la fête de {name}",
    "festival.coincides": "Les dates solaire et lunaire coïncident",
    "error.required": "Entrez un jour et une année positive.",
    "error.invalid": "Cette date n’existe pas dans le calendrier julien révisé.",
    "error.range": "Cette date est hors de la période prise en charge : du 31 octobre 2574 av. J.-C. au 20 novembre 2427 apr. J.-C.",
    "about.kicker": "L’essentiel",
    "about.title": "Rythme lunaire. Repère solaire.",
    "about.modernTitle": "Moderne par conception",
    "about.modernText": "Shamrock Calendar est un système moderne et ludique; il n’est pas présenté comme la reconstitution d’un ancien calendrier celtique.",
    "about.newYearTitle": "L’Halloween est le Nouvel An",
    "about.newYearText": "L’année commence le soir du 31 octobre. Samhain, Imbolc, Bealtaine et Lúnasa sont signalées par 🍀 et leur symbole saisonnier.",
    "about.basisTitle": "Une base civile précise",
    "about.basisText": "Le calendrier julien révisé reste environ dix fois plus près de l’année tropique que le calendrier grégorien. Avant 1600, les deux dates peuvent ici différer d’environ un ou deux jours; du 1er mars 1600 jusqu’à la fin de la période calculée, elles concordent.",
    "about.sunset": "Aucun lieu n’est demandé : le coucher du soleil est le principe du calendrier, pas un calcul local improvisé.",
    "footer.brand": "Une marque de Pierre Christian Ulrich Singer · Entrepreneur individuel (EI)",
    "footer.product": "Shamrock Calendar · système calendaire moderne"
  },
  de: {
    "meta.title": "Shamrock Calendar — Ein fröhlicher lunisolarer Kalender",
    "meta.description": "Ein neujulianisches Zivildatum in den modernen lunisolaren Shamrock Calendar umrechnen.",
    "a11y.skip": "Direkt zum Rechner",
    "brand.product": "Ein Kalendersystem von Singer Shamrock",
    "lang.group": "Sprache auswählen",
    "lang.en": "Englisch (USA)",
    "lang.fr": "Französisch (Kanada)",
    "lang.de": "Deutsch",
    "current.label": "Stonehenge-Referenz · Aktualisierung um 00:00 GMT",
    "hero.eyebrow": "Ein moderner lunisolarer Kalender",
    "hero.titleA": "Ein neues Jahr",
    "hero.titleB": "unter dem Mond.",
    "hero.lead": "Zwölf irische Monatsnamen, bei Bedarf ein dreizehnter Monat und Halloween als fröhliches Neujahr.",
    "hero.spanCivil": "31. Oktober 2574 v. Chr., abends — 20. November 2427 n. Chr., abends",
    "hero.spanShamrock": "1. Samhain, Jahr 1 — 29. Deireadh Fómhair, Jahr 5000",
    "calc.kicker": "Kalenderrechner",
    "calc.title": "Finde dein Shamrock-Datum",
    "calc.basis": "Neujulianische Eingabe",
    "calc.button": "Berechnen",
    "calc.range": "Gültiger Bereich: 31. Oktober 2574 v. Chr., abends, bis 20. November 2427 n. Chr., abends.",
    "field.day": "Tag",
    "field.month": "Monat",
    "field.year": "Jahr",
    "field.era": "Ära",
    "era.ce": "n. Chr.",
    "era.bce": "v. Chr.",
    "result.label": "Dein Shamrock-Datum",
    "result.selected": "Gewähltes Datum",
    "result.before": "Vor Sonnenuntergang",
    "result.after": "Nach Sonnenuntergang",
    "result.untilSunset": "Bis Sonnenuntergang",
    "result.fromSunset": "Ab Sonnenuntergang",
    "result.sunset": "Das gewählte Sonnendatum hat zwei Shamrock-Daten, weil der Shamrock-Tag bei Sonnenuntergang wechselt.",
    "result.opening": "Der unterstützte Kalender beginnt an diesem Datum bei Sonnenuntergang.",
    "result.closing": "Der unterstützte Kalender endet an diesem Datum bei Sonnenuntergang.",
    "phase.new": "Neumondphase",
    "phase.waxing": "Zunehmender Mond",
    "phase.full": "Vollmondphase",
    "phase.waning": "Abnehmender Mond",
    "festival.day": "{name}-Festtag {day}",
    "festival.coincides": "Sonnen- und Monddatum fallen zusammen",
    "error.required": "Gib einen Tag und eine positive Jahreszahl ein.",
    "error.invalid": "Dieses Datum existiert im neujulianischen Kalender nicht.",
    "error.range": "Dieses Datum liegt außerhalb des gültigen Bereichs: 31. Oktober 2574 v. Chr. bis 20. November 2427 n. Chr.",
    "about.kicker": "Das Wesentliche",
    "about.title": "Mondrhythmus. Sonnenfundament.",
    "about.modernTitle": "Bewusst modern",
    "about.modernText": "Shamrock Calendar ist ein spielerisches modernes System und keine behauptete Rekonstruktion eines historischen keltischen Kalenders.",
    "about.newYearTitle": "Halloween ist Neujahr",
    "about.newYearText": "Das Jahr beginnt am Abend des 31. Oktober. Samhain, Imbolc, Bealtaine und Lúnasa werden mit 🍀 und ihrem jahreszeitlichen Symbol gekennzeichnet.",
    "about.basisTitle": "Eine präzise zivile Basis",
    "about.basisText": "Der neujulianische Kalender liegt langfristig ungefähr zehnmal näher am tropischen Jahr als der gregorianische. Vor 1600 können die Daten hier um etwa ein bis zwei Tage abweichen; vom 1. März 1600 bis zum Ende des Rechnerbereichs stimmen sie überein.",
    "about.sunset": "Ein Ort ist nicht nötig: Der Sonnenuntergang ist das Kalenderprinzip, keine improvisierte lokale Sonnenuntergangsberechnung.",
    "footer.brand": "Eine Marke von Pierre Christian Ulrich Singer · Entrepreneur individuel (EI)",
    "footer.product": "Shamrock Calendar · modernes Kalendersystem"
  }
};

const civilMonthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
};

const weekdayNames = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  fr: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
};

const moonPhaseEmoji = Object.freeze({
  new: "🌑",
  waxing: "🌒",
  full: "🌕",
  waning: "🌘"
});

const supportedLanguages = ["en", "fr", "de"];
const storageKey = "shamrock-calendar-language-v1";
let language = initialLanguage();
let lastResult = null;
let utcRefreshTimer = null;

function initialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (supportedLanguages.includes(queryLanguage)) return queryLanguage;
  try {
    const stored = localStorage.getItem(storageKey);
    if (supportedLanguages.includes(stored)) return stored;
  } catch { /* Language selection still works without storage. */ }
  return "en";
}

function t(key, variables = {}) {
  const template = messages[language][key] ?? messages.en[key] ?? key;
  return Object.entries(variables).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

function setDocumentLanguage() {
  document.documentElement.lang = language === "fr" ? "fr-CA" : language === "en" ? "en-US" : "de";
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(element => {
    const label = t(element.dataset.i18nAria);
    element.setAttribute("aria-label", label);
    if (element.matches("button")) element.title = label;
  });
  document.querySelectorAll("[data-language]").forEach(button => {
    const selected = button.dataset.language === language;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  buildMonthOptions();
  renderCurrentDate();
  if (lastResult) renderResult(lastResult);
}

function buildMonthOptions() {
  const select = document.querySelector("#month");
  const selected = Number(select.value) || new Date().getMonth() + 1;
  select.replaceChildren(...civilMonthNames[language].map((name, index) => {
    const option = document.createElement("option");
    option.value = String(index + 1);
    option.textContent = `${String(index + 1).padStart(2, "0")} · ${name}`;
    return option;
  }));
  select.value = String(selected);
}

function setLanguage(nextLanguage) {
  if (!supportedLanguages.includes(nextLanguage)) return;
  language = nextLanguage;
  try { localStorage.setItem(storageKey, language); } catch { /* Ignore storage restrictions. */ }
  setDocumentLanguage();
}

function parsePositiveInteger(value) {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const number = Number(trimmed);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

function formatCivilDate(date) {
  const era = date.year <= 0 ? t("era.bce") : t("era.ce");
  const year = date.year <= 0 ? 1 - date.year : date.year;
  if (language === "en") return `${civilMonthNames.en[date.month - 1]} ${date.day}, ${year} ${era}`;
  return `${date.day} ${civilMonthNames[language][date.month - 1]} ${year} ${era}`;
}

function formatShamrockDate(shamrock) {
  return `${shamrock.day}. ${shamrock.monthName} ${shamrock.year}`;
}

function formatMoonPhase(phase) {
  return `${moonPhaseEmoji[phase]} ${t(`phase.${phase}`)}`;
}

function formatFestival(festival) {
  return festival.emphasized
    ? `${t("festival.day", { name: festival.name, day: festival.dayNumber })} · ${t("festival.coincides")}`
    : t("festival.day", { name: festival.name, day: festival.dayNumber });
}

function renderFestival(element, festival) {
  if (!festival) {
    element.hidden = true;
    element.classList.remove("is-emphasized");
    return;
  }
  element.querySelector(".festival-icons").textContent = `🍀 ${festival.emoji}`;
  element.querySelector(".festival-text").textContent = formatFestival(festival);
  element.hidden = false;
  element.classList.toggle("is-emphasized", festival.emphasized);
}

function renderPeriod(prefix, period, labelKey) {
  const card = document.querySelector(`#${prefix}-period`);
  card.hidden = !period;
  if (!period) return;
  card.querySelector(".period-label").textContent = t(labelKey);
  document.querySelector(`#${prefix}-date`).textContent = formatShamrockDate(period.shamrock);
  document.querySelector(`#${prefix}-weekday`).textContent = weekdayNames[language][period.weekday];
  document.querySelector(`#${prefix}-moon`).textContent = formatMoonPhase(period.moonPhase);
  renderFestival(document.querySelector(`#${prefix}-festival`), period.festival);
}

function renderCurrentDate(now = new Date()) {
  const input = {
    year: now.getUTCFullYear(),
    month: now.getUTCMonth() + 1,
    day: now.getUTCDate()
  };
  const result = convertRevisedJulianDate(input);
  if (!result.ok) return;
  const period = result.beforeSunset || result.afterSunset;
  document.querySelector("#current-shamrock-date").textContent = `${weekdayNames[language][period.weekday]} · ${formatShamrockDate(period.shamrock)}`;
  document.querySelector("#current-moon-phase").textContent = formatMoonPhase(period.moonPhase);
  const festival = document.querySelector("#current-festival");
  if (period.festival) {
    festival.textContent = `🍀 ${period.festival.emoji} ${formatFestival(period.festival)}`;
    festival.hidden = false;
    festival.classList.toggle("is-emphasized", period.festival.emphasized);
  } else {
    festival.hidden = true;
    festival.classList.remove("is-emphasized");
  }
}

function scheduleUtcRefresh() {
  if (utcRefreshTimer !== null) window.clearTimeout(utcRefreshTimer);
  const now = new Date();
  const nextMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  utcRefreshTimer = window.setTimeout(() => {
    renderCurrentDate();
    scheduleUtcRefresh();
  }, Math.max(1000, nextMidnight - now.getTime() + 250));
}

function clearError() {
  document.querySelector("#error-message").textContent = "";
  document.querySelector("#date-form").classList.remove("has-error");
}

function showError(key) {
  lastResult = null;
  document.querySelector("#error-message").textContent = t(key);
  document.querySelector("#date-form").classList.add("has-error");
  document.querySelector("#result-panel").classList.add("is-muted");
}

function renderResult(result) {
  lastResult = result;
  clearError();
  document.querySelector("#selected-date").textContent = `${weekdayNames[language][result.weekday]} · ${formatCivilDate(result.input)}`;
  document.querySelector("#day-change").textContent = t(result.boundary === "opening-sunset"
    ? "result.opening"
    : result.boundary === "closing-sunset"
      ? "result.closing"
      : "result.sunset");
  renderPeriod("before", result.beforeSunset, result.boundary === "closing-sunset" ? "result.untilSunset" : "result.before");
  renderPeriod("after", result.afterSunset, result.boundary === "opening-sunset" ? "result.fromSunset" : "result.after");
  document.querySelector("#result-panel").classList.remove("is-muted");
}

function calculateFromForm(event) {
  event?.preventDefault();
  const day = parsePositiveInteger(document.querySelector("#day").value);
  const yearNumber = parsePositiveInteger(document.querySelector("#year").value);
  const month = Number(document.querySelector("#month").value);
  const era = document.querySelector("#era").value;
  if (day === null || yearNumber === null) {
    showError("error.required");
    return;
  }
  const astronomicalYear = era === "bce" ? 1 - yearNumber : yearNumber;
  const result = convertRevisedJulianDate({ year: astronomicalYear, month, day });
  if (!result.ok) {
    showError(result.error === "out-of-range" ? "error.range" : "error.invalid");
    return;
  }
  renderResult(result);
}

function setInitialDate() {
  const today = new Date();
  document.querySelector("#day").value = String(today.getUTCDate());
  document.querySelector("#month").value = String(today.getUTCMonth() + 1);
  document.querySelector("#year").value = String(today.getUTCFullYear());
  document.querySelector("#era").value = "ce";
}

function registerCalendarTool() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const registration = context.registerTool({
    name: "calculate_shamrock_date",
    title: "Calculate a Shamrock date",
    description: "Convert one valid Revised Julian civil date within the supported range and show the same result in the visible Shamrock Calendar calculator.",
    inputSchema: {
      type: "object",
      properties: {
        day: { type: "integer", minimum: 1, maximum: 31 },
        month: { type: "integer", minimum: 1, maximum: 12 },
        year: { type: "integer", minimum: 1, maximum: 9999 },
        era: { type: "string", enum: ["BCE", "CE"] }
      },
      required: ["day", "month", "year", "era"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !Number.isInteger(input.day) || !Number.isInteger(input.month)
        || !Number.isInteger(input.year) || input.year < 1 || !["BCE", "CE"].includes(input.era)) {
        throw new TypeError("A positive year, valid day and month, and BCE or CE are required.");
      }
      const astronomicalYear = input.era === "BCE" ? 1 - input.year : input.year;
      const result = convertRevisedJulianDate({ year: astronomicalYear, month: input.month, day: input.day });
      if (!result.ok) throw new RangeError(result.error);
      document.querySelector("#day").value = String(input.day);
      document.querySelector("#month").value = String(input.month);
      document.querySelector("#year").value = String(input.year);
      document.querySelector("#era").value = input.era.toLowerCase();
      renderResult(result);
      document.querySelector("#calculator").scrollIntoView({ block: "start", behavior: "smooth" });
      return {
        beforeSunset: result.beforeSunset
          ? {
              weekday: result.beforeSunset.weekday,
              day: result.beforeSunset.shamrock.day,
              month: result.beforeSunset.shamrock.monthName,
              year: result.beforeSunset.shamrock.year,
              moonPhase: result.beforeSunset.moonPhase,
              festival: result.beforeSunset.festival
            }
          : null,
        afterSunset: result.afterSunset
          ? {
              weekday: result.afterSunset.weekday,
              day: result.afterSunset.shamrock.day,
              month: result.afterSunset.shamrock.monthName,
              year: result.afterSunset.shamrock.year,
              moonPhase: result.afterSunset.moonPhase,
              festival: result.afterSunset.festival
            }
          : null
      };
    }
  }, { signal: lifecycle.signal });
  Promise.resolve(registration).catch(() => lifecycle.abort());
  window.addEventListener("pagehide", () => lifecycle.abort(), { once: true });
}

function initialize() {
  setDocumentLanguage();
  setInitialDate();
  document.querySelector("#date-form").addEventListener("submit", calculateFromForm);
  document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  ["#day", "#month", "#year", "#era"].forEach(selector => {
    document.querySelector(selector).addEventListener("change", clearError);
  });
  calculateFromForm();
  scheduleUtcRefresh();
  registerCalendarTool();
}

initialize();
})();
