var loseState = {

	
    create: function() {

       bulletmax = 22;
       shipscore = 0;
       
       confirmlose('You were killed by the alien dinos!!');
	},

	restart: function() {
			game.state.start('menu');
	}
	
}