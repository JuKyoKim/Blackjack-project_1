var Board = function(){
	//the dealer and player will store card objects
	this.dealer_hand = [];
	this.player_hand = [];
	this.bankroll = 100;// gonna start default with 100pesos
	this.player_bet = 0;
};// end of board factory

Board.prototype.randomize = function() {
	//fisher yates algorithum, need to make my own iteration of it
	//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	var stacked_deck = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];
	var card_suit = ["Hearts","Spades","Clovers","Diamonds"];
	var random_index = function(array){
		return Math.floor(Math.random()*array.length);	
	};//end of random index function

	//created a simple "factory" that will return a random card and push that shit towards the array
	var Card = function(){ 
		return{
			card_value:stacked_deck[random_index(stacked_deck)],
			card_suit:card_suit[random_index(card_suit)]
		};
	};//end of card factory (sort of)
	return new Card;//only way to grab freshest of the fresh!
};// end of randomize proto method

Board.prototype.ask_bets = function(amount){
	var staked_pesos = amount;
	this.player_bet = staked_pesos;
	this.bankroll -= staked_pesos;
};// end of ask_bets method

Board.prototype.clear_hand = function() {
	this.dealer_hand = [];
	this.player_hand = [];
};//end of clear_hand method

Board.prototype.start_round = function(){	
	for(var i = 0; i < 2;i++){
		this.dealer_hand.push(this.randomize());
		this.player_hand.push(this.randomize());
	};// end of for loop that creates new hands for the player
};// end of start round method

Board.prototype.hit_stay = function(string) {

	switch(string){
		case "hit":
			this.player_hand.push(this.randomize());
		break;

		case "stay":
			console.log("robot's turn");
			this.robo();
		break;
	};// end of switch case conditional for moving player to next round
};// end of hit_stay method(will need to loop this in the main play game method!!!!! until stay is hit)

Board.prototype.grab_value = function() {


	//need to rewrite this exact loop to something slightly more non complex
	var ace_check = function(){
		var user_choice = null;
		var converted_value = null;
		while(converted_value !== "resolved"){
			user_choice = prompt("do you want to make the A value equal (11) or (1)");
			if(Number(user_choice) === 1 || Number(user_choice) === 11){
				converted_value = "resolved";
			};// end of conditional
		};// end of while loop
		return Number(user_choice);
	};// end of ace check

	var value_parse = function(array){
		var total = 0;
		for(var i = 0;i < array.length;i++){
			if(array[i].card_value === "King" || array[i].card_value === "Queen" || array[i].card_value === "Jack"){
				total += 10
			}else if(array[i].card_value === "Ace"){
				total += ace_check();
			}else{
				total += array[i].card_value;
			}//conversion for king,queen, etc!!
		};// end of for loop
		return total;
	};// end of the value parsing function

	console.log("player hand is equal to "+ value_parse(this.player_hand));
	console.log("dealer hand is equal to "+ value_parse(this.dealer_hand));


};// end of grab_value method

Board.prototype.robo = function() {
	

	//add a line to proc the win loss check
};// end of robo method

//going to load this at the end, so it doesnt distract me with the other stuff

window.onload = function(){
	console.log("loaded");
	//set the background on load of the window
	var body = $("body")
	body.css("background-image","url(http://d2fhka9tf2vaj2.cloudfront.net/premium/034_blackJack/images/9.jpg)");
};// end of window onload 









