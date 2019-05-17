"use strict";
var Player1 = new CardGame.Player("Player 1");
var Player2 = new CardGame.Player("Player 2");
var playersInGame = [Player1, Player2];
var War = new CardGame.Game("War", playersInGame);
var Deck = new CardGame.Deck();
War.deck = Deck;
War.deal();
var Player1Wins, Player2Wins;

var declareWar = function(){
	alert("War has been declared!");
	var counter = 3 * playersInGame.length;
	var cardsRemoved = 0;
	
	for(var i = 0; i < counter; i++){
		var removeCard;
		if(cardsRemoved < 3){
			cardsRemoved++;
			removeCard = Player1.hand.shift();
			removeCard = JSON.stringify(removeCard);
			War.table.push(removeCard);
		} else {
			cardsRemoved++;
			removeCard = Player2.hand.shift();
			removeCard = JSON.stringify(removeCard);
			War.table.push(removeCard);
		}
	}
	War.startGame();
};

var getDiscardedCards = function(){ 
	var _this = this;
	var counter = War.table;
	var Card = {};
	
	for(var i = 0; i < counter.length; i++){
		Card = War.table[i];
		Card = JSON.parse(Card);
		if(Player1Wins){
			Player1.hand.push(Card);
		} else {
			Player2.hand.push(Card);
		}
	}
	
	War.table = [];
};

var getWinner = function(roundWinner) {
	Player1Wins = Player1.cardValue > Player2.cardValue;
	Player2Wins = Player2.cardValue > Player1.cardValue;
	
	if(Player1Wins) {
		alert(Player1.name + " wins!");
		getDiscardedCards(Player1Wins);
	} else if(Player2Wins) {
		alert(Player2.name + " wins!");
		getDiscardedCards(Player2Wins);
	} else { declareWar(); }

	if(Player1.hand.length == 0 || Player2.hand.length == 0){
		War.endGame();
	}else {
		War.startGame();
	}
};

War.startGame = function() {
	debugger;
	Player1.playCard();
	War.placeCardOnTable();
	Player2.playCard();
	War.placeCardOnTable();
	getWinner();
};
War.startGame();