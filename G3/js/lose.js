var loseState = {

	
    create: function() {

	    if(deathtype == 'dino')
	        confirmlose('You were killed by an Angry Dino');
	    else
	    	confirmlose('You fell off the ground!!');

	    deathtype = 'dino';
	},

	restart: function() {
			game.state.start('menu');
	}
	
}