var J0000 = 1721424.5,
	J1970 = 2440587.5,
	JMJD = 2400000.5,
	J1900 = 2415020.5,
	J1904 = 2416480.5,
	NormLeap = ["Normal year", "Leap year"];

function weekday_before(c, a) {
	return a - jwday(a - c)
}

function search_weekday(e, a, b, c) {
	return weekday_before(e, a + b * c)
}

function nearest_weekday(c, a) {
	return search_weekday(c, a, 1, 3)
}

function next_weekday(c, a) {
	return search_weekday(c, a, 1, 7)
}

function next_or_current_weekday(c, a) {
	return search_weekday(c, a, 1, 6)
}

function previous_weekday(c, a) {
	return search_weekday(c, a, -1, 1)
}

function previous_or_current_weekday(c, a) {
	return search_weekday(c, a, 1, 0)
}

function TestSomething() { }

function leap_gregorian(b) {
	return 0 == b % 4 && (0 != b % 100 || 0 == b % 400)
}
var GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(d, a, b) {
	return GREGORIAN_EPOCH - 1 + 365 * (d - 1) + Math.floor((d - 1) / 4) + -Math.floor((d - 1) / 100) + Math.floor((d - 1) / 400) + Math.floor((367 * a - 362) / 12 + (2 >= a ? 0 : leap_gregorian(d) ? -1 : -2) + b)
}

function jd_to_gregorian(k) {
	var a, o, p, q, r, s, t, u, v, w, x, y;
	return o = (a = Math.floor(k - .5) + .5) - GREGORIAN_EPOCH, p = Math.floor(o / 146097), q = mod(o, 146097), r = Math.floor(q / 36524), s = mod(q, 36524), t = Math.floor(s / 1461), u = mod(s, 1461), w = 400 * p + 100 * r + 4 * t + (v = Math.floor(u / 365)), 4 == r || 4 == v || w++ , x = a - gregorian_to_jd(w, 1, 1), y = a < gregorian_to_jd(w, 3, 1) ? 0 : leap_gregorian(w) ? 1 : 2, month = Math.floor((12 * (x + y) + 373) / 367), day = a - gregorian_to_jd(w, month, 1) + 1, [w, month, day]
}

function n_weeks(d, a, b) {
	return 7 * b + (0 < b ? previous_weekday(d, a) : next_weekday(d, a))
}

function iso_to_julian(d, a, b) {
	return b + n_weeks(0, gregorian_to_jd(d - 1, 12, 28), a)
}

function jd_to_iso(e) {
	var a, f, g;
	return e >= iso_to_julian((a = jd_to_gregorian(e - 3)[0]) + 1, 1, 1) && a++ , f = Math.floor((e - iso_to_julian(a, 1, 1)) / 7) + 1, 0 == (g = jwday(e)) && (g = 7), [a, f, g]
}

function iso_day_to_julian(c, a) {
	return a - 1 + gregorian_to_jd(c, 1, 1)
}

function jd_to_iso_day(c) {
	var a;
	return [a = jd_to_gregorian(c)[0], Math.floor(c - gregorian_to_jd(a, 1, 1)) + 1]
}

function pad(e, a, b) {
	for (var c = e.toString(); c.length < a;) c = b + c;
	return c
}
var JULIAN_EPOCH = 1721423.5;

function leap_julian(b) {
	return mod(b, 4) == (0 < b ? 0 : 3)
}

function julian_to_jd(d, e, f) {
	return 1 > d && d++ , 2 >= e && (d-- , e += 12), Math.floor(365.25 * (d + 4716)) + Math.floor(30.6001 * (e + 1)) + f - 1524.5
}

function jd_to_julian(h) {
	var i, j, k, l, m, n;
	return h += .5, i = Math.floor(h) + 1524, j = Math.floor((i - 122.1) / 365.25), k = Math.floor(365.25 * j), l = Math.floor((i - k) / 30.6001), n = Math.floor(14 > l ? l - 1 : l - 13), 1 > (m = Math.floor(2 < n ? j - 4716 : j - 4715)) && m-- , [m, n, i - k - Math.floor(30.6001 * l)]
}
var HEBREW_EPOCH = 347995.5;

function hebrew_leap(b) {
	return 7 > mod(7 * b + 1, 19)
}

function hebrew_year_months(b) {
	return hebrew_leap(b) ? 13 : 12
}

function hebrew_delay_1(d) {
	var a, e;
	return e = 12084 + 13753 * (a = Math.floor((235 * d - 234) / 19)), day = 29 * a + Math.floor(e / 25920), 3 > mod(3 * (day + 1), 7) && day++ , day
}

function hebrew_delay_2(d) {
	var a, e;
	return a = hebrew_delay_1(d - 1), e = hebrew_delay_1(d), 356 == hebrew_delay_1(d + 1) - e ? 2 : 382 == e - a ? 1 : 0
}

function hebrew_year_days(b) {
	return hebrew_to_jd(b + 1, 7, 1) - hebrew_to_jd(b, 7, 1)
}

function hebrew_month_days(c, a) {
	return 2 == a || 4 == a || 6 == a || 10 == a || 13 == a ? 29 : 12 != a || hebrew_leap(c) ? 8 == a && 5 != mod(hebrew_year_days(c), 10) ? 29 : 9 == a && 3 == mod(hebrew_year_days(c), 10) ? 29 : 30 : 29
}

function hebrew_to_jd(g, a, b) {
	var c, h, i;
	if (i = hebrew_year_months(g), c = HEBREW_EPOCH + hebrew_delay_1(g) + hebrew_delay_2(g) + b + 1, 7 > a) {
		for (h = 7; h <= i; h++) c += hebrew_month_days(g, h);
		for (h = 1; h < a; h++) c += hebrew_month_days(g, h)
	} else
		for (h = 7; h < a; h++) c += hebrew_month_days(g, h);
	return c
}

function jd_to_hebrew(f) {
	var g, h, i, j;
	for (f = Math.floor(f) + .5, g = (j = Math.floor(98496 * (f - HEBREW_EPOCH) / 35975351)) - 1, i = j; f >= hebrew_to_jd(i, 7, 1); i++) g++;
	for (i = h = f < hebrew_to_jd(g, 1, 1) ? 7 : 1; f > hebrew_to_jd(g, i, hebrew_month_days(g, i)); i++) h++;
	return [g, h, f - hebrew_to_jd(g, h, 1) + 1]
}

function equinoxe_a_paris(c) {
	var a;
	return (a = equinox(c, 2)) - deltat(c) / 86400 + equationOfTime(a) + .006493055555555557
}

function paris_equinoxe_jd(c) {
	var a;
	return a = equinoxe_a_paris(c), Math.floor(a - .5) + .5
}
var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

function annee_da_la_revolution(e) {
	var a, f, g = jd_to_gregorian(e)[0] - 2;
	for (a = paris_equinoxe_jd(g); e < a;) a = paris_equinoxe_jd(--g);
	for (f = a - 1; !(a <= e && e < f);) a = f, f = paris_equinoxe_jd(++g);
	return [Math.round((a - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1, a]
}

function jd_to_french_revolutionary(f) {
	var g, h, i, j;
	return g = (i = annee_da_la_revolution(f = Math.floor(f) + .5))[0], h = (f - (j = i[1])) % 30, [g, Math.floor((f - j) / 30) + 1, Math.floor(h / 10) + 1, h = h % 10 + 1]
}

function french_revolutionary_to_jd(g, a, b, c) {
	var d, h;
	for (h = FRENCH_REVOLUTIONARY_EPOCH + TropicalYear * (g - 1 - 1), d = [g - 1, 0]; d[0] < g;) h = (d = annee_da_la_revolution(h))[1] + (TropicalYear + 2);
	return d[1] + 30 * (a - 1) + 10 * (b - 1) + (c - 1)
}

function leap_islamic(b) {
	return 11 > (11 * b + 14) % 30
}
var ISLAMIC_EPOCH = 1948439.5,
	ISLAMIC_WEEKDAYS = ["al-Ahad", "al-Ithnayn", "al-Thulatha\u2019", "al-Arbi\u2018a\u2019", "al-Khamis", "al-Jum\u2018ah", "al-Sabt"];

function islamic_to_jd(d, a, b) {
	return b + Math.ceil(29.5 * (a - 1)) + 354 * (d - 1) + Math.floor((3 + 11 * d) / 30) + ISLAMIC_EPOCH - 1
}

function jd_to_islamic(d) {
	var e, f;
	return d = Math.floor(d) + .5, [e = Math.floor((30 * (d - ISLAMIC_EPOCH) + 10646) / 10631), f = Math.min(12, Math.ceil((d - (29 + islamic_to_jd(e, 1, 1))) / 29.5) + 1), d - islamic_to_jd(e, f, 1) + 1]
}

function tehran_equinox(c) {
	var a;
	return (a = equinox(c, 0)) - deltat(c) / 86400 + equationOfTime(a) + 52.5 / 360
}

function tehran_equinox_jd(c) {
	var a;
	return a = tehran_equinox(c), Math.floor(a)
}
var PERSIAN_EPOCH = 1948320.5,
	PERSIAN_WEEKDAYS = ["Yekshanbeh", "Doshanbeh", "Sehshanbeh", "Chaharshanbeh", "Panjshanbeh", "Jom\u2018eh", "Shanbeh"];

function persiana_year(e) {
	var a, f, g = jd_to_gregorian(e)[0] - 2;
	for (a = tehran_equinox_jd(g); e < a;) a = tehran_equinox_jd(--g);
	for (f = a - 1; !(a <= e && e < f);) a = f, f = tehran_equinox_jd(++g);
	return [Math.round((a - PERSIAN_EPOCH) / TropicalYear) + 1, a]
}

function jd_to_persiana(g) {
	var h, i, j, k, l;
	return h = (j = persiana_year(g = Math.floor(g) + .5))[0], k = j[1], Math.floor((g - k) / 30), [h, i = 186 >= (l = Math.floor(g) - persiana_to_jd(h, 1, 1) + 1) ? Math.ceil(l / 31) : Math.ceil((l - 6) / 30), Math.floor(g) - persiana_to_jd(h, i, 1) + 1]
}

function persiana_to_jd(f, a, b) {
	var c, g;
	for (g = PERSIAN_EPOCH - 1 + TropicalYear * (f - 1 - 1), c = [f - 1, 0]; c[0] < f;) g = (c = persiana_year(g))[1] + (TropicalYear + 2);
	return c[1] + (7 >= a ? 31 * (a - 1) : 30 * (a - 1) + 6) + (b - 1)
}

function leap_persiana(b) {
	return 365 < persiana_to_jd(b + 1, 1, 1) - persiana_to_jd(b, 1, 1)
}

function leap_persian(b) {
	return 682 > 682 * ((b - (0 < b ? 474 : 473)) % 2820 + 474 + 38) % 2816
}

function persian_to_jd(f, a, b) {
	var c, g;
	return c = f - (0 <= f ? 474 : 473), g = 474 + mod(c, 2820), b + (7 >= a ? 31 * (a - 1) : 30 * (a - 1) + 6) + Math.floor((682 * g - 110) / 2816) + 365 * (g - 1) + 1029983 * Math.floor(c / 2820) + (PERSIAN_EPOCH - 1)
}

function jd_to_persian(j) {
	var k, m, n, o, p, q, r, s, t;
	return n = (j = Math.floor(j) + .5) - persian_to_jd(475, 1, 1), o = Math.floor(n / 1029983), 1029982 == (p = mod(n, 1029983)) ? q = 2820 : (r = Math.floor(p / 366), s = mod(p, 366), q = Math.floor((2134 * r + 2816 * s + 2815) / 1028522) + r + 1), 0 >= (k = q + 2820 * o + 474) && k-- , [k, m = 186 >= (t = j - persian_to_jd(k, 1, 1) + 1) ? Math.ceil(t / 31) : Math.ceil((t - 6) / 30), j - persian_to_jd(k, m, 1) + 1]
}
var MAYAN_COUNT_EPOCH = 584282.5;

function mayan_count_to_jd(f, a, b, c, d) {
	return MAYAN_COUNT_EPOCH + 144e3 * f + 7200 * a + 360 * b + 20 * c + d
}

function jd_to_mayan_count(f) {
	var g, h, i, j;
	return g = (f = Math.floor(f) + .5) - MAYAN_COUNT_EPOCH, h = Math.floor(g / 144e3), g = mod(g, 144e3), i = Math.floor(g / 7200), g = mod(g, 7200), j = Math.floor(g / 360), g = mod(g, 360), [h, i, j, Math.floor(g / 20), mod(g, 20)]
}
var MAYAN_HAAB_MONTHS = ["Pop", "Uo", "Zip", "Zotz", "Tzec", "Xul", "Yaxkin", "Mol", "Chen", "Yax", "Zac", "Ceh", "Mac", "Kankin", "Muan", "Pax", "Kayab", "Cumku", "Uayeb"];

function jd_to_mayan_haab(c) {
	var d;
	return c = Math.floor(c) + .5, d = mod(c - MAYAN_COUNT_EPOCH + 8 + 340, 365), [Math.floor(d / 20) + 1, mod(d, 20)]
}
var MAYAN_TZOLKIN_MONTHS = ["Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluc", "Oc", "Chuen", "Eb", "Ben", "Ix", "Men", "Cib", "Caban", "Etznab", "Cauac", "Ahau"];

function jd_to_mayan_tzolkin(c) {
	var d;
	return d = (c = Math.floor(c) + .5) - MAYAN_COUNT_EPOCH, [amod(d + 20, 20), amod(d + 4, 13)]
}
var INDIAN_CIVIL_WEEKDAYS = ["ravivara", "somavara", "mangalavara", "budhavara", "brahaspativara", "sukravara", "sanivara"];

function indian_civil_to_jd(i, a, b) {
	var c, j, k, l, m;
	return k = gregorian_to_jd(c = i + 78, 3, (j = leap_gregorian(c)) ? 21 : 22), 1 == a ? l = k + (b - 1) : (l = k + (j ? 31 : 30), m = a - 2, l += 31 * (m = Math.min(m, 5)), 8 <= a && (l += 30 * (m = a - 7)), l += b - 1), l
}

function jd_to_indian_civil(h) {
	var i, j, k, l, m, n;
	return k = leap_gregorian((j = jd_to_gregorian(h = Math.floor(h) + .5))[0]), l = j[0] - 78, i = k ? 31 : 30, 80 > (m = h - gregorian_to_jd(j[0], 1, 1)) && (l-- , m += i + 155 + 90 + 10 + 80), (m -= 80) < i ? (month = 1, day = m + 1) : 155 > (n = m - i) ? (month = Math.floor(n / 31) + 2, day = n % 31 + 1) : (n -= 155, month = Math.floor(n / 30) + 7, day = n % 30 + 1), [l, month, day]
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
	var d, e, f;
	e = jd_to_gregorian(d = new Number(document.julianday.day.value)), f = jhms(d), document.gregorian.year.value = e[0], document.gregorian.month.selectedIndex = e[1] - 1, document.gregorian.day.value = e[2], document.gregorian.hour.value = pad(f[0], 2, " "), document.gregorian.min.value = pad(f[1], 2, "0"), document.gregorian.sec.value = pad(f[2], 2, "0"), updateFromGregorian()
}

function setJulian(b) {
	document.julianday.day.value = new Number(b), calcJulian()
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
	var d, e, f;
	e = document.french.jour.selectedIndex, d = document.french.decade.selectedIndex, f = document.french.mois.selectedIndex, 9 < e && (e -= 11, d = 0, f = 12), 12 == f && (d = 0, 5 < e && (e = 0)), setJulian(french_revolutionary_to_jd(new Number(document.french.an.value), f + 1, d + 1, e + 1))
}

function calcGregSerial() {
	setJulian(new Number(document.gregserial.day.value) + J0000)
}

function calcExcelSerial1900() {
	var b = new Number(document.excelserial1900.day.value);
	60 < b && b-- , setJulian(b - 1 + J1900)
}

function calcExcelSerial1904() {
	setJulian(new Number(document.excelserial1904.day.value) + J1904)
}

function calcUnixTime() {
	var b = new Number(document.unixtime.time.value);
	setJulian(J1970 + b / 86400)
}

function calcIsoWeek() {
	setJulian(iso_to_julian(new Number(document.isoweek.year.value), new Number(document.isoweek.week.value), new Number(document.isoweek.day.value)))
}

function calcIsoDay() {
	setJulian(iso_day_to_julian(new Number(document.isoday.year.value), new Number(document.isoday.day.value)))
}

function setDateToToday() {
	var c = new Date,
		a = c.getYear();
	1e3 > a && (a += 1900), document.gregorian.year.value = a, document.gregorian.month.selectedIndex = c.getMonth(), document.gregorian.day.value = c.getDate(), document.gregorian.hour.value = document.gregorian.min.value = document.gregorian.sec.value = "00"
}

function presetDataToRequest(g) {
	var a = g.indexOf("="),
		b = !1;
	if (-1 != a) {
		var h = g.substring(0, a),
			d = decodeURIComponent(g.substring(a + 1));
		if ("gregorian" == h.toLowerCase()) null == (e = d.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)) ? alert("Invalid Gregorian date \"" + d + "\" in search request") : 1 <= e[2] && 12 >= e[2] && 1 <= e[3] && 31 >= e[3] && (null == e[4] || 0 <= e[4].substring(1) && 23 >= e[4].substring(1)) && (null == e[5] || 0 <= e[5].substring(1) && 59 >= e[5].substring(1)) && (null == e[6] || 0 <= e[6].substring(1) && 59 >= e[6].substring(1)) ? (document.gregorian.year.value = e[1], document.gregorian.month.selectedIndex = e[2] - 1, document.gregorian.day.value = +e[3], document.gregorian.hour.value = null == e[4] ? "00" : e[4].substring(1), document.gregorian.min.value = null == e[5] ? "00" : e[5].substring(1), document.gregorian.sec.value = null == e[6] ? "00" : e[6].substring(1), calcGregorian(), b = !0) : alert("Invalid Gregorian date \"" + d + "\" in search request");
		else if ("julian" == h.toLowerCase()) null == (e = d.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/)) ? alert("Invalid Julian calendar date \"" + d + "\" in search request") : 1 <= e[2] && 12 >= e[2] && 1 <= e[3] && 31 >= e[3] && (null == e[4] || 0 <= e[4].substring(1) && 23 >= e[4].substring(1)) && (null == e[5] || 0 <= e[5].substring(1) && 59 >= e[5].substring(1)) && (null == e[6] || 0 <= e[6].substring(1) && 59 >= e[6].substring(1)) ? (document.juliancalendar.year.value = e[1], document.juliancalendar.month.selectedIndex = e[2] - 1, document.juliancalendar.day.value = +e[3], calcJulianCalendar(), document.gregorian.hour.value = null == e[4] ? "00" : e[4].substring(1), document.gregorian.min.value = null == e[5] ? "00" : e[5].substring(1), document.gregorian.sec.value = null == e[6] ? "00" : e[6].substring(1), b = !0) : alert("Invalid Julian calendar date \"" + d + "\" in search request");
		else if ("jd" == h.toLowerCase()) null == (e = d.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Julian day \"" + d + "\" in search request") : (setJulian(e[1]), b = 1);
		else if ("mjd" == h.toLowerCase()) null == (e = d.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Modified Julian day \"" + d + "\" in search request") : (document.modifiedjulianday.day.value = e[1], calcModifiedJulian(), b = 1);
		else if ("unixtime" == h.toLowerCase()) null == (e = d.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Modified Julian day \"" + d + "\" in search request") : (document.unixtime.time.value = e[1], calcUnixTime(), b = 1);
		else if ("iso" == h.toLowerCase()) null == (e = d.match(/^(\-?\d+)\-(\d\d\d)/)) ? null == (e = d.match(/^(\-?\d+)\-?W(\d\d)\-?(\d)/i)) ? alert("Invalid ISO-8601 date \"" + d + "\" in search request") : (document.isoweek.year.value = e[1], document.isoweek.week.value = e[2], document.isoweek.day.value = e[3], calcIsoWeek(), b = 1) : (document.isoday.year.value = e[1], document.isoday.day.value = e[2], calcIsoDay(), b = 1);
		else if ("excel" == h.toLowerCase()) null == (e = d.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Excel serial day (1900/PC) \"" + d + "\" in search request") : (document.excelserial1900.day.value = e[1], calcExcelSerial1900(), b = 1);
		else if ("excel1904" == h.toLowerCase()) {
			var e;
			null == (e = d.match(/^(\-?\d+\.?\d*)/)) ? alert("Invalid Excel serial day (1904/Mac) \"" + d + "\" in search request") : (document.excelserial1904.day.value = e[1], calcExcelSerial1904(), b = 1)
		} else alert("Invalid calendar \"" + h + "\" in search request")
	} else alert("Invalid search request: " + g);
	b || (setDateToToday(), calcGregorian())
}