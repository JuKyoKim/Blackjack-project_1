var Board = function(){
	//the dealer and player will store card objects
	this.dealer_hand = [];
	this.player_hand = [];
	this.bankroll = 200;// gonna start default with 200pesos
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
	if(this.bankroll < amount){
		console.log( "INVALID!!!! U GOT NO MONEY!!!!");
		return "NO BUENO";
	};
	this.player_bet = amount;
	this.bankroll -= amount;

};// end of ask_bets method

Board.prototype.clear_hand = function() {
	this.dealer_hand = [];
	this.player_hand = [];
};//end of clear_hand method

Board.prototype.deal_hands = function(){	
	for(var i = 0; i < 2;i++){
		this.dealer_hand.push(this.randomize());
		this.player_hand.push(this.randomize());
		this.generate_card("player");
		this.generate_card("dealer")
	};// end of for loop that creates new hands for the player
};// end of start round method

Board.prototype.hit_stay = function(string) {

	switch(string){
		case "hit":
			this.player_hand.push(this.randomize());
			this.generate_card("player");
		break;

		case "stay":
			console.log("robot's turn");
			return this.robo();
		break;

		case "dealer"://if dealer string is passed throw that dealer a bone
			this.dealer_hand.push(this.randomize());
		break;
	};// end of switch case conditional for moving player to next round
};// end of hit_stay method(will need to loop this in the main play game method!!!!! until stay is hit)

Board.prototype.grab_value = function(type) {

	var rearrange_current_array = function(array){
		var temp_arr = [];
		for(var i = 0; i<array.length;i++){
			if(array[i].card_value === "Ace"){
				temp_arr.push(array[i]);
				array.splice(i,1);//remove the current item
				i--;//sets i back 1 to account for the removed item
			};// end of conditional
		};// for loop to check the array
		if(temp_arr[0] === undefined){
			return array;
		}else{
			for(var i = 0;i < temp_arr.length;i++){
				array.push(temp_arr[i]);//pushes the card from temp to the current hand
			};// end of for loop
			return array;
		};// end of the conditional
	};// end of rearrange_current_array function
	
	var value_parse = function(array){
	
		var ace_value = function(current_total){
			var i = 0;
			current_total < 11 ? i = 11: i = 1;
			return i;
		};// end of ace_value function need to rewrite the logic
	
	
		var total = 0
		for(var i = 0;i < array.length;i++){
			switch(array[i].card_value){
				case "King":
				case "Jack":
				case "Queen":
					total += 10
				break;

				case "Ace":
					total += ace_value(total);
				break;

				default:
					total += array[i].card_value;
			};// end of switch conditional
		};// end of the for loop
		return total;
	};// end of value parse function

	var return_value = null;
	//This will return the dealer unless player is specifie through ternary
	//can't return it on the actual or else it will give me an error
	type === "player" ? return_value = value_parse(rearrange_current_array(this.player_hand)): return_value = value_parse(rearrange_current_array(this.dealer_hand));
	return return_value;

};// end of grab_value method

Board.prototype.robo = function() {
	var dealers_current_value = this.grab_value("dealer");//grabs the current value for dealer
	while(dealers_current_value < 16){
		this.hit_stay("dealer");
		this.generate_card("dealer");
		//reset the value to the current value again
		dealers_current_value = this.grab_value("dealer");
	};// end of while loop
	console.log("robo turn done");
	return this.find_winner();
};// end of robo method

Board.prototype.find_winner = function(){
	var player = this.grab_value("player");
	var dealer = this.grab_value("dealer");

	var loss = function(){
		console.log("YOU LOST!");
		return "YOU LOST!"
	};// end of loss function

	var win = function(){
		console.log("YOU WIN!");
		return "YOU WIN!"
	};// end of win function

	switch(player){
		case 21:
			this.bankroll += (this.player_bet * 2);
			this.player_bet = 0;//reset to 0
			win();
			return "Blackjack"
		break;
	
		default:
			if(player > 21){
				this.player_bet = 0;//reset to 0
				return loss();
			}else if(dealer > 21){
				this.bankroll += (this.player_bet * 2);
				this.player_bet = 0;//reset to 0
				return win();
			}else{
				if(player <= dealer){
					this.player_bet = 0;//reset to 0
					return loss();
				}else{
					this.bankroll += (this.player_bet * 2);
					this.player_bet = 0;//reset to 0
					return win();
				};// end of the if dealer or winner has more or less in between 21
			};// end of the if dealer or winner instant bust from having more than 21
	};// end of conditional switch for checking for blackjack
};// end of find_method

Board.prototype.generate_card = function(type){

	// player_card_count
	// dealer_card_count
	var add_to_count = null;
	var hand = null;
	var place = null;
	if(type === "dealer"){
		add_to_count = dealer_card_count;
		hand = this.dealer_hand;
		place = $("#dealer_display_area");
	}else if(type === "player"){
		add_to_count = player_card_count;
		hand = this.player_hand;
		place = $("#player_display_area");
	};// end of if conditional


	var card_div = $("<div>");
	place.append(card_div);
	card_div.addClass("playing_card");		
	card_div.attr("id",type);
	card_div.attr("suit",hand[add_to_count].card_value);
	card_div.text(hand[add_to_count].card_value);

	if(type === "dealer"){
		dealer_card_count += 1;
	}else if(type === "player"){
		player_card_count += 1;
	};// to increment at the end, so it generates the next card

};// end of the generate card method

// randomize() - this generates random cards
// ask_bets(number) - this will create bets and set the value to the current objecy
// clear_hand() - clears the hands, mainly for testing purposes
// deal_hands() - deals 2 randomly generated cards
// hit_stay() - "hit" or "stay" for players, the dealers case is for internal function on robo
// grab_value() - just grabs value, this runs on its own, so no need to really use it, also made for testing
// robo() - that robotic dealer logic, super simple
// find_winner() - accounts for the 22 or more busting instant, blackjack at 21, and the dealer always winning out on tied numbs

//global variables
var player_card_count = 0;
var dealer_card_count = 0;
var game_over = false;


$(function() {
	//write all jquery selectors here
	var body = $("body");
	var start_button = $("#start_game");
	var hit_button = $("#hit");
	var stay_button = $("#stay");
	var input = $("#bet_input");// only one on the page
	var bets_button = $("#bets");
	var overall_container = $("#overall_container");
	var dealer_display = $("#dealer_display_area");
	var player_display = $("#player_display_area");
	var next_button = $("#next_round");
	console.log("loaded");
	//set the background on load of the window
	body.css("background-image","url(http://d2fhka9tf2vaj2.cloudfront.net/premium/034_blackJack/images/9.jpg)");
	overall_container.toggle();
	next_button.toggle();
	var banktext = $("#bankroll");


	var test = new Board;// not gonna bother renaming this since it wont really matter

	//need to write the function that will loop this game
	var new_start_game = function(){
		start_button.toggle();
		overall_container.toggle();
		console.log("starting game");
		hit_button.toggle();
		stay_button.toggle();
		banktext.text("Current moola "+test.bankroll);
		dealer_display.toggle();
		player_display.toggle();

	};// end of the new start game function

	//need to write the onclick here!
	start_button.on("click", start_button ,new_start_game);//adds back the start game function once the game is over

	bets_button.on("click",bets_button,function(){
		var bet = Number(input.val());
		if(bet > test.bankroll){
			console.log("invalid action");
			return "Whats up son";
		};
		test.ask_bets(bet);
		input.toggle();
		bets_button.toggle();
		hit_button.toggle();
		stay_button.toggle();
		test.deal_hands();
		console.log(test);
		banktext.text("Current moola "+test.bankroll);
		dealer_display.toggle();
		player_display.toggle();
	});

	hit_button.on("click",hit_button,function(){
		test.hit_stay("hit");
		console.log(test.player_hand);
		banktext.text("Current moola "+test.bankroll);
	});

	stay_button.on("click",stay_button,function(){
		test.hit_stay("stay");
		console.log(test);
		next_button.toggle();
		hit_button.toggle();
		stay_button.toggle();
		banktext.text("Current moola "+test.bankroll);
	});

	next_button.on("click",next_button,function(){
		banktext.text("Current moola "+test.bankroll);
		dealer_display.empty();
		player_display.empty();
		test.clear_hand();
		input.toggle();
		bets_button.toggle();
		next_button.toggle();
		dealer_card_count = 0;
		player_card_count = 0;
		if(test.bankroll <= 0){
			test = new Board;
			input.toggle();
			bets_button.toggle();		
			start_button.toggle();
		};
	})


	// $("#start_game").toggle();
	// 	start_button.toggle();
	//	overall_container.toggle();¬









});// end of window onload 

