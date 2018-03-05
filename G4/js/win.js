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
              // game.add.sprite(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);
              var image = game.add.sprite(0, 0, 'i' + x + 'x' + y); 
              tilesize = image.width;
              image.x = ((game.world.width - (gridsize * tilesize)) / 2) + (x * tilesize);
              image.y = ((game.world.height - (gridsize * tilesize)) / 2) + (y * tilesize);
            //  image.inputEnabled=true;
             // image.events.onInputDown.add(this.imageclicked,this);
              // tiles.create(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);
             // tiles.add(image);

             // original.push({tile: image, x: image.x, y: image.y});

          }
      }  

      game.input.onDown.add(this.carryon, this);

}

	

}