import * as unical from 'unical'

//
// GLOBAL VARIABLES
//

// Global variable for "Julian day" value
let julianDay: number

// Gregorian date fields
const gregYear = document.getElementById('greg-year') as HTMLInputElement
const gregMonth = document.getElementById('greg-month') as HTMLSelectElement
const gregDay = document.getElementById('greg-day') as HTMLInputElement
const gregWeekday = document.getElementById('greg-wday') as HTMLInputElement
const gregLeap = document.getElementById('greg-leap') as HTMLInputElement

// Julian date fields
const julianYear = document.getElementById('julian-year') as HTMLInputElement
const julianMonth = document.getElementById('julian-month') as HTMLSelectElement
const julianDate = document.getElementById('julian-cal-day') as HTMLInputElement
const julianWeekday = document.getElementById('julian-wday') as HTMLInputElement
const julianLeap = document.getElementById('julian-leap') as HTMLInputElement

// Hebrew date fields
const hebMonth = document.getElementById('heb-month') as HTMLSelectElement
const hebLeap = document.getElementById('heb-leap') as HTMLInputElement
const hebYear = document.getElementById('heb-year') as HTMLInputElement
const hebDay = document.getElementById('heb-day') as HTMLInputElement

// Islamic date fields
const islamicYear = document.getElementById('islamic-year') as HTMLInputElement
const islamicMonth = document.getElementById(
  'islamic-month'
) as HTMLSelectElement
const islamicDay = document.getElementById('islamic-day') as HTMLInputElement
const islamicWeekday = document.getElementById(
  'islamic-wday'
) as HTMLInputElement
const islamicLeap = document.getElementById('islamic-leap') as HTMLInputElement

// Persian date fields
const persYear = document.getElementById('pers-year') as HTMLInputElement
const persMonth = document.getElementById('pers-month') as HTMLSelectElement
const persDay = document.getElementById('pers-day') as HTMLInputElement
const persWeekday = document.getElementById('pers-wday') as HTMLInputElement
const persLeap = document.getElementById('pers-leap') as HTMLInputElement

//
// CORE FUNCTIONS
//

/*  updateFromGregorian --  Update all calendars from Gregorian.
                            "Why not Julian date?" you ask. Because
                            starting from Gregorian guarantees we're
                            already snapped to an integral second, so
                            we don't get roundoff errors in other
                            calendars.  */

function updateFromGregorian () {
  const year = Number(gregYear.value)
  const mon = gregMonth.selectedIndex
  const mday = Number(gregDay.value)
  const hour = 0
  const min = 0
  const sec = 0

  // Update Julian day

  const j =
    unical.gregorianToJd(year, mon + 1, mday) +
    Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0

  julianDay = j

  // Update day of week in Gregorian box

  const weekday = unical.jWday(j)
  gregWeekday.value = unical.WEEKDAYS[weekday]

  // Update leap year status in Gregorian box

  gregLeap.value = unical.NORM_LEAP[unical.leapGregorian(year) ? 1 : 0]

  // Update Julian Calendar

  const julcal = unical.jdToJulian(j)
  julianYear.value = String(julcal[0])
  julianMonth.selectedIndex = julcal[1] - 1
  julianDate.value = String(julcal[2])
  julianLeap.value = unical.NORM_LEAP[unical.leapJulian(julcal[0]) ? 1 : 0]
  julianWeekday.value = unical.WEEKDAYS[weekday]

  // Update Hebrew Calendar

  const hebcal = unical.jdToHebrew(j)
  if (unical.hebrewLeap(hebcal[0])) {
    hebMonth.options.length = 13
    hebMonth.options[11] = new Option('Adar I')
    hebMonth.options[12] = new Option('Veadar')
  } else {
    hebMonth.options.length = 12
    hebMonth.options[11] = new Option('Adar')
  }
  hebYear.value = String(hebcal[0])
  hebMonth.selectedIndex = hebcal[1] - 1
  hebDay.value = String(hebcal[2])
  let hmindex = hebcal[1]
  if (hmindex === 12 && !unical.hebrewLeap(hebcal[0])) {
    hmindex = 14
  }
  switch (unical.hebrewYearDays(hebcal[0])) {
    case 353:
      hebLeap.value = 'Common deficient (353 days)'
      break

    case 354:
      hebLeap.value = 'Common regular (354 days)'
      break

    case 355:
      hebLeap.value = 'Common complete (355 days)'
      break

    case 383:
      hebLeap.value = 'Embolismic deficient (383 days)'
      break

    case 384:
      hebLeap.value = 'Embolismic regular (384 days)'
      break

    case 385:
      hebLeap.value = 'Embolismic complete (385 days)'
      break

    default:
      hebLeap.value =
        'Invalid year length: ' + unical.hebrewYearDays(hebcal[0]) + ' days.'
      break
  }

  // Update Islamic Calendar

  const islcal = unical.jdToIslamic(j)
  islamicYear.value = String(islcal[0])
  islamicMonth.selectedIndex = islcal[1] - 1
  islamicDay.value = String(islcal[2])
  islamicWeekday.value = 'Yawm ' + unical.ISLAMIC_WEEKDAYS[weekday]
  islamicLeap.value = unical.NORM_LEAP[unical.leapIslamic(islcal[0]) ? 1 : 0]

  // Update Persian Astronomical Calendar

  const perscal = unical.jdToPersiana(j)
  persYear.value = String(perscal[0])
  persMonth.selectedIndex = perscal[1] - 1
  persDay.value = String(perscal[2])
  persWeekday.value = unical.PERSIAN_WEEKDAYS[weekday]
  persLeap.value = unical.NORM_LEAP[unical.leapPersiana(perscal[0]) ? 1 : 0]
}

// calcGregorian -- Perform calculation starting with a Gregorian date

function calcGregorian () {
  updateFromGregorian()
}

// calcJulian -- Perform calculation starting with a Julian date

function calcJulian () {
  const j = julianDay
  const date = unical.jdToGregorian(j)
  gregYear.value = String(date[0])
  gregMonth.selectedIndex = date[1] - 1
  gregDay.value = String(date[2])
  updateFromGregorian()
}

// setJulian -- Set Julian date and update all calendars

function setJulian (j: number) {
  julianDay = Number(j)
  calcJulian()
}

// calcJulianCalendar -- Update from Julian calendar

function calcJulianCalendar () {
  setJulian(
    unical.julianToJd(
      Number(julianYear.value),
      julianMonth.selectedIndex + 1,
      Number(julianDate.value)
    )
  )
}

// calcHebrew -- Update from Hebrew calendar

function calcHebrew () {
  setJulian(
    unical.hebrewToJd(
      Number(hebYear.value),
      hebMonth.selectedIndex + 1,
      Number(hebDay.value)
    )
  )
}

// calcIslamic -- Update from Islamic calendar

function calcIslamic () {
  setJulian(
    unical.islamicToJd(
      Number(islamicYear.value),
      islamicMonth.selectedIndex + 1,
      Number(islamicDay.value)
    )
  )
}

// calcPersiana -- Update from Persian astronomical calendar

function calcPersiana () {
  setJulian(
    unical.persianaToJd(
      Number(persYear.value),
      persMonth.selectedIndex + 1,
      Number(persDay.value)
    ) + 0.5
  )
}

/*  setDateToToday -- Preset the fields in
                      the request form to today's date.  */

function setDateToToday () {
  const today = new Date()

  /*  The following idiocy is due to bizarre incompatibilities
      in the behaviour of getYear() between Netscrape and
      Exploder. The ideal solution is to use getFullYear(),
      which returns the actual year number, but that would
      break this code on versions of JavaScript prior to
      1.2. So, for the moment we use the following code
      which works for all versions of JavaScript and browsers
      for all year numbers greater than 1000. When we're willing
      to require JavaScript 1.2, this may be replaced by
      the single line:

          document.gregorian.year.value = today.getFullYear();

      Thanks to Larry Gilbert for pointing out this problem.
    */

  gregYear.value = String(today.getFullYear())
  gregMonth.selectedIndex = today.getMonth()
  gregDay.value = String(today.getDate())
}

//
// NEW FUNCTIONS
//

// Function for animal years
function animalCalc () {
  // Declare a few variables
  const persYearValue = Number(persYear.value)
  const persMod = persYearValue % 12
  const animalAnswer = document.getElementById('animal-answer')
  let animalEng = ''
  let animalOrig = ''

  // Null check
  if (animalAnswer === null) {
    console.log('Something went very wrong...')
    return
  }

  // Determine animal sign
  if (persYearValue < 1) {
    animalAnswer.innerHTML =
      '<em>No Chinese-Uighur animal sign has been calculated for this date, since the year entered is too early.</em>'
  } else {
    if (persMod === 0) {
      animalEng = 'Snake'
      animalOrig = 'Yilan'
    } else if (persMod === 1) {
      animalEng = 'Horse'
      animalOrig = 'Yunt'
    } else if (persMod === 2) {
      animalEng = 'Goat'
      animalOrig = 'Quy'
    } else if (persMod === 3) {
      animalEng = 'Monkey'
      animalOrig = 'Pichin'
    } else if (persMod === 4) {
      animalEng = 'Rooster'
      animalOrig = 'Takhaquy'
    } else if (persMod === 5) {
      animalEng = 'Dog'
      animalOrig = 'It'
    } else if (persMod === 6) {
      animalEng = 'Pig'
      animalOrig = 'Tunguz'
    } else if (persMod === 7) {
      animalEng = 'Rat'
      animalOrig = 'Sichqan'
    } else if (persMod === 8) {
      animalEng = 'Ox'
      animalOrig = 'Ud'
    } else if (persMod === 9) {
      animalEng = 'Tiger'
      animalOrig = 'Bars'
    } else if (persMod === 10) {
      animalEng = 'Rabbit'
      animalOrig = 'Tawshqan'
    } else {
      animalEng = 'Dragon'
      animalOrig = 'Luy'
    }

    // Set result text
    animalAnswer.innerHTML =
      'In the Persianate adaptation of the Chinese-Uighur animal calendar, this date falls in a year of the <strong>' +
      animalEng +
      ' (<em>' +
      animalOrig +
      '</em>)</strong>.'
  }
}

// Function for Ottoman fiscal years
function ottomanFiscalCalc () {
  // Hooray for more variables
  const ottomanFiscalAnswer = document.getElementById('ottoman-fiscal')
  const julianYearValue = Number(julianYear.value)
  const julianMonthIndex = julianMonth.selectedIndex
  const ottomanFiscalDay = julianDate.value

  // Null check
  if (ottomanFiscalAnswer === null) {
    console.log('Something went very wrong...')
    return
  }

  // Early out for obviously out-of-scope dates
  if (julianYearValue < 1840 || julianYearValue >= 1917) {
    ottomanFiscalAnswer.innerHTML =
      '<em>Ottoman fiscal calendar equivalents will be given for Julian dates between 1840-03-01 and 1916-12-31.</em>'
    return
  }

  let ottomanFiscalYear: number
  let ottomanFiscalMonth: string

  // Set the Ottoman equivalent month
  if (julianMonthIndex === 0) {
    ottomanFiscalMonth = 'Kânun-ı Sani'
  } else if (julianMonthIndex === 1) {
    ottomanFiscalMonth = 'Şubat'
  } else if (julianMonthIndex === 2) {
    ottomanFiscalMonth = 'Mart'
  } else if (julianMonthIndex === 3) {
    ottomanFiscalMonth = 'Nisan'
  } else if (julianMonthIndex === 4) {
    ottomanFiscalMonth = 'Mayıs'
  } else if (julianMonthIndex === 5) {
    ottomanFiscalMonth = 'Haziran'
  } else if (julianMonthIndex === 6) {
    ottomanFiscalMonth = 'Temmuz'
  } else if (julianMonthIndex === 7) {
    ottomanFiscalMonth = 'Ağustos'
  } else if (julianMonthIndex === 8) {
    ottomanFiscalMonth = 'Eylül'
  } else if (julianMonthIndex === 9) {
    ottomanFiscalMonth = 'Teşrin-i Evvel'
  } else if (julianMonthIndex === 10) {
    ottomanFiscalMonth = 'Teşrin-i Sani'
  } else {
    ottomanFiscalMonth = 'Kânun-ı Evvel'
  }

  // The Ottoman fiscal year clicks over as of March
  // So the difference from the Julian year is 584, except in Jan. and Feb.
  if (julianMonthIndex >= 2) {
    ottomanFiscalYear = julianYearValue - 584
  } else {
    ottomanFiscalYear = julianYearValue - 585
  }

  // More specifically, we want between 1840-03-01 and 1916-12-31 Julian
  if (ottomanFiscalYear >= 1256 && julianYearValue < 1917) {
    ottomanFiscalAnswer.innerHTML = `In the Ottoman fiscal calendar, as it was followed from 1840 through 1916 Julian, this date is <strong>${ottomanFiscalDay} ${ottomanFiscalMonth} ${ottomanFiscalYear}</strong>.`
  } else {
    ottomanFiscalAnswer.innerHTML =
      '<em>Ottoman fiscal calendar equivalents will be given for Julian dates between 1840-03-01 and 1916-12-31.</em>'
  }
}

// Function for Seleucid era
function seleucidCalc () {
  // Define variables; calculate result
  const hebYearValue = Number(hebYear.value)
  const seleucidYear = hebYearValue - 3449
  const seleucidAnswer = document.getElementById('seleucid-answer')

  // Null check
  if (seleucidAnswer === null) {
    console.log('Something went very wrong...')
    return
  }

  // Set result text
  seleucidAnswer.innerHTML =
    'In the Seleucid era, as used by some medieval Jewish communities, this is year <strong>' +
    seleucidYear +
    '</strong>.'
}

// Combined function for "extras"
function extrasCombined () {
  animalCalc()
  ottomanFiscalCalc()
  seleucidCalc()
  document.documentElement.style.setProperty('--img-display', 'inline')
}

// Combined function for "Today" button
function todayAndCalc () {
  setDateToToday()
  calcGregorian()
}

//
// TO RUN ON PAGE LOAD
//

// On page load, set current date and propagate
// Also run "extra" functions
window.onload = () => {
  todayAndCalc()
  extrasCombined()
}

//
// EVENT HANDLERS
//

// Many buttons
const gregCalcBtn = document.getElementById('greg-calc-btn')
const gregTodayBtn = document.getElementById('greg-today-btn')
const julianBtn = document.getElementById('julian-btn')
const hebrewBtn = document.getElementById('hebrew-btn')
const islamicBtn = document.getElementById('islamic-btn')
const persBtn = document.getElementById('pers-btn')

// Click handlers for core functions
gregCalcBtn?.addEventListener('click', calcGregorian)
gregTodayBtn?.addEventListener('click', todayAndCalc)
julianBtn?.addEventListener('click', calcJulianCalendar)
hebrewBtn?.addEventListener('click', calcHebrew)
islamicBtn?.addEventListener('click', calcIslamic)
persBtn?.addEventListener('click', calcPersiana)

// Click handlers for extra functions
gregCalcBtn?.addEventListener('click', extrasCombined)
gregTodayBtn?.addEventListener('click', extrasCombined)
julianBtn?.addEventListener('click', extrasCombined)
hebrewBtn?.addEventListener('click', extrasCombined)
islamicBtn?.addEventListener('click', extrasCombined)
persBtn?.addEventListener('click', extrasCombined)

// Keydown handlers
// These mimic clicks so that the extra functions will also be triggered

document.getElementById('gregorian')?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    gregCalcBtn?.click()
    ;(document.activeElement as HTMLElement).blur()
  }
})

document
  .getElementById('juliancalendar')
  ?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      julianBtn?.click()
      ;(document.activeElement as HTMLElement).blur()
    }
  })

document.getElementById('hebrew')?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    hebrewBtn?.click()
    ;(document.activeElement as HTMLElement).blur()
  }
})

document.getElementById('islamic')?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    islamicBtn?.click()
    ;(document.activeElement as HTMLElement).blur()
  }
})

document.getElementById('persiana')?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    persBtn?.click()
    ;(document.activeElement as HTMLElement).blur()
  }
})

// When any form field is changed, clear all checkmarks
document.querySelectorAll('form').forEach((element) => {
  element.addEventListener('change', () => {
    document.documentElement.style.setProperty('--img-display', 'none')
  })
})
