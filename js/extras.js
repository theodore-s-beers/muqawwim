// Function for animal years
function animalCalc () {
  // Declare a few variables
  const persYear = document.getElementById('pers-year').value
  const persMod = persYear % 12
  const animalAnswer = document.getElementById('animal-answer')
  let animalEng = ''
  let animalOrig = ''

  // Determine animal sign
  if (persYear < 1) {
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
  const julianYear = document.juliancalendar.year.value
  const julianMonthIndex = document.juliancalendar.month.selectedIndex
  const ottomanFiscalDay = document.juliancalendar.day.value

  let ottomanFiscalYear
  let ottomanFiscalMonth

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
    ottomanFiscalYear = julianYear - 584
  } else {
    ottomanFiscalYear = julianYear - 585
  }

  // Only show this date between 1840-03-01 and 1916-12-31 Julian
  if (ottomanFiscalYear >= 1256 && julianYear < 1917) {
    ottomanFiscalAnswer.innerHTML = `In the Ottoman fiscal calendar, as it was followed from 1840 through 1916 Julian, this date is <strong>${ottomanFiscalDay} ${ottomanFiscalMonth} ${ottomanFiscalYear}</strong>.`
  } else {
    ottomanFiscalAnswer.innerHTML =
      '<em>Ottoman fiscal calendar equivalents will be given for Julian dates between 1840-03-01 and 1916-12-31.</em>'
  }
}

// Function for Seleucid era
function seleucidCalc () {
  // Define variables; calculate result
  const hebYear = document.getElementById('heb-year').value
  const seleucidYear = hebYear - 3449
  const seleucidAnswer = document.getElementById('seleucid-answer')

  // Set result text
  seleucidAnswer.innerHTML =
    'In the Seleucid era, as used by some medieval Jewish communities, this is year <strong>' +
    seleucidYear +
    '</strong>.'
}

// Combine functions
function extras () {
  animalCalc()
  ottomanFiscalCalc()
  seleucidCalc()
}

// Run functions on page load
extras()

// Event listeners for extra functions
document.getElementById('greg-calc-btn').addEventListener('click', extras)
document.getElementById('greg-today-btn').addEventListener('click', extras)
document.getElementById('julian-btn').addEventListener('click', extras)
document.getElementById('hebrew-btn').addEventListener('click', extras)
document.getElementById('islamic-btn').addEventListener('click', extras)
document.getElementById('pers-btn').addEventListener('click', extras)
