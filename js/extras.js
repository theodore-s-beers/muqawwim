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
  seleucidCalc()
}

// Run functions on page load
extras()
