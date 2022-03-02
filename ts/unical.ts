/*
            JavaScript functions for positional astronomy

                  by John Walker -- September, MIM
                      http://www.fourmilab.ch/

                This program is in the public domain.
*/

// Frequently-used constants

const J2000 = 2451545.0 // Julian day of J2000 epoch
const JulianCentury = 36525.0 // Days in Julian century
const JulianMillennium = JulianCentury * 10 // Days in Julian millennium

const TropicalYear = 365.24219878 // Mean solar tropical year

// DTR -- Degrees to radians

function dtr (d: number) {
  return (d * Math.PI) / 180.0
}

// RTD -- Radians to degrees

function rtd (r: number) {
  return (r * 180.0) / Math.PI
}

// FIXANGLE -- Range reduce angle in degrees

function fixangle (a: number) {
  return a - 360.0 * Math.floor(a / 360.0)
}

// FIXANGR -- Range reduce angle in radians

function fixangr (a: number) {
  return a - 2 * Math.PI * Math.floor(a / (2 * Math.PI))
}

// DSIN -- Sine of an angle in degrees

function dsin (d: number) {
  return Math.sin(dtr(d))
}

// DCOS -- Cosine of an angle in degrees

function dcos (d: number) {
  return Math.cos(dtr(d))
}

// MOD -- Modulus function which works for non-integers

function mod (a: number, b: number) {
  return a - b * Math.floor(a / b)
}

// JWDAY -- Calculate day of week from Julian day

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export function jWday (j: number) {
  return mod(Math.floor(j + 1.5), 7)
}

/*  OBLIQEQ -- Calculate the obliquity of the ecliptic for a given
               Julian date. This uses Laskar's tenth-degree
               polynomial fit (J. Laskar, Astronomy and
               Astrophysics, Vol. 157, page 68 [1986]) which is
               accurate to within 0.01 arc second between AD 1000
               and AD 3000, and within a few seconds of arc for
               +/-10000 years around AD 2000. If we're outside the
               range in which this fit is valid (deep time) we
               simply return the J2000 value of the obliquity, which
               happens to be almost precisely the mean.  */

const oterms = [
  -4680.93, -1.55, 1999.25, -51.38, -249.67, -39.05, 7.12, 27.87, 5.79, 2.45,
]

function obliqeq (jd: number) {
  let eps: number, u: number, v: number

  v = u = (jd - J2000) / (JulianCentury * 100)

  eps = 23 + 26 / 60.0 + 21.448 / 3600.0

  if (Math.abs(u) < 1.0) {
    for (let i = 0; i < 10; i++) {
      eps += (oterms[i] / 3600.0) * v
      v *= u
    }
  }
  return eps
}

/*  Periodic terms for nutation in longitude (delta \Psi) and
    obliquity (delta \Epsilon) as given in table 21.A of
    Meeus, "Astronomical Algorithms," first edition.  */

// prettier-ignore
const nutArgMult = [
  0, 0, 0, 0, 1, -2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0,
  0, 1, 0, 0, -2, 1, 0, 2, 2, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, -2, -1, 0, 2, 2, -2,
  0, 1, 0, 0, -2, 0, 0, 2, 1, 0, 0, -1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2,
  0, -1, 2, 2, 0, 0, -1, 0, 1, 0, 0, 1, 2, 1, -2, 0, 2, 0, 0, 0, 0, -2, 2, 1, 2,
  0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, -2, 0, 1, 2, 2, 0, 0, 0, 2, 0, -2,
  0, 0, 2, 0, 0, 0, -1, 2, 1, 0, 2, 0, 0, 0, 2, 0, -1, 0, 1, -2, 2, 0, 2, 2, 0,
  1, 0, 0, 1, -2, 0, 1, 0, 1, 0, -1, 0, 0, 1, 0, 0, 2, -2, 0, 2, 0, -1, 2, 1, 2,
  0, 1, 2, 2, 0, 1, 0, 2, 2, -2, 1, 1, 0, 0, 0, -1, 0, 2, 2, 2, 0, 0, 2, 1, 2,
  0, 1, 0, 0, -2, 0, 2, 2, 2, -2, 0, 1, 2, 1, 2, 0, -2, 0, 1, 2, 0, 0, 0, 1, 0,
  -1, 1, 0, 0, -2, -1, 0, 2, 1, -2, 0, 0, 0, 1, 0, 0, 2, 2, 1, -2, 0, 2, 0, 1,
  -2, 1, 0, 2, 1, 0, 0, 1, -2, 0, -1, 0, 1, 0, 0, -2, 1, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 0, 1, 2, 0, -1, -1, 1, 0, 0, 0, 1, 1, 0, 0, 0, -1, 1, 2, 2, 2, -1, -1, 2,
  2, 0, 0, -2, 2, 2, 0, 0, 3, 2, 2, 2, -1, 0, 2, 2
]

// prettier-ignore
const nutArgCoeff = [
  -171996, -1742, 92095, 89, -13187, -16, 5736, -31, -2274, -2, 977, -5, 2062,
  2, -895, 5, 1426, -34, 54, -1, 712, 1, -7, 0, -517, 12, 224, -6, -386, -4,
  200, 0, -301, 0, 129, -1, 217, -5, -95, 3, -158, 0, 0, 0, 129, 1, -70, 0, 123,
  0, -53, 0, 63, 0, 0, 0, 63, 1, -33, 0, -59, 0, 26, 0, -58, -1, 32, 0, -51, 0,
  27, 0, 48, 0, 0, 0, 46, 0, -24, 0, -38, 0, 16, 0, -31, 0, 13, 0, 29, 0, 0, 0,
  29, 0, -12, 0, 26, 0, 0, 0, -22, 0, 0, 0, 21, 0, -10, 0, 17, -1, 0, 0, 16, 0,
  -8, 0, -16, 1, 7, 0, -15, 0, 9, 0, -13, 0, 7, 0, -12, 0, 6, 0, 11, 0, 0, 0,
  -10, 0, 5, 0, -8, 0, 3, 0, 7, 0, -3, 0, -7, 0, 0, 0, -7, 0, 3, 0, -7, 0, 3, 0,
  6, 0, 0, 0, 6, 0, -3, 0, 6, 0, -3, 0, -6, 0, 3, 0, -6, 0, 3, 0, 5, 0, 0, 0,
  -5, 0, 3, 0, -5, 0, 3, 0, -5, 0, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, -4,
  0, 0, 0, -4, 0, 0, 0, -4, 0, 0, 0, 3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3,
  0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0
]

/*  NUTATION -- Calculate the nutation in longitude, deltaPsi, and
                obliquity, deltaEpsilon for a given Julian date
                jd. Results are returned as a two element Array
                giving (deltaPsi, deltaEpsilon) in degrees.  */

function nutation (jd: number) {
  let i
  let j
  const t = (jd - 2451545.0) / 36525.0
  let t2
  const ta = []
  let dp = 0
  let de = 0
  let ang

  const t3 = t * (t2 = t * t)

  /*  Calculate angles. The correspondence between the elements
      of our array and the terms cited in Meeus are:

      ta[0] = D  ta[0] = M  ta[2] = M'  ta[3] = F  ta[4] = \Omega

  */

  ta[0] = dtr(297.850363 + 445267.11148 * t - 0.0019142 * t2 + t3 / 189474.0)
  ta[1] = dtr(357.52772 + 35999.05034 * t - 0.0001603 * t2 - t3 / 300000.0)
  ta[2] = dtr(134.96298 + 477198.867398 * t + 0.0086972 * t2 + t3 / 56250.0)
  ta[3] = dtr(93.27191 + 483202.017538 * t - 0.0036825 * t2 + t3 / 327270)
  ta[4] = dtr(125.04452 - 1934.136261 * t + 0.0020708 * t2 + t3 / 450000.0)

  /*  Range reduce the angles in case the sine and cosine functions
      don't do it as accurately or quickly.  */

  for (i = 0; i < 5; i++) {
    ta[i] = fixangr(ta[i])
  }

  const to10 = t / 10.0

  for (i = 0; i < 63; i++) {
    ang = 0
    for (j = 0; j < 5; j++) {
      if (nutArgMult[i * 5 + j] !== 0) {
        ang += nutArgMult[i * 5 + j] * ta[j]
      }
    }
    dp +=
      (nutArgCoeff[i * 4 + 0] + nutArgCoeff[i * 4 + 1] * to10) * Math.sin(ang)
    de +=
      (nutArgCoeff[i * 4 + 2] + nutArgCoeff[i * 4 + 3] * to10) * Math.cos(ang)
  }

  /*  Return the result, converting from ten thousandths of arc
      seconds to radians in the process.  */

  const deltaPsi = dp / (3600.0 * 10000.0)
  const deltaEpsilon = de / (3600.0 * 10000.0)

  return [deltaPsi, deltaEpsilon]
}

/*  DELTAT -- Determine the difference, in seconds, between
              Dynamical time and Universal time.  */

/*  Table of observed Delta T values at the beginning of
    even numbered years from 1620 through 2002.  */

// prettier-ignore
const deltaTtab = [
  121, 112, 103, 95, 88, 82, 77, 72, 68, 63, 60, 56, 53, 51, 48, 46, 44, 42, 40,
  38, 35, 33, 31, 29, 26, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9, 8, 7, 7, 7, 7,
  7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11,
  12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16,
  16, 16, 16, 16, 16, 15, 15, 14, 13, 13.1, 12.5, 12.2, 12, 12, 12, 12, 12, 12,
  11.9, 11.6, 11, 10.2, 9.2, 8.2, 7.1, 6.2, 5.6, 5.4, 5.3, 5.4, 5.6, 5.9, 6.2,
  6.5, 6.8, 7.1, 7.3, 7.5, 7.6, 7.7, 7.3, 6.2, 5.2, 2.7, 1.4, -1.2, -2.8, -3.8,
  -4.8, -5.5, -5.3, -5.6, -5.7, -5.9, -6, -6.3, -6.5, -6.2, -4.7, -2.8, -0.1,
  2.6, 5.3, 7.7, 10.4, 13.3, 16, 18.2, 20.2, 21.1, 22.4, 23.5, 23.8, 24.3, 24,
  23.9, 23.9, 23.7, 24, 24.3, 25.3, 26.2, 27.3, 28.2, 29.1, 30, 30.7, 31.4,
  32.2, 33.1, 34, 35, 36.5, 38.3, 40.2, 42.2, 44.5, 46.5, 48.5, 50.5, 52.2,
  53.8, 54.9, 55.8, 56.9, 58.3, 60, 61.6, 63, 65, 66.6
]

function deltat (year: number) {
  let dt, f, i, t

  if (year >= 1620 && year <= 2000) {
    i = Math.floor((year - 1620) / 2)
    f = (year - 1620) / 2 - i // Fractional part of year
    dt = deltaTtab[i] + (deltaTtab[i + 1] - deltaTtab[i]) * f
  } else {
    t = (year - 2000) / 100
    if (year < 948) {
      dt = 2177 + 497 * t + 44.1 * t * t
    } else {
      dt = 102 + 102 * t + 25.3 * t * t
      if (year > 2000 && year < 2100) {
        dt += 0.37 * (year - 2100)
      }
    }
  }
  return dt
}

/*  EQUINOX -- Determine the Julian Ephemeris Day of an
               equinox or solstice. The "which" argument
               selects the item to be computed:

                  0   March equinox
                  1   June solstice
                  2   September equinox
                  3   December solstice
*/

// Periodic terms to obtain true time

// prettier-ignore
const EquinoxpTerms = [
  485, 324.96, 1934.136, 203, 337.23, 32964.467, 199, 342.08, 20.186, 182,
  27.85, 445267.112, 156, 73.14, 45036.886, 136, 171.52, 22518.443, 77, 222.54,
  65928.934, 74, 296.72, 3034.906, 70, 243.58, 9037.513, 58, 119.81, 33718.147,
  52, 297.17, 150.678, 50, 21.02, 2281.226, 45, 247.54, 29929.562, 44, 325.15,
  31555.956, 29, 60.93, 4443.417, 18, 155.12, 67555.328, 17, 288.79, 4562.452,
  16, 198.04, 62894.029, 14, 199.76, 31436.921, 12, 95.39, 14577.848, 12,
  287.11, 31931.756, 12, 320.81, 34777.259, 9, 227.73, 1222.114, 8, 15.45,
  16859.074
]

const JDE0tab1000 = [
  [1721139.29189, 365242.1374, 0.06134, 0.00111, -0.00071],
  [1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025],
  [1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074],
  [1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006],
]

const JDE0tab2000 = [
  [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
  [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.0003],
  [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
  [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032],
]

function equinox (year: number, which: number) {
  let i, j, JDE0tab, S, Y

  /*  Initialise terms for mean equinox and solstices. We
      have two sets: one for years prior to 1000 and a second
      for subsequent years.  */

  if (year < 1000) {
    JDE0tab = JDE0tab1000
    Y = year / 1000
  } else {
    JDE0tab = JDE0tab2000
    Y = (year - 2000) / 1000
  }

  const JDE0 =
    JDE0tab[which][0] +
    JDE0tab[which][1] * Y +
    JDE0tab[which][2] * Y * Y +
    JDE0tab[which][3] * Y * Y * Y +
    JDE0tab[which][4] * Y * Y * Y * Y

  const T = (JDE0 - 2451545.0) / 36525
  const W = 35999.373 * T - 2.47
  const deltaL = 1 + 0.0334 * dcos(W) + 0.0007 * dcos(2 * W)

  // Sum the periodic terms for time T

  S = 0
  for (i = j = 0; i < 24; i++) {
    S +=
      EquinoxpTerms[j] * dcos(EquinoxpTerms[j + 1] + EquinoxpTerms[j + 2] * T)
    j += 3
  }

  const JDE = JDE0 + (S * 0.00001) / deltaL

  return JDE
}

/*  SUNPOS -- Position of the Sun. Please see the comments
              on the return statement at the end of this function
              which describe the array it returns. We return
              intermediate values because they are useful in a
              variety of other contexts.  */

function sunpos (jd: number) {
  let L0, M, Alpha, AlphaApp

  const T = (jd - J2000) / JulianCentury
  const T2 = T * T

  L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2
  L0 = fixangle(L0)

  M = 357.52911 + 35999.05029 * T + -0.0001537 * T2
  M = fixangle(M)

  const e = 0.016708634 + -0.000042037 * T + -0.0000001267 * T2

  const C =
    (1.914602 + -0.004817 * T + -0.000014 * T2) * dsin(M) +
    (0.019993 - 0.000101 * T) * dsin(2 * M) +
    0.000289 * dsin(3 * M)

  const sunLong = L0 + C
  const sunAnomaly = M + C
  const sunR = (1.000001018 * (1 - e * e)) / (1 + e * dcos(sunAnomaly))
  const Omega = 125.04 - 1934.136 * T
  const Lambda = sunLong + -0.00569 + -0.00478 * dsin(Omega)
  const epsilon0 = obliqeq(jd)
  const epsilon = epsilon0 + 0.00256 * dcos(Omega)

  Alpha = rtd(Math.atan2(dcos(epsilon0) * dsin(sunLong), dcos(sunLong)))
  Alpha = fixangle(Alpha)

  const Delta = rtd(Math.asin(dsin(epsilon0) * dsin(sunLong)))

  AlphaApp = rtd(Math.atan2(dcos(epsilon) * dsin(Lambda), dcos(Lambda)))
  AlphaApp = fixangle(AlphaApp)

  const DeltaApp = rtd(Math.asin(dsin(epsilon) * dsin(Lambda)))

  return [
    // Angular quantities are expressed in decimal degrees
    L0, // [0] Geometric mean longitude of the Sun
    M, // [1] Mean anomaly of the Sun
    e, // [2] Eccentricity of the Earth's orbit
    C, // [3] Sun's equation of the Centre
    sunLong, // [4] Sun's true longitude
    sunAnomaly, // [5] Sun's true anomaly
    sunR, // [6] Sun's radius vector in AU
    Lambda, // [7] Sun's apparent longitude at true equinox of the date
    Alpha, // [8] Sun's true right ascension
    Delta, // [9] Sun's true declination
    AlphaApp, // [10] Sun's apparent right ascension
    DeltaApp, // [11] Sun's apparent declination
  ]
}

/*  EQUATIONOFTIME -- Compute equation of time for a given moment.
                      Returns the equation of time as a fraction of
                      a day.  */

function equationOfTime (jd: number) {
  let E, L0

  const tau = (jd - J2000) / JulianMillennium

  L0 =
    280.4664567 +
    360007.6982779 * tau +
    0.03032028 * tau * tau +
    (tau * tau * tau) / 49931 +
    -((tau * tau * tau * tau) / 15300) +
    -((tau * tau * tau * tau * tau) / 2000000)

  L0 = fixangle(L0)

  const alpha = sunpos(jd)[10]
  const deltaPsi = nutation(jd)[0]
  const epsilon = obliqeq(jd) + nutation(jd)[1]

  E = L0 + -0.0057183 + -alpha + deltaPsi * dcos(epsilon)
  E = E - 20.0 * Math.floor(E / 20.0)
  E = E / (24 * 60)

  return E
}

/*
       JavaScript functions for the Fourmilab Calendar Converter

                  by John Walker -- September, MIM
              http://www.fourmilab.ch/documents/calendar/

                This program is in the public domain.
*/

export const NORM_LEAP = ['Normal year', 'Leap year']

// LEAP_GREGORIAN -- Is a given year in the Gregorian calendar a leap year?

export function leapGregorian (year: number) {
  return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0)
}

// GREGORIAN_TO_JD -- Determine Julian day number from Gregorian calendar date

const GREGORIAN_EPOCH = 1721425.5

export function gregorianToJd (year: number, month: number, day: number) {
  return (
    GREGORIAN_EPOCH -
    1 +
    365 * (year - 1) +
    Math.floor((year - 1) / 4) +
    -Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor(
      (367 * month - 362) / 12 +
        (month <= 2 ? 0 : leapGregorian(year) ? -1 : -2) +
        day
    )
  )
}

// JD_TO_GREGORIAN -- Calculate Gregorian calendar date from Julian day

export function jdToGregorian (jd: number) {
  let year

  const wjd = Math.floor(jd - 0.5) + 0.5
  const depoch = wjd - GREGORIAN_EPOCH
  const quadricent = Math.floor(depoch / 146097)
  const dqc = mod(depoch, 146097)
  const cent = Math.floor(dqc / 36524)
  const dcent = mod(dqc, 36524)
  const quad = Math.floor(dcent / 1461)
  const dquad = mod(dcent, 1461)
  const yindex = Math.floor(dquad / 365)
  year = quadricent * 400 + cent * 100 + quad * 4 + yindex
  if (!(cent === 4 || yindex === 4)) {
    year++
  }
  const yearday = wjd - gregorianToJd(year, 1, 1)
  const leapadj =
    wjd < gregorianToJd(year, 3, 1) ? 0 : leapGregorian(year) ? 1 : 2
  const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367)
  const day = wjd - gregorianToJd(year, month, 1) + 1

  return [year, month, day]
}

// JULIAN_TO_JD -- Determine Julian day number from Julian calendar date

export function leapJulian (year: number) {
  return mod(year, 4) === (year > 0 ? 0 : 3)
}

export function julianToJd (year: number, month: number, day: number) {
  // Adjust negative common era years to the zero-based notation we use.

  if (year < 1) {
    year++
  }

  // Algorithm as given in Meeus, Astronomical Algorithms, chapter 7, page 61

  if (month <= 2) {
    year--
    month += 12
  }

  return (
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day -
    1524.5
  )
}

// JD_TO_JULIAN -- Calculate Julian calendar date from Julian day

export function jdToJulian (td: number) {
  let year

  td += 0.5
  const z = Math.floor(td)

  const a = z
  const b = a + 1524
  const c = Math.floor((b - 122.1) / 365.25)
  const d = Math.floor(365.25 * c)
  const e = Math.floor((b - d) / 30.6001)

  const month = Math.floor(e < 14 ? e - 1 : e - 13)
  year = Math.floor(month > 2 ? c - 4716 : c - 4715)
  const day = b - d - Math.floor(30.6001 * e)

  /*  If year is less than 1, subtract one to convert from
        a zero based date system to the common era system in
        which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).  */

  if (year < 1) {
    year--
  }

  return [year, month, day]
}

// HEBREW_TO_JD -- Determine Julian day from Hebrew date

const HEBREW_EPOCH = 347995.5

// Is a given Hebrew year a leap year ?

export function hebrewLeap (year: number) {
  return mod(year * 7 + 1, 19) < 7
}

// How many months are there in a Hebrew year (12 = normal, 13 = leap)

function hebrewYearMonths (year: number) {
  return hebrewLeap(year) ? 13 : 12
}

// Test for delay of start of new year and to avoid
// Sunday, Wednesday, and Friday as start of the new year.

function hebrewDelay1 (year: number) {
  const months = Math.floor((235 * year - 234) / 19)
  const parts = 12084 + 13753 * months
  let day = months * 29 + Math.floor(parts / 25920)

  if (mod(3 * (day + 1), 7) < 3) {
    day++
  }
  return day
}

// Check for delay in start of new year due to length of adjacent years

function hebrewDelay2 (year: number) {
  const last = hebrewDelay1(year - 1)
  const present = hebrewDelay1(year)
  const next = hebrewDelay1(year + 1)

  return next - present === 356 ? 2 : present - last === 382 ? 1 : 0
}

// How many days are in a Hebrew year ?

export function hebrewYearDays (year: number) {
  return hebrewToJd(year + 1, 7, 1) - hebrewToJd(year, 7, 1)
}

// How many days are in a given month of a given year

function hebrewMonthDays (year: number, month: number) {
  // First of all, dispose of fixed-length 29 day months

  if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 10 ||
    month === 13
  ) {
    return 29
  }

  // If it's not a leap year, Adar has 29 days

  if (month === 12 && !hebrewLeap(year)) {
    return 29
  }

  // If it's Heshvan, days depend on length of year

  if (month === 8 && mod(hebrewYearDays(year), 10) !== 5) {
    return 29
  }

  // Similarly, Kislev varies with the length of year

  if (month === 9 && mod(hebrewYearDays(year), 10) === 3) {
    return 29
  }

  // Nope, it's a 30 day month

  return 30
}

// Finally, wrap it all up into...

export function hebrewToJd (year: number, month: number, day: number) {
  let jd, mon

  const months = hebrewYearMonths(year)
  jd = HEBREW_EPOCH + hebrewDelay1(year) + hebrewDelay2(year) + day + 1

  if (month < 7) {
    for (mon = 7; mon <= months; mon++) {
      jd += hebrewMonthDays(year, mon)
    }
    for (mon = 1; mon < month; mon++) {
      jd += hebrewMonthDays(year, mon)
    }
  } else {
    for (mon = 7; mon < month; mon++) {
      jd += hebrewMonthDays(year, mon)
    }
  }

  return jd
}

/*  JD_TO_HEBREW -- Convert Julian date to Hebrew date.
                    This works by making multiple calls to
                    the inverse function, and this is very
                    slow.  */

export function jdToHebrew (jd: number) {
  let year, month, i

  jd = Math.floor(jd) + 0.5
  const count = Math.floor(((jd - HEBREW_EPOCH) * 98496.0) / 35975351.0)
  year = count - 1
  for (i = count; jd >= hebrewToJd(i, 7, 1); i++) {
    year++
  }
  const first = jd < hebrewToJd(year, 1, 1) ? 7 : 1
  month = first
  for (i = first; jd > hebrewToJd(year, i, hebrewMonthDays(year, i)); i++) {
    month++
  }
  const day = jd - hebrewToJd(year, month, 1) + 1
  return [year, month, day]
}

// LEAP_ISLAMIC -- Is a given year a leap year in the Islamic calendar?

export function leapIslamic (year: number) {
  return (year * 11 + 14) % 30 < 11
}

// ISLAMIC_TO_JD -- Determine Julian day from Islamic date

const ISLAMIC_EPOCH = 1948439.5
export const ISLAMIC_WEEKDAYS = [
  'al-Ahad',
  'al-Ithnayn',
  'al-Thulatha\u2019',
  'al-Arbi\u2018a\u2019',
  'al-Khamis',
  'al-Jum\u2018ah',
  'al-Sabt',
]

export function islamicToJd (year: number, month: number, day: number) {
  return (
    day +
    Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 +
    Math.floor((3 + 11 * year) / 30) +
    ISLAMIC_EPOCH -
    1
  )
}

// JD_TO_ISLAMIC -- Calculate Islamic date from Julian day

export function jdToIslamic (jd: number) {
  jd = Math.floor(jd) + 0.5
  const year = Math.floor((30 * (jd - ISLAMIC_EPOCH) + 10646) / 10631)
  const month = Math.min(
    12,
    Math.ceil((jd - (29 + islamicToJd(year, 1, 1))) / 29.5) + 1
  )
  const day = jd - islamicToJd(year, month, 1) + 1
  return [year, month, day]
}

/*  TEHRAN_EQUINOX -- Determine Julian day and fraction of the
                      March equinox at the Tehran meridian in
                      a given Gregorian year.  */

function tehranEquinox (year: number) {
  // March equinox in dynamical time
  const equJED = equinox(year, 0)

  // Correct for delta T to obtain Universal time
  const equJD = equJED - deltat(year) / (24 * 60 * 60)

  // Apply the equation of time to yield the apparent time at Greenwich
  const equAPP = equJD + equationOfTime(equJED)

  /*  Finally, we must correct for the constant difference between
        the Greenwich meridian andthe time zone standard for
        Iran Standard time, 52°30' to the East.  */

  const dtTehran = (52 + 30 / 60.0 + 0 / (60.0 * 60.0)) / 360
  const equTehran = equAPP + dtTehran

  return equTehran
}

/*  TEHRAN_EQUINOX_JD -- Calculate Julian day during which the
                         March equinox, reckoned from the Tehran
                         meridian, occurred for a given Gregorian
                         year.  */

function tehranEquinoxJd (year: number) {
  const ep = tehranEquinox(year)
  const epg = Math.floor(ep)

  return epg
}

/*  PERSIANA_YEAR -- Determine the year in the Persian
                     astronomical calendar in which a
                     given Julian day falls. Returns an
                     array of two elements:

                        [0] Persian year
                        [1] Julian day number containing
                            equinox for this year
*/

const PERSIAN_EPOCH = 1948320.5
export const PERSIAN_WEEKDAYS = [
  'Yekshanbeh',
  'Doshanbeh',
  'Sehshanbeh',
  'Chaharshanbeh',
  'Panjshanbeh',
  'Jom\u2018eh',
  'Shanbeh',
]

function persianaYear (jd: number) {
  let guess = jdToGregorian(jd)[0] - 2
  let lasteq
  let nexteq

  lasteq = tehranEquinoxJd(guess)
  while (lasteq > jd) {
    guess--
    lasteq = tehranEquinoxJd(guess)
  }
  nexteq = lasteq - 1
  while (!(lasteq <= jd && jd < nexteq)) {
    lasteq = nexteq
    guess++
    nexteq = tehranEquinoxJd(guess)
  }
  const adr = Math.round((lasteq - PERSIAN_EPOCH) / TropicalYear) + 1

  return [adr, lasteq]
}

/*  JD_TO_PERSIANA -- Calculate date in the Persian astronomical
                      calendar from Julian day.  */

export function jdToPersiana (jd: number) {
  let day

  jd = Math.floor(jd) + 0.5
  const adr = persianaYear(jd)
  const year = adr[0]
  const equinox = adr[1]
  day = Math.floor((jd - equinox) / 30) + 1

  const yday = Math.floor(jd) - persianaToJd(year, 1, 1) + 1
  const month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30)
  day = Math.floor(jd) - persianaToJd(year, month, 1) + 1

  return [year, month, day]
}

/*  PERSIANA_TO_JD -- Obtain Julian day from a given Persian
                      astronomical calendar date.  */

export function persianaToJd (year: number, month: number, day: number) {
  let adr, guess

  guess = PERSIAN_EPOCH - 1 + TropicalYear * (year - 1 - 1)
  adr = [year - 1, 0]

  while (adr[0] < year) {
    adr = persianaYear(guess)
    guess = adr[1] + (TropicalYear + 2)
  }
  const equinox = adr[1]

  const jd =
    equinox + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) + (day - 1)
  return jd
}

/*  LEAP_PERSIANA -- Is a given year a leap year in the Persian
                     astronomical calendar?  */

export function leapPersiana (year: number) {
  return persianaToJd(year + 1, 1, 1) - persianaToJd(year, 1, 1) > 365
}
