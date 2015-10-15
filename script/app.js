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
	};
};// end of start round method

Board.prototype.hit_stay = function(string) {
	//get input from input
	var input = string;//for now its going to be hard coded value

	switch(input){
		case "hit":
			this.player_hand.push(this.randomize());
		break;

		case "stay":
			console.log("robot's turn");
			//this.robo;
		break;
	};

};

Board.prototype.win_loss_logic = function() {
	var hand_value = function(array){
		var total = null;
		for(var i =0;i<array.length;i++){
			if(array[i].card_value === "Queen" || array[i].card_value === "Jack"|| array[i].card_value === "King"){
				total += 10;
			}else if(array[i].card_value === "Ace"){
				var ace_value = prompt("do you want to count it as 11 or 1");

			};// converting all the stringed values to numeric
		};//end of for loop
		return total;
	};//end of the hand_value function

	var dealer_hand = hand_value(this.dealer_hand);
	return dealer_hand;

};// end of win_loss_logic method







//going to load this at the end, so it doesnt distract me with the other stuff

window.onload = function(){
	console.log("loaded");
	//set the background on load of the window
	var body = $("body")
	body.css("background-image","url(http://d2fhka9tf2vaj2.cloudfront.net/premium/034_blackJack/images/9.jpg)");
};// end of window onload 









