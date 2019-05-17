"use strict";

var CardGame = {
	Game: function(name, players, deck, table){
		this.name = name;
		this.players = players;
		this.deck = deck;
		this.table = [];
		var _this = this;

		this.deal = function(){
			var cards = _this.deck.card;

			for(var c = cards.length/players.length; c > 0; c--){
				for(var p = 0; p < players.length; p++){
					players[p].hand.push(cards.pop());
				}
			}
			this.startGame();
		};
		
		this.placeCardOnTable = function(){
			_this.table.push(localStorage.saveTableVal);
		};

		this.endGame = function(){ alert("Game is over!!!") };
	},
	Player: function(name){
		this.name = name;
		this.hand = [];
		this.isCpu = true;
		this.isDealer = false;
		this.isTurn = false;
		this.cardValue;
		
		var saveData = JSON.parse(localStorage.saveData || null) || {};
		var saveTableVal = JSON.parse(localStorage.saveTableVal || null);
		
		this.savedCard = function(obj, thisCard) {
			saveData.obj = obj;
			saveTableVal.thisCard = thisCard;
			localStorage.saveData = JSON.stringify(saveData);
			localStorage.saveTableVal = JSON.stringify(thisCard);
			var cardValue = saveData.obj;
			this.cardValue = cardValue;
			return this.CardValue;
		}		

		this.playCard = function(){ 
			var thisCard = this.hand.shift();
			alert(name + " played " + thisCard.name + " of " + thisCard.suit);
			var obj = thisCard.value;
			this.savedCard(obj, thisCard);
		};		
	},
	Deck: function(){
		function Card(suit, name, value){
			this.suit = suit;
			this.name = name;
			this.value = value;
		}

		var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
		var names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
		var cards = [];
		
		for( var s = 0; s < suits.length; s++ ) {
			for( var n = 0; n < names.length; n++ ) {
				cards.push( new Card( suits[s], names[n], n+1 ) );
			}
		}

		var shuffleDeck = function(){
			var cardLength = cards.length - 1;
			var cardSwap; 
			var temp;
			
			for(var i = cardLength; i > 0; i--){ 
				cardSwap = Math.floor(Math.random() * i); 
				temp = cards[i];
				cards[i] = cards[cardSwap];
				cards[cardSwap] = temp;
			}
			return cards;			
		};
		shuffleDeck();

		this.card = cards;
	},
	Team: function(){
		
	}
};

CardGame.Game.prototype.startGame = function(){
	//debugger;
	// Add if Cpu, dealer, turn
	alert("Game has started");
};