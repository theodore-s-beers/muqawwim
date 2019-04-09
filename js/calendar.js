var J0000 = 1721424.5,
	J1970 = 2440587.5,
	JMJD = 2400000.5,
	J1900 = 2415020.5,
	J1904 = 2416480.5,
	NormLeap = ["Normal year", "Leap year"];

function weekday_before(a, b) {
	return b - jwday(b - a)
}

function search_weekday(a, b, c, d) {
	return weekday_before(a, b + c * d)
}

function nearest_weekday(a, b) {
	return search_weekday(a, b, 1, 3)
}

function next_weekday(a, b) {
	return search_weekday(a, b, 1, 7)
}

function next_or_current_weekday(a, b) {
	return search_weekday(a, b, 1, 6)
}

function previous_weekday(a, b) {
	return search_weekday(a, b, -1, 1)
}

function previous_or_current_weekday(a, b) {
	return search_weekday(a, b, 1, 0)
}

function TestSomething() {}

function leap_gregorian(a) {
	return 0 == a % 4 && (0 != a % 100 || 0 == a % 400)
}
var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(a, b, c) {
	return GREGORIAN_EPOCH - 1 + 365 * (a - 1) + Math.floor((a - 1) / 4) + -Math.floor((a - 1) / 100) + Math.floor((a - 1) / 400) + Math.floor((367 * b - 362) / 12 + (2 >= b ? 0 : leap_gregorian(a) ? -1 : -2) + c)
}

function jd_to_gregorian(a) {
	var b, c, d, e, f, g, h, i, j, l, m, n;
	return c = (b = Math.floor(a - .5) + .5) - GREGORIAN_EPOCH, d = Math.floor(c / 146097), e = mod(c, 146097), f = Math.floor(e / 36524), g = mod(e, 36524), h = Math.floor(g / 1461), i = mod(g, 1461), l = 400 * d + 100 * f + 4 * h + (j = Math.floor(i / 365)), 4 == f || 4 == j || l++, m = b - gregorian_to_jd(l, 1, 1), n = b < gregorian_to_jd(l, 3, 1) ? 0 : leap_gregorian(l) ? 1 : 2, month = Math.floor((12 * (m + n) + 373) / 367), day = b - gregorian_to_jd(l, month, 1) + 1, [l, month, day]
}

function n_weeks(a, b, c) {
	return 7 * c + (0 < c ? previous_weekday(a, b) : next_weekday(a, b))
}

function iso_to_julian(a, b, c) {
	return c + n_weeks(0, gregorian_to_jd(a - 1, 12, 28), b)
}

function jd_to_iso(a) {
	var b, c, d;
	return a >= iso_to_julian((b = jd_to_gregorian(a - 3)[0]) + 1, 1, 1) && b++, c = Math.floor((a - iso_to_julian(b, 1, 1)) / 7) + 1, 0 == (d = jwday(a)) && (d = 7), [b, c, d]
}

function iso_day_to_julian(a, b) {
	return b - 1 + gregorian_to_jd(a, 1, 1)
}

function jd_to_iso_day(a) {
	var b;
	return [b = jd_to_gregorian(a)[0], Math.floor(a - gregorian_to_jd(b, 1, 1)) + 1]
}

function pad(a, b, c) {
	for (var d = a.toString(); d.length < b;) d = c + d;
	return d
}
var JULIAN_EPOCH = 1721423.5;

function leap_julian(a) {
	return mod(a, 4) == (0 < a ? 0 : 3)
}

function julian_to_jd(a, b, c) {
	return 1 > a && a++, 2 >= b && (a--, b += 12), Math.floor(365.25 * (a + 4716)) + Math.floor(30.6001 * (b + 1)) + c - 1524.5
}

function jd_to_julian(a) {
	var b, c, d, e, f, g;
	return a += .5, b = Math.floor(a) + 1524, c = Math.floor((b - 122.1) / 365.25), d = Math.floor(365.25 * c), e = Math.floor((b - d) / 30.6001), g = Math.floor(14 > e ? e - 1 : e - 13), 1 > (f = Math.floor(2 < g ? c - 4716 : c - 4715)) && f--, [f, g, b - d - Math.floor(30.6001 * e)]
}
var HEBREW_EPOCH = 347995.5;

function hebrew_leap(a) {
	return 7 > mod(7 * a + 1, 19)
}

function hebrew_year_months(a) {
	return hebrew_leap(a) ? 13 : 12
}

function hebrew_delay_1(a) {
	var b, c;
	return c = 12084 + 13753 * (b = Math.floor((235 * a - 234) / 19)), day = 29 * b + Math.floor(c / 25920), 3 > mod(3 * (day + 1), 7) && day++, day
}

function hebrew_delay_2(a) {
	var b, c;
	return b = hebrew_delay_1(a - 1), c = hebrew_delay_1(a), 356 == hebrew_delay_1(a + 1) - c ? 2 : 382 == c - b ? 1 : 0
}

function hebrew_year_days(a) {
	return hebrew_to_jd(a + 1, 7, 1) - hebrew_to_jd(a, 7, 1)
}

function hebrew_month_days(a, b) {
	return 2 == b || 4 == b || 6 == b || 10 == b || 13 == b ? 29 : 12 != b || hebrew_leap(a) ? 8 == b && 5 != mod(hebrew_year_days(a), 10) ? 29 : 9 == b && 3 == mod(hebrew_year_days(a), 10) ? 29 : 30 : 29
}

function hebrew_to_jd(a, b, c) {
	var d, e, f;
	if (f = hebrew_year_months(a), d = HEBREW_EPOCH + hebrew_delay_1(a) + hebrew_delay_2(a) + c + 1, 7 > b) {
		for (e = 7; e <= f; e++) d += hebrew_month_days(a, e);
		for (e = 1; e < b; e++) d += hebrew_month_days(a, e)
	} else
		for (e = 7; e < b; e++) d += hebrew_month_days(a, e);
	return d
}

function jd_to_hebrew(a) {
	var b, c, d, e;
	for (a = Math.floor(a) + .5, b = (e = Math.floor(98496 * (a - HEBREW_EPOCH) / 35975351)) - 1, d = e; a >= hebrew_to_jd(d, 7, 1); d++) b++;
	for (d = c = a < hebrew_to_jd(b, 1, 1) ? 7 : 1; a > hebrew_to_jd(b, d, hebrew_month_days(b, d)); d++) c++;
	return [b, c, a - hebrew_to_jd(b, c, 1) + 1]
}

function equinoxe_a_paris(a) {
	var b;
	return (b = equinox(a, 2)) - deltat(a) / 86400 + equationOfTime(b) + .006493055555555557
}

function paris_equinoxe_jd(a) {
	var b;
	return b = equinoxe_a_paris(a), Math.floor(b - .5) + .5
}
var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

function annee_da_la_revolution(a) {
	var b, c, d = jd_to_gregorian(a)[0] - 2;
	for (b = paris_equinoxe_jd(d); a < b;) b = paris_equinoxe_jd(--d);
	for (c = b - 1; !(b <= a && a < c);) b = c, c = paris_equinoxe_jd(++d);
	return [Math.round((b - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1, b]
}

function jd_to_french_revolutionary(a) {
	var b, c, d, e;
	return b = (d = annee_da_la_revolution(a = Math.floor(a) + .5))[0], c = (a - (e = d[1])) % 30, [b, Math.floor((a - e) / 30) + 1, Math.floor(c / 10) + 1, c = c % 10 + 1]
}

function french_revolutionary_to_jd(a, b, c, d) {
	var e, f;
	for (f = FRENCH_REVOLUTIONARY_EPOCH + TropicalYear * (a - 1 - 1), e = [a - 1, 0]; e[0] < a;) f = (e = annee_da_la_revolution(f))[1] + (TropicalYear + 2);
	return e[1] + 30 * (b - 1) + 10 * (c - 1) + (d - 1)
}

function leap_islamic(a) {
	return 11 > (11 * a + 14) % 30
}
var ISLAMIC_EPOCH = 1948439.5,
	ISLAMIC_WEEKDAYS = ["al-Ahad", "al-Ithnayn", "al-Thulatha\u2019", "al-Arbi\u2018a\u2019", "al-Khamis", "al-Jum\u2018ah", "al-Sabt"];

function islamic_to_jd(a, b, c) {
	return c + Math.ceil(29.5 * (b - 1)) + 354 * (a - 1) + Math.floor((3 + 11 * a) / 30) + ISLAMIC_EPOCH - 1
}

function jd_to_islamic(a) {
	var b, c;
	return a = Math.floor(a) + .5, [b = Math.floor((30 * (a - ISLAMIC_EPOCH) + 10646) / 10631), c = Math.min(12, Math.ceil((a - (29 + islamic_to_jd(b, 1, 1))) / 29.5) + 1), a - islamic_to_jd(b, c, 1) + 1]
}

function tehran_equinox(a) {
	var b;
	return (b = equinox(a, 0)) - deltat(a) / 86400 + equationOfTime(b) + 52.5 / 360
}

function tehran_equinox_jd(a) {
	var b;
	return b = tehran_equinox(a), Math.floor(b)
}
var PERSIAN_EPOCH = 1948320.5,
	PERSIAN_WEEKDAYS = ["Yekshanbeh", "Doshanbeh", "Sehshanbeh", "Chaharshanbeh", "Panjshanbeh", "Jom\u2018eh", "Shanbeh"];

function persiana_year(a) {
	var b, c, d = jd_to_gregorian(a)[0] - 2;
	for (b = tehran_equinox_jd(d); a < b;) b = tehran_equinox_jd(--d);
	for (c = b - 1; !(b <= a && a < c);) b = c, c = tehran_equinox_jd(++d);
	return [Math.round((b - PERSIAN_EPOCH) / TropicalYear) + 1, b]
}

function jd_to_persiana(a) {
	var b, c, d, e, f;
	return b = (d = persiana_year(a = Math.floor(a) + .5))[0], e = d[1], Math.floor((a - e) / 30), [b, c = 186 >= (f = Math.floor(a) - persiana_to_jd(b, 1, 1) + 1) ? Math.ceil(f / 31) : Math.ceil((f - 6) / 30), Math.floor(a) - persiana_to_jd(b, c, 1) + 1]
}

function persiana_to_jd(a, b, c) {
	var d, e;
	for (e = PERSIAN_EPOCH - 1 + TropicalYear * (a - 1 - 1), d = [a - 1, 0]; d[0] < a;) e = (d = persiana_year(e))[1] + (TropicalYear + 2);
	return d[1] + (7 >= b ? 31 * (b - 1) : 30 * (b - 1) + 6) + (c - 1)
}

function leap_persiana(a) {
	return 365 < persiana_to_jd(a + 1, 1, 1) - persiana_to_jd(a, 1, 1)
}

function leap_persian(a) {
	return 682 > 682 * ((a - (0 < a ? 474 : 473)) % 2820 + 474 + 38) % 2816
}

function persian_to_jd(a, b, c) {
	var d, e;
	return d = a - (0 <= a ? 474 : 473), e = 474 + mod(d, 2820), c + (7 >= b ? 31 * (b - 1) : 30 * (b - 1) + 6) + Math.floor((682 * e - 110) / 2816) + 365 * (e - 1) + 1029983 * Math.floor(d / 2820) + (PERSIAN_EPOCH - 1)
}

function jd_to_persian(a) {
	var b, c, d, e, f, g, h, i, l;
	return d = (a = Math.floor(a) + .5) - persian_to_jd(475, 1, 1), e = Math.floor(d / 1029983), 1029982 == (f = mod(d, 1029983)) ? g = 2820 : (h = Math.floor(f / 366), i = mod(f, 366), g = Math.floor((2134 * h + 2816 * i + 2815) / 1028522) + h + 1), 0 >= (b = g + 2820 * e + 474) && b--, [b, c = 186 >= (l = a - persian_to_jd(b, 1, 1) + 1) ? Math.ceil(l / 31) : Math.ceil((l - 6) / 30), a - persian_to_jd(b, c, 1) + 1]
}
var MAYAN_COUNT_EPOCH = 584282.5;

function mayan_count_to_jd(a, b, c, d, e) {
	return MAYAN_COUNT_EPOCH + 144e3 * a + 7200 * b + 360 * c + 20 * d + e
}

function jd_to_mayan_count(a) {
	var b, c, d, e;
	return b = (a = Math.floor(a) + .5) - MAYAN_COUNT_EPOCH, c = Math.floor(b / 144e3), b = mod(b, 144e3), d = Math.floor(b / 7200), b = mod(b, 7200), e = Math.floor(b / 360), b = mod(b, 360), [c, d, e, Math.floor(b / 20), mod(b, 20)]
}
var MAYAN_HAAB_MONTHS = ["Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh", "Mac", "Kankin", "Muan", "Pax", "Kayab", "Cumku", "Uayeb"];

function jd_to_mayan_haab(a) {
	var b;
	return a = Math.floor(a) + .5, b = mod(a - MAYAN_COUNT_EPOCH + 8 + 340, 365), [Math.floor(b / 20) + 1, mod(b, 20)]
}
var MAYAN_TZOLKIN_MONTHS = ["Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluc", "Oc", "Chuen", "Eb", "Ben", "Ix", "Men", "Cib", "Caban", "Etznab", "Cauac", "Ahau"];

function jd_to_mayan_tzolkin(a) {
	var b;
	return b = (a = Math.floor(a) + .5) - MAYAN_COUNT_EPOCH, [amod(b + 20, 20), amod(b + 4, 13)]
}
var INDIAN_CIVIL_WEEKDAYS = ["ravivara", "somavara", "mangalavara", "budhavara", "brahaspativara", "sukravara", "sanivara"];

function indian_civil_to_jd(a, b, c) {
	var d, e, f, g, h;
	return f = gregorian_to_jd(d = a + 78, 3, (e = leap_gregorian(d)) ? 21 : 22), 1 == b ? g = f + (c - 1) : (g = f + (e ? 31 : 30), h = b - 2, g += 31 * (h = Math.min(h, 5)), 8 <= b && (g += 30 * (h = b - 7)), g += c - 1), g
}

function jd_to_indian_civil(a) {
	var b, c, d, e, f, g;
	return d = leap_gregorian((c = jd_to_gregorian(a = Math.floor(a) + .5))[0]), e = c[0] - 78, b = d ? 31 : 30, 80 > (f = a - gregorian_to_jd(c[0], 1, 1)) && (e--, f += b + 155 + 90 + 10 + 80), (f -= 80) < b ? (month = 1, day = f + 1) : 155 > (g = f - b) ? (month = Math.floor(g / 31) + 2, day = g % 31 + 1) : (g -= 155, month = Math.floor(g / 30) + 7, day = g % 30 + 1), [e, month, day]
}

function updateFromGregorian() {
	var a, b, c, d, e, f, g, h, i, l, m, n, o, r, s, t, u, v, y, N;
	switch (b = new Number(document.gregorian.year.value), c = document.gregorian.month.selectedIndex, d = new Number(document.gregorian.day.value), e = new Number(document.gregorian.hour.value), f = new Number(document.gregorian.min.value), g = new Number(document.gregorian.sec.value), a = gregorian_to_jd(b, c + 1, d) + Math.floor(g + 60 * (f + 60 * e) + .5) / 86400, document.julianday.day.value = a, document.modifiedjulianday.day.value = a - JMJD, h = jwday(a), document.gregorian.wday.value = Weekdays[h], document.gregorian.leap.value = NormLeap[leap_gregorian(b) ? 1 : 0], i = jd_to_julian(a), document.juliancalendar.year.value = i[0], document.juliancalendar.month.selectedIndex = i[1] - 1, document.juliancalendar.day.value = i[2], document.juliancalendar.leap.value = NormLeap[leap_julian(i[0]) ? 1 : 0], h = jwday(a), document.juliancalendar.wday.value = Weekdays[h], hebrew_leap((l = jd_to_hebrew(a))[0]) ? (document.hebrew.month.options.length = 13, document.hebrew.month.options[11] = new Option("Adar I"), document.hebrew.month.options[12] = new Option("Veadar")) : (document.hebrew.month.options.length = 12, document.hebrew.month.options[11] = new Option("Adar")), document.hebrew.year.value = l[0], document.hebrew.month.selectedIndex = l[1] - 1, document.hebrew.day.value = l[2], 12 != (n = l[1]) || hebrew_leap(l[0]) || (n = 14), document.hebrew.hebmonth.src = "figures/hebrew_month_" + n + ".gif", hebrew_year_days(l[0])) {
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
			document.hebrew.leap.value = "Invalid year length: " + hebrew_year_days(l[0]) + " days.";
	}
	document.getElementById("gregYear").blur(), document.getElementById("gregDay").blur(), document.getElementById("julianYear").blur(), document.getElementById("julianCalDay").blur(), document.getElementById("islamicYear").blur(), document.getElementById("islamicDay").blur(), document.getElementById("persYear").blur(), document.getElementById("persianDay").blur(), m = jd_to_islamic(a), document.islamic.year.value = m[0], document.islamic.month.selectedIndex = m[1] - 1, document.islamic.day.value = m[2], document.islamic.wday.value = "Yawm " + ISLAMIC_WEEKDAYS[h], document.islamic.leap.value = NormLeap[leap_islamic(m[0]) ? 1 : 0], perscal = jd_to_persian(a), document.persian.year.value = perscal[0], document.persian.month.selectedIndex = perscal[1] - 1, document.persian.day.value = perscal[2], document.persian.wday.value = PERSIAN_WEEKDAYS[h], document.persian.leap.value = NormLeap[leap_persian(perscal[0]) ? 1 : 0], perscal = jd_to_persiana(a), document.persiana.year.value = perscal[0], document.persiana.month.selectedIndex = perscal[1] - 1, document.persiana.day.value = perscal[2], document.persiana.wday.value = PERSIAN_WEEKDAYS[h], document.persiana.leap.value = NormLeap[leap_persiana(perscal[0]) ? 1 : 0], s = jd_to_mayan_count(a), document.mayancount.baktun.value = s[0], document.mayancount.katun.value = s[1], document.mayancount.tun.value = s[2], document.mayancount.uinal.value = s[3], document.mayancount.kin.value = s[4], t = jd_to_mayan_haab(a), document.mayancount.haab.value = t[1] + " " + MAYAN_HAAB_MONTHS[t[0] - 1], u = jd_to_mayan_tzolkin(a), document.mayancount.tzolkin.value = u[1] + " " + MAYAN_TZOLKIN_MONTHS[u[0] - 1], y = jd_to_indian_civil(a), document.indiancivilcalendar.year.value = y[0], document.indiancivilcalendar.month.selectedIndex = y[1] - 1, document.indiancivilcalendar.day.value = y[2], document.indiancivilcalendar.weekday.value = INDIAN_CIVIL_WEEKDAYS[h], document.indiancivilcalendar.leap.value = NormLeap[leap_gregorian(y[0] + 78) ? 1 : 0], v = jd_to_french_revolutionary(a), document.french.an.value = v[0], document.french.mois.selectedIndex = v[1] - 1, document.french.decade.selectedIndex = v[2] - 1, document.french.jour.selectedIndex = (12 >= v[1] ? v[3] : v[3] + 11) - 1, null != document.gregserial && (document.gregserial.day.value = a - J0000), document.excelserial1900.day.value = a - J1900 + 1 + (2415078.5 < a ? 1 : 0), document.excelserial1904.day.value = a - J1904, o = 864e5 * (a - J1970), document.unixtime.time.value = Math.round(o / 1e3), r = jd_to_iso(a), document.isoweek.year.value = r[0], document.isoweek.week.value = r[1], document.isoweek.day.value = r[2], N = jd_to_iso_day(a), document.isoday.year.value = N[0], document.isoday.day.value = N[1]
}

function calcGregorian() {
	updateFromGregorian()
}

function calcJulian() {
	var a, b, c;
	b = jd_to_gregorian(a = new Number(document.julianday.day.value)), c = jhms(a), document.gregorian.year.value = b[0], document.gregorian.month.selectedIndex = b[1] - 1, document.gregorian.day.value = b[2], document.gregorian.hour.value = pad(c[0], 2, " "), document.gregorian.min.value = pad(c[1], 2, "0"), document.gregorian.sec.value = pad(c[2], 2, "0"), updateFromGregorian()
}

function setJulian(a) {
	document.julianday.day.value = new Number(a), calcJulian()
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
	var a, b, c;
	b = document.french.jour.selectedIndex, a = document.french.decade.selectedIndex, c = document.french.mois.selectedIndex, 9 < b && (b -= 11, a = 0, c = 12), 12 == c && (a = 0, 5 < b && (b = 0)), setJulian(french_revolutionary_to_jd(new Number(document.french.an.value), c + 1, a + 1, b + 1))
}

function calcGregSerial() {
	setJulian(new Number(document.gregserial.day.value) + J0000)
}

function calcExcelSerial1900() {
	var a = new Number(document.excelserial1900.day.value);
	60 < a && a--, setJulian(a - 1 + J1900)
}

function calcExcelSerial1904() {
	setJulian(new Number(document.excelserial1904.day.value) + J1904)
}

function calcUnixTime() {
	var a = new Number(document.unixtime.time.value);
	setJulian(J1970 + a / 86400)
}

function calcIsoWeek() {
	setJulian(iso_to_julian(new Number(document.isoweek.year.value), new Number(document.isoweek.week.value), new Number(document.isoweek.day.value)))
}

function calcIsoDay() {
	setJulian(iso_day_to_julian(new Number(document.isoday.year.value), new Number(document.isoday.day.value)))
}

function setDateToToday() {
	var a = new Date,
		b = a.getYear();
	1e3 > b && (b += 1900), document.gregorian.year.value = b, document.gregorian.month.selectedIndex = a.getMonth(), document.gregorian.day.value = a.getDate(), document.gregorian.hour.value = document.gregorian.min.value = document.gregorian.sec.value = "00"
}

function presetDataToRequest(a) {
	var b = a.indexOf("="),
		c = !1;
	if (-1 != b) {
		var d = a.substring(0, b),
			e = decodeURIComponent(a.substring(b + 1));
		if ("gregorian" == d.toLowerCase()) null == (f = e.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)) ? alert("Invalid Gregorian date \"" + e + "\" in search request") : 1 <= f[2] && 12 >= f[2] && 1 <= f[3] && 31 >= f[3] && (null == f[4] || 0 <= f[4].substring(1) && 23 >= f[4].substring(1)) && (null == f[5] || 0 <= f[5].substring(1) && 59 >= f[5].substring(1)) && (null == f[6] || 0 <= f[6].substring(1) && 59 >= f[6].substring(1)) ? (document.gregorian.year.value = f[1], document.gregorian.month.selectedIndex = f[2] - 1, document.gregorian.day.value = +f[3], document.gregorian.hour.value = null == f[4] ? "00" : f[4].substring(1), document.gregorian.min.value = null == f[5] ? "00" : f[5].substring(1), document.gregorian.sec.value = null == f[6] ? "00" : f[6].substring(1), calcGregorian(), c = !0) : alert("Invalid Gregorian date \"" + e + "\" in search request");
		else if ("julian" == d.toLowerCase()) null == (f = e.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)) ? alert("Invalid Julian calendar date \"" + e + "\" in search request") : 1 <= f[2] && 12 >= f[2] && 1 <= f[3] && 31 >= f[3] && (null == f[4] || 0 <= f[4].substring(1) && 23 >= f[4].substring(1)) && (null == f[5] || 0 <= f[5].substring(1) && 59 >= f[5].substring(1)) && (null == f[6] || 0 <= f[6].substring(1) && 59 >= f[6].substring(1)) ? (document.juliancalendar.year.value = f[1], document.juliancalendar.month.selectedIndex = f[2] - 1, document.juliancalendar.day.value = +f[3], calcJulianCalendar(), document.gregorian.hour.value = null == f[4] ? "00" : f[4].substring(1), document.gregorian.min.value = null == f[5] ? "00" : f[5].substring(1), document.gregorian.sec.value = null == f[6] ? "00" : f[6].substring(1), c = !0) : alert("Invalid Julian calendar date \"" + e + "\" in search request");
		else if ("jd" == d.toLowerCase()) null == (f = e.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Julian day \"" + e + "\" in search request") : (setJulian(f[1]), c = 1);
		else if ("mjd" == d.toLowerCase()) null == (f = e.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Modified Julian day \"" + e + "\" in search request") : (document.modifiedjulianday.day.value = f[1], calcModifiedJulian(), c = 1);
		else if ("unixtime" == d.toLowerCase()) null == (f = e.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Modified Julian day \"" + e + "\" in search request") : (document.unixtime.time.value = f[1], calcUnixTime(), c = 1);
		else if ("iso" == d.toLowerCase()) null == (f = e.match(/^(\-?\d+)\-(\d\d\d)/)) ? null == (f = e.match(/^(\-?\d+)\-?W(\d\d)\-?(\d)/i)) ? alert("Invalid ISO-8601 date \"" + e + "\" in search request") : (document.isoweek.year.value = f[1], document.isoweek.week.value = f[2], document.isoweek.day.value = f[3], calcIsoWeek(), c = 1) : (document.isoday.year.value = f[1], document.isoday.day.value = f[2], calcIsoDay(), c = 1);
		else if ("excel" == d.toLowerCase()) null == (f = e.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Excel serial day (1900/PC) \"" + e + "\" in search request") : (document.excelserial1900.day.value = f[1], calcExcelSerial1900(), c = 1);
		else if ("excel1904" == d.toLowerCase()) {
			var f;
			null == (f = e.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Excel serial day (1904/Mac) \"" + e + "\" in search request") : (document.excelserial1904.day.value = f[1], calcExcelSerial1904(), c = 1)
		} else alert("Invalid calendar \"" + d + "\" in search request")
	} else alert("Invalid search request: " + a);
	c || (setDateToToday(), calcGregorian())
}