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
    "hero.eyebrow": "A modern lunisolar calendar",
    "hero.titleA": "A new year",
    "hero.titleB": "under the moon.",
    "hero.lead": "Twelve Irish month names, a thirteenth month when needed, and Halloween as a joyful New Year.",
    "calc.kicker": "Calendar converter",
    "calc.title": "Find your Shamrock date",
    "calc.basis": "Revised Julian input",
    "calc.button": "Calculate",
    "calc.range": "Valid range: 31 October 2574 BCE (start of Shamrock Year 1) to 20 November 2427 CE (end of Shamrock Year 5000).",
    "field.day": "Day",
    "field.month": "Month",
    "field.year": "Year",
    "field.era": "Era",
    "era.ce": "CE",
    "era.bce": "BCE",
    "result.label": "Your Shamrock date",
    "result.selected": "Selected date",
    "result.yearType": "Year type",
    "result.dayChange": "Day change",
    "result.common": "Common year · {days} days",
    "result.leap": "Leap year · {days} days",
    "result.sunset": "The Shamrock day changes at sunset.",
    "result.opening": "Shamrock Year 1 begins at sunset on this date.",
    "result.closing": "The final supported Shamrock day ends at sunset on this date.",
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
    "about.newYearText": "The year begins on the evening of 31 October. Festival days carry the four-leaf Singer Shamrock.",
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
    "hero.eyebrow": "Un calendrier luni-solaire moderne",
    "hero.titleA": "Une nouvelle année",
    "hero.titleB": "sous la lune.",
    "hero.lead": "Douze noms de mois irlandais, un treizième mois au besoin et l’Halloween comme joyeux Nouvel An.",
    "calc.kicker": "Convertisseur de calendrier",
    "calc.title": "Trouvez votre date Shamrock",
    "calc.basis": "Saisie julienne révisée",
    "calc.button": "Calculer",
    "calc.range": "Période valide : du 31 octobre 2574 av. J.-C. (début de l’année Shamrock 1) au 20 novembre 2427 apr. J.-C. (fin de l’année Shamrock 5000).",
    "field.day": "Jour",
    "field.month": "Mois",
    "field.year": "Année",
    "field.era": "Ère",
    "era.ce": "apr. J.-C.",
    "era.bce": "av. J.-C.",
    "result.label": "Votre date Shamrock",
    "result.selected": "Date choisie",
    "result.yearType": "Type d’année",
    "result.dayChange": "Changement de jour",
    "result.common": "Année commune · {days} jours",
    "result.leap": "Année intercalaire · {days} jours",
    "result.sunset": "Le jour Shamrock change au coucher du soleil.",
    "result.opening": "L’année Shamrock 1 commence au coucher du soleil à cette date.",
    "result.closing": "Le dernier jour Shamrock pris en charge se termine au coucher du soleil à cette date.",
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
    "about.newYearText": "L’année commence le soir du 31 octobre. Les jours de fête portent le trèfle à quatre feuilles Singer Shamrock.",
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
    "hero.eyebrow": "Ein moderner lunisolarer Kalender",
    "hero.titleA": "Ein neues Jahr",
    "hero.titleB": "unter dem Mond.",
    "hero.lead": "Zwölf irische Monatsnamen, bei Bedarf ein dreizehnter Monat und Halloween als fröhliches Neujahr.",
    "calc.kicker": "Kalenderrechner",
    "calc.title": "Finde dein Shamrock-Datum",
    "calc.basis": "Neujulianische Eingabe",
    "calc.button": "Berechnen",
    "calc.range": "Gültiger Bereich: 31. Oktober 2574 v. Chr. (Beginn Shamrock-Jahr 1) bis 20. November 2427 n. Chr. (Ende Shamrock-Jahr 5000).",
    "field.day": "Tag",
    "field.month": "Monat",
    "field.year": "Jahr",
    "field.era": "Ära",
    "era.ce": "n. Chr.",
    "era.bce": "v. Chr.",
    "result.label": "Dein Shamrock-Datum",
    "result.selected": "Gewähltes Datum",
    "result.yearType": "Jahrtyp",
    "result.dayChange": "Tageswechsel",
    "result.common": "Gemeinjahr · {days} Tage",
    "result.leap": "Schaltjahr · {days} Tage",
    "result.sunset": "Der Shamrock-Tag wechselt bei Sonnenuntergang.",
    "result.opening": "Shamrock-Jahr 1 beginnt an diesem Datum bei Sonnenuntergang.",
    "result.closing": "Der letzte unterstützte Shamrock-Tag endet an diesem Datum bei Sonnenuntergang.",
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
    "about.newYearText": "Das Jahr beginnt am Abend des 31. Oktober. Festtage tragen das vierblättrige Singer-Shamrock-Kleeblatt.",
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

const supportedLanguages = ["en", "fr", "de"];
const storageKey = "shamrock-calendar-language-v1";
let language = initialLanguage();
let lastResult = null;

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
  const { shamrock, festival } = result;
  document.querySelector("#result-date").textContent = `${shamrock.day}. ${shamrock.monthName} ${shamrock.year}`;
  document.querySelector("#selected-date").textContent = formatCivilDate(result.input);
  document.querySelector("#year-type").textContent = t(shamrock.leap ? "result.leap" : "result.common", { days: shamrock.yearDays });
  document.querySelector("#day-change").textContent = t(result.boundary === "opening-sunset"
    ? "result.opening"
    : result.boundary === "closing-sunset"
      ? "result.closing"
      : "result.sunset");

  const badge = document.querySelector("#festival-badge");
  if (festival) {
    document.querySelector("#festival-text").textContent = festival.emphasized
      ? `${t("festival.day", { name: festival.name, day: festival.dayNumber })} · ${t("festival.coincides")}`
      : t("festival.day", { name: festival.name, day: festival.dayNumber });
    badge.hidden = false;
    badge.classList.toggle("is-emphasized", festival.emphasized);
  } else {
    badge.hidden = true;
    badge.classList.remove("is-emphasized");
  }
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
  document.querySelector("#day").value = String(today.getDate());
  document.querySelector("#month").value = String(today.getMonth() + 1);
  document.querySelector("#year").value = String(today.getFullYear());
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
        day: result.shamrock.day,
        month: result.shamrock.monthName,
        year: result.shamrock.year,
        yearDays: result.shamrock.yearDays,
        festival: result.festival
          ? { name: result.festival.name, day: result.festival.dayNumber, emphasized: result.festival.emphasized }
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
  registerCalendarTool();
}

initialize();
