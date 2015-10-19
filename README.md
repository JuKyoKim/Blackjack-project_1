# Blackjack_project_one
This project was made to honor the fearless leader!
![](./fearless_leader.png)
##General Wireframe
![](./wireframe_blackjack.png)

##[user stories](https://trello.com/b/5LM6uuKH/blackjack-project-one)

##[link to the game!](http://jukyokim.github.io./)

##Explanations on how to play the game
- on click of the start game button initiates the game
- after i hide the start game button to reveal an input field and a bet button that allows users to place a bet
- once the user makes the bet the cards are dealt (both are randomized)
- user can decide to hit or stay based on what he wants
- when the user decides to stay the dealer's logic kicks in
- depending on if the player's hand winning or losing it will either double the money you bet or subtract it
- then it returns you back to making a bet allowing users to play until they hit 0 dinero!

##Explanations on the logic thingy?
- I made one factory the "Board object"
- This board object will contain the properties that will hold the cards, current balance, and player bet(this one ill explain)
- I'm completely sure everyone did this, but I attached all the methods to certain buttons, and based on the way its clicked it will do something.
- the robo dealer logic is hit until he has at least 16
- the ace logic was slightly more tricky, I made it so that if the player has less than 11 set it to 11 else set it to 10.(there are holes to this logic, but i covered it below)
- when the game wants to grab the value it will resort the ACE card to the back of the list, and then grab the value, so if i had 7,A,8 it will add it to 16 instead of 26.

##Stuff I wish I could tackle!
- CSS is definitely one of them
- The game doesnt loop to well for round 2, but I think its because of the way i create this "new" board object, and manipulate it.
- The code I wrote could definitely get refactored like crazy, but for now I am proud of at least figuring out some of the logic.
