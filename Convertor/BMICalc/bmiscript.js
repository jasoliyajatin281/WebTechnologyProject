// BMI constants
const BMI_LOWINDEX = 18.5;
const BMI_HIGHINDEX = 25;
const DEFAULT_SCALE = 100;
const ANIM_TIME = 300;
const errorString = "<strong>Error, </strong>please input number."

// constants contain classes which use to set to approriate tag to display
const SUCCESS_CLASS = "alert alert-success alert-lg";
const WARNING_CLASS = "alert alert-warning alert-lg";
const ERROR_CLASS = "alert alert-danger alert-lg";

// this function hide all display alert tags
function clearAll(forced) {
    setAlertVisible("normal-bmi-output", SUCCESS_CLASS, false);
    setAlertVisible("warning-bmi-output", WARNING_CLASS, false);
    setAlertVisible("error-bmi-output", ERROR_CLASS, false);
}
function setAlertVisible(id, cssClass, status) {
  document.getElementById(id).setAttribute("class", cssClass + (status ? " d-block " : " d-none "));
  if (status) {
    $('#alert-div').removeClass('show-active-transparent');
    $('#alert-div').addClass('show-active-transparent');
  } else {
    $('#alert-div').removeClass('show-active-transparent');
  }
}
function unitTypeChange() {
  var value = document.getElementById("unittype").selectedIndex;
  if (value === 0) {
    document.getElementById("heightunit").innerHTML = "inches";
    document.getElementById("weightunit").innerHTML = "pounds";
  } else {
    document.getElementById("heightunit").innerHTML = "meters";
    document.getElementById("weightunit").innerHTML = "kilograms";
  }
}
// this function do BMI calculation
function calculateBMI(inputHeight, inputWeight, type, scale) {
  var weight = inputWeight;
  var height = inputHeight;
  // if lb and pound so multiply 703, if kgs and meters so just calculate normally
  if (type === 0) weight = weight * 704;
  var result = weight / Math.pow(height, 2);
  var roundScale = scale ? scale : DEFAULT_SCALE;
  return Math.round(result * roundScale) / roundScale; // beautify result.
}
// this function calculates BMI index
function computeBMI() {
  clearAll(true);

  // obtain user inputs
  var height = Number(document.getElementById("height").value);
  var weight = Number(document.getElementById("weight").value);
  var unittype = document.getElementById("unittype").selectedIndex;

  if (height === 0 || isNaN(height) || weight === 0 || isNaN(weight)) {
    setAlertVisible("error-bmi-output", ERROR_CLASS, true);
    document.getElementById("error-bmi-output").innerHTML = errorString;
  } else { // convert
    // Perform calculation
    var BMI = calculateBMI(height, weight, unittype);

    // Display result of calculation
    var result = " Your BMI index are <strong>" + BMI + "</strong>.";
    var warning = true;
    if (BMI < BMI_LOWINDEX)
      result = "<strong>Underweight!!</strong>" + result + " C'mon, McDonald is near by then.";
    else if (BMI >= BMI_LOWINDEX && BMI <= BMI_HIGHINDEX) {
      warning = false;
      result = "<strong>Normal!</strong>" + result + " Good exercises!";
    }
    else // BMI > 25
      result = "<strong>Overweight!!!</strong>" + result + " Recreation center welcome you !!";

    // if we need to show warning so we show alert with warning, otherwise we show success message.
    if (warning) {
      setAlertVisible("warning-bmi-output", WARNING_CLASS, true);
      document.getElementById("warning-bmi-output").innerHTML = result;
    } else {
      setAlertVisible("normal-bmi-output", SUCCESS_CLASS, true);
      document.getElementById("normal-bmi-output").innerHTML = result;
    }
  }
}

var $div = document.getElementById("gradient");
// rgb vals of the gradients
var gradients = [
  { start: [128, 179, 171], stop: [30, 41, 58] },
  { start: [255, 207, 160], stop: [234, 92, 68] },
  { start: [212, 121, 121], stop: [130, 105, 151] }
];
// how long for each transition
var transition_time = 4;

// internal type vars
var currentIndex = 0; // where we are in the gradients array
var nextIndex = 1; // what index of the gradients array is next
var steps_count = 0; // steps counter
var steps_total = Math.round(transition_time * 60); // total amount of steps
var rgb_steps = {
  start: [0, 0, 0],
  stop: [0, 0, 0]
}; // how much to alter each rgb value
var rgb_values = {
  start: [0, 0, 0],
  stop: [0, 0, 0]
}; // the current rgb values, gets altered by rgb steps on each interval
var prefixes = ["-webkit-", "-moz-", "-o-", "-ms-", ""]; // for looping through adding styles
var div_style = $div.style; // short cut to actually adding styles
var color1, color2;

// sets next current and next index of gradients array
function set_next(num) {
  return (num + 1 < gradients.length) ? num + 1 : 0;
}

// work out how big each rgb step is
function calc_step_size(a, b) {
  return (a - b) / steps_total;
}

// populate the rgb_values and rgb_steps objects
function calc_steps() {
  for (var key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for (var i = 0; i < 3; i++) {
        rgb_values[key][i] = gradients[currentIndex][key][i];
        rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i], rgb_values[key][i]);
      }
    }
  }
}

// update current rgb vals, update DOM element with new CSS background
function updateGradient() {
  // update the current rgb vals
  for (var key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for (var i = 0; i < 3; i++) {
        rgb_values[key][i] += rgb_steps[key][i];
      }
    }
  }

  // generate CSS rgb values
  var t_color1 = "rgb(" + (rgb_values.start[0] | 0) + "," + (rgb_values.start[1] | 0) + "," + (rgb_values.start[2] | 0) + ")";
  var t_color2 = "rgb(" + (rgb_values.stop[0] | 0) + "," + (rgb_values.stop[1] | 0) + "," + (rgb_values.stop[2] | 0) + ")";

  // has anything changed on this interation
  if (t_color1 != color1 || t_color2 != color2) {

    // update cols strings
    color1 = t_color1;
    color2 = t_color2;

    // update DOM element style attribute
    div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from(" + color1 + "), to(" + color2 + "))";
    for (var i = 0; i < 4; i++) {
      div_style.backgroundImage = prefixes[i] + "linear-gradient(45deg, " + color1 + ", " + color2 + ")";
    }
  }

  // we did another step
  steps_count++;
  // did we do too many steps?
  if (steps_count > steps_total) {
    // reset steps count
    steps_count = 0;
    // set new indexs
    currentIndex = set_next(currentIndex);
    nextIndex = set_next(nextIndex);
    // calc steps
    calc_steps();
  }

  if (div_style.backgroundImage.indexOf("gradient") != -1) {
    window.requestAnimationFrame(updateGradient)
  }
}

// initial step calc
calc_steps();

// go go go!
window.requestAnimationFrame(updateGradient);

$(document).ready(function () {
  // animate section in navbar
  $('#nav ul li a').on('click', function (e) {
    // prevent default anchor click behavior
    e.preventDefault();
    // animate
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, ANIM_TIME, function () {
      window.location.hash = this.hash;
    });
  });

  $('#whatis-content').addClass('show-active');
});
