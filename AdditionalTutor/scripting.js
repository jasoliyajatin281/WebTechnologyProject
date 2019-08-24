const timeIntervel = 4000;
const animateTime = 300;
const fadeTime = 200;
const forOne = 0.25;
const froTwo = 0.30;
const forThree = 0.45;
const forFour = 0.70;
const zero = 0;
const three = 3;
const six = 6;
const twentyFive = 25;
let chartData;

function resetData() {
  chartData = [{
    type: "column",
    showInLegend: true,
    legendMarkerColor: "grey",
    dataPoints: [
      { y: zero, label: "Won" },
      { y: zero, label: "Lost" }
    ]
  }];
}
resetData();
function renderChart() {
  chart.render();
}
var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light2", // "light1", "light2", "dark1", "dark2"
  title: {
    text: "Score Board"
  },
  axisY: {
    title: "Points"
  },
  data: chartData
});
$(function () {
  "use strict";
  var section1 = $(".section-one"),
    section2 = $(".section-two");
  $('#answerInput').keyup(function () {
    $('#checkAns').prop('disabled', $(this).val() != '' ? false : true);
  });
  $(".transition-button-one").click(function () {
    $('#checkAns').prop('disabled', true);
    $('#answerInput').val('');
    $(".wheel i").each(function () {
      let classObj = getRandomIconClass();
      this.innerText = classObj.text;
      this.setAttribute("data-number", classObj.data);
    });
    $('#myAlert').hide();
    section1.animate({
      'height': '0',
      'top': '50vh',
      'padding': '0'
    }, animateTime)
      .animate({
        'width': '2px',
        'left': '50%'
      }, animateTime)
      .fadeOut(fadeTime, function () {
        section2.fadeIn(fadeTime);
        section2.animate({
          'width': '100%',
          'left': '0'
        }, animateTime);
        section2.animate({
          'min-height': '100vh',
          'top': '0',
          'padding-top': '50px',
          'padding-bottom': '50px'
        }, animateTime);
      });
  });

  $(".transition-button-two").click(function () {
    section2.animate({
      'min-height': '0',
      'height': '0',
      'top': '50vh',
      'padding': '0'
    }, animateTime)
      .animate({
        'width': '2px',
        'left': '50%'
      }, animateTime)
      .fadeOut(fadeTime, function () {
        section1.fadeIn(fadeTime)
          .animate({
            'width': '100%',
            'left': '0'
          }, animateTime)
          .animate({
            'height': '100vh',
            'top': '0',
            'padding-bottom': '100px',
            'left': '0%'
          }, animateTime);
      });
    setTimeout(renderChart, 3000);
  });
  // Get a random symbol class
  function getRandomIconClass() {
    let rand = Math.random();
    if (rand < forOne) return { text: "looks_one", data: 1 };
    if (rand < froTwo) return { text: "looks_two", data: 2 };
    if (rand < forThree) return { text: "looks_3", data: 3 };
    if (rand < forFour) return { text: "looks_4", data: 4 };
    return { text: "looks_5", data: 5 };
  }
  function calculateAnswer() {
    let eleArray = $(".wheel i");
    let dataElements = "";
    for (let i = zero; i < eleArray.length; i++) {
      dataElements += eleArray[i].getAttribute("data-number");
    }
    let number_1 = parseInt(dataElements.substring(zero, three));
    let number_2 = parseInt(dataElements.substring(three, six));
    return number_1 + number_2
  }
  function updateData(which_case) {
    switch (which_case) {
      case "wrong":
        chartData[zero].dataPoints[1].y += 1;
        break;
      case "right":
        chartData[zero].dataPoints[zero].y += 1;
        break;
      default:
        alert("Wrong case!!");
        break;
    }
  }
  $(document).on("click", "#checkAns", function () {
    let answerEntered = $("#answerInput").val();
    let actualAnswer = calculateAnswer();
    if (isNaN(answerEntered) || answerEntered < zero || answerEntered != actualAnswer) {
      $(".flashThisEliment").addClass("flash red");
      $('.alert-danger').show();
      updateData("wrong");
      setTimeout(update, timeIntervel);
    } else {
      $(".flashThisEliment").addClass("flash green");
      $('.alert-success').show();
      updateData("right");
      setTimeout(update, timeIntervel);
    }
    // get a plain array of symbol elements
    let symbols = $(".wheel").find("i").get();
    let button = $(this);
    // get rid of the focus, and disable the button
    button.prop("disabled", true).blur();
    // counter for the number of spins
    let spins = zero;
    // inner function to do the spinning
    function update() {
      $('#answerInput').val('');
      $(".flashThisEliment").removeClass("flash red green");
      $('.alert').hide();
      for (let i = zero, l = symbols.length; i < l; i++) {
        let classObj = getRandomIconClass();
        symbols[i].innerText = classObj.text;
        symbols[i].setAttribute("data-number", classObj.data);
      }
      if (++spins < twentyFive) {
        // set a new, slightly longer interval for the next update. Makes it seem like the wheels are slowing down
        setTimeout(update, spins + spins);
      }
    }
  });
  renderChart();
});