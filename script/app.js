console.log("loaded");

window.onload = function(){
	//set the background on load of the window
	$("body").css("background-image","url(http://d2fhka9tf2vaj2.cloudfront.net/premium/034_blackJack/images/9.jpg)");
};// end of window onload 

var Board = function(){
	//the dealer and player ill store card objects into
	this.dealer_hand = [];
	this.player_hand = [];
	//the bankroll and bet will be placed on default 0 so that 
	//it can be modified later within a new declaration of the object
	this.bankroll = 0;
	this.player_bet = 0;
	this.stacked_deck = [];
};// end of board factory

Board.prototype.shuffle_deck = function() {
	
};
