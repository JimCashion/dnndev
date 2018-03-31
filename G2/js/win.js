var winState = {

	carryon: function() 
	{
		
		confirmwin();
	},

    create: function() {

        for(var x =0; x<gridsize;x++)
        {
            for(var y =0; y<gridsize;y++)
            {
                  var image = game.add.sprite(0, 0, 'i' + x + 'x' + y); 
                tilesize = image.width;
                image.x = ((game.world.width - (gridsize * tilesize)) / 2) + (x * tilesize);
                image.y = ((game.world.height - (gridsize * tilesize)) / 2) + (y * tilesize);
            }
        }  

        game.input.onDown.add(this.carryon, this);

	},

  update: function() 
  {

        constructcoords();
       
  }

	

}