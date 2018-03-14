var winState = {

	
    create: function() {

       

	   confirmwin();
	},

	update: function() {

        for (var i = 0; i < c_sprites.length; i++)
        {
            var s = c_sprites[i];

            var dx = s.x - s.sprite.x;
            var dy = s.y - s.sprite.y;

            var diag = Math.sqrt((dy * dy) + (dx * dx)) / 2;

            
            var angle = Math.atan(Math.abs(dy) / Math.abs(dx));   
   
   				if (s.x > s.sprite.x)
            		s.sprite.body.velocity.x = diag * Math.cos(angle);
            	else
            		s.sprite.body.velocity.x = diag * Math.cos(angle) * -1;
          
          		if(s.y > s.sprite.y)
            		s.sprite.body.velocity.y = diag * Math.sin(angle) ;
            	else
            		s.sprite.body.velocity.y = diag * Math.sin(angle) * -1;

            if (Math.abs(s.sprite.body.velocity.x) < 50)
            	s.donex = true;
            if (Math.abs(s.sprite.body.velocity.y) < 50)
            	s.doney = true;
        }
	}

}