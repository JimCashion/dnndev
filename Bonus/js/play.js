var playState = {

	
    render: function() {

   		//game.debug.text(result, 10, 20);


    },

    preload: function() {

	},
    
   

    imageclicked: function(sprite, pointer)
    {

       
    },

    checkwin: function(){

    	var c = 0;
        for(var i = 0; i < original.length ; i++)
        {
        	if (original[i].tile.x != original[i].x)
        	{
        		c++;
        	
            // if (original[i].x != original[i].x || original[i].tile.y != original[i].y )
            //     return false;
        	}
        }
        var correct = 0;

        if(c==9)
        {
       		//  finished the game but did we win?

			for(var i = 0; i < original.length ; i++)
        	{
        		if (original[i].tile.x == originalblanks[i].x && 
        			original[i].tile.y == originalblanks[i].y)
        			correct++;
        	}
      

	        if (correct==9)
	        {
	        	game.state.start('win');

	        }
	        else
	        {
	        	losetext = 'you got ' + correct + ' correct.. Try again';
	        	game.state.start('lose');
	        }
	    }
    },

    create: function() {

        
        original = [];
        originalblanks = [];

        tiles = game.add.group();
        tiles.enableBody = true;  
        blanks = game.add.group();
        blanks.enableBody = true;  
        //game.add.sprite(0, 0, 'cachesmall'); 

        // load up all the tiles

        for(var x =0; x<gridsize;x++)
        {
            for(var y =0; y<gridsize;y++)
            {
                // game.add.sprite(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);
                var image = game.add.sprite(0, 0, 'i' + (x * 3 + y + 1)); 
                tilesize = image.width;
                image.x = 75 + (x * tilesize);
                image.y = 150 + (y * tilesize);
                image.inputEnabled=true;
                image.events.onInputDown.add(this.imageclicked,this);
                // tiles.create(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);

                image.inputEnabled = true;
      			    image.input.enableDrag();
      			    image.events.onDragStart.add(this.onDragStart, this);
      			    image.events.onDragStop.add(this.onDragStop, this);

                tiles.add(image);

                original.push({tile: image, x: image.x, y: image.y});

                var image = game.add.sprite(0, 0, 'blank' + (x * 3 + y + 1)); 
                tilesize = image.width;
                image.x = 425 + (x * tilesize);
                image.y = 150 + (y * tilesize);
                image.inputEnabled=true;
                image.events.onInputDown.add(this.imageclicked,this);
                // tiles.create(224 + x * 88, 124 + y * 88, 'i' + x + 'x' + y);
                blanks.add(image);

                originalblanks.push({tile: image, x: image.x, y: image.y});



            }
        }  

        //  scramble
         for(var randmoves = 0; randmoves < 1000; randmoves++){
           for (var i = 0, len = tiles.children.length; i < len; i++)
           {

                var j =Math.floor(Math.random() * tiles.children.length);

                var tx = tiles.children[i].x;
                var ty = tiles.children[i].y;
                tiles.children[i].x = tiles.children[j].x;
                tiles.children[i].y = tiles.children[j].y;
                tiles.children[j].x = tx;
                tiles.children[j].y = ty;

                var tx = original[i].x;
                var ty = original[i].y;
                original[i].x = original[j].x;
                original[i].y = original[j].y;
                original[j].x = tx;
                original[j].y = ty;

           }
         }

         

           //  practice with an emitter

        //  Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        emitter = game.add.emitter(game.world.centerX, 200, 200);

        //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        emitter.width = 800;

        emitter.makeParticles('star');

        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 400);

        emitter.setRotation(360, 360);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 0.5, 1, 1);
        emitter.gravity = -200;

        //  false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //  The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 000, 100);


    },

	onDragStart: function (sprite, pointer) {

	    result = "Dragging " + sprite.key;
	    dragx = sprite.x;
	    dragy = sprite.y;

	},

	onDragStop: function (sprite, pointer) {

	    result = sprite.key + " from " + dragx + "," + dragy + " dropped at x:" + pointer.x + " y: " + pointer.y;

	    cx = sprite.x + (sprite.width / 2);
	    cy = sprite.y + (sprite.height / 2);

        var hit = false; 
 		for(var i = 0; i < originalblanks.length ; i++)
        {
        	if (originalblanks[i].tile.x >= 425)
        	{
	        	if ((originalblanks[i].tile.x <= cx && originalblanks[i].tile.x + originalblanks[i].tile.width >= cx) &&
	        		(originalblanks[i].tile.y <= cy && originalblanks[i].tile.y + originalblanks[i].tile.height >= cy))
	        	{
	        		hit = true;
	        		//  swap tiles

	        		var blankx = originalblanks[i].tile.x;
	        		var blanky = originalblanks[i].tile.y;
	                originalblanks[i].tile.x = dragx;
	                originalblanks[i].tile.y = dragy;
	                sprite.x = blankx;
	                sprite.y = blanky;
	                sprite.inputEnabled=false;

                    this.checkwin();
	            }
	        }
        }
       
        if(!hit){
     
       		//  put it back
         
       		sprite.x = dragx;
       		sprite.y = dragy;
        }

	},

    movetile: function(t, scrambling) {

        //  scrambing not used for now.  intended to supress any animation if in scramble mode

        // var target = t.tile;
        // var direction = t.direction;
        
        // var tempx = blankx;
        // var tempy = blanky;
        // blankx = target.x;
        // blanky = target.y

        // target.x = tempx;
        // target.y = tempy;
     
    },


	update: function() {

	}
}

 