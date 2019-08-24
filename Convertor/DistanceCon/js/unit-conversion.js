var units = {
	'inches': 	1, 
	'feet'  : 	12,
	'yards' : 	36,
	'meters': 	39.370
};

var convertFrom = document.getElementById('convertFrom');
var convertTo = document.getElementById('convertTo');
var unitFrom = document.getElementById('unitFrom');
var unitTo = document.getElementById('unitTo');
var newUnitName = document.getElementById('newUnitName');
var newEquivalenceValue = document.getElementById('newEquivalenceValue');
var newEquivalenceUnit  = document.getElementById('newEquivalenceUnit');

function convert(event) {
	let input = convertFrom.value.trim();
	let measurement = Number(input);
	if (input.length == 0) {
		convertTo.value = '';
	} else if (isNaN(measurement)) {
		convertTo.value = '';
	} else {
		let fromStr = unitFrom.value;
		let toStr = unitTo.value;
    	let result = measurement * units[fromStr] / units[toStr];
		convertTo.value = result;
	}
}

function clearSelection(selection) {
	for (let i = selection.children.length - 1; i >= 0; i--) {
		selection.removeChild(selection.children[i]);
	}
}

function fillSelection(selection, idx) {
	let unitNames = Object.keys(units);
	for (let i = 0; i < unitNames.length; ++i) {
		let option = document.createElement('option');
		if (i == idx) {
			option.setAttribute('selected', 'selected');
		}
		option.innerText = unitNames[i];
		option.value = unitNames[i];
		selection.appendChild(option);
	}
}

function loadUnits(name) {
	let unit = document.getElementById(name);
	let idx = unit.selectedIndex;
	clearSelection(unit);
	fillSelection(unit, idx);
}

function showNewUnitModal() {
	loadUnits('newEquivalenceUnit');
	newUnitName.value = '';
	newEquivalenceValue.value = '';
	$('#newUnitModal').modal('show');
}

function showError(element, message) {
	let elementId = `#${element}`;
	let errorPopover = {
		placement: 'bottom',
		trigger: 'focus',
		content: message,
		template: '<div class="popover" role="tooltip">' +
			'<div class="arrow"></div><h3 class="popover-header"></h3>' +
			'<div class="popover-body text-danger"></div></div>'
	};

	$(elementId).popover(errorPopover);
	$(elementId).popover('show');
}

function disposePopover(element) {
	$(`#${element}`).popover('dispose');
}

function addNewUnit() {
	let unitName = newUnitName.value.trim();
	let equivStr = newEquivalenceValue.value.trim();
	let equivValue = Number(equivStr);
	let selectedUnit = newEquivalenceUnit.selectedIndex;
	let equivUnit = newEquivalenceUnit.options[selectedUnit].value;

	if (unitName.length == 0) {
		showError('newUnitName', 'Unit name cannot be empty.');
		return;
	}
	if (equivStr.length === 0 || isNaN(equivValue)) {
		showError('newEquivalenceValue', 'Value should be a valid number.');
		return;
	}

	let finalEquivalenceValue = equivValue * units[equivUnit];
	units[unitName] = finalEquivalenceValue;

	loadUnits('unitFrom');
	loadUnits('unitTo');

	$('#newUnitModal').modal('hide');
}