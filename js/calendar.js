var J0000 = 1721424.5,
  J1970 = 2440587.5,
  JMJD = 2400000.5,
  J1900 = 2415020.5,
  J1904 = 2416480.5,
  NormLeap = ["Normal year", "Leap year"];
function weekday_before(b, c) {
  return c - jwday(c - b);
}
function search_weekday(c, e, a, b) {
  return weekday_before(c, e + a * b);
}
function nearest_weekday(b, c) {
  return search_weekday(b, c, 1, 3);
}
function next_weekday(b, c) {
  return search_weekday(b, c, 1, 7);
}
function next_or_current_weekday(b, c) {
  return search_weekday(b, c, 1, 6);
}
function previous_weekday(b, c) {
  return search_weekday(b, c, -1, 1);
}
function previous_or_current_weekday(b, c) {
  return search_weekday(b, c, 1, 0);
}
function TestSomething() {}
function leap_gregorian(a) {
  return 0 == a % 4 && (0 != a % 100 || 0 == a % 400);
}
var GREGORIAN_EPOCH = 1721425.5;
function gregorian_to_jd(d, c, a) {
  return (
    GREGORIAN_EPOCH -
    1 +
    365 * (d - 1) +
    Math.floor((d - 1) / 4) +
    -Math.floor((d - 1) / 100) +
    Math.floor((d - 1) / 400) +
    Math.floor(
      (367 * c - 362) / 12 + (2 >= c ? 0 : leap_gregorian(d) ? -1 : -2) + a
    )
  );
}
function jd_to_gregorian(a) {
  a = Math.floor(a - 0.5) + 0.5;
  var b = a - GREGORIAN_EPOCH,
    c = Math.floor(b / 146097),
    d = mod(b, 146097);
  b = Math.floor(d / 36524);
  var e = mod(d, 36524);
  return (
    (d = Math.floor(e / 1461)),
    (e = mod(e, 1461)),
    (e = Math.floor(e / 365)),
    (c = 400 * c + 100 * b + 4 * d + e),
    4 != b && 4 != e && c++,
    (b = a - gregorian_to_jd(c, 1, 1)),
    (d = a < gregorian_to_jd(c, 3, 1) ? 0 : leap_gregorian(c) ? 1 : 2),
    (month = Math.floor((12 * (b + d) + 373) / 367)),
    (day = a - gregorian_to_jd(c, month, 1) + 1),
    [c, month, day]
  );
}
function n_weeks(c, e, a) {
  var b = 7 * a;
  return 0 < a ? b + previous_weekday(c, e) : b + next_weekday(c, e);
}
function iso_to_julian(d, c, a) {
  return a + n_weeks(0, gregorian_to_jd(d - 1, 12, 28), c);
}
function jd_to_iso(a) {
  var b = jd_to_gregorian(a - 3)[0];
  a >= iso_to_julian(b + 1, 1, 1) && b++;
  var d = Math.floor((a - iso_to_julian(b, 1, 1)) / 7) + 1;
  return (a = jwday(a)), 0 == a && (a = 7), [b, d, a];
}
function iso_day_to_julian(b, c) {
  return c - 1 + gregorian_to_jd(b, 1, 1);
}
function jd_to_iso_day(a) {
  var b = jd_to_gregorian(a)[0];
  return (a = Math.floor(a - gregorian_to_jd(b, 1, 1)) + 1), [b, a];
}
function pad(a, d, e) {
  for (a = a.toString(); a.length < d; ) a = e + a;
  return a;
}
var JULIAN_EPOCH = 1721423.5;
function leap_julian(a) {
  return mod(a, 4) == (0 < a ? 0 : 3);
}
function julian_to_jd(a, b, d) {
  return (
    1 > a && a++,
    2 >= b && (a--, (b += 12)),
    Math.floor(365.25 * (a + 4716)) + Math.floor(30.6001 * (b + 1)) + d - 1524.5
  );
}
function jd_to_julian(a) {
  var b = Math.floor(a + 0.5) + 1524,
    d = Math.floor((b - 122.1) / 365.25),
    e = Math.floor(365.25 * d),
    i = Math.floor((b - e) / 30.6001);
  return (
    (a = Math.floor(14 > i ? i - 1 : i - 13)),
    (d = Math.floor(2 < a ? d - 4716 : d - 4715)),
    (b = b - e - Math.floor(30.6001 * i)),
    1 > d && d--,
    [d, a, b]
  );
}
var HEBREW_EPOCH = 347995.5;
function hebrew_leap(a) {
  return 7 > mod(7 * a + 1, 19);
}
function hebrew_year_months(a) {
  return hebrew_leap(a) ? 13 : 12;
}
function hebrew_delay_1(a) {
  return (
    (a = Math.floor((235 * a - 234) / 19)),
    (day = 29 * a + Math.floor((12084 + 13753 * a) / 25920)),
    3 > mod(3 * (day + 1), 7) && day++,
    day
  );
}
function hebrew_delay_2(d) {
  var c = hebrew_delay_1(d - 1),
    a = hebrew_delay_1(d);
  return 356 == hebrew_delay_1(d + 1) - a ? 2 : 382 == a - c ? 1 : 0;
}
function hebrew_year_days(a) {
  return hebrew_to_jd(a + 1, 7, 1) - hebrew_to_jd(a, 7, 1);
}
function hebrew_month_days(b, c) {
  return 2 != c &&
    4 != c &&
    6 != c &&
    10 != c &&
    13 != c &&
    (12 != c || hebrew_leap(b)) &&
    (8 != c || 5 == mod(hebrew_year_days(b), 10)) &&
    (9 != c || 3 != mod(hebrew_year_days(b), 10))
    ? 30
    : 29;
}
function hebrew_to_jd(c, d, a) {
  var e,
    f = hebrew_year_months(c);
  if (
    ((a = HEBREW_EPOCH + hebrew_delay_1(c) + hebrew_delay_2(c) + a + 1), 7 > d)
  ) {
    for (e = 7; e <= f; e++) a += hebrew_month_days(c, e);
    e = 1;
  } else e = 7;
  for (; e < d; e++) a += hebrew_month_days(c, e);
  return a;
}
function jd_to_hebrew(a) {
  var b;
  a = Math.floor(a) + 0.5;
  var c = Math.floor((98496 * (a - HEBREW_EPOCH)) / 35975351),
    d = c - 1;
  for (b = c; a >= hebrew_to_jd(b, 7, 1); b++) d++;
  for (
    c = b = a < hebrew_to_jd(d, 1, 1) ? 7 : 1;
    a > hebrew_to_jd(d, b, hebrew_month_days(d, b));
    b++
  )
    c++;
  return (a = a - hebrew_to_jd(d, c, 1) + 1), [d, c, a];
}
function equinoxe_a_paris(b) {
  var c = equinox(b, 2);
  return (
    c - deltat(b) / 86400 + equationOfTime(c) + (2 + 20 / 60 + 15 / 3600) / 360
  );
}
function paris_equinoxe_jd(a) {
  return (a = equinoxe_a_paris(a)), Math.floor(a - 0.5) + 0.5;
}
var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;
function annee_da_la_revolution(b) {
  var c,
    d,
    e = jd_to_gregorian(b)[0] - 2;
  for (c = paris_equinoxe_jd(e); c > b; ) e--, (c = paris_equinoxe_jd(e));
  for (d = c - 1; !(c <= b && b < d); )
    (c = d), e++, (d = paris_equinoxe_jd(e));
  return [Math.round((c - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1, c];
}
function jd_to_french_revolutionary(a) {
  a = Math.floor(a) + 0.5;
  var b = annee_da_la_revolution(a),
    c = b[0],
    g = b[1];
  return (
    (b = Math.floor((a - g) / 30) + 1),
    (a = (a - g) % 30),
    [c, b, Math.floor(a / 10) + 1, (a % 10) + 1]
  );
}
function french_revolutionary_to_jd(e, f, a, b) {
  var d,
    g = FRENCH_REVOLUTIONARY_EPOCH + TropicalYear * (e - 1 - 1);
  for (d = [e - 1, 0]; d[0] < e; )
    (d = annee_da_la_revolution(g)), (g = d[1] + (TropicalYear + 2));
  return d[1] + 30 * (f - 1) + 10 * (a - 1) + (b - 1);
}
function leap_islamic(a) {
  return 11 > (11 * a + 14) % 30;
}
var ISLAMIC_EPOCH = 1948439.5,
  ISLAMIC_WEEKDAYS = [
    "al-Ahad",
    "al-Ithnayn",
    "al-Thulatha\u2019",
    "al-Arbi\u2018a\u2019",
    "al-Khamis",
    "al-Jum\u2018ah",
    "al-Sabt"
  ];
function islamic_to_jd(d, c, a) {
  return (
    a +
    Math.ceil(29.5 * (c - 1)) +
    354 * (d - 1) +
    Math.floor((3 + 11 * d) / 30) +
    ISLAMIC_EPOCH -
    1
  );
}
function jd_to_islamic(a) {
  a = Math.floor(a) + 0.5;
  var d = Math.floor((30 * (a - ISLAMIC_EPOCH) + 10646) / 10631),
    e = Math.min(12, Math.ceil((a - (29 + islamic_to_jd(d, 1, 1))) / 29.5) + 1);
  return (a = a - islamic_to_jd(d, e, 1) + 1), [d, e, a];
}
function tehran_equinox(b) {
  var c = equinox(b, 0);
  return c - deltat(b) / 86400 + equationOfTime(c) + 52.5 / 360;
}
function tehran_equinox_jd(a) {
  return (a = tehran_equinox(a)), Math.floor(a);
}
var PERSIAN_EPOCH = 1948320.5,
  PERSIAN_WEEKDAYS = [
    "Yekshanbeh",
    "Doshanbeh",
    "Sehshanbeh",
    "Chaharshanbeh",
    "Panjshanbeh",
    "Jom\u2018eh",
    "Shanbeh"
  ];
function persiana_year(b) {
  var c,
    d,
    e = jd_to_gregorian(b)[0] - 2;
  for (c = tehran_equinox_jd(e); c > b; ) e--, (c = tehran_equinox_jd(e));
  for (d = c - 1; !(c <= b && b < d); )
    (c = d), e++, (d = tehran_equinox_jd(e));
  return [Math.round((c - PERSIAN_EPOCH) / TropicalYear) + 1, c];
}
function jd_to_persiana(a) {
  a = Math.floor(a) + 0.5;
  var d = persiana_year(a)[0],
    e = Math.floor(a) - persiana_to_jd(d, 1, 1) + 1;
  return (
    (e = 186 >= e ? Math.ceil(e / 31) : Math.ceil((e - 6) / 30)),
    (a = Math.floor(a) - persiana_to_jd(d, e, 1) + 1),
    [d, e, a]
  );
}
function persiana_to_jd(c, e, a) {
  var b,
    f = PERSIAN_EPOCH - 1 + TropicalYear * (c - 1 - 1);
  for (b = [c - 1, 0]; b[0] < c; )
    (b = persiana_year(f)), (f = b[1] + (TropicalYear + 2));
  return b[1] + (7 >= e ? 31 * (e - 1) : 30 * (e - 1) + 6) + (a - 1);
}
function leap_persiana(a) {
  return 365 < persiana_to_jd(a + 1, 1, 1) - persiana_to_jd(a, 1, 1);
}
function leap_persian(a) {
  return 682 > (682 * (((a - (0 < a ? 474 : 473)) % 2820) + 512)) % 2816;
}
function persian_to_jd(a, c, f) {
  a -= 0 <= a ? 474 : 473;
  var b = 474 + mod(a, 2820);
  return (
    f +
    (7 >= c ? 31 * (c - 1) : 30 * (c - 1) + 6) +
    Math.floor((682 * b - 110) / 2816) +
    365 * (b - 1) +
    1029983 * Math.floor(a / 2820) +
    (PERSIAN_EPOCH - 1)
  );
}
function jd_to_persian(a) {
  a = Math.floor(a) + 0.5;
  var b = a - persian_to_jd(475, 1, 1),
    c = Math.floor(b / 1029983),
    d = mod(b, 1029983);
  return (
    1029982 == d
      ? (b = 2820)
      : ((b = Math.floor(d / 366)),
        (d = mod(d, 366)),
        (b = Math.floor((2134 * b + 2816 * d + 2815) / 1028522) + b + 1)),
    (c = b + 2820 * c + 474),
    0 >= c && c--,
    (b = a - persian_to_jd(c, 1, 1) + 1),
    (b = 186 >= b ? Math.ceil(b / 31) : Math.ceil((b - 6) / 30)),
    (a = a - persian_to_jd(c, b, 1) + 1),
    [c, b, a]
  );
}
var MAYAN_COUNT_EPOCH = 584282.5;
function mayan_count_to_jd(e, f, a, b, d) {
  return MAYAN_COUNT_EPOCH + 144e3 * e + 7200 * f + 360 * a + 20 * b + d;
}
function jd_to_mayan_count(a) {
  a = Math.floor(a) + 0.5;
  var b = a - MAYAN_COUNT_EPOCH;
  (a = Math.floor(b / 144e3)), (b = mod(b, 144e3));
  var e = Math.floor(b / 7200);
  b = mod(b, 7200);
  var h = Math.floor(b / 360);
  b = mod(b, 360);
  var d = Math.floor(b / 20);
  return (b = mod(b, 20)), [a, e, h, d, b];
}
var MAYAN_HAAB_MONTHS = [
  "Pop",
  "Uo",
  "Zip",
  "Zotz",
  "Tzec",
  "Xul",
  "Yaxkin",
  "Mol",
  "Chen",
  "Yax",
  "Zac",
  "Ceh",
  "Mac",
  "Kankin",
  "Muan",
  "Pax",
  "Kayab",
  "Cumku",
  "Uayeb"
];
function jd_to_mayan_haab(a) {
  return (
    (a = Math.floor(a) + 0.5),
    (a = mod(a - MAYAN_COUNT_EPOCH + 348, 365)),
    [Math.floor(a / 20) + 1, mod(a, 20)]
  );
}
var MAYAN_TZOLKIN_MONTHS = [
  "Imix",
  "Ik",
  "Akbal",
  "Kan",
  "Chicchan",
  "Cimi",
  "Manik",
  "Lamat",
  "Muluc",
  "Oc",
  "Chuen",
  "Eb",
  "Ben",
  "Ix",
  "Men",
  "Cib",
  "Caban",
  "Etznab",
  "Cauac",
  "Ahau"
];
function jd_to_mayan_tzolkin(a) {
  return (
    (a = Math.floor(a) + 0.5),
    (a -= MAYAN_COUNT_EPOCH),
    [amod(a + 20, 20), amod(a + 4, 13)]
  );
}
var INDIAN_CIVIL_WEEKDAYS = [
  "ravivara",
  "somavara",
  "mangalavara",
  "budhavara",
  "brahaspativara",
  "sukravara",
  "sanivara"
];
function indian_civil_to_jd(a, c, f) {
  var b = a + 78;
  return (
    ((a = leap_gregorian(b)), (b = gregorian_to_jd(b, 3, a ? 21 : 22)), 1 == c)
      ? (a = b + (f - 1))
      : ((a = b + (a ? 31 : 30) + 31 * Math.min(c - 2, 5)),
        8 <= c && (a += 30 * (c - 7)),
        (a += f - 1)),
    a
  );
}
function jd_to_indian_civil(a) {
  a = Math.floor(a) + 0.5;
  var b = jd_to_gregorian(a),
    c = leap_gregorian(b[0]),
    d = b[0] - 78;
  return (
    (b = gregorian_to_jd(b[0], 1, 1)),
    (a -= b),
    (c = c ? 31 : 30),
    80 > a && (d--, (a += c + 155 + 90 + 10 + 80)),
    (a -= 80),
    a < c
      ? ((month = 1), (day = a + 1))
      : ((c = a - c),
        155 > c
          ? ((month = Math.floor(c / 31) + 2), (day = (c % 31) + 1))
          : ((c -= 155),
            (month = Math.floor(c / 30) + 7),
            (day = (c % 30) + 1))),
    [d, month, day]
  );
}
function updateFromGregorian() {
  var a = new Number(document.gregorian.year.value),
    b = document.gregorian.month.selectedIndex,
    c = new Number(document.gregorian.day.value),
    d = new Number(document.gregorian.hour.value),
    f = new Number(document.gregorian.min.value),
    k = new Number(document.gregorian.sec.value);
  switch (
    ((b =
      gregorian_to_jd(a, b + 1, c) +
      Math.floor(k + 60 * (f + 60 * d) + 0.5) / 86400),
    (document.julianday.day.value = b),
    (document.modifiedjulianday.day.value = b - JMJD),
    (c = jwday(b)),
    (document.gregorian.wday.value = Weekdays[c]),
    (document.gregorian.leap.value = NormLeap[leap_gregorian(a) ? 1 : 0]),
    (c = jd_to_julian(b)),
    (document.juliancalendar.year.value = c[0]),
    (document.juliancalendar.month.selectedIndex = c[1] - 1),
    (document.juliancalendar.day.value = c[2]),
    (document.juliancalendar.leap.value = NormLeap[leap_julian(c[0]) ? 1 : 0]),
    (c = jwday(b)),
    (document.juliancalendar.wday.value = Weekdays[c]),
    (a = jd_to_hebrew(b)),
    hebrew_leap(a[0])
      ? ((document.hebrew.month.options.length = 13),
        (document.hebrew.month.options[11] = new Option("Adar I")),
        (document.hebrew.month.options[12] = new Option("Veadar")))
      : ((document.hebrew.month.options.length = 12),
        (document.hebrew.month.options[11] = new Option("Adar"))),
    (document.hebrew.year.value = a[0]),
    (document.hebrew.month.selectedIndex = a[1] - 1),
    (document.hebrew.day.value = a[2]),
    (d = a[1]),
    12 != d || hebrew_leap(a[0]) || (d = 14),
    (document.hebrew.hebmonth.src = "figures/hebrew_month_" + d + ".gif"),
    hebrew_year_days(a[0]))
  ) {
    case 353:
      document.hebrew.leap.value = "Common deficient (353 days)";
      break;
    case 354:
      document.hebrew.leap.value = "Common regular (354 days)";
      break;
    case 355:
      document.hebrew.leap.value = "Common complete (355 days)";
      break;
    case 383:
      document.hebrew.leap.value = "Embolismic deficient (383 days)";
      break;
    case 384:
      document.hebrew.leap.value = "Embolismic regular (384 days)";
      break;
    case 385:
      document.hebrew.leap.value = "Embolismic complete (385 days)";
      break;
    default:
      document.hebrew.leap.value =
        "Invalid year length: " + hebrew_year_days(a[0]) + " days.";
  }
  document.getElementById("gregYear").blur(),
    document.getElementById("gregDay").blur(),
    document.getElementById("julianYear").blur(),
    document.getElementById("julianCalDay").blur(),
    document.getElementById("islamicYear").blur(),
    document.getElementById("islamicDay").blur(),
    document.getElementById("persYear").blur(),
    document.getElementById("persianDay").blur(),
    (a = jd_to_islamic(b)),
    (document.islamic.year.value = a[0]),
    (document.islamic.month.selectedIndex = a[1] - 1),
    (document.islamic.day.value = a[2]),
    (document.islamic.wday.value = "Yawm " + ISLAMIC_WEEKDAYS[c]),
    (document.islamic.leap.value = NormLeap[leap_islamic(a[0]) ? 1 : 0]),
    (perscal = jd_to_persian(b)),
    (document.persian.year.value = perscal[0]),
    (document.persian.month.selectedIndex = perscal[1] - 1),
    (document.persian.day.value = perscal[2]),
    (document.persian.wday.value = PERSIAN_WEEKDAYS[c]),
    (document.persian.leap.value = NormLeap[leap_persian(perscal[0]) ? 1 : 0]),
    (perscal = jd_to_persiana(b)),
    (document.persiana.year.value = perscal[0]),
    (document.persiana.month.selectedIndex = perscal[1] - 1),
    (document.persiana.day.value = perscal[2]),
    (document.persiana.wday.value = PERSIAN_WEEKDAYS[c]),
    (document.persiana.leap.value =
      NormLeap[leap_persiana(perscal[0]) ? 1 : 0]),
    (a = jd_to_mayan_count(b)),
    (document.mayancount.baktun.value = a[0]),
    (document.mayancount.katun.value = a[1]),
    (document.mayancount.tun.value = a[2]),
    (document.mayancount.uinal.value = a[3]),
    (document.mayancount.kin.value = a[4]),
    (a = jd_to_mayan_haab(b)),
    (document.mayancount.haab.value =
      "" + a[1] + " " + MAYAN_HAAB_MONTHS[a[0] - 1]),
    (a = jd_to_mayan_tzolkin(b)),
    (document.mayancount.tzolkin.value =
      "" + a[1] + " " + MAYAN_TZOLKIN_MONTHS[a[0] - 1]),
    (a = jd_to_indian_civil(b)),
    (document.indiancivilcalendar.year.value = a[0]),
    (document.indiancivilcalendar.month.selectedIndex = a[1] - 1),
    (document.indiancivilcalendar.day.value = a[2]),
    (document.indiancivilcalendar.weekday.value = INDIAN_CIVIL_WEEKDAYS[c]),
    (document.indiancivilcalendar.leap.value =
      NormLeap[leap_gregorian(a[0] + 78) ? 1 : 0]),
    (c = jd_to_french_revolutionary(b)),
    (document.french.an.value = c[0]),
    (document.french.mois.selectedIndex = c[1] - 1),
    (document.french.decade.selectedIndex = c[2] - 1),
    (document.french.jour.selectedIndex = (12 >= c[1] ? c[3] : c[3] + 11) - 1),
    null != document.gregserial && (document.gregserial.day.value = b - J0000),
    (document.excelserial1900.day.value =
      b - J1900 + 1 + (2415078.5 < b ? 1 : 0)),
    (document.excelserial1904.day.value = b - J1904),
    (document.unixtime.time.value = Math.round((864e5 * (b - J1970)) / 1e3)),
    (c = jd_to_iso(b)),
    (document.isoweek.year.value = c[0]),
    (document.isoweek.week.value = c[1]),
    (document.isoweek.day.value = c[2]),
    (b = jd_to_iso_day(b)),
    (document.isoday.year.value = b[0]),
    (document.isoday.day.value = b[1]);
}
function calcGregorian() {
  updateFromGregorian();
}
function calcJulian() {
  var a = new Number(document.julianday.day.value),
    b = jd_to_gregorian(a);
  (a = jhms(a)),
    (document.gregorian.year.value = b[0]),
    (document.gregorian.month.selectedIndex = b[1] - 1),
    (document.gregorian.day.value = b[2]),
    (document.gregorian.hour.value = pad(a[0], 2, " ")),
    (document.gregorian.min.value = pad(a[1], 2, "0")),
    (document.gregorian.sec.value = pad(a[2], 2, "0")),
    updateFromGregorian();
}
function setJulian(a) {
  (document.julianday.day.value = new Number(a)), calcJulian();
}
function calcModifiedJulian() {
  setJulian(new Number(document.modifiedjulianday.day.value) + JMJD);
}
function calcJulianCalendar() {
  setJulian(
    julian_to_jd(
      new Number(document.juliancalendar.year.value),
      document.juliancalendar.month.selectedIndex + 1,
      new Number(document.juliancalendar.day.value)
    )
  );
}
function calcHebrew() {
  setJulian(
    hebrew_to_jd(
      new Number(document.hebrew.year.value),
      document.hebrew.month.selectedIndex + 1,
      new Number(document.hebrew.day.value)
    )
  );
}
function calcIslamic() {
  setJulian(
    islamic_to_jd(
      new Number(document.islamic.year.value),
      document.islamic.month.selectedIndex + 1,
      new Number(document.islamic.day.value)
    )
  );
}
function calcPersian() {
  setJulian(
    persian_to_jd(
      new Number(document.persian.year.value),
      document.persian.month.selectedIndex + 1,
      new Number(document.persian.day.value)
    )
  );
}
function calcPersiana() {
  setJulian(
    persiana_to_jd(
      new Number(document.persiana.year.value),
      document.persiana.month.selectedIndex + 1,
      new Number(document.persiana.day.value)
    ) + 0.5
  );
}
function calcMayanCount() {
  setJulian(
    mayan_count_to_jd(
      new Number(document.mayancount.baktun.value),
      new Number(document.mayancount.katun.value),
      new Number(document.mayancount.tun.value),
      new Number(document.mayancount.uinal.value),
      new Number(document.mayancount.kin.value)
    )
  );
}
function calcIndianCivilCalendar() {
  setJulian(
    indian_civil_to_jd(
      new Number(document.indiancivilcalendar.year.value),
      document.indiancivilcalendar.month.selectedIndex + 1,
      new Number(document.indiancivilcalendar.day.value)
    )
  );
}
function calcFrench() {
  var a = document.french.jour.selectedIndex,
    b = document.french.decade.selectedIndex,
    d = document.french.mois.selectedIndex;
  9 < a && ((a -= 11), (b = 0), (d = 12)),
    12 == d && ((b = 0), 5 < a && (a = 0)),
    setJulian(
      french_revolutionary_to_jd(
        new Number(document.french.an.value),
        d + 1,
        b + 1,
        a + 1
      )
    );
}
function calcGregSerial() {
  setJulian(new Number(document.gregserial.day.value) + J0000);
}
function calcExcelSerial1900() {
  var a = new Number(document.excelserial1900.day.value);
  60 < a && a--, setJulian(a - 1 + J1900);
}
function calcExcelSerial1904() {
  setJulian(new Number(document.excelserial1904.day.value) + J1904);
}
function calcUnixTime() {
  var a = new Number(document.unixtime.time.value);
  setJulian(J1970 + a / 86400);
}
function calcIsoWeek() {
  var d = new Number(document.isoweek.year.value),
    c = new Number(document.isoweek.week.value),
    a = new Number(document.isoweek.day.value);
  setJulian(iso_to_julian(d, c, a));
}
function calcIsoDay() {
  var b = new Number(document.isoday.year.value),
    c = new Number(document.isoday.day.value);
  setJulian(iso_day_to_julian(b, c));
}
function setDateToToday() {
  var b = new Date(),
    c = b.getYear();
  1e3 > c && (c += 1900),
    (document.gregorian.year.value = c),
    (document.gregorian.month.selectedIndex = b.getMonth()),
    (document.gregorian.day.value = b.getDate()),
    (document.gregorian.hour.value = document.gregorian.min.value = document.gregorian.sec.value =
      "00");
}
function presetDataToRequest(a) {
  var c = a.indexOf("="),
    d = !1;
  if (-1 != c) {
    var f = a.substring(0, c);
    (a = decodeURIComponent(a.substring(c + 1))),
      "gregorian" == f.toLowerCase()
        ? ((f = a.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)),
          null == f
            ? alert('Invalid Gregorian date "' + a + '" in search request')
            : 1 <= f[2] &&
              12 >= f[2] &&
              1 <= f[3] &&
              31 >= f[3] &&
              (null == f[4] ||
                (0 <= f[4].substring(1) && 23 >= f[4].substring(1))) &&
              (null == f[5] ||
                (0 <= f[5].substring(1) && 59 >= f[5].substring(1))) &&
              (null == f[6] ||
                (0 <= f[6].substring(1) && 59 >= f[6].substring(1)))
            ? ((document.gregorian.year.value = f[1]),
              (document.gregorian.month.selectedIndex = f[2] - 1),
              (document.gregorian.day.value = +f[3]),
              (document.gregorian.hour.value =
                null == f[4] ? "00" : f[4].substring(1)),
              (document.gregorian.min.value =
                null == f[5] ? "00" : f[5].substring(1)),
              (document.gregorian.sec.value =
                null == f[6] ? "00" : f[6].substring(1)),
              calcGregorian(),
              (d = !0))
            : alert('Invalid Gregorian date "' + a + '" in search request'))
        : "julian" == f.toLowerCase()
        ? ((f = a.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)),
          null == f
            ? alert(
                'Invalid Julian calendar date "' + a + '" in search request'
              )
            : 1 <= f[2] &&
              12 >= f[2] &&
              1 <= f[3] &&
              31 >= f[3] &&
              (null == f[4] ||
                (0 <= f[4].substring(1) && 23 >= f[4].substring(1))) &&
              (null == f[5] ||
                (0 <= f[5].substring(1) && 59 >= f[5].substring(1))) &&
              (null == f[6] ||
                (0 <= f[6].substring(1) && 59 >= f[6].substring(1)))
            ? ((document.juliancalendar.year.value = f[1]),
              (document.juliancalendar.month.selectedIndex = f[2] - 1),
              (document.juliancalendar.day.value = +f[3]),
              calcJulianCalendar(),
              (document.gregorian.hour.value =
                null == f[4] ? "00" : f[4].substring(1)),
              (document.gregorian.min.value =
                null == f[5] ? "00" : f[5].substring(1)),
              (document.gregorian.sec.value =
                null == f[6] ? "00" : f[6].substring(1)),
              (d = !0))
            : alert(
                'Invalid Julian calendar date "' + a + '" in search request'
              ))
        : "jd" == f.toLowerCase()
        ? ((f = a.match(/^(\-?\d+\.?\d*)/)),
          null == f
            ? alert('Invalid Julian day "' + a + '" in search request')
            : (setJulian(f[1]), (d = 1)))
        : "mjd" == f.toLowerCase()
        ? ((f = a.match(/^(\-?\d+\.?\d*)/)),
          null == f
            ? alert('Invalid Modified Julian day "' + a + '" in search request')
            : ((document.modifiedjulianday.day.value = f[1]),
              calcModifiedJulian(),
              (d = 1)))
        : "unixtime" == f.toLowerCase()
        ? ((f = a.match(/^(\-?\d+\.?\d*)/)),
          null == f
            ? alert('Invalid Modified Julian day "' + a + '" in search request')
            : ((document.unixtime.time.value = f[1]), calcUnixTime(), (d = 1)))
        : "iso" == f.toLowerCase()
        ? null == (f = a.match(/^(\-?\d+)\-(\d\d\d)/))
          ? null == (f = a.match(/^(\-?\d+)\-?W(\d\d)\-?(\d)/i))
            ? alert('Invalid ISO-8601 date "' + a + '" in search request')
            : ((document.isoweek.year.value = f[1]),
              (document.isoweek.week.value = f[2]),
              (document.isoweek.day.value = f[3]),
              calcIsoWeek(),
              (d = 1))
          : ((document.isoday.year.value = f[1]),
            (document.isoday.day.value = f[2]),
            calcIsoDay(),
            (d = 1))
        : "excel" == f.toLowerCase()
        ? ((f = a.match(/^(\-?\d+\.?\d*)/)),
          null == f
            ? alert(
                'Invalid Excel serial day (1900/PC) "' +
                  a +
                  '" in search request'
              )
            : ((document.excelserial1900.day.value = f[1]),
              calcExcelSerial1900(),
              (d = 1)))
        : "excel1904" == f.toLowerCase()
        ? ((f = a.match(/^(\-?\d+\.?\d*)/)),
          null == f
            ? alert(
                'Invalid Excel serial day (1904/Mac) "' +
                  a +
                  '" in search request'
              )
            : ((document.excelserial1904.day.value = f[1]),
              calcExcelSerial1904(),
              (d = 1)))
        : alert('Invalid calendar "' + f + '" in search request');
  } else alert("Invalid search request: " + a);
  d || (setDateToToday(), calcGregorian());
}
