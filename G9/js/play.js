var playState = {

	 render: function() {

   
    },

    preload: function() {

	},

    create: function() {

    	currentcell = null;

        debugoffset = 0;
        bs = 10;  //  block size
        mazedim = {x: 10, y: 10};   //  4-*30 is good

        //  Set up the game items and layout here

        //  calculate game bounds
        gx = (mazedim.x * 40) + 10;
        gy = (mazedim.y * 40) + 10;

        //  A simple background for our game
        var sky = game.add.sprite(0, 0, 'sky');
        sky.scale.setTo( gx /sky.width, gy / sky.height);

        game.world.setBounds(0, 0, gx, gy);
      
        


        //  Need these for standard utils to work
        fences = game.add.group();
        goodies = game.add.group();
        baddies = game.add.group();
        cells = game.add.group();
        cells.enableBody = true;

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        platforms.enableBody = true;  //  We will enable physics for any object that is created in this group

        //  Make the maze
        m=maze(mazedim.x,mazedim.y);
        var x = displaygraphical(m);


        // create a sprite in the middle of each grid square so we can easily detect cell entry (collision)
        for(var i = 0; i<mazedim.x; i++)
        {
            for(var j = 0; j<mazedim.y; j++)
        	{
                var c = converttomaveposition({x: i,y: j}, m);
                var cl = new Cell(game, c.x, c.y, i, j);
				cells.add(cl);
				cl.body.immovable = true;
				game.physics.arcade.enable(cl);

				for(var k = 0; k<platforms.length; k++)
				{
					if (platforms.children[k].y == cl.y - 20 &&
					    platforms.children[k].x <= cl.x && 
					    platforms.children[k].x + platforms.children[k].width >= cl.x + cl.width)
					{
						cl.exits.north = false;
					}
					
					if (platforms.children[k].y == cl.y + 20 &&
					    platforms.children[k].x <= cl.x && 
					    platforms.children[k].x + platforms.children[k].width >= cl.x + cl.width)
					{
						cl.exits.south = false;
					}

					if (platforms.children[k].x == cl.x - 20 &&
					    platforms.children[k].y <= cl.y && 
					    platforms.children[k].y + platforms.children[k].height >= cl.y + cl.height)
					{
						cl.exits.west = false;
					}

					if (platforms.children[k].x == cl.x + 20 &&
					    platforms.children[k].y <= cl.y && 
					    platforms.children[k].y + platforms.children[k].height >= cl.y + cl.height)
					{
						cl.exits.east = false;
					}

				}
        	}
        }
        //  add some baddies
        this.adddinos(1);

        //  now add a goodie
        this.addcaches(1, 'nano');
        this.addcaches(1, 'trad');

        //  add the player
        this.addrandmplayer();
       
    },

    enterCell: function (baddie, cell) {

    
	    currentcell = cell;
	    
	    if (baddie.targetcell == null || (cell.cellx == baddie.targetcell.cellx && cell.celly == baddie.targetcell.celly))
	    {
	    	//  only consider it entered if we are in the middle

	    	if(this.baddieincenterofcell(cell, baddie))
	    	{
	    		
		    	//  we have entered a new cell

		    	//  is there a goodie in here?

		    	var g = this.getgoodieincell(cell);
		    	if(g != null)
		    	{
		    		//alert(g.goodietype);
		    	}

		        cell.loadTexture('mazewall1', 0);
		        baddie.prevcellx = baddie.cellx;
		        baddie.prevcelly = baddie.celly;
		        baddie.cellx = cell.cellx;
		        baddie.celly = cell.celly;
		    	baddie.virgin = false;
		    	baddie.body.velocity.x = 0;
		    	baddie.body.velocity.y = 0;

		    	dinfo = "Dino in " + this.formatcell(this.getcell(baddie.cellx, baddie.celly)) + ':  IQ=' + baddie.IQ + nl;
		    	dinfo += "Previous " + this.formatcell(this.getcell(baddie.prevcellx, baddie.prevcelly)) + nl;
		    	
		        dinfo += "Entering " + this.formatcell(cell)+ nl;

				//  if we have been ehre before then lets use our memory

	    		var memorynextcells = baddie.cellmemory[cell.cellx * mazedim.x + cell.celly];
				if(memorynextcells != null)
				{
					baddie.nextcells = memorynextcells;
					dinfo+= '***Memory Retrieved***' + nl;
					//  the implication is that the first available good cell is now bad becasue we have ended up here again!!
					for(var i = 0; i<baddie.nextcells.length; i++)
					{
						if(baddie.nextcells[i].good)
						{
							baddie.nextcells[i].good = false;
							break;
						}
					}
				}
				else
		       	{
			        //  construct a next cell list

			        baddie.nextcells = [];
			        if (cell.exits.north)
		            {
		            	var c = this.getcell(cell.cellx, cell.celly - 1);
		            	if(c.cellx != baddie.prevcellx || c.celly != baddie.prevcelly)
			       			baddie.nextcells.push({entrycell: cell, newcell: c, good: true});
		            }
		            if (cell.exits.east)
		            {
		            	var c = this.getcell(cell.cellx + 1, cell.celly);
		            	if(c.cellx != baddie.prevcellx || c.celly != baddie.prevcelly)
			       			baddie.nextcells.push({entrycell: cell, newcell: c, good: true});
		            }
			       	if (cell.exits.south)
			       	{
			       		var c = this.getcell(cell.cellx, cell.celly + 1);
			       		if(c.cellx != baddie.prevcellx || c.celly != baddie.prevcelly)
			       			baddie.nextcells.push({entrycell: cell, newcell: c, good: true});
			       	}
			       	if (cell.exits.west)
			       	{
			       		var c = this.getcell(cell.cellx - 1, cell.celly);
			       		if(c.cellx != baddie.prevcellx || c.celly != baddie.prevcelly)
			       			baddie.nextcells.push({entrycell: cell, newcell: c, good: true});
			       	}

			       	//  randomize these for added fun
			       	this.randomizenextcells(baddie.nextcells);

			       	//  now add the previous cell last unless its this cell (can happen at dino initialisation)
			       	if (cell.cellx != baddie.prevcellx || cell.celly != baddie.prevcelly) 
			       		baddie.nextcells.push({entrycell: cell, newcell: this.getcell(baddie.prevcellx, baddie.prevcelly), good: true});
			    }

			    //  memorise 
		       	baddie.cellmemory[baddie.cellx * mazedim.x + baddie.celly] = baddie.nextcells;


		       	dinfo += "Next Cell List:" + nl;
		       	for(var i = 0; i<baddie.nextcells.length; i++)
		       	{
		       		dinfo += this.formatcell(baddie.nextcells[i].newcell) + ' - ' + baddie.nextcells[i].good + nl;
		       	}

		       	

		       	//  check each possible cell until we find a nice ine and then move to it
				for(var i = 0; i<baddie.nextcells.length; i++)
		       	{
		       		if(baddie.nextcells[i].good)
		       		{
		       			var celltocheck = baddie.nextcells[i].newcell
		       			//  close the entrance
		       			
		       			if (celltocheck.y < cell.y)
		       				celltocheck.exits.south = false;
		       			else
		       			if (celltocheck.y > cell.y)
		       				celltocheck.exits.north = false;
		       			else	
		       		    if (celltocheck.x < cell.x)
		       				celltocheck.exits.east = false;
		       			else	
		       			if (celltocheck.x > cell.x)
		       				celltocheck.exits.west = false;
		       			

			       		if(this.checkcell(celltocheck, baddie.IQ))
			       		{
			       			//  open the entrance
		       			
			       			if (celltocheck.y < cell.y)
			       				celltocheck.exits.south = true;
			       			else
			       			if (celltocheck.y > cell.y)
			       				celltocheck.exits.north = true;
			       			else	
			       		    if (celltocheck.x < cell.x)
			       				celltocheck.exits.east = true;
			       			else	
			       			if (celltocheck.x > cell.x)
			       				celltocheck.exits.west = true;
		       			
			       			dinfo += 'Moving to ' + this.formatcell(baddie.nextcells[i].newcell) + nl;
			       			this.movebaddie(baddie, cell, baddie.nextcells[i].newcell);
			       			break;
			       		}	
			       		else
			       		{
			       			dinfo+= 'YUK' + nl;
			       			baddie.nextcells[i].good = false;
			       		}

			       		//  open the entrance
		       			
		       			if (celltocheck.y < cell.y)
		       				celltocheck.exits.south = true;
		       			else
		       			if (celltocheck.y > cell.y)
		       				celltocheck.exits.north = true;
		       			else	
		       		    if (celltocheck.x < cell.x)
		       				celltocheck.exits.east = true;
		       			else	
		       			if (celltocheck.x > cell.x)
		       				celltocheck.exits.west = true;
			       	}
				}

				if (baddie.targetcell != null)
					dinfo += "Target " + this.formatcell(baddie.targetcell) + nl;
				else
					dinfo += "Target " + 'No Target Yet' + nl;

				//  echo out the dinos memory
				for (var i = 0; i< mazedim.x; i++)
				{
					for (var j = 0; j< mazedim.y; j++)
					{
						var memorynextcells = baddie.cellmemory[i * mazedim.x + j];
						if(memorynextcells != null)
						{
							// dinfo += "Memory for (" + i + ',' + j + ')' + nl;

							// for(var k = 0; k<memorynextcells.length; k++)
			    //    			{
			    //    				dinfo += this.formatcell(memorynextcells[k].newcell) + ' - ' + memorynextcells[k].good + nl;
							// }
						}
					}

				}
		      
		    }
		}

		    		
		this.printdebug(dinfo);
        
    },

    baddieincenterofcell: function(cell,baddie)
    {
    	if(baddie.mazespeed > 100)
    		return true;
    //	alert(baddie.x + ' - ' + cell.x);
    	if (Math.abs(baddie.x - (cell.x - 5)) <= 2  && Math.abs(baddie.y - (cell.y - 5)) <= 2)
    		return true;
    	else
    		return false;


    },

    movebaddie(baddie, fromcell, tocell)
    {
    	//  move from current cell to next cell

    	if (fromcell.cellx == tocell.cellx)
    	{
    		//  must be moving vertically
    		baddie.body.velocity.y = (tocell.celly - fromcell.celly) * baddie.mazespeed;

    	}
    	else
    	if (fromcell.celly == tocell.celly)
    	{
    		//  must be moving horizontally
    		baddie.body.velocity.x = (tocell.cellx - fromcell.cellx) * baddie.mazespeed;
    	}

    	baddie.targetcell = tocell;
    	

    },

    checkcell: function(nextcell, IQ)
    {
    	
    	//  new born
    	if(IQ == 0)
    	{
    		//  DOH!!
    		return true;
    	}

	 	if (IQ >= 1)
    	{
    		//  check for nobrainer
    		 if(this.getgoodieincell(nextcell) != null)
    		 	return true;
    		//  toddler so Avoid single cell dead ends
    		var c = 0;
    		
    		if (nextcell.exits.north) c = c + 1;
    		if (nextcell.exits.east) c = c + 1;
    		if (nextcell.exits.south) c = c + 1;
    		if (nextcell.exits.west) c = c + 1;

    		if (c == 0)
    			return false;

    	}

    	if (IQ >= 2)
    	{
    		//  Out of nursery school so avoid two cell dead ends

    		//  check for nobrainer
 			if(this.getgoodieincell(nextcell) != null)
    		 	return true;

    		var c = 0;

    		if (nextcell.exits.north)
    		{
    			//  check if the cell to the north is a deadend

    			var nc = this.getcell(nextcell.cellx, nextcell.celly - 1);
    			nc.exits.south = false;
    			if (this.checkcell(nc,IQ - 1))
    				c = c + 1;
    			nc.exits.south = true;    		
    		}

			if (nextcell.exits.east)
    		{
    			//  check if the cell to the east is a deadend

    			var nc = this.getcell(nextcell.cellx + 1, nextcell.celly );
    			nc.exits.west = false;
    			if (this.checkcell(nc,IQ - 1))
    				c = c + 1;
    			nc.exits.west = true;
    		}

    		if (nextcell.exits.south)
    		{
    			//  check if the cell to the south is a deadend

    			var nc = this.getcell(nextcell.cellx, nextcell.celly + 1);
    			nc.exits.north = false;
    			if (this.checkcell(nc,IQ - 1))
    				c = c + 1;
    			nc.exits.north = true;
    		}

    		if (nextcell.exits.west)
    		{
    			//  check if the cell to the west is a deadend

    			var nc = this.getcell(nextcell.cellx - 1, nextcell.celly);
    			nc.exits.east = false;
    			if (this.checkcell(nc, IQ - 1))
    				c = c + 1;
    			nc.exits.east = true;
    		}
			
			//  so if all exits are single cell deadends then this cell is a 2 cell deadend
			if (c == 0)
    			return false;

    	}


    	return true;
    },

    printdebug: function(t) {

    	document.getElementById('debugarea').innerHTML = t;
    },

    collectBaddie: function (player, baddie) {


        // //  Add and update the score
        // if (baddie.baddietype == 'killer')
        // {
        //     player.kill();
        //     postback('lose');
        // }
    },

    addPlayer: function(coords) {
         // The player and its settings
        player = new Player(game, coords.x, coords.y, 'roamer', 'dudemaze');
        game.add.existing(player);
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    },

    randomizenextcells(cells)
    {
    	//  randomize the list of next cells to check to make it a bit more interesting
    	//  DEV:  only add code once the rest is tested so movement are more predictable until that time
    	return cells;
    },

    addrandmplayer: function() {

        // make sure we are not on top of a baddie or a cache (at least 5 away maybe)
        var c = converttomaveposition({x: Math.floor(Math.random() * mazedim.x),y: Math.floor(Math.random() * mazedim.y)}, m, 'player');
        this.addPlayer({x: c.x, y: c.y});      
        
        //  getthe camera rolling
 
        game.physics.p2.enable(player);

        game.camera.follow(baddies.children[0]);

    },

    getgoodieincell: function(cell)
    {

    	for(var i = 0; i< goodies.length; i++)
    	{
    		var g = goodies.children[i];
    		if(g.cellx == cell.cellx && g.celly == cell.celly)
    			return g;

    	}
    	return null;
    },

    addcaches: function(no, type) {

        // make sure they are not on top of a baddie (at least 5 away maybe)
        for (var i = 0; i < no; i++)
        {
        	var x = Math.floor(Math.random() * mazedim.x);
        	var y = Math.floor(Math.random() * mazedim.y);
            var c = converttomaveposition({x: x,y: y}, m, type);
            var b = addgoodie(type +  'maze', c.x, c.y, true, x , y);
        }

    },


    adddinos: function(no) {

        //  make sure they are all id different places
        for (var i = 0; i < no; i++)
        {
        	var x = Math.floor(Math.random() * mazedim.x);
        	var y = Math.floor(Math.random() * mazedim.y);
            //x=2;
            //y=2;
            var c = converttomaveposition({x: x,y: y}, m, 'baddie');
            var b = addbaddie('stegmaze', 'mazeroamer' , null, 'pusher', null, {start_y: c.y, end_y: c.y, start_x: c.x, end_x: c.x, vel_x: 0, vel_y: 0});
            

        
            b.cellx = x;
            b.celly = y;
            b.prevcellx = x;
            b.prevcelly = y;
        }

    },

	update: function() {

	
    

        game.physics.arcade.collide(baddies, cells, playState.enterCell, null, this);
	 
        hitPlatform = game.physics.arcade.collide(player, platforms);

        game.physics.arcade.collide(player, baddies);


	},

    getcell: function(x,y)
    {

    	for(var i = 0; i<cells.length; i++)
    	{
    		if (cells.children[i].cellx == x && cells.children[i].celly == y)
    			return cells.children[i];
		}

		return null;
    },

    formatcell: function(cell)
    {
		return '(' + cell.cellx + ',' +  cell.celly + ')';

    }

}