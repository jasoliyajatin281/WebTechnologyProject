$( document ).ready(function() {
    $('#receipt').hide();
	$('#message,#error_patient_name,#error_doctor_name,#error_medication,#error_inhospital,#error_surgical,#error_lab,#error_physical').html();
});
const ONEDAYCOST = 350;
const FIXTWO = 2;
const MINIMUM_VALUE= 0;
function receipt(){
	let patient_name = $('#patient_name').val();
	let doctor_name = $('#doctor_name').val();
	let in_hospital = $('#in_hospital').val();
	let medication_charge = ($('#medication_charge').val() ? $('#medication_charge').val() : MINIMUM_VALUE );
	let surgical_charge = ($('#surgical_charge').val() ?  $('#surgical_charge').val() : MINIMUM_VALUE );
	let lab_charge =($('#lab_charge').val() ?  $('#lab_charge').val() : MINIMUM_VALUE );
	let physical_charge = ($('#physical_charge').val() ? $('#physical_charge').val() : MINIMUM_VALUE );
	if(patient_name && doctor_name && in_hospital && in_hospital > MINIMUM_VALUE && medication_charge >= MINIMUM_VALUE  && surgical_charge >= MINIMUM_VALUE && lab_charge >= MINIMUM_VALUE && physical_charge >= MINIMUM_VALUE){
		let stay_charge = CalcStayCharges(in_hospital);
		console.log(stay_charge);
		let misc_charge = CalcMiscCharges(medication_charge, surgical_charge, lab_charge, physical_charge);
		console.log(misc_charge);
		let total_charge = CalcTotalCharges(stay_charge, misc_charge);
		console.log(total_charge);
		$('#receipt').show();
		$('#start').hide();
		$('#pname').html(patient_name);
		$('#dname').html(doctor_name);
		$('#stay_amount').html("&#36;"+stay_charge);
		$('#misc_amount').html("&#36;"+misc_charge);
		$('#total_amount').html("&#36;"+total_charge);
	} else{
		if(patient_name == ''){
			$('#error_patient_name').html("<h6 style='color:red;'>Enter Patient Name</h6>");
		} else if(doctor_name == ''){
			$('#error_doctor_name').html("<h6 style='color:red;'>Enter Doctor Name</h6>");
		} else if(in_hospital == '' || in_hospital < MINIMUM_VALUE){
			$('#error_inhospital').html("<h6  style='color:red;'>Enter number of days in hospital greater than 0</h6>");
		} else if(medication_charge < MINIMUM_VALUE){
			$('#error_medication').html("<h6  style='color:red;'>Enter Valid Charges</h6>");
		} else if(surgical_charge < MINIMUM_VALUE){
			$('#error_surgical').html("<h6  style='color:red;'>Enter Valid Charges</h6>");
		} else if(lab_charge < MINIMUM_VALUE){
			$('#error_lab').html("<h6  style='color:red;'>Enter Valid Charges</h6>");
		} else if(physical_charge < MINIMUM_VALUE){
			$('#error_physical').html("<h6  style='color:red;'>Enter Valid Charges</h6>");
		} else{
			$('#message').html("<h6  style='color:red;'>Please Enter Valid Values in Miscellaneous Charge</h6>")
		}
	}
}
/* Calculate Stay Charge */
function CalcStayCharges(in_hospital){
	var total_charge = in_hospital*ONEDAYCOST;
	var total_charges = total_charge.toFixed(FIXTWO);
	return total_charges;
}
/* Calculate Miscellaneous Charge */
function CalcMiscCharges(medication_charge, surgical_charge, lab_charge, physical_charge) {
	var total_misc_charge = parseFloat(medication_charge) + parseFloat(surgical_charge) + parseFloat(lab_charge) + parseFloat(physical_charge);
	var total_misc_charges = total_misc_charge.toFixed(FIXTWO);
	return total_misc_charges;
}
/*  Calculate Total Charge */
function CalcTotalCharges(stay_charge, misc_charge){
	var total_charge = parseFloat(stay_charge) + parseFloat(misc_charge);
	var total_charges = total_charge.toFixed(FIXTWO);
	return total_charges;
}

function refresh(){
	location.reload();
}