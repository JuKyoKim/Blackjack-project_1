console.log("loaded");

window.onload = function(){
	//set the background on load of the window
	$("body").css("background-image","url(http://d2fhka9tf2vaj2.cloudfront.net/premium/034_blackJack/images/9.jpg)");
};// end of window onload 

var Board = function(){
	//the dealer and player will store card objects
	this.player_hand = [];
	this.bankroll = 0;
	this.player_bet = 0;
};// end of board factory

Board.prototype.randomize = function() {
	//fisher yates algorithum, need to make my own iteration of it
	//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	var stacked_deck = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];
	var card_suit = ["Hearts","Spades","Clovers","Diamonds"]
	var random_index = function(array){
		return Math.floor(Math.random()*array.length);	
	};

	//created a simple "factory" that will return a random card and push that shit towards the array
	var Card = {
		card_value:stacked_deck[random_index(stacked_deck)],
		card_suit:card_suit[random_index(card_suit)]
	};//end of card factory (sort of)
	this.player_hand.push(Card);
};// end of randomize proto method

