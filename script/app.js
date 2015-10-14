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

Board.prototype.create_deck = function() {
	this.stacked_deck = ["a",2,3,4,5,6,7,8,9,10,"j","q","k"];
	var randomizer = function(){
		var rand = Math.floor(Math.random()*10);
		if(rand === 0 || rand === 9){
			var other_index_num = Math.floor(Math.random()*10);
			//create an else if that will grab 10 or higher numbers
		};// if else for grabbing 10 or higher value

	};// end of randomizer function
};// end of create deck function