import {
  gregorianToJd,
  jWday,
  WEEKDAYS,
  NORM_LEAP,
  leapGregorian,
  jdToJulian,
  leapJulian,
  jdToHebrew,
  hebrewLeap,
  hebrewYearDays,
  jdToGregorian,
  ISLAMIC_WEEKDAYS,
  leapIslamic,
  jdToIslamic,
  julianToJd,
  PERSIAN_WEEKDAYS,
  jdToPersiana,
  leapPersiana,
  hebrewToJd,
  islamicToJd,
  persianaToJd,
} from './unical'

// A global variable for the Julian day value
let julianDay: number

const gregYear = document.getElementById('greg-year') as HTMLInputElement
const gregMonth = document.getElementById('greg-month') as HTMLSelectElement
const gregDay = document.getElementById('greg-day') as HTMLInputElement
const gregWeekday = document.getElementById('greg-wday') as HTMLInputElement
const gregLeap = document.getElementById('greg-leap') as HTMLInputElement

const julianYear = document.getElementById('julian-year') as HTMLInputElement
const julianMonth = document.getElementById('julian-month') as HTMLSelectElement
const julianDate = document.getElementById('julian-cal-day') as HTMLInputElement
const julianWeekday = document.getElementById('julian-wday') as HTMLInputElement
const julianLeap = document.getElementById('julian-leap') as HTMLInputElement

const hebMonth = document.getElementById('heb-month') as HTMLSelectElement
const hebLeap = document.getElementById('heb-leap') as HTMLInputElement
const hebYear = document.getElementById('heb-year') as HTMLInputElement
const hebDay = document.getElementById('heb-day') as HTMLInputElement

const islamicYear = document.getElementById('islamic-year') as HTMLInputElement
const islamicMonth = document.getElementById(
  'islamic-month'
) as HTMLSelectElement
const islamicDay = document.getElementById('islamic-day') as HTMLInputElement
const islamicWeekday = document.getElementById(
  'islamic-wday'
) as HTMLInputElement
const islamicLeap = document.getElementById('islamic-leap') as HTMLInputElement

const persYear = document.getElementById('pers-year') as HTMLInputElement
const persMonth = document.getElementById('pers-month') as HTMLSelectElement
const persDay = document.getElementById('pers-day') as HTMLInputElement
const persWeekday = document.getElementById('pers-wday') as HTMLInputElement
const persLeap = document.getElementById('pers-leap') as HTMLInputElement

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
    gregorianToJd(year, mon + 1, mday) +
    Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0

  julianDay = j

  // Update day of week in Gregorian box

  const weekday = jWday(j)
  gregWeekday.value = WEEKDAYS[weekday]

  // Update leap year status in Gregorian box

  gregLeap.value = NORM_LEAP[leapGregorian(year) ? 1 : 0]

  // Update Julian Calendar

  const julcal = jdToJulian(j)
  julianYear.value = String(julcal[0])
  julianMonth.selectedIndex = julcal[1] - 1
  julianDate.value = String(julcal[2])
  julianLeap.value = NORM_LEAP[leapJulian(julcal[0]) ? 1 : 0]
  julianWeekday.value = WEEKDAYS[weekday]

  // Update Hebrew Calendar

  const hebcal = jdToHebrew(j)
  if (hebrewLeap(hebcal[0])) {
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
  if (hmindex === 12 && !hebrewLeap(hebcal[0])) {
    hmindex = 14
  }
  switch (hebrewYearDays(hebcal[0])) {
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
        'Invalid year length: ' + hebrewYearDays(hebcal[0]) + ' days.'
      break
  }

  // Update Islamic Calendar

  const islcal = jdToIslamic(j)
  islamicYear.value = String(islcal[0])
  islamicMonth.selectedIndex = islcal[1] - 1
  islamicDay.value = String(islcal[2])
  islamicWeekday.value = 'Yawm ' + ISLAMIC_WEEKDAYS[weekday]
  islamicLeap.value = NORM_LEAP[leapIslamic(islcal[0]) ? 1 : 0]

  // Update Persian Astronomical Calendar

  const perscal = jdToPersiana(j)
  persYear.value = String(perscal[0])
  persMonth.selectedIndex = perscal[1] - 1
  persDay.value = String(perscal[2])
  persWeekday.value = PERSIAN_WEEKDAYS[weekday]
  persLeap.value = NORM_LEAP[leapPersiana(perscal[0]) ? 1 : 0]
}

// calcGregorian -- Perform calculation starting with a Gregorian date

function calcGregorian () {
  updateFromGregorian()
}

// calcJulian -- Perform calculation starting with a Julian date

function calcJulian () {
  const j = julianDay
  const date = jdToGregorian(j)
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
    julianToJd(
      Number(julianYear.value),
      julianMonth.selectedIndex + 1,
      Number(julianDate.value)
    )
  )
}

// calcHebrew -- Update from Hebrew calendar

function calcHebrew () {
  setJulian(
    hebrewToJd(
      Number(hebYear.value),
      hebMonth.selectedIndex + 1,
      Number(hebDay.value)
    )
  )
}

// calcIslamic -- Update from Islamic calendar

function calcIslamic () {
  setJulian(
    islamicToJd(
      Number(islamicYear.value),
      islamicMonth.selectedIndex + 1,
      Number(islamicDay.value)
    )
  )
}

// calcPersiana -- Update from Persian astronomical calendar

function calcPersiana () {
  setJulian(
    persianaToJd(
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
// MISCELLANY
//

// On page load, set current date and propagate
setDateToToday()
calcGregorian()

// Combined function for "Today" button
function todayAndCalc () {
  setDateToToday()
  calcGregorian()
}

// Click handlers
document
  .getElementById('greg-calc-btn')
  .addEventListener('click', calcGregorian)
document
  .getElementById('greg-today-btn')
  .addEventListener('click', todayAndCalc)
document
  .getElementById('julian-btn')
  .addEventListener('click', calcJulianCalendar)
document.getElementById('hebrew-btn').addEventListener('click', calcHebrew)
document.getElementById('islamic-btn').addEventListener('click', calcIslamic)
document.getElementById('pers-btn').addEventListener('click', calcPersiana)

// Keydown handlers
// These mimic clicks so that the extra functions will also be triggered
document.getElementById('gregorian').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('greg-calc-btn').click()
    ;(document.activeElement as HTMLElement).blur()
  }
})
document
  .getElementById('juliancalendar')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('julian-btn').click()
      ;(document.activeElement as HTMLElement).blur()
    }
  })
document.getElementById('hebrew').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('hebrew-btn').click()
    ;(document.activeElement as HTMLElement).blur()
  }
})
document.getElementById('islamic').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('islamic-btn').click()
    ;(document.activeElement as HTMLElement).blur()
  }
})
document.getElementById('persiana').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('pers-btn').click()
    ;(document.activeElement as HTMLElement).blur()
  }
})
