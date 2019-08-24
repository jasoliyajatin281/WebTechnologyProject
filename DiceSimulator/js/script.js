function gameStart(){
    $('#game').hide();
    localStorage.removeItem("count");
}
function start(){
	$('#message').html("<div></div>");
	let name = $('#name').val();
	if(name != ''){
		$('#game').show();
		$('#start').hide();
		$('#username').html(`Hello ${name} !! Your Game Starts Now..`);
	}else{
		$('#error').html("<h6  style='color:red;'>Enter a name</h6>");
	}
}
function rollDice(){
	let score = 0;
	if (localStorage.clickcount) {
	    localStorage.clickcount = Number(localStorage.clickcount)+1;
	} else {
	    localStorage.clickcount = 1;
	}
	if(localStorage.clickcount<=3){
		for(let i = 1; i <= 2; i++){
			var randomNumber = Math.floor(Math.random() * 6) + 1;
			score += randomNumber;
			if(i == 1){
				switch(randomNumber){
					case 1: $('#dice1').html("<img src='images/Die1.bmp'>");
							break;
					case 2: $('#dice1').html("<img src='images/Die2.bmp'>");
							break;
					case 3: $('#dice1').html("<img src='images/Die3.bmp'>");
							break;	
					case 4: $('#dice1').html("<img src='images/Die4.bmp'>");
							break;		
					case 5: $('#dice1').html("<img src='images/Die5.bmp'>");
							break;
					case 6: $('#dice1').html("<img src='images/Die6.bmp'>");
							break;
					default : $('#dice1').html("<h6  style='color:red;'>Error..!!Try Again</h6>");				
				}
			}else if(i==2){
				switch(randomNumber){
					case 1: $('#dice2').html("<img src='images/Die1.bmp'>");
							break;
					case 2: $('#dice2').html("<img src='images/Die2.bmp'>");
							break;
					case 3: $('#dice2').html("<img src='images/Die3.bmp'>");
							break;	
					case 4: $('#dice2').html("<img src='images/Die4.bmp'>");
							break;		
					case 5: $('#dice2').html("<img src='images/Die5.bmp'>");
							break;
					case 6: $('#dice2').html("<img src='images/Die6.bmp'>");
							break;
					default : $('#dice2').html("<h6  style='color:red;'>Error..!!Try Again</h6>");				
				}
			}
		}
		$('#result').html("<span class='border border-danger'><h3>Your Score : "+score+"</h3></span>");
		if(score==12) {
			$('#user_won').html("<img src='images/score.gif'>");
			$('#user_won_message').html("<h6>Congratulations! You have won $500 !! </h6>");
		}
	}else{
		$('#game').hide();
		$('#start').show();
		$('#dice1').html("<div></div>");
		$('#dice2').html("<div></div>");
		$('#result').html("");
		localStorage.clickcount = 0;
		$('#message').html("<div class='alert alert-danger' role='alert'>Oops!! You only have 3 chance to roll dice..Try Again..!!!</div>");
	}
}