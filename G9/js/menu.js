var menuState = {

	
     create: function() {

   
		style = { font: "30px Arial", fill: "#fff", 
		        align: "center", 
		        boundsAlignH: "center", 
		        boundsAlignV: "top", 
		        wordWrap: true, wordWrapWidth: 780 };

		stylesm = { font: "20px Arial", fill: "#fff", 
		        align: "center", 
		        boundsAlignH: "center", 
		        boundsAlignV: "top", 
		        wordWrap: true, wordWrapWidth: 780 };
        title = game.add.text(0, 0, getTitle(), style);
        title.setTextBounds(0, 0, game.world.width, game.world.height);
	        
	    instructions = game.add.text(0, 0, getInstructions(), style);
        instructions.setTextBounds(0, 50, game.world.width, game.world.height);

        missiontitle = game.add.text(0, 0, 'Your Mission', style);
        missiontitle.setTextBounds(0, 150, game.world.width, game.world.height);

        mission = game.add.text(0, 0, getMission(), stylesm);
        mission.setTextBounds(0, 200, game.world.width, game.world.height);

		var types = ['virt','trad','myst','mult','lett'];
		var styledinod = { font: "12px Arial", fill: "#fff", 
		               align: "left", 
		               boundsAlignH: "left", 
		               boundsAlignV: "top", 
		               wordWrap: true, wordWrapWidth: 600 };

		var stylehblack = { font: "18px Arial", fill: "#000", 
		           align: "left", 
		           boundsAlignH: "left", 
		           boundsAlignV: "top", 
		           wordWrap: true, wordWrapWidth: 600 };

		for (var i = 0; i< 5; i++)
		{ 
			var s = game.add.sprite(200 + i*35, 235, types[i] + 'maze'); 
	        	s.scale.setTo(.75,.75);
	        	
			var t = game.add.text(0, 0, '20', styledinod);
                t.setTextBounds(214+ i*35, 235 , 200, 25);
		}

		var t = game.add.text(0, 0, 'OR         Total: 200', styledinod);
                t.setTextBounds(154+ 7*35, 235 , 200, 25);

		var i0 = game.add.text(2, 212, 'IQ: 97', stylehblack);
        i0.setTextBounds(0, 50, game.world.width - 40, game.world.height);	
		var i1 = game.add.text(20, 210, 'The Dinos start off pretty dumb but willl learn as the game progresses.', stylesm);
        i1.setTextBounds(0, 50, game.world.width - 40, game.world.height);	
        var i15 = game.add.text(20, 235, 'So collect the caches before their IQ gets too high!', stylesm);
        i15.setTextBounds(0, 50, game.world.width - 40, game.world.height);	

		var i2 = game.add.text(20, 265, 'Avoid the Dino that we know nothing about except that they call him "THE STEG"!', stylesm);
        i2.setTextBounds(20, 50, game.world.width - 80, game.world.height);	
        var s2 = game.add.sprite(5, i2.y + 55,'stegmaze'); 
        game.add.sprite(s2.x + 20, s2.y - 5, 'n0');
        var i25 = game.add.text(20, 290, 'He is fast, inteligent and mean.', stylesm);
        i25.setTextBounds(20, 50, game.world.width - 80, game.world.height);	

    	var i3 = game.add.text(20, 320, 'Find Dippy the Dino to help you, he is not so intelligent, slower and he', stylesm);
        i3.setTextBounds(40, 50, game.world.width - 80, game.world.height);	
        var s3 = game.add.sprite(5, i3.y + 55,'stegmaze'); 
		game.add.sprite(s3.x + 20, s3.y - 5, 'n3');
		var i35 = game.add.text(20, 345, 'will share his caches with you', stylesm);
        i35.setTextBounds(40, 50, game.world.width - 80, game.world.height);	

		var i4 = game.add.text(20, 375, 'Collect the Stungun to Stun the Dinos for a little while', stylesm);
        i4.setTextBounds(0, 50, game.world.width - 40, game.world.height);	
        game.add.sprite(5, i4.y + 55,'stungun'); 

		var i5 = game.add.text(20, 405, 'Collect the Brainwash to reduce the dinos IQ', stylesm);
        i5.setTextBounds(0, 50, game.world.width - 40, game.world.height);	
        game.add.sprite(5, i5.y + 55,'braindrain'); 

	    click = game.add.text(0, 0, 'Click to start', style);
	    click.setTextBounds(0, 500, game.world.width, game.world.height);

		game.input.onTap.addOnce(function () {           
      
	        score = 0;
	        game.state.start('play');
        
        });
    }

}