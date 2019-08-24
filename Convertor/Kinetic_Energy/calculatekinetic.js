// JavaScript Document
const ONE_HALF = 0.5;
// modal
var modal = document.getElementById('resultModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
}

// this function calculate kinetic energy
function CalcKineticEnergy(mass, velocity) {
	return ONE_HALF * mass * Math.pow(velocity, 2);
}
// this function respond to click on button calculate
function onCalculateButtonClick() {
	var kinetic = 0;
	var massInput = Number(document.getElementById('massText').value);
	var velocityInput = Number(document.getElementById('velocityText').value);
	var output = document.getElementById('output');
	if (massInput === 0 || isNaN(massInput) || velocityInput === 0 || isNaN(velocityInput)) {
		output.innerHTML = 'Please enter something';
	} else {
		kinetic = CalcKineticEnergy(massInput, velocityInput);
		output.innerHTML = `Kinetic calculation result is : <b>${kinetic}</b> Joules`;
	}
	modal.style.display = 'block';
}