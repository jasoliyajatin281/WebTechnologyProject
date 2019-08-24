
const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
const lowerBound = 1;
const higherBound = 3000;
const fontOffset = 8 + 5.5/14;
const fontSlope = -5.5/14;

$('#lowerBound').text(lowerBound);
$('#higherBound').text(higherBound);

var algarism = document.getElementById('algarism');
var romanNumeral = document.getElementById('romanNumeral');
var numeralBox = document.getElementById('numeralBox');
var errorBox = document.getElementById('errorBox');
var errorDialog = document.getElementById('errorDialog');

function showError(message)
{
	$('#errorBox').text(message);
	$('#errorDialog').modal('show');
}

function clearError() {
	$('#errorDialog').modal('hide');
}

function algorithm(arabic) {
	let romanStr = '';

	for(let i = 0; i < decimal.length; i++) {
		let quo = Math.floor(arabic / decimal[i]);
		while (quo > 0) {
			romanStr += roman[i];
			quo--;
		}
		arabic = arabic % decimal[i];
	}

	return romanStr;
}


function convertToRoman() {
	clearError();
	if ($('#numeralBox').hasClass('show')) {
		$('#numeralBox').collapse('hide');
		setTimeout(convertToRoman, 400);
		return;
	}
	
	let algarismStr = $('#algarism').val();
	let numericValue = parseInt(algarismStr);
	if (isNaN(numericValue)) {
		showError('"' + algarismStr + '" is not a number.');
		return;
	}

	if (numericValue < lowerBound || numericValue > higherBound) {
		showError('"' + algarismStr + '" is out of range.');
		return;
	}
	$('#algarism').val(numericValue);
	
	let romanStr = algorithm(numericValue);
	let fontSize = fontOffset + romanStr.length * fontSlope;
	$('#romanNumeral').css('font-size', fontSize + "em"); 
	$('#romanNumeral').text(romanStr);
	$('#numeralBox').collapse('show');
	return;
}