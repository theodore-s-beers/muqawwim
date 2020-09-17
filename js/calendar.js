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

function dtr (d) {
  return (d * Math.PI) / 180.0
}

// RTD -- Radians to degrees

function rtd (r) {
  return (r * 180.0) / Math.PI
}

// FIXANGLE -- Range reduce angle in degrees

function fixangle (a) {
  return a - 360.0 * Math.floor(a / 360.0)
}

// FIXANGR -- Range reduce angle in radians

function fixangr (a) {
  return a - 2 * Math.PI * Math.floor(a / (2 * Math.PI))
}

// DSIN -- Sine of an angle in degrees

function dsin (d) {
  return Math.sin(dtr(d))
}

// DCOS -- Cosine of an angle in degrees

function dcos (d) {
  return Math.cos(dtr(d))
}

// MOD -- Modulus function which works for non-integers

function mod (a, b) {
  return a - b * Math.floor(a / b)
}

// AMOD -- Modulus function which returns numerator if modulus is zero

function amod (a, b) {
  return mod(a - 1, b) + 1
}

/*  JHMS -- Convert Julian time to hour, minutes, and seconds,
            returned as a three-element array.  */

function jhms (j) {
  j += 0.5 // Astronomical to civil
  const ij = (j - Math.floor(j)) * 86400.0 + 0.5
  return [
    Math.floor(ij / 3600),
    Math.floor((ij / 60) % 60),
    Math.floor(ij % 60)
  ]
}

// JWDAY -- Calculate day of week from Julian day

const Weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

function jwday (j) {
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
  -4680.93,
  -1.55,
  1999.25,
  -51.38,
  -249.67,
  -39.05,
  7.12,
  27.87,
  5.79,
  2.45
]

function obliqeq (jd) {
  let eps, u, v, i

  v = u = (jd - J2000) / (JulianCentury * 100)

  eps = 23 + 26 / 60.0 + 21.448 / 3600.0

  if (Math.abs(u) < 1.0) {
    for (i = 0; i < 10; i++) {
      eps += (oterms[i] / 3600.0) * v
      v *= u
    }
  }
  return eps
}

/*  Periodic terms for nutation in longiude (delta \Psi) and
    obliquity (delta \Epsilon) as given in table 21.A of
    Meeus, "Astronomical Algorithms," first edition.  */

// prettier-ignore
const nutArgMult = [
  0, 0, 0, 0, 1, -2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, -2, 1, 0, 2, 2, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, -2, -1, 0, 2, 2, -2, 0, 1, 0, 0, -2, 0, 0, 2, 1, 0, 0, -1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 0, -1, 2, 2, 0, 0, -1, 0, 1, 0, 0, 1, 2, 1, -2, 0, 2, 0, 0, 0, 0, -2, 2, 1, 2, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, -2, 0, 1, 2, 2, 0, 0, 0, 2, 0, -2, 0, 0, 2, 0, 0, 0, -1, 2, 1, 0, 2, 0, 0, 0, 2, 0, -1, 0, 1, -2, 2, 0, 2, 2, 0, 1, 0, 0, 1, -2, 0, 1, 0, 1, 0, -1, 0, 0, 1, 0, 0, 2, -2, 0, 2, 0, -1, 2, 1, 2, 0, 1, 2, 2, 0, 1, 0, 2, 2, -2, 1, 1, 0, 0, 0, -1, 0, 2, 2, 2, 0, 0, 2, 1, 2, 0, 1, 0, 0, -2, 0, 2, 2, 2, -2, 0, 1, 2, 1, 2, 0, -2, 0, 1, 2, 0, 0, 0, 1, 0, -1, 1, 0, 0, -2, -1, 0, 2, 1, -2, 0, 0, 0, 1, 0, 0, 2, 2, 1, -2, 0, 2, 0, 1, -2, 1, 0, 2, 1, 0, 0, 1, -2, 0, -1, 0, 1, 0, 0, -2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, -1, -1, 1, 0, 0, 0, 1, 1, 0, 0, 0, -1, 1, 2, 2, 2, -1, -1, 2, 2, 0, 0, -2, 2, 2, 0, 0, 3, 2, 2, 2, -1, 0, 2, 2
]

// prettier-ignore
const nutArgCoeff = [
  -171996, -1742, 92095, 89, -13187, -16, 5736, -31, -2274, -2, 977, -5, 2062, 2, -895, 5, 1426, -34, 54, -1, 712, 1, -7, 0, -517, 12, 224, -6, -386, -4, 200, 0, -301, 0, 129, -1, 217, -5, -95, 3, -158, 0, 0, 0, 129, 1, -70, 0, 123, 0, -53, 0, 63, 0, 0, 0, 63, 1, -33, 0, -59, 0, 26, 0, -58, -1, 32, 0, -51, 0, 27, 0, 48, 0, 0, 0, 46, 0, -24, 0, -38, 0, 16, 0, -31, 0, 13, 0, 29, 0, 0, 0, 29, 0, -12, 0, 26, 0, 0, 0, -22, 0, 0, 0, 21, 0, -10, 0, 17, -1, 0, 0, 16, 0, -8, 0, -16, 1, 7, 0, -15, 0, 9, 0, -13, 0, 7, 0, -12, 0, 6, 0, 11, 0, 0, 0, -10, 0, 5, 0, -8, 0, 3, 0, 7, 0, -3, 0, -7, 0, 0, 0, -7, 0, 3, 0, -7, 0, 3, 0, 6, 0, 0, 0, 6, 0, -3, 0, 6, 0, -3, 0, -6, 0, 3, 0, -6, 0, 3, 0, 5, 0, 0, 0, -5, 0, 3, 0, -5, 0, 3, 0, -5, 0, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, -4, 0, 0, 0, -4, 0, 0, 0, -4, 0, 0, 0, 3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0, -3, 0, 0, 0
]

/*  NUTATION -- Calculate the nutation in longitude, deltaPsi, and
                obliquity, deltaEpsilon for a given Julian date
                jd. Results are returned as a two element Array
                giving (deltaPsi, deltaEpsilon) in degrees.  */

function nutation (jd) {
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
  121, 112, 103, 95, 88, 82, 77, 72, 68, 63, 60, 56, 53, 51, 48, 46, 44, 42, 40, 38, 35, 33, 31, 29, 26, 24, 22, 20, 18, 16, 14, 12, 11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 14, 13, 13.1, 12.5, 12.2, 12, 12, 12, 12, 12, 12, 11.9, 11.6, 11, 10.2, 9.2, 8.2, 7.1, 6.2, 5.6, 5.4, 5.3, 5.4, 5.6, 5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.6, 7.7, 7.3, 6.2, 5.2, 2.7, 1.4, -1.2, -2.8, -3.8, -4.8, -5.5, -5.3, -5.6, -5.7, -5.9, -6, -6.3, -6.5, -6.2, -4.7, -2.8, -0.1, 2.6, 5.3, 7.7, 10.4, 13.3, 16, 18.2, 20.2, 21.1, 22.4, 23.5, 23.8, 24.3, 24, 23.9, 23.9, 23.7, 24, 24.3, 25.3, 26.2, 27.3, 28.2, 29.1, 30, 30.7, 31.4, 32.2, 33.1, 34, 35, 36.5, 38.3, 40.2, 42.2, 44.5, 46.5, 48.5, 50.5, 52.2, 53.8, 54.9, 55.8, 56.9, 58.3, 60, 61.6, 63, 65, 66.6
]

function deltat (year) {
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
  485, 324.96, 1934.136, 203, 337.23, 32964.467, 199, 342.08, 20.186, 182, 27.85, 445267.112, 156, 73.14, 45036.886, 136, 171.52, 22518.443, 77, 222.54, 65928.934, 74, 296.72, 3034.906, 70, 243.58, 9037.513, 58, 119.81, 33718.147, 52, 297.17, 150.678, 50, 21.02, 2281.226, 45, 247.54, 29929.562, 44, 325.15, 31555.956, 29, 60.93, 4443.417, 18, 155.12, 67555.328, 17, 288.79, 4562.452, 16, 198.04, 62894.029, 14, 199.76, 31436.921, 12, 95.39, 14577.848, 12, 287.11, 31931.756, 12, 320.81, 34777.259, 9, 227.73, 1222.114, 8, 15.45, 16859.074
]

const JDE0tab1000 = [
  [1721139.29189, 365242.1374, 0.06134, 0.00111, -0.00071],
  [1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025],
  [1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074],
  [1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006]
]

const JDE0tab2000 = [
  [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
  [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.0003],
  [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
  [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032]
]

function equinox (year, which) {
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

function sunpos (jd) {
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
    DeltaApp // [11] Sun's apparent declination
  ]
}

/*  EQUATIONOFTIME -- Compute equation of time for a given moment.
                      Returns the equation of time as a fraction of
                      a day.  */

function equationOfTime (jd) {
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

/*  You may notice that a variety of array variables logically local
    to functions are declared globally here. In JavaScript, construction
    of an array variable from source code occurs as the code is
    interpreted. Making these variables pseudo-globals permits us
    to avoid overhead constructing and disposing of them in each
    call on the function in which whey are used.  */

const J0000 = 1721424.5 // Julian date of Gregorian epoch: 0000-01-01
const J1970 = 2440587.5 // Julian date at Unix epoch: 1970-01-01
const JMJD = 2400000.5 // Epoch of Modified Julian Date system
const J1900 = 2415020.5 // Epoch (day 1) of Excel 1900 date system (PC)
const J1904 = 2416480.5 // Epoch (day 0) of Excel 1904 date system (Mac)

const NormLeap = ['Normal year', 'Leap year']

/*  WEEKDAY_BEFORE -- Return Julian date of given weekday (0 = Sunday)
                      in the seven days ending on jd.  */

function weekdayBefore (weekday, jd) {
  return jd - jwday(jd - weekday)
}

/*  SEARCH_WEEKDAY -- Determine the Julian date for:

          weekday     Day of week desired, 0 = Sunday
          jd          Julian date to begin search
          direction   1 = next weekday, -1 = last weekday
          offset      Offset from jd to begin search

*/

function searchWeekday (weekday, jd, direction, offset) {
  return weekdayBefore(weekday, jd + direction * offset)
}

// Utility weekday functions, just wrappers for searchWeekday

function nextWeekday (weekday, jd) {
  return searchWeekday(weekday, jd, 1, 7)
}

function previousWeekday (weekday, jd) {
  return searchWeekday(weekday, jd, -1, 1)
}

// LEAP_GREGORIAN -- Is a given year in the Gregorian calendar a leap year?

function leapGregorian (year) {
  return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0)
}

// GREGORIAN_TO_JD -- Determine Julian day number from Gregorian calendar date

const GREGORIAN_EPOCH = 1721425.5

function gregorianToJd (year, month, day) {
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

function jdToGregorian (jd) {
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

// ISO_TO_JULIAN -- Return Julian day of given ISO year, week, and day

function nWeeks (weekday, jd, nthweek) {
  let j = 7 * nthweek

  if (nthweek > 0) {
    j += previousWeekday(weekday, jd)
  } else {
    j += nextWeekday(weekday, jd)
  }
  return j
}

function isoToJulian (year, week, day) {
  return day + nWeeks(0, gregorianToJd(year - 1, 12, 28), week)
}

// JD_TO_ISO -- Return array of ISO (year, week, day) for Julian day

function jdToIso (jd) {
  let year, day

  year = jdToGregorian(jd - 3)[0]
  if (jd >= isoToJulian(year + 1, 1, 1)) {
    year++
  }
  const week = Math.floor((jd - isoToJulian(year, 1, 1)) / 7) + 1
  day = jwday(jd)
  if (day === 0) {
    day = 7
  }
  return [year, week, day]
}

// ISO_DAY_TO_JULIAN -- Return Julian day of given ISO year, and day of year

function isoDayToJulian (year, day) {
  return day - 1 + gregorianToJd(year, 1, 1)
}

// JD_TO_ISO_DAY -- Return array of ISO (year, dayOfYear) for Julian day

function jdToIsoDay (jd) {
  const year = jdToGregorian(jd)[0]
  const day = Math.floor(jd - gregorianToJd(year, 1, 1)) + 1
  return [year, day]
}

// PAD -- Pad a string to a given length with a given fill character.

function pad (str, howlong, padwith) {
  let s = str.toString()

  while (s.length < howlong) {
    s = padwith + s
  }
  return s
}

// JULIAN_TO_JD -- Determine Julian day number from Julian calendar date

function leapJulian (year) {
  return mod(year, 4) === (year > 0 ? 0 : 3)
}

function julianToJd (year, month, day) {
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

function jdToJulian (td) {
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

function hebrewLeap (year) {
  return mod(year * 7 + 1, 19) < 7
}

// How many months are there in a Hebrew year (12 = normal, 13 = leap)

function hebrewYearMonths (year) {
  return hebrewLeap(year) ? 13 : 12
}

// Test for delay of start of new year and to avoid
// Sunday, Wednesday, and Friday as start of the new year.

function hebrewDelay1 (year) {
  const months = Math.floor((235 * year - 234) / 19)
  const parts = 12084 + 13753 * months
  let day = months * 29 + Math.floor(parts / 25920)

  if (mod(3 * (day + 1), 7) < 3) {
    day++
  }
  return day
}

// Check for delay in start of new year due to length of adjacent years

function hebrewDelay2 (year) {
  const last = hebrewDelay1(year - 1)
  const present = hebrewDelay1(year)
  const next = hebrewDelay1(year + 1)

  return next - present === 356 ? 2 : present - last === 382 ? 1 : 0
}

// How many days are in a Hebrew year ?

function hebrewYearDays (year) {
  return hebrewToJd(year + 1, 7, 1) - hebrewToJd(year, 7, 1)
}

// How many days are in a given month of a given year

function hebrewMonthDays (year, month) {
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

function hebrewToJd (year, month, day) {
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

function jdToHebrew (jd) {
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

/*  EQUINOXE_A_PARIS -- Determine Julian day and fraction of the
                        September equinox at the Paris meridian in
                        a given Gregorian year.  */

function equinoxeAParis (year) {
  // September equinox in dynamical time
  const equJED = equinox(year, 2)

  // Correct for delta T to obtain Universal time
  const equJD = equJED - deltat(year) / (24 * 60 * 60)

  // Apply the equation of time to yield the apparent time at Greenwich
  const equAPP = equJD + equationOfTime(equJED)

  /*  Finally, we must correct for the constant difference between
        the Greenwich meridian and that of Paris, 2°20'15" to the
        East.  */

  const dtParis = (2 + 20 / 60.0 + 15 / (60 * 60.0)) / 360
  const equParis = equAPP + dtParis

  return equParis
}

/*  PARIS_EQUINOXE_JD -- Calculate Julian day during which the
                         September equinox, reckoned from the Paris
                         meridian, occurred for a given Gregorian
                         year.  */

function parisEquinoxeJd (year) {
  const ep = equinoxeAParis(year)
  const epg = Math.floor(ep - 0.5) + 0.5

  return epg
}

/*  ANNEE_DE_LA_REVOLUTION -- Determine the year in the French
                              revolutionary calendar in which a
                              given Julian day falls. Returns an
                              array of two elements:

                                  [0] Année de la Révolution
                                  [1] Julian day number containing
                                      equinox for this year
*/

const FRENCH_REVOLUTIONARY_EPOCH = 2375839.5

function anneeDeLaRevolution (jd) {
  let guess = jdToGregorian(jd)[0] - 2
  let lasteq
  let nexteq

  lasteq = parisEquinoxeJd(guess)
  while (lasteq > jd) {
    guess--
    lasteq = parisEquinoxeJd(guess)
  }
  nexteq = lasteq - 1
  while (!(lasteq <= jd && jd < nexteq)) {
    lasteq = nexteq
    guess++
    nexteq = parisEquinoxeJd(guess)
  }
  const adr =
    Math.round((lasteq - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1

  return [adr, lasteq]
}

/*  JD_TO_FRENCH_REVOLUTIONARY -- Calculate date in the French Revolutionary
                                  calendar from Julian day. The five or six
                                  "sansculottides" are considered a thirteenth
                                  month in the results of this function.  */

function jdToFrenchRevolutionary (jd) {
  let jour

  jd = Math.floor(jd) + 0.5
  const adr = anneeDeLaRevolution(jd)
  const an = adr[0]
  const equinoxe = adr[1]
  const mois = Math.floor((jd - equinoxe) / 30) + 1
  jour = (jd - equinoxe) % 30
  const decade = Math.floor(jour / 10) + 1
  jour = (jour % 10) + 1

  return [an, mois, decade, jour]
}

/*  FRENCH_REVOLUTIONARY_TO_JD -- Obtain Julian day from a given French
                                  Revolutionary calendar date.  */

function frenchRevolutionaryToJd (an, mois, decade, jour) {
  let adr, guess

  guess = FRENCH_REVOLUTIONARY_EPOCH + TropicalYear * (an - 1 - 1)
  adr = [an - 1, 0]

  while (adr[0] < an) {
    adr = anneeDeLaRevolution(guess)
    guess = adr[1] + (TropicalYear + 2)
  }
  const equinoxe = adr[1]

  const jd = equinoxe + 30 * (mois - 1) + 10 * (decade - 1) + (jour - 1)
  return jd
}

// LEAP_ISLAMIC -- Is a given year a leap year in the Islamic calendar?

function leapIslamic (year) {
  return (year * 11 + 14) % 30 < 11
}

// ISLAMIC_TO_JD -- Determine Julian day from Islamic date

const ISLAMIC_EPOCH = 1948439.5
const ISLAMIC_WEEKDAYS = [
  'al-Ahad',
  'al-Ithnayn',
  'al-Thulatha\u2019',
  'al-Arbi\u2018a\u2019',
  'al-Khamis',
  'al-Jum\u2018ah',
  'al-Sabt'
]

function islamicToJd (year, month, day) {
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

function jdToIslamic (jd) {
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

function tehranEquinox (year) {
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

function tehranEquinoxJd (year) {
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
const PERSIAN_WEEKDAYS = [
  'Yekshanbeh',
  'Doshanbeh',
  'Sehshanbeh',
  'Chaharshanbeh',
  'Panjshanbeh',
  'Jom\u2018eh',
  'Shanbeh'
]

function persianaYear (jd) {
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

function jdToPersiana (jd) {
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

function persianaToJd (year, month, day) {
  let adr, guess

  guess = PERSIAN_EPOCH - 1 + TropicalYear * (year - 1 - 1)
  adr = [year - 1, 0]

  while (adr[0] < year) {
    adr = persianaYear(guess)
    guess = adr[1] + (TropicalYear + 2)
  }
  const equinox = adr[1]

  const jd =
    equinox +
    (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) +
    (day - 1)
  return jd
}

/*  LEAP_PERSIANA -- Is a given year a leap year in the Persian
                     astronomical calendar?  */

function leapPersiana (year) {
  return persianaToJd(year + 1, 1, 1) - persianaToJd(year, 1, 1) > 365
}

// LEAP_PERSIAN -- Is a given year a leap year in the Persian calendar?

function leapPersian (year) {
  return (
    ((((year - (year > 0 ? 474 : 473)) % 2820) + 474 + 38) * 682) % 2816 < 682
  )
}

// PERSIAN_TO_JD -- Determine Julian day from Persian date

function persianToJd (year, month, day) {
  const epbase = year - (year >= 0 ? 474 : 473)
  const epyear = 474 + mod(epbase, 2820)

  return (
    day +
    (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) +
    Math.floor((epyear * 682 - 110) / 2816) +
    (epyear - 1) * 365 +
    Math.floor(epbase / 2820) * 1029983 +
    (PERSIAN_EPOCH - 1)
  )
}

// JD_TO_PERSIAN -- Calculate Persian date from Julian day

function jdToPersian (jd) {
  let year, ycycle, aux1, aux2

  jd = Math.floor(jd) + 0.5

  const depoch = jd - persianToJd(475, 1, 1)
  const cycle = Math.floor(depoch / 1029983)
  const cyear = mod(depoch, 1029983)
  if (cyear === 1029982) {
    ycycle = 2820
  } else {
    aux1 = Math.floor(cyear / 366)
    aux2 = mod(cyear, 366)
    ycycle =
      Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1
  }
  year = ycycle + 2820 * cycle + 474
  if (year <= 0) {
    year--
  }
  const yday = jd - persianToJd(year, 1, 1) + 1
  const month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30)
  const day = jd - persianToJd(year, month, 1) + 1
  return [year, month, day]
}

// MAYAN_COUNT_TO_JD -- Determine Julian day from Mayan long count

const MAYAN_COUNT_EPOCH = 584282.5

function mayanCountToJd (baktun, katun, tun, uinal, kin) {
  return (
    MAYAN_COUNT_EPOCH +
    baktun * 144000 +
    katun * 7200 +
    tun * 360 +
    uinal * 20 +
    kin
  )
}

// JD_TO_MAYAN_COUNT -- Calculate Mayan long count from Julian day

function jdToMayanCount (jd) {
  let d

  jd = Math.floor(jd) + 0.5
  d = jd - MAYAN_COUNT_EPOCH
  const baktun = Math.floor(d / 144000)
  d = mod(d, 144000)
  const katun = Math.floor(d / 7200)
  d = mod(d, 7200)
  const tun = Math.floor(d / 360)
  d = mod(d, 360)
  const uinal = Math.floor(d / 20)
  const kin = mod(d, 20)

  return [baktun, katun, tun, uinal, kin]
}

// JD_TO_MAYAN_HAAB -- Determine Mayan Haab "month" and day from Julian day

const MAYAN_HAAB_MONTHS = [
  'Pop',
  'Uo',
  'Zip',
  'Zotz',
  'Tzec',
  'Xul',
  'Yaxkin',
  'Mol',
  'Chen',
  'Yax',
  'Zac',
  'Ceh',
  'Mac',
  'Kankin',
  'Muan',
  'Pax',
  'Kayab',
  'Cumku',
  'Uayeb'
]

function jdToMayanHaab (jd) {
  jd = Math.floor(jd) + 0.5
  const lcount = jd - MAYAN_COUNT_EPOCH
  const day = mod(lcount + 8 + (18 - 1) * 20, 365)

  return [Math.floor(day / 20) + 1, mod(day, 20)]
}

// JD_TO_MAYAN_TZOLKIN -- Determine Mayan Tzolkin "month" and day from Julian day

const MAYAN_TZOLKIN_MONTHS = [
  'Imix',
  'Ik',
  'Akbal',
  'Kan',
  'Chicchan',
  'Cimi',
  'Manik',
  'Lamat',
  'Muluc',
  'Oc',
  'Chuen',
  'Eb',
  'Ben',
  'Ix',
  'Men',
  'Cib',
  'Caban',
  'Etznab',
  'Cauac',
  'Ahau'
]

function jdToMayanTzolkin (jd) {
  jd = Math.floor(jd) + 0.5
  const lcount = jd - MAYAN_COUNT_EPOCH
  return [amod(lcount + 20, 20), amod(lcount + 4, 13)]
}

// INDIAN_CIVIL_TO_JD -- Obtain Julian day for Indian Civil date

const INDIAN_CIVIL_WEEKDAYS = [
  'ravivara',
  'somavara',
  'mangalavara',
  'budhavara',
  'brahaspativara',
  'sukravara',
  'sanivara'
]

function indianCivilToJd (year, month, day) {
  let jd, m

  const gyear = year + 78
  const leap = leapGregorian(gyear) // Is this a leap year ?
  const start = gregorianToJd(gyear, 3, leap ? 21 : 22)
  const Caitra = leap ? 31 : 30

  if (month === 1) {
    jd = start + (day - 1)
  } else {
    jd = start + Caitra
    m = month - 2
    m = Math.min(m, 5)
    jd += m * 31
    if (month >= 8) {
      m = month - 7
      jd += m * 30
    }
    jd += day - 1
  }

  return jd
}

// JD_TO_INDIAN_CIVIL -- Calculate Indian Civil date from Julian day

function jdToIndianCivil (jd) {
  let year, yday, mday

  const Saka = 79 - 1 // Offset in years from Saka era to Gregorian epoch
  const start = 80 // Day offset between Saka and Gregorian

  jd = Math.floor(jd) + 0.5
  const greg = jdToGregorian(jd) // Gregorian date for Julian day
  const leap = leapGregorian(greg[0]) // Is this a leap year?
  year = greg[0] - Saka // Tentative year in Saka era
  const greg0 = gregorianToJd(greg[0], 1, 1) // JD at start of Gregorian year
  yday = jd - greg0 // Day number (0 based) in Gregorian year
  const Caitra = leap ? 31 : 30 // Days in Caitra this year

  if (yday < start) {
    // Day is at the end of the preceding Saka year
    year--
    yday += Caitra + 31 * 5 + 30 * 3 + 10 + start
  }

  let month, day

  yday -= start
  if (yday < Caitra) {
    month = 1
    day = yday + 1
  } else {
    mday = yday - Caitra
    if (mday < 31 * 5) {
      month = Math.floor(mday / 31) + 2
      day = (mday % 31) + 1
    } else {
      mday -= 31 * 5
      month = Math.floor(mday / 30) + 7
      day = (mday % 30) + 1
    }
  }

  return [year, month, day]
}

/*  updateFromGregorian -- Update all calendars from Gregorian.
                           "Why not Julian date?" you ask. Because
                           starting from Gregorian guarantees we're
                           already snapped to an integral second, so
                           we don't get roundoff errors in other
                           calendars.  */

function updateFromGregorian () {
  const year = Number(document.gregorian.year.value)
  const mon = document.gregorian.month.selectedIndex
  const mday = Number(document.gregorian.day.value)
  let min = Number(document.gregorian.min.value)
  let sec = Number(document.gregorian.sec.value)
  let hour = (min = sec = 0)
  hour = Number(document.gregorian.hour.value)

  // Update Julian day

  const j =
    gregorianToJd(year, mon + 1, mday) +
    Math.floor(sec + 60 * (min + 60 * hour) + 0.5) / 86400.0

  document.julianday.day.value = j
  document.modifiedjulianday.day.value = j - JMJD

  // Update day of week in Gregorian box

  let weekday = jwday(j)
  document.gregorian.wday.value = Weekdays[weekday]

  // Update leap year status in Gregorian box

  document.gregorian.leap.value = NormLeap[leapGregorian(year) ? 1 : 0]

  // Update Julian Calendar

  const julcal = jdToJulian(j)
  document.juliancalendar.year.value = julcal[0]
  document.juliancalendar.month.selectedIndex = julcal[1] - 1
  document.juliancalendar.day.value = julcal[2]
  document.juliancalendar.leap.value = NormLeap[leapJulian(julcal[0]) ? 1 : 0]
  weekday = jwday(j)
  document.juliancalendar.wday.value = Weekdays[weekday]

  // Update Hebrew Calendar

  const hebcal = jdToHebrew(j)
  if (hebrewLeap(hebcal[0])) {
    document.hebrew.month.options.length = 13
    document.hebrew.month.options[11] = new Option('Adar I') // eslint-disable-line no-undef
    document.hebrew.month.options[12] = new Option('Veadar') // eslint-disable-line no-undef
  } else {
    document.hebrew.month.options.length = 12
    document.hebrew.month.options[11] = new Option('Adar') // eslint-disable-line no-undef
  }
  document.hebrew.year.value = hebcal[0]
  document.hebrew.month.selectedIndex = hebcal[1] - 1
  document.hebrew.day.value = hebcal[2]
  let hmindex = hebcal[1]
  if (hmindex === 12 && !hebrewLeap(hebcal[0])) {
    hmindex = 14
  }
  document.hebrew.hebmonth.src = 'figures/hebrew_month_0.gif'
  switch (hebrewYearDays(hebcal[0])) {
    case 353:
      document.hebrew.leap.value = 'Common deficient (353 days)'
      break

    case 354:
      document.hebrew.leap.value = 'Common regular (354 days)'
      break

    case 355:
      document.hebrew.leap.value = 'Common complete (355 days)'
      break

    case 383:
      document.hebrew.leap.value = 'Embolismic deficient (383 days)'
      break

    case 384:
      document.hebrew.leap.value = 'Embolismic regular (384 days)'
      break

    case 385:
      document.hebrew.leap.value = 'Embolismic complete (385 days)'
      break

    default:
      document.hebrew.leap.value =
        'Invalid year length: ' + hebrewYearDays(hebcal[0]) + ' days.'
      break
  }

  // Update Islamic Calendar

  const islcal = jdToIslamic(j)
  document.islamic.year.value = islcal[0]
  document.islamic.month.selectedIndex = islcal[1] - 1
  document.islamic.day.value = islcal[2]
  document.islamic.wday.value = 'Yawm ' + ISLAMIC_WEEKDAYS[weekday]
  document.islamic.leap.value = NormLeap[leapIslamic(islcal[0]) ? 1 : 0]

  // Update Persian Calendar

  let perscal = jdToPersian(j)
  document.persian.year.value = perscal[0]
  document.persian.month.selectedIndex = perscal[1] - 1
  document.persian.day.value = perscal[2]
  document.persian.wday.value = PERSIAN_WEEKDAYS[weekday]
  document.persian.leap.value = NormLeap[leapPersian(perscal[0]) ? 1 : 0]

  // Update Persian Astronomical Calendar

  perscal = jdToPersiana(j)
  document.persiana.year.value = perscal[0]
  document.persiana.month.selectedIndex = perscal[1] - 1
  document.persiana.day.value = perscal[2]
  document.persiana.wday.value = PERSIAN_WEEKDAYS[weekday]
  document.persiana.leap.value = NormLeap[leapPersiana(perscal[0]) ? 1 : 0]

  // Update Mayan Calendars

  const mayCountcal = jdToMayanCount(j)
  document.mayancount.baktun.value = mayCountcal[0]
  document.mayancount.katun.value = mayCountcal[1]
  document.mayancount.tun.value = mayCountcal[2]
  document.mayancount.uinal.value = mayCountcal[3]
  document.mayancount.kin.value = mayCountcal[4]
  const mayhaabcal = jdToMayanHaab(j)
  document.mayancount.haab.value =
    '' + mayhaabcal[1] + ' ' + MAYAN_HAAB_MONTHS[mayhaabcal[0] - 1]
  const maytzolkincal = jdToMayanTzolkin(j)
  document.mayancount.tzolkin.value =
    '' + maytzolkincal[1] + ' ' + MAYAN_TZOLKIN_MONTHS[maytzolkincal[0] - 1]

  // Update Indian Civil Calendar

  const indcal = jdToIndianCivil(j)
  document.indiancivilcalendar.year.value = indcal[0]
  document.indiancivilcalendar.month.selectedIndex = indcal[1] - 1
  document.indiancivilcalendar.day.value = indcal[2]
  document.indiancivilcalendar.weekday.value = INDIAN_CIVIL_WEEKDAYS[weekday]
  document.indiancivilcalendar.leap.value =
    NormLeap[leapGregorian(indcal[0] + 78) ? 1 : 0]

  // Update French Republican Calendar

  const frrcal = jdToFrenchRevolutionary(j)
  document.french.an.value = frrcal[0]
  document.french.mois.selectedIndex = frrcal[1] - 1
  document.french.decade.selectedIndex = frrcal[2] - 1
  document.french.jour.selectedIndex =
    (frrcal[1] <= 12 ? frrcal[3] : frrcal[3] + 11) - 1

  // Update Gregorian serial number

  if (document.gregserial != null) {
    document.gregserial.day.value = j - J0000
  }

  // Update Excel 1900 and 1904 day serial numbers

  document.excelserial1900.day.value =
    j -
    J1900 +
    1 +
    /*  Microsoft marching morons thought 1900 was a leap year.
                Adjust dates after 1900-02-28 to compensate for their
                idiocy.  */
    (j > 2415078.5 ? 1 : 0)
  document.excelserial1904.day.value = j - J1904

  // Update Unix time()

  const utime = (j - J1970) * (60 * 60 * 24 * 1000)
  document.unixtime.time.value = Math.round(utime / 1000)

  // Update ISO Week

  const isoweek = jdToIso(j)
  document.isoweek.year.value = isoweek[0]
  document.isoweek.week.value = isoweek[1]
  document.isoweek.day.value = isoweek[2]

  // Update ISO Day

  const isoday = jdToIsoDay(j)
  document.isoday.year.value = isoday[0]
  document.isoday.day.value = isoday[1]
}

// calcGregorian -- Perform calculation starting with a Gregorian date

function calcGregorian () {
  updateFromGregorian()
}

// calcJulian -- Perform calculation starting with a Julian date

function calcJulian () {
  const j = Number(document.julianday.day.value)
  const date = jdToGregorian(j)
  const time = jhms(j)
  document.gregorian.year.value = date[0]
  document.gregorian.month.selectedIndex = date[1] - 1
  document.gregorian.day.value = date[2]
  document.gregorian.hour.value = pad(time[0], 2, ' ')
  document.gregorian.min.value = pad(time[1], 2, '0')
  document.gregorian.sec.value = pad(time[2], 2, '0')
  updateFromGregorian()
}

// setJulian -- Set Julian date and update all calendars

function setJulian (j) {
  document.julianday.day.value = Number(j)
  calcJulian()
}

// calcModifiedJulian -- Update from Modified Julian day

function calcModifiedJulian () {
  setJulian(Number(document.modifiedjulianday.day.value) + JMJD)
}

// calcJulianCalendar -- Update from Julian calendar

function calcJulianCalendar () {
  setJulian(
    julianToJd(
      Number(document.juliancalendar.year.value),
      document.juliancalendar.month.selectedIndex + 1,
      Number(document.juliancalendar.day.value)
    )
  )
}

// calcHebrew -- Update from Hebrew calendar

// eslint-disable-next-line no-unused-vars
function calcHebrew () {
  setJulian(
    hebrewToJd(
      Number(document.hebrew.year.value),
      document.hebrew.month.selectedIndex + 1,
      Number(document.hebrew.day.value)
    )
  )
}

// calcIslamic -- Update from Islamic calendar

// eslint-disable-next-line no-unused-vars
function calcIslamic () {
  setJulian(
    islamicToJd(
      Number(document.islamic.year.value),
      document.islamic.month.selectedIndex + 1,
      Number(document.islamic.day.value)
    )
  )
}

// calcPersian -- Update from Persian calendar

// eslint-disable-next-line no-unused-vars
function calcPersian () {
  setJulian(
    persianToJd(
      Number(document.persian.year.value),
      document.persian.month.selectedIndex + 1,
      Number(document.persian.day.value)
    )
  )
}

// calcPersiana -- Update from Persian astronomical calendar

// eslint-disable-next-line no-unused-vars
function calcPersiana () {
  setJulian(
    persianaToJd(
      Number(document.persiana.year.value),
      document.persiana.month.selectedIndex + 1,
      Number(document.persiana.day.value)
    ) + 0.5
  )
}

// calcMayanCount -- Update from the Mayan Long Count

// eslint-disable-next-line no-unused-vars
function calcMayanCount () {
  setJulian(
    mayanCountToJd(
      Number(document.mayancount.baktun.value),
      Number(document.mayancount.katun.value),
      Number(document.mayancount.tun.value),
      Number(document.mayancount.uinal.value),
      Number(document.mayancount.kin.value)
    )
  )
}

// calcIndianCivilCalendar -- Update from Indian Civil Calendar

// eslint-disable-next-line no-unused-vars
function calcIndianCivilCalendar () {
  setJulian(
    indianCivilToJd(
      Number(document.indiancivilcalendar.year.value),
      document.indiancivilcalendar.month.selectedIndex + 1,
      Number(document.indiancivilcalendar.day.value)
    )
  )
}

// calcFrench -- Update from French Republican calendar

// eslint-disable-next-line no-unused-vars
function calcFrench () {
  let decade, j, mois

  j = document.french.jour.selectedIndex
  decade = document.french.decade.selectedIndex
  mois = document.french.mois.selectedIndex

  /*  If the currently selected day is one of the sansculottides,
        adjust the index to be within that period and force the
        decade to zero and the month to 12, designating the
        intercalary interval.  */

  if (j > 9) {
    j -= 11
    decade = 0
    mois = 12
  }

  /*  If the selected month is the pseudo-month of the five or
        six sansculottides, ensure that the decade is 0 and the day
        number doesn't exceed six. To avoid additional overhead, we
        don't test whether a day number of 6 is valid for this year,
        but rather simply permit it to wrap into the first day of
        the following year if this is a 365 day year.  */

  if (mois === 12) {
    decade = 0
    if (j > 5) {
      j = 0
    }
  }

  setJulian(
    frenchRevolutionaryToJd(
      Number(document.french.an.value),
      mois + 1,
      decade + 1,
      j + 1
    )
  )
}

// calcGregSerial -- Update from Gregorian serial day number

// eslint-disable-next-line no-unused-vars
function calcGregSerial () {
  setJulian(Number(document.gregserial.day.value) + J0000)
}

// calcExcelSerial1900 -- Perform calculation starting with an Excel 1900 serial date

function calcExcelSerial1900 () {
  let d = Number(document.excelserial1900.day.value)

  /* Idiot Kode Kiddies didn't twig to the fact
       (proclaimed in 1582) that 1900 wasn't a leap year,
       so every Excel day number in every database on Earth
       which represents a date subsequent to February 28,
       1900 is off by one. Note that there is no
       acknowledgement of this betrayal or warning of its
       potential consequences in the Excel help file. Thank
       you so much Mister Talking Paper Clip. Some day
       we're going to celebrate your extinction like it was
       February 29 ... 1900.  */

  if (d > 60) {
    d--
  }

  setJulian(d - 1 + J1900)
}

// calcExcelSerial1904 -- Perform calculation starting with an Excel 1904 serial date

function calcExcelSerial1904 () {
  setJulian(Number(document.excelserial1904.day.value) + J1904)
}

// calcUnixTime -- Update from specified Unix time() value

function calcUnixTime () {
  const t = Number(document.unixtime.time.value)

  setJulian(J1970 + t / (60 * 60 * 24))
}

// calcIsoWeek -- Update from specified ISO year, week, and day

function calcIsoWeek () {
  const year = Number(document.isoweek.year.value)
  const week = Number(document.isoweek.week.value)
  const day = Number(document.isoweek.day.value)

  setJulian(isoToJulian(year, week, day))
}

// calcIsoDay -- Update from specified ISO year and day of year

function calcIsoDay () {
  const year = Number(document.isoday.year.value)
  const day = Number(document.isoday.day.value)

  setJulian(isoDayToJulian(year, day))
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

  let y = today.getYear()
  if (y < 1000) {
    y += 1900
  }

  document.gregorian.year.value = y
  document.gregorian.month.selectedIndex = today.getMonth()
  document.gregorian.day.value = today.getDate()
  document.gregorian.hour.value = document.gregorian.min.value = document.gregorian.sec.value =
    '00'
}

/*  presetDataToRequest -- Preset the Gregorian date to the
                           date requested by the URL
                           search field.  */

// eslint-disable-next-line no-unused-vars
function presetDataToRequest (s) {
  const eq = s.indexOf('=')
  let set = false
  if (eq !== -1) {
    const calendar = s.substring(0, eq)
    const date = decodeURIComponent(s.substring(eq + 1))
    let d = date.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)
    if (calendar.toLowerCase() === 'gregorian') {
      d = date.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)
      if (d != null) {
        // Sanity check date and time components
        if (
          d[2] >= 1 &&
          d[2] <= 12 &&
          d[3] >= 1 &&
          d[3] <= 31 &&
          (d[4] === undefined ||
            (d[4].substring(1) >= 0 && d[4].substring(1) <= 23)) &&
          (d[5] === undefined ||
            (d[5].substring(1) >= 0 && d[5].substring(1) <= 59)) &&
          (d[6] === undefined ||
            (d[6].substring(1) >= 0 && d[6].substring(1) <= 59))
        ) {
          document.gregorian.year.value = d[1]
          document.gregorian.month.selectedIndex = d[2] - 1
          document.gregorian.day.value = Number(d[3])
          document.gregorian.hour.value =
            d[4] === undefined ? '00' : d[4].substring(1)
          document.gregorian.min.value =
            d[5] === undefined ? '00' : d[5].substring(1)
          document.gregorian.sec.value =
            d[6] === undefined ? '00' : d[6].substring(1)
          calcGregorian()
          set = true
        } else {
          console.log(
            'Invalid Gregorian date "' + date + '" in search request'
          )
        }
      } else {
        console.log('Invalid Gregorian date "' + date + '" in search request')
      }
    } else if (calendar.toLowerCase() === 'julian') {
      d = date.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)
      if (d != null) {
        // Sanity check date and time components
        if (
          d[2] >= 1 &&
          d[2] <= 12 &&
          d[3] >= 1 &&
          d[3] <= 31 &&
          (d[4] === undefined ||
            (d[4].substring(1) >= 0 && d[4].substring(1) <= 23)) &&
          (d[5] === undefined ||
            (d[5].substring(1) >= 0 && d[5].substring(1) <= 59)) &&
          (d[6] === undefined ||
            (d[6].substring(1) >= 0 && d[6].substring(1) <= 59))
        ) {
          document.juliancalendar.year.value = d[1]
          document.juliancalendar.month.selectedIndex = d[2] - 1
          document.juliancalendar.day.value = Number(d[3])
          calcJulianCalendar()
          document.gregorian.hour.value =
            d[4] === undefined ? '00' : d[4].substring(1)
          document.gregorian.min.value =
            d[5] === undefined ? '00' : d[5].substring(1)
          document.gregorian.sec.value =
            d[6] === undefined ? '00' : d[6].substring(1)
          set = true
        } else {
          console.log(
            'Invalid Julian calendar date "' + date + '" in search request'
          )
        }
      } else {
        console.log(
          'Invalid Julian calendar date "' + date + '" in search request'
        )
      }
    } else if (calendar.toLowerCase() === 'jd') {
      d = date.match(/^(-?\d+\.?\d*)/)
      if (d != null) {
        setJulian(d[1])
        set = 1
      } else {
        console.log('Invalid Julian day "' + date + '" in search request')
      }
    } else if (calendar.toLowerCase() === 'mjd') {
      d = date.match(/^(-?\d+\.?\d*)/)
      if (d != null) {
        document.modifiedjulianday.day.value = d[1]
        calcModifiedJulian()
        set = 1
      } else {
        console.log(
          'Invalid Modified Julian day "' + date + '" in search request'
        )
      }
    } else if (calendar.toLowerCase() === 'unixtime') {
      d = date.match(/^(-?\d+\.?\d*)/)
      if (d != null) {
        document.unixtime.time.value = d[1]
        calcUnixTime()
        set = 1
      } else {
        console.log(
          'Invalid Modified Julian day "' + date + '" in search request'
        )
      }
    } else if (calendar.toLowerCase() === 'iso') {
      if ((d = date.match(/^(-?\d+)-(\d\d\d)/)) != null) {
        document.isoday.year.value = d[1]
        document.isoday.day.value = d[2]
        calcIsoDay()
        set = 1
      } else if ((d = date.match(/^(-?\d+)-?W(\d\d)-?(\d)/i)) != null) {
        document.isoweek.year.value = d[1]
        document.isoweek.week.value = d[2]
        document.isoweek.day.value = d[3]
        calcIsoWeek()
        set = 1
      } else {
        console.log('Invalid ISO-8601 date "' + date + '" in search request')
      }
    } else if (calendar.toLowerCase() === 'excel') {
      d = date.match(/^(-?\d+\.?\d*)/)
      if (d != null) {
        document.excelserial1900.day.value = d[1]
        calcExcelSerial1900()
        set = 1
      } else {
        console.log(
          'Invalid Excel serial day (1900/PC) "' + date + '" in search request'
        )
      }
    } else if (calendar.toLowerCase() === 'excel1904') {
      d = date.match(/^(-?\d+\.?\d*)/)
      if (d != null) {
        document.excelserial1904.day.value = d[1]
        calcExcelSerial1904()
        set = 1
      } else {
        console.log(
          'Invalid Excel serial day (1904/Mac) "' + date + '" in search request'
        )
      }
    } else {
      console.log('Invalid calendar "' + calendar + '" in search request')
    }
  } else {
    console.log('Invalid search request: ' + s)
  }

  if (!set) {
    setDateToToday()
    calcGregorian()
  }
}
