// Function for animal years
function animalCalc() {
  // Declare a few variables
  const persYear = document.getElementById("persYear").value;
  const persMod = persYear % 12;
  const animalAnswer = document.getElementById("animalAnswer");
  let animalEng = "";
  let animalOrig = "";

  // Determine animal sign
  if (1 > persYear) {
    animalAnswer.innerHTML =
      "<em>No Chinese-Uighur animal sign has been calculated for this date, since the year entered is too early.</em>";
  } else {
    if (0 === persMod) {
      animalEng = "Snake";
      animalOrig = "Yilan";
    } else if (1 === persMod) {
      animalEng = "Horse";
      animalOrig = "Yunt";
    } else if (2 === persMod) {
      animalEng = "Goat";
      animalOrig = "Quy";
    } else if (3 === persMod) {
      animalEng = "Monkey";
      animalOrig = "Pichin";
    } else if (4 === persMod) {
      animalEng = "Rooster";
      animalOrig = "Takhaquy";
    } else if (5 === persMod) {
      animalEng = "Dog";
      animalOrig = "It";
    } else if (6 === persMod) {
      animalEng = "Pig";
      animalOrig = "Tunguz";
    } else if (7 === persMod) {
      animalEng = "Rat";
      animalOrig = "Sichqan";
    } else if (8 === persMod) {
      animalEng = "Ox";
      animalOrig = "Ud";
    } else if (9 === persMod) {
      animalEng = "Tiger";
      animalOrig = "Bars";
    } else if (10 === persMod) {
      animalEng = "Rabbit";
      animalOrig = "Tawshqan";
    } else {
      animalEng = "Dragon";
      animalOrig = "Luy";
    }

    // Set result text
    animalAnswer.innerHTML =
      "In the Persianate adaptation of the Chinese-Uighur animal calendar, this date falls in a year of the <strong>" +
      animalEng +
      " (<em>" +
      animalOrig +
      "</em>)</strong>.";
  }
}

// Function for Seleucid era
function seleucidCalc() {
  // Define variables; calculate result
  const hebYear = document.getElementById("hebYear").value;
  const seleucidYear = hebYear - 3449;
  const seleucidAnswer = document.getElementById("seleucidAnswer");

  // Set result text
  seleucidAnswer.innerHTML =
    "In the Seleucid era, as used by some medieval Jewish communities, this is year <strong>" +
    seleucidYear +
    "</strong>.";
}

// Combine functions
function extras() {
  animalCalc();
  seleucidCalc();
}

// Run functions on page load
extras();

// Set up event listeners
$("#gregCalcBtn").on("click", extras);
$("#gregTodayBtn").on("click", extras);
$("#julianBtn").on("click", extras);
$("#hebrewBtn").on("click", extras);
$("#islamicBtn").on("click", extras);
$("#persBtn").on("click", extras);
