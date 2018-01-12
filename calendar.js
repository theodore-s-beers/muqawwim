var J0000 = 1721424.5,
  J1970 = 2440587.5,
  JMJD = 2400000.5,
  J1900 = 2415020.5,
  J1904 = 2416480.5,
  NormLeap = ["Normal year", "Leap year"];

function weekday_before(f, g) {
  return g - jwday(g - f)
}

function search_weekday(f, g, h, k) {
  return weekday_before(f, g + h * k)
}

function nearest_weekday(f, g) {
  return search_weekday(f, g, 1, 3)
}

function next_weekday(f, g) {
  return search_weekday(f, g, 1, 7)
}

function next_or_current_weekday(f, g) {
  return search_weekday(f, g, 1, 6)
}

function previous_weekday(f, g) {
  return search_weekday(f, g, -1, 1)
}

function previous_or_current_weekday(f, g) {
  return search_weekday(f, g, 1, 0)
}

function TestSomething() {}

function leap_gregorian(f) {
  return 0 == f % 4 && (0 != f % 100 || 0 == f % 400)
}
var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(f, g, h) {
  return GREGORIAN_EPOCH - 1 + 365 * (f - 1) + Math.floor((f - 1) / 4) + -Math.floor((f - 1) / 100) + Math.floor((f - 1) / 400) + Math.floor((367 * g - 362) / 12 + (2 >= g ? 0 : leap_gregorian(f) ? -1 : -2) + h)
}

function jd_to_gregorian(f) {
  var g, h, k, l, n, o, p, q, r, u, v, w;
  return g = Math.floor(f - 0.5) + 0.5, h = g - GREGORIAN_EPOCH, k = Math.floor(h / 146097), l = mod(h, 146097), n = Math.floor(l / 36524), o = mod(l, 36524), p = Math.floor(o / 1461), q = mod(o, 1461), r = Math.floor(q / 365), u = 400 * k + 100 * n + 4 * p + r, 4 == n || 4 == r || u++, v = g - gregorian_to_jd(u, 1, 1), w = g < gregorian_to_jd(u, 3, 1) ? 0 : leap_gregorian(u) ? 1 : 2, month = Math.floor((12 * (v + w) + 373) / 367), day = g - gregorian_to_jd(u, month, 1) + 1, [u, month, day]
}

function n_weeks(f, g, h) {
  var k = 7 * h;
  return k += 0 < h ? previous_weekday(f, g) : next_weekday(f, g), k
}

function iso_to_julian(f, g, h) {
  return h + n_weeks(0, gregorian_to_jd(f - 1, 12, 28), g)
}

function jd_to_iso(f) {
  var g, h, k;
  return g = jd_to_gregorian(f - 3)[0], f >= iso_to_julian(g + 1, 1, 1) && g++, h = Math.floor((f - iso_to_julian(g, 1, 1)) / 7) + 1, k = jwday(f), 0 == k && (k = 7), [g, h, k]
}

function iso_day_to_julian(f, g) {
  return g - 1 + gregorian_to_jd(f, 1, 1)
}

function jd_to_iso_day(f) {
  var g, h;
  return g = jd_to_gregorian(f)[0], h = Math.floor(f - gregorian_to_jd(g, 1, 1)) + 1, [g, h]
}

function pad(f, g, h) {
  for (var k = f.toString(); k.length < g;) k = h + k;
  return k
}
var JULIAN_EPOCH = 1721423.5;

function leap_julian(f) {
  return mod(f, 4) == (0 < f ? 0 : 3)
}

function julian_to_jd(f, g, h) {
  return 1 > f && f++, 2 >= g && (f--, g += 12), Math.floor(365.25 * (f + 4716)) + Math.floor(30.6001 * (g + 1)) + h - 1524.5
}

function jd_to_julian(f) {
  var g, h, k, l, n, o, p, q, r;
  return f += 0.5, g = Math.floor(f), h = g, k = h + 1524, l = Math.floor((k - 122.1) / 365.25), n = Math.floor(365.25 * l), o = Math.floor((k - n) / 30.6001), q = Math.floor(14 > o ? o - 1 : o - 13), p = Math.floor(2 < q ? l - 4716 : l - 4715), r = k - n - Math.floor(30.6001 * o), 1 > p && p--, [p, q, r]
}
var HEBREW_EPOCH = 347995.5;

function hebrew_leap(f) {
  return 7 > mod(7 * f + 1, 19)
}

function hebrew_year_months(f) {
  return hebrew_leap(f) ? 13 : 12
}

function hebrew_delay_1(f) {
  var g, h;
  return g = Math.floor((235 * f - 234) / 19), h = 12084 + 13753 * g, day = 29 * g + Math.floor(h / 25920), 3 > mod(3 * (day + 1), 7) && day++, day
}

function hebrew_delay_2(f) {
  var g, h, k;
  return g = hebrew_delay_1(f - 1), h = hebrew_delay_1(f), k = hebrew_delay_1(f + 1), 356 == k - h ? 2 : 382 == h - g ? 1 : 0
}

function hebrew_year_days(f) {
  return hebrew_to_jd(f + 1, 7, 1) - hebrew_to_jd(f, 7, 1)
}

function hebrew_month_days(f, g) {
  return 2 == g || 4 == g || 6 == g || 10 == g || 13 == g ? 29 : 12 != g || hebrew_leap(f) ? 8 == g && 5 != mod(hebrew_year_days(f), 10) ? 29 : 9 == g && 3 == mod(hebrew_year_days(f), 10) ? 29 : 30 : 29
}

function hebrew_to_jd(f, g, h) {
  var k, l, n;
  if (n = hebrew_year_months(f), k = HEBREW_EPOCH + hebrew_delay_1(f) + hebrew_delay_2(f) + h + 1, 7 > g) {
    for (l = 7; l <= n; l++) k += hebrew_month_days(f, l);
    for (l = 1; l < g; l++) k += hebrew_month_days(f, l)
  } else
    for (l = 7; l < g; l++) k += hebrew_month_days(f, l);
  return k
}

function jd_to_hebrew(f) {
  var g, h, k, l, n, o;
  for (f = Math.floor(f) + 0.5, n = Math.floor(98496 * (f - HEBREW_EPOCH) / 35975351), g = n - 1, l = n; f >= hebrew_to_jd(l, 7, 1); l++) g++;
  for (o = f < hebrew_to_jd(g, 1, 1) ? 7 : 1, h = o, l = o; f > hebrew_to_jd(g, l, hebrew_month_days(g, l)); l++) h++;
  return k = f - hebrew_to_jd(g, h, 1) + 1, [g, h, k]
}

function equinoxe_a_paris(f) {
  var g, h, k, l, n;
  return g = equinox(f, 2), h = g - deltat(f) / 86400, k = h + equationOfTime(g), n = (2 + 20 / 60 + 15 / 3600) / 360, l = k + n, l
}

function paris_equinoxe_jd(f) {
  var g, h;
  return g = equinoxe_a_paris(f), h = Math.floor(g - 0.5) + 0.5, h
}
var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

function annee_da_la_revolution(f) {
  var g, h, k, l = jd_to_gregorian(f)[0] - 2;
  for (g = paris_equinoxe_jd(l); g > f;) l--, g = paris_equinoxe_jd(l);
  for (h = g - 1; !(g <= f && f < h);) g = h, l++, h = paris_equinoxe_jd(l);
  return k = Math.round((g - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1, [k, g]
}

function jd_to_french_revolutionary(f) {
  var g, h, k, l, n, o;
  return f = Math.floor(f) + 0.5, n = annee_da_la_revolution(f), g = n[0], o = n[1], h = Math.floor((f - o) / 30) + 1, l = (f - o) % 30, k = Math.floor(l / 10) + 1, l = l % 10 + 1, [g, h, k, l]
}

function french_revolutionary_to_jd(f, g, h, k) {
  var l, n, o, p;
  for (o = FRENCH_REVOLUTIONARY_EPOCH + TropicalYear * (f - 1 - 1), l = [f - 1, 0]; l[0] < f;) l = annee_da_la_revolution(o), o = l[1] + (TropicalYear + 2);
  return n = l[1], p = n + 30 * (g - 1) + 10 * (h - 1) + (k - 1), p
}

function leap_islamic(f) {
  return 11 > (11 * f + 14) % 30
}
var ISLAMIC_EPOCH = 1948439.5,
  ISLAMIC_WEEKDAYS = ["al-Ahad", "al-Ithnayn", "al-Thulatha\u2019", "al-Arbi\u2018a\u2019", "al-Khamis", "al-Jum\u2018ah", "al-Sabt"];

function islamic_to_jd(f, g, h) {
  return h + Math.ceil(29.5 * (g - 1)) + 354 * (f - 1) + Math.floor((3 + 11 * f) / 30) + ISLAMIC_EPOCH - 1
}

function jd_to_islamic(f) {
  var g, h, k;
  return f = Math.floor(f) + 0.5, g = Math.floor((30 * (f - ISLAMIC_EPOCH) + 10646) / 10631), h = Math.min(12, Math.ceil((f - (29 + islamic_to_jd(g, 1, 1))) / 29.5) + 1), k = f - islamic_to_jd(g, h, 1) + 1, [g, h, k]
}

function tehran_equinox(f) {
  var g, h, k, l, n;
  return g = equinox(f, 0), h = g - deltat(f) / 86400, k = h + equationOfTime(g), n = (52 + 30 / 60 + 0) / 360, l = k + n, l
}

function tehran_equinox_jd(f) {
  var g, h;
  return g = tehran_equinox(f), h = Math.floor(g), h
}
var PERSIAN_EPOCH = 1948320.5,
  PERSIAN_WEEKDAYS = ["Yekshanbeh", "Doshanbeh", "Sehshanbeh", "Chaharshanbeh", "Panjshanbeh", "Jom\u2018eh", "Shanbeh"];

function persiana_year(f) {
  var g, h, k, l = jd_to_gregorian(f)[0] - 2;
  for (g = tehran_equinox_jd(l); g > f;) l--, g = tehran_equinox_jd(l);
  for (h = g - 1; !(g <= f && f < h);) g = h, l++, h = tehran_equinox_jd(l);
  return k = Math.round((g - PERSIAN_EPOCH) / TropicalYear) + 1, [k, g]
}

function jd_to_persiana(f) {
  var g, h, k, l, n, o;
  return f = Math.floor(f) + 0.5, l = persiana_year(f), g = l[0], n = l[1], k = Math.floor((f - n) / 30) + 1, o = Math.floor(f) - persiana_to_jd(g, 1, 1) + 1, h = 186 >= o ? Math.ceil(o / 31) : Math.ceil((o - 6) / 30), k = Math.floor(f) - persiana_to_jd(g, h, 1) + 1, [g, h, k]
}

function persiana_to_jd(f, g, h) {
  var k, l, n, o;
  for (n = PERSIAN_EPOCH - 1 + TropicalYear * (f - 1 - 1), k = [f - 1, 0]; k[0] < f;) k = persiana_year(n), n = k[1] + (TropicalYear + 2);
  return l = k[1], o = l + (7 >= g ? 31 * (g - 1) : 30 * (g - 1) + 6) + (h - 1), o
}

function leap_persiana(f) {
  return 365 < persiana_to_jd(f + 1, 1, 1) - persiana_to_jd(f, 1, 1)
}

function leap_persian(f) {
  return 682 > 682 * ((f - (0 < f ? 474 : 473)) % 2820 + 474 + 38) % 2816
}

function persian_to_jd(f, g, h) {
  var k, l;
  return k = f - (0 <= f ? 474 : 473), l = 474 + mod(k, 2820), h + (7 >= g ? 31 * (g - 1) : 30 * (g - 1) + 6) + Math.floor((682 * l - 110) / 2816) + 365 * (l - 1) + 1029983 * Math.floor(k / 2820) + (PERSIAN_EPOCH - 1)
}

function jd_to_persian(f) {
  var g, h, k, l, n, o, p, q, r, u;
  return f = Math.floor(f) + 0.5, l = f - persian_to_jd(475, 1, 1), n = Math.floor(l / 1029983), o = mod(l, 1029983), 1029982 == o ? p = 2820 : (q = Math.floor(o / 366), r = mod(o, 366), p = Math.floor((2134 * q + 2816 * r + 2815) / 1028522) + q + 1), g = p + 2820 * n + 474, 0 >= g && g--, u = f - persian_to_jd(g, 1, 1) + 1, h = 186 >= u ? Math.ceil(u / 31) : Math.ceil((u - 6) / 30), k = f - persian_to_jd(g, h, 1) + 1, [g, h, k]
}
var MAYAN_COUNT_EPOCH = 584282.5;

function mayan_count_to_jd(f, g, h, k, l) {
  return MAYAN_COUNT_EPOCH + 144000 * f + 7200 * g + 360 * h + 20 * k + l
}

function jd_to_mayan_count(f) {
  var g, h, k, l, n, o;
  return f = Math.floor(f) + 0.5, g = f - MAYAN_COUNT_EPOCH, h = Math.floor(g / 144000), g = mod(g, 144000), k = Math.floor(g / 7200), g = mod(g, 7200), l = Math.floor(g / 360), g = mod(g, 360), n = Math.floor(g / 20), o = mod(g, 20), [h, k, l, n, o]
}
var MAYAN_HAAB_MONTHS = ["Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh", "Mac", "Kankin", "Muan", "Pax", "Kayab", "Cumku", "Uayeb"];

function jd_to_mayan_haab(f) {
  var g, h;
  return f = Math.floor(f) + 0.5, g = f - MAYAN_COUNT_EPOCH, h = mod(g + 8 + 340, 365), [Math.floor(h / 20) + 1, mod(h, 20)]
}
var MAYAN_TZOLKIN_MONTHS = ["Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluc", "Oc", "Chuen", "Eb", "Ben", "Ix", "Men", "Cib", "Caban", "Etznab", "Cauac", "Ahau"];

function jd_to_mayan_tzolkin(f) {
  var g;
  return f = Math.floor(f) + 0.5, g = f - MAYAN_COUNT_EPOCH, [amod(g + 20, 20), amod(g + 4, 13)]
}
var INDIAN_CIVIL_WEEKDAYS = ["ravivara", "somavara", "mangalavara", "budhavara", "brahaspativara", "sukravara", "sanivara"];

function indian_civil_to_jd(f, g, h) {
  var k, l, n, o, p, q;
  return l = f + 78, n = leap_gregorian(l), o = gregorian_to_jd(l, 3, n ? 21 : 22), k = n ? 31 : 30, 1 == g ? p = o + (h - 1) : (p = o + k, q = g - 2, q = Math.min(q, 5), p += 31 * q, 8 <= g && (q = g - 7, p += 30 * q), p += h - 1), p
}

function jd_to_indian_civil(f) {
  var g, h, k, l, n, o, p, q, r;
  return h = 78, o = 80, f = Math.floor(f) + 0.5, k = jd_to_gregorian(f), n = leap_gregorian(k[0]), p = k[0] - h, l = gregorian_to_jd(k[0], 1, 1), q = f - l, g = n ? 31 : 30, q < o && (p--, q += g + 155 + 90 + 10 + o), q -= o, q < g ? (month = 1, day = q + 1) : (r = q - g, 155 > r ? (month = Math.floor(r / 31) + 2, day = r % 31 + 1) : (r -= 155, month = Math.floor(r / 30) + 7, day = r % 30 + 1)), [p, month, day]
}

function updateFromGregorian() {
  var f, g, h, k, l, n, o, p, q, r, u, v, w, x, A, B, C, D, E, F;
  switch (g = new Number(document.gregorian.year.value), h = document.gregorian.month.selectedIndex, k = new Number(document.gregorian.day.value), l = n = o = 0, l = new Number(document.gregorian.hour.value), n = new Number(document.gregorian.min.value), o = new Number(document.gregorian.sec.value), f = gregorian_to_jd(g, h + 1, k) + Math.floor(o + 60 * (n + 60 * l) + 0.5) / 86400, document.julianday.day.value = f, document.modifiedjulianday.day.value = f - JMJD, p = jwday(f), document.gregorian.wday.value = Weekdays[p], document.gregorian.leap.value = NormLeap[leap_gregorian(g) ? 1 : 0], q = jd_to_julian(f), document.juliancalendar.year.value = q[0], document.juliancalendar.month.selectedIndex = q[1] - 1, document.juliancalendar.day.value = q[2], document.juliancalendar.leap.value = NormLeap[leap_julian(q[0]) ? 1 : 0], p = jwday(f), document.juliancalendar.wday.value = Weekdays[p], r = jd_to_hebrew(f), hebrew_leap(r[0]) ? (document.hebrew.month.options.length = 13, document.hebrew.month.options[11] = new Option("Adar I"), document.hebrew.month.options[12] = new Option("Veadar")) : (document.hebrew.month.options.length = 12, document.hebrew.month.options[11] = new Option("Adar")), document.hebrew.year.value = r[0], document.hebrew.month.selectedIndex = r[1] - 1, document.hebrew.day.value = r[2], v = r[1], 12 != v || hebrew_leap(r[0]) || (v = 14), document.hebrew.hebmonth.src = "figures/hebrew_month_" + v + ".gif", hebrew_year_days(r[0])) {
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
      document.hebrew.leap.value = "Invalid year length: " + hebrew_year_days(r[0]) + " days.";
  }
  document.getElementById("gregYear").blur(), document.getElementById("gregDay").blur(), document.getElementById("julianYear").blur(), document.getElementById("julianCalDay").blur(), document.getElementById("islamicYear").blur(), document.getElementById("islamicDay").blur(), document.getElementById("persYear").blur(), document.getElementById("persianDay").blur(), u = jd_to_islamic(f), document.islamic.year.value = u[0], document.islamic.month.selectedIndex = u[1] - 1, document.islamic.day.value = u[2], document.islamic.wday.value = "Yawm " + ISLAMIC_WEEKDAYS[p], document.islamic.leap.value = NormLeap[leap_islamic(u[0]) ? 1 : 0], perscal = jd_to_persian(f), document.persian.year.value = perscal[0], document.persian.month.selectedIndex = perscal[1] - 1, document.persian.day.value = perscal[2], document.persian.wday.value = PERSIAN_WEEKDAYS[p], document.persian.leap.value = NormLeap[leap_persian(perscal[0]) ? 1 : 0], perscal = jd_to_persiana(f), document.persiana.year.value = perscal[0], document.persiana.month.selectedIndex = perscal[1] - 1, document.persiana.day.value = perscal[2], document.persiana.wday.value = PERSIAN_WEEKDAYS[p], document.persiana.leap.value = NormLeap[leap_persiana(perscal[0]) ? 1 : 0], A = jd_to_mayan_count(f), document.mayancount.baktun.value = A[0], document.mayancount.katun.value = A[1], document.mayancount.tun.value = A[2], document.mayancount.uinal.value = A[3], document.mayancount.kin.value = A[4], B = jd_to_mayan_haab(f), document.mayancount.haab.value = "" + B[1] + " " + MAYAN_HAAB_MONTHS[B[0] - 1], C = jd_to_mayan_tzolkin(f), document.mayancount.tzolkin.value = "" + C[1] + " " + MAYAN_TZOLKIN_MONTHS[C[0] - 1], E = jd_to_indian_civil(f), document.indiancivilcalendar.year.value = E[0], document.indiancivilcalendar.month.selectedIndex = E[1] - 1, document.indiancivilcalendar.day.value = E[2], document.indiancivilcalendar.weekday.value = INDIAN_CIVIL_WEEKDAYS[p], document.indiancivilcalendar.leap.value = NormLeap[leap_gregorian(E[0] + 78) ? 1 : 0], D = jd_to_french_revolutionary(f), document.french.an.value = D[0], document.french.mois.selectedIndex = D[1] - 1, document.french.decade.selectedIndex = D[2] - 1, document.french.jour.selectedIndex = (12 >= D[1] ? D[3] : D[3] + 11) - 1, null != document.gregserial && (document.gregserial.day.value = f - J0000), document.excelserial1900.day.value = f - J1900 + 1 + (2415078.5 < f ? 1 : 0), document.excelserial1904.day.value = f - J1904, w = 8.64e7 * (f - J1970), document.unixtime.time.value = Math.round(w / 1e3), x = jd_to_iso(f), document.isoweek.year.value = x[0], document.isoweek.week.value = x[1], document.isoweek.day.value = x[2], F = jd_to_iso_day(f), document.isoday.year.value = F[0], document.isoday.day.value = F[1]
}

function calcGregorian() {
  updateFromGregorian()
}

function calcJulian() {
  var f, g, h;
  f = new Number(document.julianday.day.value), g = jd_to_gregorian(f), h = jhms(f), document.gregorian.year.value = g[0], document.gregorian.month.selectedIndex = g[1] - 1, document.gregorian.day.value = g[2], document.gregorian.hour.value = pad(h[0], 2, " "), document.gregorian.min.value = pad(h[1], 2, "0"), document.gregorian.sec.value = pad(h[2], 2, "0"), updateFromGregorian()
}

function setJulian(f) {
  document.julianday.day.value = new Number(f), calcJulian()
}

function calcModifiedJulian() {
  setJulian(new Number(document.modifiedjulianday.day.value) + JMJD)
}

function calcJulianCalendar() {
  setJulian(julian_to_jd(new Number(document.juliancalendar.year.value), document.juliancalendar.month.selectedIndex + 1, new Number(document.juliancalendar.day.value)))
}

function calcHebrew() {
  setJulian(hebrew_to_jd(new Number(document.hebrew.year.value), document.hebrew.month.selectedIndex + 1, new Number(document.hebrew.day.value)))
}

function calcIslamic() {
  setJulian(islamic_to_jd(new Number(document.islamic.year.value), document.islamic.month.selectedIndex + 1, new Number(document.islamic.day.value)))
}

function calcPersian() {
  setJulian(persian_to_jd(new Number(document.persian.year.value), document.persian.month.selectedIndex + 1, new Number(document.persian.day.value)))
}

function calcPersiana() {
  setJulian(persiana_to_jd(new Number(document.persiana.year.value), document.persiana.month.selectedIndex + 1, new Number(document.persiana.day.value)) + 0.5)
}

function calcMayanCount() {
  setJulian(mayan_count_to_jd(new Number(document.mayancount.baktun.value), new Number(document.mayancount.katun.value), new Number(document.mayancount.tun.value), new Number(document.mayancount.uinal.value), new Number(document.mayancount.kin.value)))
}

function calcIndianCivilCalendar() {
  setJulian(indian_civil_to_jd(new Number(document.indiancivilcalendar.year.value), document.indiancivilcalendar.month.selectedIndex + 1, new Number(document.indiancivilcalendar.day.value)))
}

function calcFrench() {
  var f, g, h;
  g = document.french.jour.selectedIndex, f = document.french.decade.selectedIndex, h = document.french.mois.selectedIndex, 9 < g && (g -= 11, f = 0, h = 12), 12 == h && (f = 0, 5 < g && (g = 0)), setJulian(french_revolutionary_to_jd(new Number(document.french.an.value), h + 1, f + 1, g + 1))
}

function calcGregSerial() {
  setJulian(new Number(document.gregserial.day.value) + J0000)
}

function calcExcelSerial1900() {
  var f = new Number(document.excelserial1900.day.value);
  60 < f && f--, setJulian(f - 1 + J1900)
}

function calcExcelSerial1904() {
  setJulian(new Number(document.excelserial1904.day.value) + J1904)
}

function calcUnixTime() {
  var f = new Number(document.unixtime.time.value);
  setJulian(J1970 + f / 86400)
}

function calcIsoWeek() {
  var f = new Number(document.isoweek.year.value),
    g = new Number(document.isoweek.week.value),
    h = new Number(document.isoweek.day.value);
  setJulian(iso_to_julian(f, g, h))
}

function calcIsoDay() {
  var f = new Number(document.isoday.year.value),
    g = new Number(document.isoday.day.value);
  setJulian(iso_day_to_julian(f, g))
}

function setDateToToday() {
  var f = new Date,
    g = f.getYear();
  1e3 > g && (g += 1900), document.gregorian.year.value = g, document.gregorian.month.selectedIndex = f.getMonth(), document.gregorian.day.value = f.getDate(), document.gregorian.hour.value = document.gregorian.min.value = document.gregorian.sec.value = "00"
}

function presetDataToRequest(f) {
  var g = f.indexOf("="),
    h = !1;
  if (-1 != g) {
    var k = f.substring(0, g),
      l = decodeURIComponent(f.substring(g + 1));
    if ("gregorian" == k.toLowerCase()) {
      var n = l.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/);
      null == n ? alert("Invalid Gregorian date \"" + l + "\" in search request") : 1 <= n[2] && 12 >= n[2] && 1 <= n[3] && 31 >= n[3] && (void 0 == n[4] || 0 <= n[4].substring(1) && 23 >= n[4].substring(1)) && (void 0 == n[5] || 0 <= n[5].substring(1) && 59 >= n[5].substring(1)) && (void 0 == n[6] || 0 <= n[6].substring(1) && 59 >= n[6].substring(1)) ? (document.gregorian.year.value = n[1], document.gregorian.month.selectedIndex = n[2] - 1, document.gregorian.day.value = +n[3], document.gregorian.hour.value = void 0 == n[4] ? "00" : n[4].substring(1), document.gregorian.min.value = void 0 == n[5] ? "00" : n[5].substring(1), document.gregorian.sec.value = void 0 == n[6] ? "00" : n[6].substring(1), calcGregorian(), h = !0) : alert("Invalid Gregorian date \"" + l + "\" in search request")
    } else if ("julian" == k.toLowerCase()) {
      var n = l.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/);
      null == n ? alert("Invalid Julian calendar date \"" + l + "\" in search request") : 1 <= n[2] && 12 >= n[2] && 1 <= n[3] && 31 >= n[3] && (void 0 == n[4] || 0 <= n[4].substring(1) && 23 >= n[4].substring(1)) && (void 0 == n[5] || 0 <= n[5].substring(1) && 59 >= n[5].substring(1)) && (void 0 == n[6] || 0 <= n[6].substring(1) && 59 >= n[6].substring(1)) ? (document.juliancalendar.year.value = n[1], document.juliancalendar.month.selectedIndex = n[2] - 1, document.juliancalendar.day.value = +n[3], calcJulianCalendar(), document.gregorian.hour.value = void 0 == n[4] ? "00" : n[4].substring(1), document.gregorian.min.value = void 0 == n[5] ? "00" : n[5].substring(1), document.gregorian.sec.value = void 0 == n[6] ? "00" : n[6].substring(1), h = !0) : alert("Invalid Julian calendar date \"" + l + "\" in search request")
    } else if ("jd" == k.toLowerCase()) {
      var n = l.match(/^(\-?\d+\.?\d*)/);
      null == n ? alert("Invalid Julian day \"" + l + "\" in search request") : (setJulian(n[1]), h = 1)
    } else if ("mjd" == k.toLowerCase()) {
      var n = l.match(/^(\-?\d+\.?\d*)/);
      null == n ? alert("Invalid Modified Julian day \"" + l + "\" in search request") : (document.modifiedjulianday.day.value = n[1], calcModifiedJulian(), h = 1)
    } else if ("unixtime" == k.toLowerCase()) {
      var n = l.match(/^(\-?\d+\.?\d*)/);
      null == n ? alert("Invalid Modified Julian day \"" + l + "\" in search request") : (document.unixtime.time.value = n[1], calcUnixTime(), h = 1)
    } else if ("iso" == k.toLowerCase()) {
      var n;
      null == (n = l.match(/^(\-?\d+)\-(\d\d\d)/)) ? null == (n = l.match(/^(\-?\d+)\-?W(\d\d)\-?(\d)/i)) ? alert("Invalid ISO-8601 date \"" + l + "\" in search request") : (document.isoweek.year.value = n[1], document.isoweek.week.value = n[2], document.isoweek.day.value = n[3], calcIsoWeek(), h = 1) : (document.isoday.year.value = n[1], document.isoday.day.value = n[2], calcIsoDay(), h = 1)
    } else if ("excel" == k.toLowerCase()) {
      var n = l.match(/^(\-?\d+\.?\d*)/);
      null == n ? alert("Invalid Excel serial day (1900/PC) \"" + l + "\" in search request") : (document.excelserial1900.day.value = n[1], calcExcelSerial1900(), h = 1)
    } else if ("excel1904" == k.toLowerCase()) {
      var n = l.match(/^(\-?\d+\.?\d*)/);
      null == n ? alert("Invalid Excel serial day (1904/Mac) \"" + l + "\" in search request") : (document.excelserial1904.day.value = n[1], calcExcelSerial1904(), h = 1)
    } else alert("Invalid calendar \"" + k + "\" in search request")
  } else alert("Invalid search request: " + f);
  h || (setDateToToday(), calcGregorian())
}