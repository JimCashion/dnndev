var loseState = {

	
    create: function() {

       confirmlose(losetext);
	},

	restart: function() {
			game.state.start('menu');
	}
	
}