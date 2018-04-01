var menu1State = {

	
     create: function() {
	style = { font: "30px Arial", fill: "#fff", 
		        align: "center", 
		        boundsAlignH: "center", 
		        boundsAlignV: "top", 
		        wordWrap: true, wordWrapWidth: 600 };

        title = game.add.text(0, 0, getTitle(), style);
        title.setTextBounds(0, 0, game.world.width, game.world.height);
	        
	    instructions = game.add.text(0, 0, 'Welcome to the last part', style);
        instructions.setTextBounds(0, 50, game.world.width, game.world.height);

        missiontitle = game.add.text(0, 0, 'Your Mission', style);
        missiontitle.setTextBounds(0, 150, game.world.width, game.world.height);

        mission = game.add.text(0, 0, 'All you have to do is move the pictures that were taken at GZ of each cache onto the cache number', style);
        mission.setTextBounds(0, 200, game.world.width, game.world.height);

	    click = game.add.text(0, 0, 'Click to start', style);
	    click.setTextBounds(0, 500, game.world.width, game.world.height);

		game.input.onTap.addOnce(function () {           
      
	        score = 0;
	        game.state.start('play');
        
        });
	}

}