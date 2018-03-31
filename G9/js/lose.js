var loseState = {

	
    create: function() {
   			confirmlose('"' + dinonames[winningdino] + '" beat you to the caches, better luck next time!');
	},

	restart: function() {
			game.state.start('menu');
	}
	
}