//Global variables
const COST_HOUR = 20;
const CURRENCY = '$';
const ROUND_DECIMAL = 100;
const MY_SERVICES = 7;
const TAX = 6; //%
const PERCENTAGE = 100;
//Service
const ALL_SERVICE = [
    { "serviceName": "Oil Change", "servicePrice": 26, "id": "oilChange" },
    { "serviceName": "Lube Job", "servicePrice": 18, "id": "lubeJob" },
    { "serviceName": "Radiator Flush", "servicePrice": 30, "id": "radiatorFlush" },
    { "serviceName": "Transmission Flush", "servicePrice": 80, "id": "transmissionFlush" },
    { "serviceName": "Inspection", "servicePrice": 15, "id": "inspection" },
    { "serviceName": "Muffler Replacement", "servicePrice": 100, "id": "mufflerReplacement" },
    { "serviceName": "Tire Rotation", "servicePrice": 20, "id": "tireRotation" }
]
function load() {
    fillServices();
}
//Display all services
function fillServices() {
    let divServices = document.getElementById("divServices");
    let begin = '';
    let final = '';
    let textInsideDiv = '';
    for (let i = 0; i < ALL_SERVICE.length; i++) {
        //first
        if ((i % 2) == 0) {
            begin = '<div class="row text-left">';
            final = '';
        }
        //second
        else {
            begin = '';
            final = '</div>';
        }
        textInsideDiv += begin;
        textInsideDiv += '<div class="custom-control custom-checkbox col text-left">'
            + '<input type="checkbox" class="custom-control-input" id="' + ALL_SERVICE[i].id + '" value=' + i + '>'
            + '<label class="custom-control-label" for="' + ALL_SERVICE[i].id + '">' + ALL_SERVICE[i].serviceName + '</label>'
            + ' </div>';
        textInsideDiv += final;
    }
    divServices.innerHTML = textInsideDiv;
}
//This function is for capitalize the first letter of one string (word)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// This function is to create an Id for the new services create by users
// to meet the standars
function nameNewId(string) {
    var strNew = "",
        splitValue = " ",
        //Separate the name of the new service and set in a new array for later ajustment
        splitArray = string.split(splitValue);
    //Put the first word in lowercase
    splitArray[0] = splitArray[0].toLowerCase();
    //Go through the array to call the function capitalizeFirstLetter from the second word to the end
    //first lowercase the word and then put the first letter in capital through the function capitalizeFirstLetter
    for (var i = 1; i < splitArray.length; i++) {
        splitArray[i] = splitArray[i].toLowerCase(),
            splitArray[i] = capitalizeFirstLetter(splitArray[i])
    }
    //Go through the array again for reasamble the string for return the new Id
    for (var i = 0; i < splitArray.length; i++) {
        strNew += splitArray[i]
    }
    return strNew;
}

function addNewService() {
    document.getElementById('errorAdd').style.visibility = 'hidden';
    //Declaration of variables
    let newServiceCostText = '';
    let newServiceCost = 0;
    let newServiceName = '';
    //Get name from input
    newServiceName = document.getElementById('newServiceName').value;
    //Get the price from input
    newServiceCostText = document.getElementById('newServiceCost').value;
    console.log(newServiceCostText);
    //Validate the value is a number and more than 0
    if ((!isNaN(newServiceCostText)) && (parseFloat(newServiceCostText) > 0) && (newServiceName != '')) {
        //Convert string to float
        newServiceCost = parseFloat(newServiceCostText);
        ALL_SERVICE.push({ "serviceName": newServiceName, "servicePrice": newServiceCost, "id": nameNewId(newServiceName) })
        $("#divServices").empty();
        fillServices();
    }
    // Show error
    else {
        //Set visible the label for error
        document.getElementById('errorAdd').style.visibility = 'visible';
        console.log("error");
    }
    document.getElementById('newServiceName').value = '';
    newServiceCostText = document.getElementById('newServiceCost').value = '';
}
//Oil Lube Charges
function oilLubeCharges() {
    let oilChange = (document.getElementById("oilChange").checked ? ALL_SERVICE[document.getElementById("oilChange").value].servicePrice : 0);
    let lubeJob = (document.getElementById("lubeJob").checked ? ALL_SERVICE[document.getElementById("lubeJob").value].servicePrice : 0);
    return (Math.trunc((oilChange + lubeJob) * ROUND_DECIMAL) / ROUND_DECIMAL);
}
//Flush Charges
function flushCharges() {
    let radiatorFlush = (document.getElementById("radiatorFlush").checked ? ALL_SERVICE[document.getElementById("radiatorFlush").value].servicePrice : 0);
    let transmissionFlush = (document.getElementById("transmissionFlush").checked ? ALL_SERVICE[document.getElementById("transmissionFlush").value].servicePrice : 0);
    return (Math.trunc((radiatorFlush + transmissionFlush) * ROUND_DECIMAL) / ROUND_DECIMAL);
}
//MiscCharges
function miscCharges() {
    let inspection = (document.getElementById("inspection").checked ? ALL_SERVICE[document.getElementById("inspection").value].servicePrice : 0);
    let mufflerReplacement = (document.getElementById("mufflerReplacement").checked ? ALL_SERVICE[document.getElementById("mufflerReplacement").value].servicePrice : 0);
    let tireRotation = (document.getElementById("tireRotation").checked ? ALL_SERVICE[document.getElementById("tireRotation").value].servicePrice : 0);
    return (Math.trunc((inspection + mufflerReplacement + tireRotation) * ROUND_DECIMAL) / ROUND_DECIMAL);
}
//Other Charges
function otherCharges(parts, labor) {
    let totalPartLabor = Math.trunc((parts + (labor * COST_HOUR)) * ROUND_DECIMAL) / ROUND_DECIMAL;
    return (totalPartLabor);
}
//Tax Charges
function taxCharges(parts) {
    return (Math.trunc((TAX * parts / PERCENTAGE) * ROUND_DECIMAL) / ROUND_DECIMAL);
}
//Calculate total for the new service
function calculateNewService() {
    let totalNewService = 0;
    if (MY_SERVICES < ALL_SERVICE.length) {
        for (let i = MY_SERVICES; i < ALL_SERVICE.length; i++) {
          if(document.getElementById(ALL_SERVICE[i].id).checked){
            totalNewService += ALL_SERVICE[i].servicePrice;
          }
        }
    }
    return totalNewService;
}
//Total
function totalCharges(oilLubeChargesN, flushChargesN, miscChargesN, otherChargesN, taxChargesN, calculateNewServiceN) {
    return (oilLubeChargesN + flushChargesN + miscChargesN + otherChargesN + taxChargesN + calculateNewServiceN);
}

function calculate() {
    //get values from input labor and parts
    document.getElementById('errorCalculate').style.visibility = 'hidden';
    document.getElementById('pdf').style.visibility = 'visible';
    //Declaration of variables
    let partsText = '';
    let laborText = '';
    let parts = 0;
    let labor = 0;
    let error = false;
    //Get values
    partsText = document.getElementById('parts').value;
    laborText = document.getElementById('labor').value;
    //Validate that value is a number
    if (partsText != '') {
        if ((!isNaN(partsText)) && (parseFloat(partsText) > 0)) {
            //Convert string to float
            parts = parseFloat(partsText);
        }
        else {
            error = true;
        }
    }
    if (laborText != '') {
        if ((!isNaN(laborText)) && (parseFloat(laborText) > 0)) {
            //Convert string to float
            labor = parseFloat(laborText);
        }
        else {
            error = true;
        }
    }
    // Show error
    if (error == true) {
        //Set visible the label for error
        document.getElementById('errorCalculate').style.visibility = 'visible';
        console.log("error");
    }
    var oilLubeChargesN = oilLubeCharges();
    var flushChargesN = flushCharges();
    var miscChargesN = miscCharges();
    var otherChargesN = otherCharges(parts, labor);
    var taxChargesN = taxCharges(parts);
    var calculateNewServiceN = calculateNewService();
    var totalChargesN = totalCharges(oilLubeChargesN, flushChargesN, miscChargesN, otherChargesN, taxChargesN, calculateNewServiceN);

    let divTotal = document.getElementById("divTotal");
    let textInsideDivTotal = '';
    textInsideDivTotal += '<div class="row justify-content-center text-center">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + oilLubeChargesN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>Oil - Lube Charges</label>' +
        '</div>' +
        '</div>';
    textInsideDivTotal += '<div class="row justify-content-center text-center">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + flushChargesN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>Flush Charges</label>' +
        '</div>' +
        '</div>';
    textInsideDivTotal += '<div class="row justify-content-center text-center">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + miscChargesN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>Misc Charges</label>' +
        '</div>' +
        '</div>';
    textInsideDivTotal += '<div class="row justify-content-center text-center">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + otherChargesN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>Other Charges</label>' +
        '</div>' +
        '</div>';
    textInsideDivTotal += '<div class="row justify-content-center text-center">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + taxChargesN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>Tax Charges over parts</label>' +
        '</div>' +
        '</div>';
    textInsideDivTotal += '<div class="row justify-content-center text-center">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + calculateNewServiceN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>New Services</label>' +
        '</div>' +
        '</div>';
    textInsideDivTotal += '<div class="row justify-content-center text-center" id="totalCharges">' +
        '<div class="col text-right">' +
        '<label>'+ CURRENCY  + totalChargesN + '</label>' +
        '</div>' +
        ' <div class="col text-left">' +
        '<label>Total Charge</label>' +
        '</div>' +
        '</div>';

    divTotal.innerHTML = textInsideDivTotal;
    document.getElementById('divTotal').style.visibility = 'visible';
    document.location.href = "#divTotal";

}
//clearOilLube
function clearOilLube() {
    document.getElementById("oilChange").checked = false;
    document.getElementById("lubeJob").checked = false;
}
//clearFlushCharges
function clearFlushCharges() {
    document.getElementById("radiatorFlush").checked = false;
    document.getElementById("transmissionFlush").checked = false;
}
//clearMiscCharges
function clearMiscCharges() {
    document.getElementById("inspection").checked = false;
    document.getElementById("mufflerReplacement").checked = false;
    document.getElementById("tireRotation").checked = false;
}
//clearOtherCharges
function clearOtherCharges() {
    document.getElementById('parts').value = '';
    document.getElementById('labor').value = '';
}
//
function clearTaxAndTotal() {
    $("#divTotal").empty();
    document.getElementById('divTotal').style.visibility = 'hidden';
}
//Clear new services
function clearNewService() {
    if (MY_SERVICES < ALL_SERVICE.length) {
        for (let i = MY_SERVICES; i < ALL_SERVICE.length; i++) {
            document.getElementById(ALL_SERVICE[i].id).checked = false;
        }
    }
}
//clearAll
function clearAll() {
    clearOilLube();
    clearMiscCharges();
    clearFlushCharges();
    clearOtherCharges();
    clearTaxAndTotal();
    clearNewService();
    document.getElementById('pdf').style.visibility = 'hidden';
}

function addClient() {
    clientName = document.getElementById('clientName').value;
    clientId = document.getElementById('clientId').value;
    clientePhone = document.getElementById('clientePhone').value;
    return { name: clientName, idC: clientId, phone: clientePhone };
}
function PDF1() {
    //get values from input labor and parts
    document.getElementById('errorCalculate').style.visibility = 'hidden';
    //Declaration of variables
    let partsText = '';
    let laborText = '';
    let parts = 0;
    let labor = 0;
    let error = false;
    //Get values
    partsText = document.getElementById('parts').value;
    laborText = document.getElementById('labor').value;
    //Validate that value is a number
    if (partsText != '') {
        if ((!isNaN(partsText)) && (parseFloat(partsText) > 0)) {
            //Convert string to float
            parts = parseFloat(partsText);
        }
        else {
            error = true;
        }
    }
    if (laborText != '') {
        if ((!isNaN(laborText)) && (parseFloat(laborText) > 0)) {
            //Convert string to float
            labor = parseFloat(laborText);
        }
        else {
            error = true;
        }
    }
    // Show error
    if (error == true) {
        //Set visible the label for error
        document.getElementById('errorCalculate').style.visibility = 'visible';
        console.log("error");
    }
    var oilLubeChargesN = oilLubeCharges();
    var flushChargesN = flushCharges();
    var miscChargesN = miscCharges();
    var otherChargesN = otherCharges(parts, labor);
    var taxChargesN = taxCharges(parts);
    var calculateNewServiceN = calculateNewService();
    var totalChargesN = totalCharges(oilLubeChargesN, flushChargesN, miscChargesN, otherChargesN, taxChargesN, calculateNewServiceN);
    var client = addClient();

        ficha = '<table id="clientInformation" cellpadding="10" cellspacing="10" style="background-color: #ffffff; filter: alpha(opacity=40); opacity: 0.95;border:5px black solid;">'
  +   '<thead> '
  + '    <tr>'
  + '      <td><strong>Client Name:</strong> </td>'
  + '      <td>'+client.name+'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <td><strong>Client Id:</strong> </td>'
  + '      <td>'+client.idC+'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <td><strong>Client Phone:</strong> </td>'
  + '      <td>'+client.phone+'</td>'
  + '    </tr>'
  + '  </thead>'
  + '  <tbody>'
  + '    <tr>'
  + '      <th colspan="2">Service</th>'
  + '      <th>Cost</th>'
  + '    </tr>'
  + '    <tr>'
  + '      <td colspan="2">Oil - Lube Changes</td>'
  + '      <td style="text-align: right">'+ CURRENCY + oilLubeChargesN +'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <td colspan="2">Flush Changes</td>'
  + '      <td style="text-align: right">'+ CURRENCY + flushChargesN +'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <td colspan="2">Misc Changes</td>'
  + '      <td style="text-align: right">'+ CURRENCY + miscChargesN +'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <td colspan="2">New Service</td>'
  + '      <td style="text-align: right">'+ CURRENCY + calculateNewServiceN +'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <td colspan="2">Other Changes</td>'
  + '      <td style="text-align: right">'+ CURRENCY + otherChargesN +'</td>'
  + '    </tr>'
  + '  </tbody>'
  + '  <tfoot>'
  + '    <tr>'
  + '      <th style="text-align: right" colspan="2">Tax charge over parts</th>'
  + '      <td style="text-align: right">'+ CURRENCY + taxChargesN +'</td>'
  + '    </tr>'
  + '    <tr>'
  + '      <th style="text-align: right" colspan="2">Total</th>'
  + '      <td style="text-align: right">'+ CURRENCY + totalChargesN +'</td>'
  + '    </tr>'
  + '  </tfoot>'
  + '</table>';
    //open a new window blank
    var ventimp = window.open(' ', '_blank');
    //insert the value of ficha
    ventimp.document.write(ficha);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();
}
