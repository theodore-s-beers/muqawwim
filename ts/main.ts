import * as unical from "unical";

function calendarFields(prefix: string, dayId = `${prefix}-day`) {
  return {
    year: document.getElementById(`${prefix}-year`) as HTMLInputElement,
    month: document.getElementById(`${prefix}-month`) as HTMLSelectElement,
    day: document.getElementById(dayId) as HTMLInputElement,
    leap: document.getElementById(`${prefix}-leap`) as HTMLInputElement,
    weekday: document.getElementById(`${prefix}-wday`) as HTMLInputElement | null,
  };
}

const fields = {
  gregorian: calendarFields("greg"),
  julian: calendarFields("julian", "julian-cal-day"),
  hebrew: calendarFields("heb"),
  islamic: calendarFields("islamic"),
  persian: calendarFields("pers"),
};

function refreshHebrewMonths(year: number) {
  const { month } = fields.hebrew;
  const selected = month.value;
  const count = unical.yearMonths("hebrew", year);
  month.options[11].label = count === 13 ? "Adar I" : "Adar";
  if (count === 13 && month.length === 12) {
    month.add(new Option("Veadar", "13"));
  } else if (count === 12) {
    month.length = 12;
  }
  month.value = selected;
}

const hebrewYearTypes: Record<number, string> = {
  353: "Common deficient",
  354: "Common regular",
  355: "Common complete",
  383: "Embolismic deficient",
  384: "Embolismic regular",
  385: "Embolismic complete",
};

function describeYear(calendar: unical.Calendar, year: number) {
  if (calendar === "hebrew") {
    const days = unical.yearDays(calendar, year);
    return `${hebrewYearTypes[days]} (${days} days)`;
  }
  return unical.isLeapYear(calendar, year) ? "Leap year" : "Normal year";
}

// Each form describes a civil date. Render all five from the same midnight JD.
function renderDate(jd: number) {
  const weekday = unical.weekday(jd);
  const results = unical.CALENDARS.map((calendar) => {
    const [year, month, day] = unical.fromJD(calendar, jd);
    // Extreme years can exceed the precision of the calendar algorithms.
    if (
      !unical.isValidDate(calendar, year, month, day) ||
      unical.toJD(calendar, year, month, day) !== jd
    ) {
      throw new RangeError("Date outside the convertible range");
    }
    return { calendar, year, month, day, description: describeYear(calendar, year) };
  });

  for (const { calendar, year, month, day, description } of results) {
    const form = fields[calendar];
    if (calendar === "hebrew") refreshHebrewMonths(year);
    form.year.value = String(year);
    form.month.value = String(month);
    form.day.value = String(day);
    form.leap.value = description;
    form.year.form!.classList.remove("validated");
    form.year.setCustomValidity("");
    form.day.setCustomValidity("");
    if (form.weekday) {
      form.weekday.value =
        calendar === "islamic"
          ? `Yawm ${unical.ISLAMIC_WEEKDAYS[weekday]}`
          : calendar === "persian"
            ? unical.PERSIAN_WEEKDAYS[weekday]
            : unical.WEEKDAYS[weekday];
    }
  }
  const year = fields.gregorian.year.valueAsNumber;
  const panel = document.getElementById("persian-calendar")!;
  if (year < -1000 || year > 3000) panel.setAttribute("aria-describedby", "persian-range");
  else panel.removeAttribute("aria-describedby");
  extrasCombined();
}

function validateDate(calendar: unical.Calendar) {
  const { year, month, day } = fields[calendar];
  year.setCustomValidity("");
  day.setCustomValidity("");
  if (!year.validity.valid || !month.validity.valid || !day.validity.valid) return;
  const y = year.valueAsNumber;
  const m = Number(month.value);
  if (!Number.isSafeInteger(y)) {
    year.setCustomValidity("Enter a year within the supported range.");
  } else if (!unical.isValidDate(calendar, y, m, day.valueAsNumber)) {
    day.setCustomValidity(
      `Enter a day from 1 to ${unical.monthDays(calendar, y, m)} for this month.`,
    );
  }
}

function calculate(calendar: unical.Calendar) {
  const { year, month, day } = fields[calendar];
  validateDate(calendar);
  if (!year.form!.reportValidity()) return;
  try {
    renderDate(unical.toJD(calendar, year.valueAsNumber, Number(month.value), day.valueAsNumber));
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    year.setCustomValidity("This date is outside the range the converter can calculate.");
    year.reportValidity();
  }
}

function todayAndCalc() {
  const today = new Date();
  renderDate(unical.toJD("gregorian", today.getFullYear(), today.getMonth() + 1, today.getDate()));
}

// Function for animal years
function animalCalc() {
  // Declare a few variables
  const persYearValue = Number(fields.persian.year.value);
  const persMod = persYearValue % 12;
  const animalAnswer = document.getElementById("animal-answer") as HTMLElement;
  let animalEng: string;
  let animalOrig: string;

  // Determine animal sign
  if (persYearValue < 1) {
    animalAnswer.innerHTML =
      "<em>No Chinese-Uighur animal sign has been calculated for this date, since the year entered is too early.</em>";
  } else {
    if (persMod === 0) {
      animalEng = "Snake";
      animalOrig = "Yilan";
    } else if (persMod === 1) {
      animalEng = "Horse";
      animalOrig = "Yunt";
    } else if (persMod === 2) {
      animalEng = "Goat";
      animalOrig = "Quy";
    } else if (persMod === 3) {
      animalEng = "Monkey";
      animalOrig = "Pichin";
    } else if (persMod === 4) {
      animalEng = "Rooster";
      animalOrig = "Takhaquy";
    } else if (persMod === 5) {
      animalEng = "Dog";
      animalOrig = "It";
    } else if (persMod === 6) {
      animalEng = "Pig";
      animalOrig = "Tunguz";
    } else if (persMod === 7) {
      animalEng = "Rat";
      animalOrig = "Sichqan";
    } else if (persMod === 8) {
      animalEng = "Ox";
      animalOrig = "Ud";
    } else if (persMod === 9) {
      animalEng = "Tiger";
      animalOrig = "Bars";
    } else if (persMod === 10) {
      animalEng = "Rabbit";
      animalOrig = "Tawshqan";
    } else {
      animalEng = "Dragon";
      animalOrig = "Luy";
    }

    // Set result text
    animalAnswer.innerHTML = `In the Persianate adaptation of the Chinese-Uighur animal calendar, this date falls in a year of the <strong>${animalEng} (<em>${animalOrig}</em>)</strong>.`;
  }
}

function persianImperial() {
  const persYearValue = Number(fields.persian.year.value);
  const imperialYear = persYearValue + 1180;

  const imperialAnswer = document.getElementById("persian-imperial") as HTMLElement;
  imperialAnswer.innerHTML = `Using the “imperial epoch” favored by Mohammad Reza Pahlavi, this is year <strong>${imperialYear}</strong>.`;
}

// Function for Ottoman fiscal years
function ottomanFiscalCalc() {
  // Hooray for more variables
  const ottomanFiscalAnswer = document.getElementById("ottoman-fiscal") as HTMLElement;
  const julianYearValue = Number(fields.julian.year.value);
  const julianMonthIndex = fields.julian.month.selectedIndex;
  const ottomanFiscalDay = fields.julian.day.value;

  // Early out for obviously out-of-scope dates
  if (julianYearValue < 1840 || julianYearValue > 1916) {
    ottomanFiscalAnswer.innerHTML =
      "<em>Ottoman fiscal calendar equivalents will be given for Julian dates between 1840-03-01 and 1916-12-31.</em>";
    return;
  }

  let ottomanFiscalYear: number;
  let ottomanFiscalMonth: string;

  // Set the Ottoman equivalent month
  if (julianMonthIndex === 0) {
    ottomanFiscalMonth = "Kânun-ı Sani";
  } else if (julianMonthIndex === 1) {
    ottomanFiscalMonth = "Şubat";
  } else if (julianMonthIndex === 2) {
    ottomanFiscalMonth = "Mart";
  } else if (julianMonthIndex === 3) {
    ottomanFiscalMonth = "Nisan";
  } else if (julianMonthIndex === 4) {
    ottomanFiscalMonth = "Mayıs";
  } else if (julianMonthIndex === 5) {
    ottomanFiscalMonth = "Haziran";
  } else if (julianMonthIndex === 6) {
    ottomanFiscalMonth = "Temmuz";
  } else if (julianMonthIndex === 7) {
    ottomanFiscalMonth = "Ağustos";
  } else if (julianMonthIndex === 8) {
    ottomanFiscalMonth = "Eylül";
  } else if (julianMonthIndex === 9) {
    ottomanFiscalMonth = "Teşrin-i Evvel";
  } else if (julianMonthIndex === 10) {
    ottomanFiscalMonth = "Teşrin-i Sani";
  } else {
    ottomanFiscalMonth = "Kânun-ı Evvel";
  }

  // The Ottoman fiscal year clicks over as of March
  // So the difference from the Julian year is 584, except in Jan. and Feb.
  if (julianMonthIndex > 1) {
    ottomanFiscalYear = julianYearValue - 584;
  } else {
    ottomanFiscalYear = julianYearValue - 585;
  }

  // More specifically, we want between 1840-03-01 and 1916-12-31 Julian
  if (ottomanFiscalYear > 1255 && julianYearValue < 1917) {
    ottomanFiscalAnswer.innerHTML = `In the Ottoman fiscal calendar, as it was followed from 1840 through 1916 Julian, this date is <strong>${ottomanFiscalDay} ${ottomanFiscalMonth} ${ottomanFiscalYear}</strong>.`;
  } else {
    ottomanFiscalAnswer.innerHTML =
      "<em>Ottoman fiscal calendar equivalents will be given for Julian dates between 1840-03-01 and 1916-12-31.</em>";
  }
}

// Function for Seleucid era
function seleucidCalc() {
  // Define variables; calculate result
  const hebYearValue = Number(fields.hebrew.year.value);
  const seleucidYear = hebYearValue - 3449;
  const seleucidAnswer = document.getElementById("seleucid-answer") as HTMLElement;

  // Set result text
  seleucidAnswer.innerHTML = `In the Seleucid era, as used by some medieval Jewish communities, this is year <strong>${seleucidYear}</strong>.`;
}

// Function to show or hide notes text
function toggleNotes() {
  const notesShowing: boolean =
    getComputedStyle(document.documentElement).getPropertyValue("--notes-display") === "block";

  const button = document.getElementById("notes-button") as HTMLButtonElement;

  if (notesShowing) {
    document.documentElement.style.setProperty("--notes-display", "none");
    button.innerText = "(show)";
  } else {
    document.documentElement.style.setProperty("--notes-display", "block");
    button.innerText = "(hide)";
  }
}

// Combined function for "extras"
function extrasCombined() {
  animalCalc();
  persianImperial();
  ottomanFiscalCalc();
  seleucidCalc();
  document.documentElement.style.setProperty("--img-display", "inline");
}

for (const calendar of unical.CALENDARS) {
  const { year } = fields[calendar];
  const form = year.form!;
  form.addEventListener(
    "invalid",
    (event) => {
      event.preventDefault();
      form.classList.add("validated");
      form.querySelector<HTMLElement>(":invalid")?.focus();
    },
    true,
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate(calendar);
  });
  form.addEventListener("input", () => {
    if (form.classList.contains("validated")) validateDate(calendar);
    document.documentElement.style.setProperty("--img-display", "none");
  });
}

fields.hebrew.year.addEventListener("input", () => {
  const year = fields.hebrew.year.valueAsNumber;
  if (Number.isSafeInteger(year)) {
    refreshHebrewMonths(year);
    if (!fields.hebrew.month.value) fields.hebrew.month.form!.classList.add("validated");
  }
});

document.getElementById("greg-today-btn")?.addEventListener("click", todayAndCalc);
document.getElementById("notes-button")?.addEventListener("click", toggleNotes);
window.addEventListener("load", todayAndCalc);
