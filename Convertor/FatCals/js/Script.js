var Calories = document.getElementById("caloriesInput");
var Fat = document.getElementById("FatInput");
var ConsideredLowFat = document.getElementById("ConsiderLowFat");
var ConsiderFatLowResult = document.getElementById("ConsiderFatLow");
var CaloriesFromFatResult =document.getElementById("CaloriesFromFatResult");
var FatFromCaloriesInPercent =document.getElementById("FatFromCaloriesInPercent");
var calresult = document.getElementById('calresult');
var calPercentResult =  document.getElementById('calPercentResult');

const CaloriesFromFat = 9;
const calCount = 30;
let caloriesResult = 0,
    caloriesInPercentageResult = 0,
    ConsiderLowFatTrue = 0;

function calculateFat() {
    if (Calories.value && Fat.value) {
        caloriesResult = (Fat.value * CaloriesFromFat);
        caloriesInPercentageResult = (caloriesResult / Calories.value);

        if (ConsideredLowFat.checked) {
            if (caloriesInPercentageResult < calCount) {
                ConsiderFatLowResult.style.visibility = 'visible';
                ConsiderFatLowResult.innerHTML = "The food is considered low fat.";
            }
            else if((caloriesInPercentageResult > calCount) || (caloriesInPercentageResult == 0)){
                ConsiderFatLowResult.style.visibility = 'visible';
                ConsiderFatLowResult.innerHTML = "The food is considered high fat.";
            }
        }
        else {
            ConsiderFatLowResult.style.visibility = 'hidden';
            ConsiderFatLowResult.innerHTML = "";
        }
        calresult.style.visibility = 'visible';
        calPercentResult.style.visibility = 'visible';

    }
    if (isNaN(caloriesResult) || caloriesResult == Infinity) { caloriesResult = 0; }
    if (isNaN(caloriesInPercentageResult) || caloriesInPercentageResult == Infinity) { caloriesInPercentageResult = 0; }
    CaloriesFromFatResult.innerHTML = caloriesResult.toFixed(2);
    FatFromCaloriesInPercent.innerHTML = caloriesInPercentageResult.toFixed(2) + " %";
}

function IsNumeric(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode != 46 && charCode > 31 
        && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}

function reset() {
    console.log('Reset All');
    Calories.value = "";
    Fat.value = "";
    ConsideredLowFat.checked = false;
    calPercentResult.style.visibility = 'hidden';
    calresult.style.visibility = 'hidden';
    ConsiderFatLowResult.style.visibility = 'hidden';
}