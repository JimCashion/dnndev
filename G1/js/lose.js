var loseState = {

	
    create: function() {

       confirmlose('You were killed by an Angry Dino');
	},

	restart: function() {
			game.state.start('menu');
	}
	
}