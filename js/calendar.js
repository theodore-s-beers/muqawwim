var J0000 = 1721424.5,
  J1970 = 2440587.5,
  JMJD = 2400000.5,
  J1900 = 2415020.5,
  J1904 = 2416480.5,
  NormLeap = ["Normal year", "Leap year"];

function weekday_before(j, k) {
  return k - jwday(k - j)
}

function search_weekday(j, k, p, q) {
  return weekday_before(j, k + p * q)
}

function nearest_weekday(j, k) {
  return search_weekday(j, k, 1, 3)
}

function next_weekday(j, k) {
  return search_weekday(j, k, 1, 7)
}

function next_or_current_weekday(j, k) {
  return search_weekday(j, k, 1, 6)
}

function previous_weekday(j, k) {
  return search_weekday(j, k, -1, 1)
}

function previous_or_current_weekday(j, k) {
  return search_weekday(j, k, 1, 0)
}

function TestSomething() {}

function leap_gregorian(j) {
  return 0 == j % 4 && (0 != j % 100 || 0 == j % 400)
}
var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(j, k, p) {
  return GREGORIAN_EPOCH - 1 + 365 * (j - 1) + Math.floor((j - 1) / 4) + -Math.floor((j - 1) / 100) + Math.floor((j - 1) / 400) + Math.floor((367 * k - 362) / 12 + (2 >= k ? 0 : leap_gregorian(j) ? -1 : -2) + p)
}

function jd_to_gregorian(j) {
  var k, p, q, w, x, z, A, B, C, D, E, F;
  return p = (k = Math.floor(j - .5) + .5) - GREGORIAN_EPOCH, q = Math.floor(p / 146097), w = mod(p, 146097), x = Math.floor(w / 36524), z = mod(w, 36524), A = Math.floor(z / 1461), B = mod(z, 1461), D = 400 * q + 100 * x + 4 * A + (C = Math.floor(B / 365)), 4 == x || 4 == C || D++, E = k - gregorian_to_jd(D, 1, 1), F = k < gregorian_to_jd(D, 3, 1) ? 0 : leap_gregorian(D) ? 1 : 2, month = Math.floor((12 * (E + F) + 373) / 367), day = k - gregorian_to_jd(D, month, 1) + 1, [D, month, day]
}

function n_weeks(j, k, p) {
  return 7 * p + (0 < p ? previous_weekday(j, k) : next_weekday(j, k))
}

function iso_to_julian(j, k, p) {
  return p + n_weeks(0, gregorian_to_jd(j - 1, 12, 28), k)
}

function jd_to_iso(j) {
  var k, p, q;
  return j >= iso_to_julian((k = jd_to_gregorian(j - 3)[0]) + 1, 1, 1) && k++, p = Math.floor((j - iso_to_julian(k, 1, 1)) / 7) + 1, 0 == (q = jwday(j)) && (q = 7), [k, p, q]
}

function iso_day_to_julian(j, k) {
  return k - 1 + gregorian_to_jd(j, 1, 1)
}

function jd_to_iso_day(j) {
  var k;
  return [k = jd_to_gregorian(j)[0], Math.floor(j - gregorian_to_jd(k, 1, 1)) + 1]
}

function pad(j, k, p) {
  for (var q = j.toString(); q.length < k;) q = p + q;
  return q
}
var JULIAN_EPOCH = 1721423.5;

function leap_julian(j) {
  return mod(j, 4) == (0 < j ? 0 : 3)
}

function julian_to_jd(j, k, p) {
  return 1 > j && j++, 2 >= k && (j--, k += 12), Math.floor(365.25 * (j + 4716)) + Math.floor(30.6001 * (k + 1)) + p - 1524.5
}

function jd_to_julian(j) {
  var k, p, q, w, x, z;
  return j += .5, k = Math.floor(j) + 1524, p = Math.floor((k - 122.1) / 365.25), q = Math.floor(365.25 * p), w = Math.floor((k - q) / 30.6001), z = Math.floor(14 > w ? w - 1 : w - 13), 1 > (x = Math.floor(2 < z ? p - 4716 : p - 4715)) && x--, [x, z, k - q - Math.floor(30.6001 * w)]
}
var HEBREW_EPOCH = 347995.5;

function hebrew_leap(j) {
  return 7 > mod(7 * j + 1, 19)
}

function hebrew_year_months(j) {
  return hebrew_leap(j) ? 13 : 12
}

function hebrew_delay_1(j) {
  var k, p;
  return p = 12084 + 13753 * (k = Math.floor((235 * j - 234) / 19)), day = 29 * k + Math.floor(p / 25920), 3 > mod(3 * (day + 1), 7) && day++, day
}

function hebrew_delay_2(j) {
  var k, p;
  return k = hebrew_delay_1(j - 1), p = hebrew_delay_1(j), 356 == hebrew_delay_1(j + 1) - p ? 2 : 382 == p - k ? 1 : 0
}

function hebrew_year_days(j) {
  return hebrew_to_jd(j + 1, 7, 1) - hebrew_to_jd(j, 7, 1)
}

function hebrew_month_days(j, k) {
  return 2 == k || 4 == k || 6 == k || 10 == k || 13 == k ? 29 : 12 != k || hebrew_leap(j) ? 8 == k && 5 != mod(hebrew_year_days(j), 10) ? 29 : 9 == k && 3 == mod(hebrew_year_days(j), 10) ? 29 : 30 : 29
}

function hebrew_to_jd(j, k, p) {
  var q, w, x;
  if (x = hebrew_year_months(j), q = HEBREW_EPOCH + hebrew_delay_1(j) + hebrew_delay_2(j) + p + 1, 7 > k) {
    for (w = 7; w <= x; w++) q += hebrew_month_days(j, w);
    for (w = 1; w < k; w++) q += hebrew_month_days(j, w)
  } else
    for (w = 7; w < k; w++) q += hebrew_month_days(j, w);
  return q
}

function jd_to_hebrew(j) {
  var k, p, q, w;
  for (j = Math.floor(j) + .5, k = (w = Math.floor(98496 * (j - HEBREW_EPOCH) / 35975351)) - 1, q = w; j >= hebrew_to_jd(q, 7, 1); q++) k++;
  for (q = p = j < hebrew_to_jd(k, 1, 1) ? 7 : 1; j > hebrew_to_jd(k, q, hebrew_month_days(k, q)); q++) p++;
  return [k, p, j - hebrew_to_jd(k, p, 1) + 1]
}

function equinoxe_a_paris(j) {
  var k;
  return (k = equinox(j, 2)) - deltat(j) / 86400 + equationOfTime(k) + .006493055555555557
}

function paris_equinoxe_jd(j) {
  var k;
  return k = equinoxe_a_paris(j), Math.floor(k - .5) + .5
}
var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

function annee_da_la_revolution(j) {
  var k, p, q = jd_to_gregorian(j)[0] - 2;
  for (k = paris_equinoxe_jd(q); j < k;) k = paris_equinoxe_jd(--q);
  for (p = k - 1; !(k <= j && j < p);) k = p, p = paris_equinoxe_jd(++q);
  return [Math.round((k - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1, k]
}

function jd_to_french_revolutionary(j) {
  var k, p, q, w;
  return k = (q = annee_da_la_revolution(j = Math.floor(j) + .5))[0], p = (j - (w = q[1])) % 30, [k, Math.floor((j - w) / 30) + 1, Math.floor(p / 10) + 1, p = p % 10 + 1]
}

function french_revolutionary_to_jd(j, k, p, q) {
  var w, x;
  for (x = FRENCH_REVOLUTIONARY_EPOCH + TropicalYear * (j - 1 - 1), w = [j - 1, 0]; w[0] < j;) x = (w = annee_da_la_revolution(x))[1] + (TropicalYear + 2);
  return w[1] + 30 * (k - 1) + 10 * (p - 1) + (q - 1)
}

function leap_islamic(j) {
  return 11 > (11 * j + 14) % 30
}
var ISLAMIC_EPOCH = 1948439.5,
  ISLAMIC_WEEKDAYS = ["al-Ahad", "al-Ithnayn", "al-Thulatha\u2019", "al-Arbi\u2018a\u2019", "al-Khamis", "al-Jum\u2018ah", "al-Sabt"];

function islamic_to_jd(j, k, p) {
  return p + Math.ceil(29.5 * (k - 1)) + 354 * (j - 1) + Math.floor((3 + 11 * j) / 30) + ISLAMIC_EPOCH - 1
}

function jd_to_islamic(j) {
  var k, p;
  return j = Math.floor(j) + .5, [k = Math.floor((30 * (j - ISLAMIC_EPOCH) + 10646) / 10631), p = Math.min(12, Math.ceil((j - (29 + islamic_to_jd(k, 1, 1))) / 29.5) + 1), j - islamic_to_jd(k, p, 1) + 1]
}

function tehran_equinox(j) {
  var k;
  return (k = equinox(j, 0)) - deltat(j) / 86400 + equationOfTime(k) + 52.5 / 360
}

function tehran_equinox_jd(j) {
  var k;
  return k = tehran_equinox(j), Math.floor(k)
}
var PERSIAN_EPOCH = 1948320.5,
  PERSIAN_WEEKDAYS = ["Yekshanbeh", "Doshanbeh", "Sehshanbeh", "Chaharshanbeh", "Panjshanbeh", "Jom\u2018eh", "Shanbeh"];

function persiana_year(j) {
  var k, p, q = jd_to_gregorian(j)[0] - 2;
  for (k = tehran_equinox_jd(q); j < k;) k = tehran_equinox_jd(--q);
  for (p = k - 1; !(k <= j && j < p);) k = p, p = tehran_equinox_jd(++q);
  return [Math.round((k - PERSIAN_EPOCH) / TropicalYear) + 1, k]
}

function jd_to_persiana(j) {
  var k, p, q, w, x;
  return k = (q = persiana_year(j = Math.floor(j) + .5))[0], w = q[1], Math.floor((j - w) / 30), [k, p = 186 >= (x = Math.floor(j) - persiana_to_jd(k, 1, 1) + 1) ? Math.ceil(x / 31) : Math.ceil((x - 6) / 30), Math.floor(j) - persiana_to_jd(k, p, 1) + 1]
}

function persiana_to_jd(j, k, p) {
  var q, w;
  for (w = PERSIAN_EPOCH - 1 + TropicalYear * (j - 1 - 1), q = [j - 1, 0]; q[0] < j;) w = (q = persiana_year(w))[1] + (TropicalYear + 2);
  return q[1] + (7 >= k ? 31 * (k - 1) : 30 * (k - 1) + 6) + (p - 1)
}

function leap_persiana(j) {
  return 365 < persiana_to_jd(j + 1, 1, 1) - persiana_to_jd(j, 1, 1)
}

function leap_persian(j) {
  return 682 > 682 * ((j - (0 < j ? 474 : 473)) % 2820 + 474 + 38) % 2816
}

function persian_to_jd(j, k, p) {
  var q, w;
  return q = j - (0 <= j ? 474 : 473), w = 474 + mod(q, 2820), p + (7 >= k ? 31 * (k - 1) : 30 * (k - 1) + 6) + Math.floor((682 * w - 110) / 2816) + 365 * (w - 1) + 1029983 * Math.floor(q / 2820) + (PERSIAN_EPOCH - 1)
}

function jd_to_persian(j) {
  var k, p, q, w, x, z, A, B, C;
  return q = (j = Math.floor(j) + .5) - persian_to_jd(475, 1, 1), w = Math.floor(q / 1029983), 1029982 == (x = mod(q, 1029983)) ? z = 2820 : (A = Math.floor(x / 366), B = mod(x, 366), z = Math.floor((2134 * A + 2816 * B + 2815) / 1028522) + A + 1), 0 >= (k = z + 2820 * w + 474) && k--, [k, p = 186 >= (C = j - persian_to_jd(k, 1, 1) + 1) ? Math.ceil(C / 31) : Math.ceil((C - 6) / 30), j - persian_to_jd(k, p, 1) + 1]
}
var MAYAN_COUNT_EPOCH = 584282.5;

function mayan_count_to_jd(j, k, p, q, w) {
  return MAYAN_COUNT_EPOCH + 144e3 * j + 7200 * k + 360 * p + 20 * q + w
}

function jd_to_mayan_count(j) {
  var k, p, q, w;
  return k = (j = Math.floor(j) + .5) - MAYAN_COUNT_EPOCH, p = Math.floor(k / 144e3), k = mod(k, 144e3), q = Math.floor(k / 7200), k = mod(k, 7200), w = Math.floor(k / 360), k = mod(k, 360), [p, q, w, Math.floor(k / 20), mod(k, 20)]
}
var MAYAN_HAAB_MONTHS = ["Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh", "Mac", "Kankin", "Muan", "Pax", "Kayab", "Cumku", "Uayeb"];

function jd_to_mayan_haab(j) {
  var k;
  return j = Math.floor(j) + .5, k = mod(j - MAYAN_COUNT_EPOCH + 8 + 340, 365), [Math.floor(k / 20) + 1, mod(k, 20)]
}
var MAYAN_TZOLKIN_MONTHS = ["Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluc", "Oc", "Chuen", "Eb", "Ben", "Ix", "Men", "Cib", "Caban", "Etznab", "Cauac", "Ahau"];

function jd_to_mayan_tzolkin(j) {
  var k;
  return k = (j = Math.floor(j) + .5) - MAYAN_COUNT_EPOCH, [amod(k + 20, 20), amod(k + 4, 13)]
}
var INDIAN_CIVIL_WEEKDAYS = ["ravivara", "somavara", "mangalavara", "budhavara", "brahaspativara", "sukravara", "sanivara"];

function indian_civil_to_jd(j, k, p) {
  var q, w, x, z, A;
  return x = gregorian_to_jd(q = j + 78, 3, (w = leap_gregorian(q)) ? 21 : 22), 1 == k ? z = x + (p - 1) : (z = x + (w ? 31 : 30), A = k - 2, z += 31 * (A = Math.min(A, 5)), 8 <= k && (z += 30 * (A = k - 7)), z += p - 1), z
}

function jd_to_indian_civil(j) {
  var k, p, q, w, x, z;
  return q = leap_gregorian((p = jd_to_gregorian(j = Math.floor(j) + .5))[0]), w = p[0] - 78, k = q ? 31 : 30, 80 > (x = j - gregorian_to_jd(p[0], 1, 1)) && (w--, x += k + 155 + 90 + 10 + 80), (x -= 80) < k ? (month = 1, day = x + 1) : 155 > (z = x - k) ? (month = Math.floor(z / 31) + 2, day = z % 31 + 1) : (z -= 155, month = Math.floor(z / 30) + 7, day = z % 30 + 1), [w, month, day]
}

function updateFromGregorian() {
  var j, k, p, q, w, x, z, A, B, C, D, E, F, G, H, I, J, K, L, M;
  switch (k = new Number(document.gregorian.year.value), p = document.gregorian.month.selectedIndex, q = new Number(document.gregorian.day.value), w = new Number(document.gregorian.hour.value), x = new Number(document.gregorian.min.value), z = new Number(document.gregorian.sec.value), j = gregorian_to_jd(k, p + 1, q) + Math.floor(z + 60 * (x + 60 * w) + .5) / 86400, document.julianday.day.value = j, document.modifiedjulianday.day.value = j - JMJD, A = jwday(j), document.gregorian.wday.value = Weekdays[A], document.gregorian.leap.value = NormLeap[leap_gregorian(k) ? 1 : 0], B = jd_to_julian(j), document.juliancalendar.year.value = B[0], document.juliancalendar.month.selectedIndex = B[1] - 1, document.juliancalendar.day.value = B[2], document.juliancalendar.leap.value = NormLeap[leap_julian(B[0]) ? 1 : 0], A = jwday(j), document.juliancalendar.wday.value = Weekdays[A], hebrew_leap((C = jd_to_hebrew(j))[0]) ? (document.hebrew.month.options.length = 13, document.hebrew.month.options[11] = new Option("Adar I"), document.hebrew.month.options[12] = new Option("Veadar")) : (document.hebrew.month.options.length = 12, document.hebrew.month.options[11] = new Option("Adar")), document.hebrew.year.value = C[0], document.hebrew.month.selectedIndex = C[1] - 1, document.hebrew.day.value = C[2], 12 != (E = C[1]) || hebrew_leap(C[0]) || (E = 14), document.hebrew.hebmonth.src = "figures/hebrew_month_" + E + ".gif", hebrew_year_days(C[0])) {
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
      document.hebrew.leap.value = "Invalid year length: " + hebrew_year_days(C[0]) + " days.";
  }
  document.getElementById("gregYear").blur(), document.getElementById("gregDay").blur(), document.getElementById("julianYear").blur(), document.getElementById("julianCalDay").blur(), document.getElementById("islamicYear").blur(), document.getElementById("islamicDay").blur(), document.getElementById("persYear").blur(), document.getElementById("persianDay").blur(), D = jd_to_islamic(j), document.islamic.year.value = D[0], document.islamic.month.selectedIndex = D[1] - 1, document.islamic.day.value = D[2], document.islamic.wday.value = "Yawm " + ISLAMIC_WEEKDAYS[A], document.islamic.leap.value = NormLeap[leap_islamic(D[0]) ? 1 : 0], perscal = jd_to_persian(j), document.persian.year.value = perscal[0], document.persian.month.selectedIndex = perscal[1] - 1, document.persian.day.value = perscal[2], document.persian.wday.value = PERSIAN_WEEKDAYS[A], document.persian.leap.value = NormLeap[leap_persian(perscal[0]) ? 1 : 0], perscal = jd_to_persiana(j), document.persiana.year.value = perscal[0], document.persiana.month.selectedIndex = perscal[1] - 1, document.persiana.day.value = perscal[2], document.persiana.wday.value = PERSIAN_WEEKDAYS[A], document.persiana.leap.value = NormLeap[leap_persiana(perscal[0]) ? 1 : 0], H = jd_to_mayan_count(j), document.mayancount.baktun.value = H[0], document.mayancount.katun.value = H[1], document.mayancount.tun.value = H[2], document.mayancount.uinal.value = H[3], document.mayancount.kin.value = H[4], I = jd_to_mayan_haab(j), document.mayancount.haab.value = I[1] + " " + MAYAN_HAAB_MONTHS[I[0] - 1], J = jd_to_mayan_tzolkin(j), document.mayancount.tzolkin.value = J[1] + " " + MAYAN_TZOLKIN_MONTHS[J[0] - 1], L = jd_to_indian_civil(j), document.indiancivilcalendar.year.value = L[0], document.indiancivilcalendar.month.selectedIndex = L[1] - 1, document.indiancivilcalendar.day.value = L[2], document.indiancivilcalendar.weekday.value = INDIAN_CIVIL_WEEKDAYS[A], document.indiancivilcalendar.leap.value = NormLeap[leap_gregorian(L[0] + 78) ? 1 : 0], K = jd_to_french_revolutionary(j), document.french.an.value = K[0], document.french.mois.selectedIndex = K[1] - 1, document.french.decade.selectedIndex = K[2] - 1, document.french.jour.selectedIndex = (12 >= K[1] ? K[3] : K[3] + 11) - 1, null != document.gregserial && (document.gregserial.day.value = j - J0000), document.excelserial1900.day.value = j - J1900 + 1 + (2415078.5 < j ? 1 : 0), document.excelserial1904.day.value = j - J1904, F = 864e5 * (j - J1970), document.unixtime.time.value = Math.round(F / 1e3), G = jd_to_iso(j), document.isoweek.year.value = G[0], document.isoweek.week.value = G[1], document.isoweek.day.value = G[2], M = jd_to_iso_day(j), document.isoday.year.value = M[0], document.isoday.day.value = M[1]
}

function calcGregorian() {
  updateFromGregorian()
}

function calcJulian() {
  var j, k, p;
  k = jd_to_gregorian(j = new Number(document.julianday.day.value)), p = jhms(j), document.gregorian.year.value = k[0], document.gregorian.month.selectedIndex = k[1] - 1, document.gregorian.day.value = k[2], document.gregorian.hour.value = pad(p[0], 2, " "), document.gregorian.min.value = pad(p[1], 2, "0"), document.gregorian.sec.value = pad(p[2], 2, "0"), updateFromGregorian()
}

function setJulian(j) {
  document.julianday.day.value = new Number(j), calcJulian()
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
  setJulian(persiana_to_jd(new Number(document.persiana.year.value), document.persiana.month.selectedIndex + 1, new Number(document.persiana.day.value)) + .5)
}

function calcMayanCount() {
  setJulian(mayan_count_to_jd(new Number(document.mayancount.baktun.value), new Number(document.mayancount.katun.value), new Number(document.mayancount.tun.value), new Number(document.mayancount.uinal.value), new Number(document.mayancount.kin.value)))
}

function calcIndianCivilCalendar() {
  setJulian(indian_civil_to_jd(new Number(document.indiancivilcalendar.year.value), document.indiancivilcalendar.month.selectedIndex + 1, new Number(document.indiancivilcalendar.day.value)))
}

function calcFrench() {
  var j, k, p;
  k = document.french.jour.selectedIndex, j = document.french.decade.selectedIndex, p = document.french.mois.selectedIndex, 9 < k && (k -= 11, j = 0, p = 12), 12 == p && (j = 0, 5 < k && (k = 0)), setJulian(french_revolutionary_to_jd(new Number(document.french.an.value), p + 1, j + 1, k + 1))
}

function calcGregSerial() {
  setJulian(new Number(document.gregserial.day.value) + J0000)
}

function calcExcelSerial1900() {
  var j = new Number(document.excelserial1900.day.value);
  60 < j && j--, setJulian(j - 1 + J1900)
}

function calcExcelSerial1904() {
  setJulian(new Number(document.excelserial1904.day.value) + J1904)
}

function calcUnixTime() {
  var j = new Number(document.unixtime.time.value);
  setJulian(J1970 + j / 86400)
}

function calcIsoWeek() {
  setJulian(iso_to_julian(new Number(document.isoweek.year.value), new Number(document.isoweek.week.value), new Number(document.isoweek.day.value)))
}

function calcIsoDay() {
  setJulian(iso_day_to_julian(new Number(document.isoday.year.value), new Number(document.isoday.day.value)))
}

function setDateToToday() {
  var j = new Date,
    k = j.getYear();
  1e3 > k && (k += 1900), document.gregorian.year.value = k, document.gregorian.month.selectedIndex = j.getMonth(), document.gregorian.day.value = j.getDate(), document.gregorian.hour.value = document.gregorian.min.value = document.gregorian.sec.value = "00"
}

function presetDataToRequest(j) {
  var k = j.indexOf("="),
    p = !1;
  if (-1 != k) {
    var q = j.substring(0, k),
      w = decodeURIComponent(j.substring(k + 1));
    if ("gregorian" == q.toLowerCase()) null == (x = w.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)) ? alert("Invalid Gregorian date \"" + w + "\" in search request") : 1 <= x[2] && 12 >= x[2] && 1 <= x[3] && 31 >= x[3] && (null == x[4] || 0 <= x[4].substring(1) && 23 >= x[4].substring(1)) && (null == x[5] || 0 <= x[5].substring(1) && 59 >= x[5].substring(1)) && (null == x[6] || 0 <= x[6].substring(1) && 59 >= x[6].substring(1)) ? (document.gregorian.year.value = x[1], document.gregorian.month.selectedIndex = x[2] - 1, document.gregorian.day.value = +x[3], document.gregorian.hour.value = null == x[4] ? "00" : x[4].substring(1), document.gregorian.min.value = null == x[5] ? "00" : x[5].substring(1), document.gregorian.sec.value = null == x[6] ? "00" : x[6].substring(1), calcGregorian(), p = !0) : alert("Invalid Gregorian date \"" + w + "\" in search request");
    else if ("julian" == q.toLowerCase()) null == (x = w.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)) ? alert("Invalid Julian calendar date \"" + w + "\" in search request") : 1 <= x[2] && 12 >= x[2] && 1 <= x[3] && 31 >= x[3] && (null == x[4] || 0 <= x[4].substring(1) && 23 >= x[4].substring(1)) && (null == x[5] || 0 <= x[5].substring(1) && 59 >= x[5].substring(1)) && (null == x[6] || 0 <= x[6].substring(1) && 59 >= x[6].substring(1)) ? (document.juliancalendar.year.value = x[1], document.juliancalendar.month.selectedIndex = x[2] - 1, document.juliancalendar.day.value = +x[3], calcJulianCalendar(), document.gregorian.hour.value = null == x[4] ? "00" : x[4].substring(1), document.gregorian.min.value = null == x[5] ? "00" : x[5].substring(1), document.gregorian.sec.value = null == x[6] ? "00" : x[6].substring(1), p = !0) : alert("Invalid Julian calendar date \"" + w + "\" in search request");
    else if ("jd" == q.toLowerCase()) null == (x = w.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Julian day \"" + w + "\" in search request") : (setJulian(x[1]), p = 1);
    else if ("mjd" == q.toLowerCase()) null == (x = w.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Modified Julian day \"" + w + "\" in search request") : (document.modifiedjulianday.day.value = x[1], calcModifiedJulian(), p = 1);
    else if ("unixtime" == q.toLowerCase()) null == (x = w.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Modified Julian day \"" + w + "\" in search request") : (document.unixtime.time.value = x[1], calcUnixTime(), p = 1);
    else if ("iso" == q.toLowerCase()) null == (x = w.match(/^(\-?\d+)\-(\d\d\d)/)) ? null == (x = w.match(/^(\-?\d+)\-?W(\d\d)\-?(\d)/i)) ? alert("Invalid ISO-8601 date \"" + w + "\" in search request") : (document.isoweek.year.value = x[1], document.isoweek.week.value = x[2], document.isoweek.day.value = x[3], calcIsoWeek(), p = 1) : (document.isoday.year.value = x[1], document.isoday.day.value = x[2], calcIsoDay(), p = 1);
    else if ("excel" == q.toLowerCase()) null == (x = w.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Excel serial day (1900/PC) \"" + w + "\" in search request") : (document.excelserial1900.day.value = x[1], calcExcelSerial1900(), p = 1);
    else if ("excel1904" == q.toLowerCase()) {
      var x;
      null == (x = w.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Excel serial day (1904/Mac) \"" + w + "\" in search request") : (document.excelserial1904.day.value = x[1], calcExcelSerial1904(), p = 1)
    } else alert("Invalid calendar \"" + q + "\" in search request")
  } else alert("Invalid search request: " + j);
  p || (setDateToToday(), calcGregorian())
}