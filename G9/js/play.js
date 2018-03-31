var playState = {

	
	//  end game detection
	
	
	render: function() {

   
    },

    preload: function() {

	},

    create: function() {

    	currentcell = null;

        debugoffset = 0;
        bs = 10;  //  block size
        mazedim = {x: 15, y: 15};   //  4-*30 is good

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

        stungun = null;
        brainfreeze = null;

          //  add the player
        this.addrandmplayer();

        //  stun gun

        stungun = this.addStunGun();

        //  brainfreeze

        brainfreeze = this.addBrainFreeze();

        //  add some baddies
        this.adddinos(5);

        //  now add a goodie
        this.addcaches(1, 'trad');
        this.addcaches(1, 'myst');
        this.addcaches(1, 'virt');
		this.addcaches(1, 'mult');
		this.addcaches(1, 'lett');

		// Create Scores section
		styleh = { font: "30px Arial", fill: "#fff", 
		           align: "center", 
		           boundsAlignH: "center", 
		           boundsAlignV: "top", 
		           wordWrap: true, wordWrapWidth: 600 };
		stylehblack = { font: "30px Arial", fill: "#000", 
		           align: "center", 
		           boundsAlignH: "center", 
		           boundsAlignV: "top", 
		           wordWrap: true, wordWrapWidth: 600 };

		styledinoh = { font: "20px Arial", fill: "#fff", 
		               align: "left", 
		               boundsAlignH: "left", 
		               boundsAlignV: "top", 
		               wordWrap: true, wordWrapWidth: 600 };

		styledinod = { font: "12px Arial", fill: "#fff", 
		               align: "left", 
		               boundsAlignH: "left", 
		               boundsAlignV: "top", 
		               wordWrap: true, wordWrapWidth: 600 };
		styledname = { font: "12px Arial", fill: "#f55", 
		               align: "left", 
		               boundsAlignH: "left", 
		               boundsAlignV: "top", 
		               wordWrap: true, wordWrapWidth: 600 };

		 styleins = { font: "12px Arial", fill: "#000", 
		               align: "left", 
		               boundsAlignH: "left", 
		               boundsAlignV: "top", 
		               wordWrap: true, wordWrapWidth: 600 };

        tscore = game.add.text(0, 10, ' SCORES', style);
        tscore.setTextBounds(610, 10, 190, 40);

        var z = game.add.sprite(610, 0, 'hborder');
        z.scale.setTo(2,.25);
		z = game.add.sprite(610, 0, 'vborder');
        z.scale.setTo(.25,5);
        z = game.add.sprite(800, 0, 'vborder');
        z.scale.setTo(.25,5);
        z = game.add.sprite(610, 60, 'hborder');
        z.scale.setTo(2,.25);

		z = game.add.sprite(610, 140, 'hborder');
        z.scale.setTo(2,.25);

 		z = game.add.sprite(610, 132, 'cborder');
        z.scale.setTo(.5,.5);
		z = game.add.sprite(783, 132, 'cborder');
        z.scale.setTo(.5,.5);

        z = game.add.sprite(610, 52, 'cborder');
        z.scale.setTo(.5,.5);
		z = game.add.sprite(783, 52, 'cborder');
        z.scale.setTo(.5,.5);

        z = game.add.sprite(610, 0, 'cborder');
        z.scale.setTo(.5,.5);
        z = game.add.sprite(783, 0, 'cborder');
        z.scale.setTo(.5,.5);

        for(var i=0; i< baddies.length; i++)
        {
        	var baddie = baddies.children[i];
        	//var t = game.add.text(0, 0, 'Dino ' + (i + 1), styledinoh);
            //t.setTextBounds(620, 50 + i*60, 200, 25);
           
			var s = game.add.sprite(625, 160 + i*70, 'stegmaze');
			var sn = game.add.sprite(625 + 20, 160 + i*70 - 5, 'n' + i);
			
			z = game.add.sprite(610, 210 + i*70, 'hborder');
	        z.scale.setTo(2,.25);
			
		    for(var j = 0; j< baddie.cachecount.length; j++)
	        {
	        	baddie.cachecount[j].sprite = game.add.sprite(625 + (j+0) * 35, 190 + i*70, baddie.cachecount[j].type + 'maze'); 
	        	baddie.cachecount[j].sprite.scale.setTo(.75,.75);
	        	
			    baddie.cachecount[j].text = game.add.text(0, 0, baddie.cachecount[j].count, styledinod);
                baddie.cachecount[j].text.setTextBounds(642 + j * 35, 190 + i*70, 200, 25);
	        	
			}
       
            baddie.nametext = game.add.text(0, 0, dinonames[i], styledname);
            baddie.nametext.setTextBounds(690, 155 + i*70, 55,25);

			baddie.totalcellstext = game.add.text(0, 0, 'total: ' + (baddie.cachecount[0].count + baddie.cachecount[1].count + baddie.cachecount[2].count + baddie.cachecount[3].count + baddie.cachecount[4].count) , styledinod);
            baddie.totalcellstext.setTextBounds(695, 170 + i*70, 55,25);

			baddie.IQtext = game.add.text(0, 0, 'IQ: ' + baddie.IQ, styleins);
            baddie.IQtext.setTextBounds(750, 160 + i*70, 50,25);


	        z = game.add.sprite(610, 485, 'cborder');
	        z.scale.setTo(.5,.5);
	        z = game.add.sprite(783, 485, 'cborder');
	        z.scale.setTo(.5,.5);
        }

        //  now the players scores

        var s = game.add.sprite(625, 85, 'dudemaze');
		for(var j = 0; j< player.cachecount.length; j++)
        {
        	player.cachecount[j].sprite = game.add.sprite(625 + (j+0) * 35, 45 + 70, player.cachecount[j].type + 'maze'); 
        	player.cachecount[j].sprite.scale.setTo(.75,.75);
        	
		    player.cachecount[j].text = game.add.text(0, 0, player.cachecount[j].count, styledinod);
            player.cachecount[j].text.setTextBounds(642 + j * 35, 45 + 70, 200, 25);
        	
		}
		
		player.totalcellstext = game.add.text(0, 0, 'total: ' + (player.cachecount[0].count + player.cachecount[1].count + player.cachecount[2].count + player.cachecount[3].count + player.cachecount[4].count) , styledinod);
        player.totalcellstext.setTextBounds(695, 85, 55,25);


 		


		//  now lets get a dialog window ready for cache swapping
		playerbaddiedialog = game.add.sprite(-800,-800, 'dialog');
	    playerbaddiedialog.scale.setTo(5,2);
	    diagx = 50;
	    diagy = 200;

	    dialogtext = game.add.text(0, 0, "Player/Baddie Dialog", stylehblack);
        dialogtext.setTextBounds(50, 210, 500, 180);
        dialogtext.visible = false;

		dialoginstructions = game.add.text(0, 0, "Touch or click to continue", styleins);
        dialoginstructions.setTextBounds(90, 360, 320, 100);
        dialoginstructions.visible = false;


       
 		
			
       
       
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
		    	//  delete this
		    	var g = this.getgoodieincell(cell);
		    	if(g != null)
		    	{
		    		
		    	}

		        //cell.loadTexture('mazewall1', 0);
		        baddie.prevcellx = baddie.cellx;
		        baddie.prevcelly = baddie.celly;
		        baddie.cellx = cell.cellx;
		        baddie.celly = cell.celly;
		    	baddie.virgin = false;
		    	baddie.body.velocity.x = 0;
		    	baddie.body.velocity.y = 0;

				//  if we have been here before then lets use our memory

	    		var memorynextcells = baddie.cellmemory[cell.cellx * mazedim.x + cell.celly];
				if(memorynextcells != null)
				{
					baddie.nextcells = memorynextcells;
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
		       //baddie.cellmemory[baddie.cellx * mazedim.x + baddie.celly] = baddie.nextcells;

		    	//populate baddie info with cache distances
		       	baddie.targettype = '';
		       	baddie.targetsprite.loadTexture("maze");
		       	baddie.distancetotarget = 0;
				baddie.distanceToCaches = [];

				for(var i = 0; i<baddie.nextcells.length; i++)
		       	{
		       		var celltocheck = baddie.nextcells[i].newcell;
		       	
		       		if(baddie.nextcells[i].good)
		       		{
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
		       		
		       			this.checkcell(celltocheck, baddie, 'all', celltocheck, baddie.IQ)

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
					
		       	//  sort distance to caches

	   	        this.sortnextcells(baddie);

		      
				//  set this dono's target
			    var targetidx = this.settarget(baddie);

				if (targetidx != -9)
				{
					this.movebaddie(baddie, cell, baddie.distanceToCaches[targetidx].cell);
				}
				else
				{
					for(var i = 0; i<baddie.nextcells.length; i++)
			       	{
			       		if(baddie.nextcells[i].good)
			       		{
			       			this.movebaddie(baddie, cell, baddie.nextcells[i].newcell);
			       			break;
			       		}
			       	}
				}

				this.printdebug(dinfo);
			}

		    		
		
        }
    },
    
    settarget: function(baddie)
    {
    	//  set a target, but not if another dino already has it and its closer

		//  lets see if we can take precidence over another dino first 
    	for(var i = 0; i< baddie.distanceToCaches.length; i++)
    	{
    	
    		var tartype = baddie.distanceToCaches[i].type;
    		var tardist = baddie.distanceToCaches[i].distance;

    		var inspectedtypes = '';

			for(var j = 0; j<baddies.length; j++)
    		{
    			b = baddies.children[j];
                inspectedtypes += b.targettype;
    			if (b != baddie && b.targettype == tartype)
    			{

    				if (b.distancetotarget > tardist)
    				{
    					//  pinch the target
    					b.distancetotarget = 0;
    					b.targettype = '';
    					baddie.distancetotarget = tardist;
    					baddie.targettype = tartype;
    					//baddie.targetsprite.loadTexture(tartype + "maze");
    					this.settarget(b);
    					return i;
    				}
    			}
			}

            if (inspectedtypes.indexOf(tartype) == -1)
    		{
    			baddie.distancetotarget = tardist;
    			baddie.targettype = tartype;
    			//baddie.targetsprite.loadTexture("n" + 4);
    			return i;
    		}
	 	}
	 	return -9;
	},

    baddieincenterofcell: function(cell,baddie)
    {
    	if(baddie.mazespeed > 100)
    		return true;
    
     	if (Math.abs(baddie.x - (cell.x - 5)) <= 2  && Math.abs(baddie.y - (cell.y - 5)) <= 2)
    		return true;
    	else
    		return false;


    },

    addStunGun: function()
	{
		//  random  stungun
		var x = 0;
    	var y = 0;

		do 
		{
			x = Math.floor(Math.random() * mazedim.x);
    		y = Math.floor(Math.random() * mazedim.y);
    	}
		while (!this.isCellEmpty(this.getcell(x,y)));

	    c = converttomaveposition({x: x,y: y}, m, 'baddie');

		stungun = game.add.sprite(c.x, c.y, 'stungun'); 
        game.physics.arcade.enable(stungun);

        return stungun;
	},

	addBrainFreeze: function()
	{
		//  random braindrain
		var x = 0;
    	var y = 0;
		do 
		{
			x = Math.floor(Math.random() * mazedim.x);
    		y = Math.floor(Math.random() * mazedim.y);
    	}
		while (!this.isCellEmpty(this.getcell(x,y)));

    	
        var c = converttomaveposition({x: x,y: y}, m, 'baddie');

        brainfreeze = game.add.sprite(c.x, c.y,'braindrain'); 
       // brainfreeze.anchor.setTo(0, 0);
        game.physics.arcade.enable(brainfreeze);
 			
		return brainfreeze;
	},

    movebaddie: function(baddie, fromcell, tocell)

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

    checkcell: function(origcell, baddie, goodietype, nextcell, IQ)
    {
    	

    	//  new born
    	if(IQ == 0)
    	{
    		//  check for nobrainer
    		if(this.getgoodieincell(nextcell) != null)
    		{
    			if (goodietype == 'all' || goodietype == this.getgoodieincell(nextcell).goodietype)
    			{
    				// var found = false;
    				// for(var i = 0; i< baddie.distanceToCaches.length; i++)
    				// {
    				// 	if (baddie.distanceToCaches[i].type == this.getgoodieincell(nextcell).goodietype)
    				// 		found = true;
    				// }
    				// if (!found || found)
    				{
		    			baddie.distanceToCaches.push({cell: origcell, type: this.getgoodieincell(nextcell).goodietype, distance: baddie.IQ - IQ});
		    			//if (baddie.distanceToCaches.length == goodies.length)
		    		 	//	return true;
		    		}
	    		 }
	    		 else
	    		 	 return true;
    		}

    		//  DOH!!
    		return true;
    	}

	 	if (IQ >= 1)
    	{
    		//  check for nobrainer
    		if(this.getgoodieincell(nextcell) != null)
    		{
    			if (goodietype == 'all' || goodietype == this.getgoodieincell(nextcell).goodietype)
    			{
    				// var found = false;
    				// for(var i = 0; i< baddie.distanceToCaches.length; i++)
    				// {
    				// 	if (baddie.distanceToCaches[i].type == this.getgoodieincell(nextcell).goodietype)
    				// 		found = true;
    				// }
    				// if (!found || found)
    				{
		    			baddie.distanceToCaches.push({cell: origcell, type: this.getgoodieincell(nextcell).goodietype, distance: baddie.IQ - IQ});
		    			//if (baddie.distanceToCaches.length == goodies.length)
		    		 		//return true;
		    		}
	    		 }
	    		 else
	    		 	 return true;
    		}

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
    		{
    			if (goodietype == 'all' || goodietype == this.getgoodieincell(nextcell).goodietype)
    			{
    				// var found = false;
    				// for(var i = 0; i< baddie.distanceToCaches.length; i++)
    				// {
    				// 	if (baddie.distanceToCaches[i].type == this.getgoodieincell(nextcell).goodietype)
    				// 		found = true;
    				// }
    				// if (!found || found)
    				{
		    			baddie.distanceToCaches.push({cell: origcell, type: this.getgoodieincell(nextcell).goodietype, distance: baddie.IQ - IQ});
		    			//if (baddie.distanceToCaches.length == goodies.length)
		    		 	//	return true;
		    		}
	    		 }
	    		 else
	    		 	 return true;
    		}

    		var c = 0;

    		if (nextcell.exits.north)
    		{
    			//  check if the cell to the north is a deadend

    			var nc = this.getcell(nextcell.cellx, nextcell.celly - 1);
    			nc.exits.south = false;
    			nextcell.exits.north = false;
    			if (this.checkcell(origcell, baddie, goodietype, nc,IQ - 1))
    				c = c + 1;
    			nc.exits.south = true;    
    			nextcell.exits.north = true;		
    		}

			if (nextcell.exits.east)
    		{
    			//  check if the cell to the east is a deadend

    			var nc = this.getcell(nextcell.cellx + 1, nextcell.celly );
    			nc.exits.west = false;
    			nextcell.exits.east = false;
    			if (this.checkcell(origcell, baddie, goodietype, nc,IQ - 1))
    				c = c + 1;
    			nc.exits.west = true;
    			nextcell.exits.east = true;
    		}

    		if (nextcell.exits.south)
    		{
    			//  check if the cell to the south is a deadend

    			var nc = this.getcell(nextcell.cellx, nextcell.celly + 1);
    			nc.exits.north = false;
    			nextcell.exits.south = false;
    			if (this.checkcell(origcell, baddie, goodietype, nc,IQ - 1))
    				c = c + 1;
    			nc.exits.north = true;
    			nextcell.exits.south = true;
    		}

    		if (nextcell.exits.west)
    		{
    			//  check if the cell to the west is a deadend

    			var nc = this.getcell(nextcell.cellx - 1, nextcell.celly);
    			nc.exits.east = false;
    			nextcell.exits.west = false;
    			if (this.checkcell(origcell, baddie, goodietype, nc, IQ - 1))
    				c = c + 1;
    			nc.exits.east = true;
    			nextcell.exits.west = true;
    			
    		}
			
			//  so if all exits are single cell deadends then this cell is a 2 cell deadend
			if (c == 0)
    			return false;

    	}


    	return true;
    },

    printdebug: function(t) {

    	//document.getElementById('debugarea').innerHTML = t;
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

    
    sortnextcells(baddie)
    {
    	
    	for (var i = 0; i< baddie.distanceToCaches.length; i++)
    	{
			for (var j = 0; j< baddie.distanceToCaches.length - 1; j++)
	    	{
	    		if (baddie.distanceToCaches[j + 1].distance < baddie.distanceToCaches[j].distance)
	    		{

	    			var temp = baddie.distanceToCaches[j + 1];
	    			baddie.distanceToCaches[j + 1] = baddie.distanceToCaches[j];
	    			baddie.distanceToCaches[j] = temp;
	    		}
	    		
	    	}
    	}

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

	isCellEmpty: function(cell)
    {
    	//  check goodies
    	for(var i = 0; i< goodies.length; i++)
    	{

    		var g = goodies.children[i];
	    		if(g.cellx == cell.cellx && g.celly == cell.celly)
	    			return false;
    	}

		//  check baddies
    	for(var i = 0; i< baddies.length; i++)
    	{

    		var g = baddies.children[i];
	    		if(g.cellx == cell.cellx && g.celly == cell.celly)
	    			return false;
    	}

    	//  check player

     	if (Math.abs(player.x - (cell.x - 5)) <= 2  && Math.abs(player.y - (cell.y - 5)) <= 2)
    		return false;

    	//  check stungun

    	if(stungun != null)
    	{
			if (Math.abs(stungun.x - (cell.x - 5)) <= 2  && Math.abs(stungun.y - (cell.y - 5)) <= 2)
	    		return false;
		}

    	//check brainfreeze

    	if(brainfreeze != null)
    	{
			if (Math.abs(brainfreeze.x - (cell.x - 5)) <= 2  && Math.abs(brainfreeze.y - (cell.y - 5)) <= 2)
	    		return false;
		}

    	return true;
    },

    addcaches: function(no, type) {

        // make sure they are not on top of a baddie (at least 5 away maybe)
        for (var i = 0; i < no; i++)
        {
        	var x = 0;
	    	var y = 0;
	        do 
			{
				x = Math.floor(Math.random() * mazedim.x);
	    		y = Math.floor(Math.random() * mazedim.y);
	    	}
			while (!this.isCellEmpty(this.getcell(x,y)));

            var c = converttomaveposition({x: x,y: y}, m, type);
            var b = addgoodie(type +  'maze', c.x, c.y, true, x , y);
            game.physics.arcade.enable(b);
        }

    },


    adddinos: function(no) {

        //  make sure they are all in different places
        for (var i = 0; i < no; i++)
        {

        	var x = 0;
        	var y = 0;

			do 
			{
   				x = Math.floor(Math.random() * mazedim.x);
        		y = Math.floor(Math.random() * mazedim.y);
        	}
			while (!this.isCellEmpty(this.getcell(x,y)));

			

            var c = converttomaveposition({x: x,y: y}, m, 'baddie');
            var b = addbaddie('stegmaze', 'mazeroamer' , null, 'pusher', null, {start_y: c.y, end_y: c.y, start_x: c.x, end_x: c.x, vel_x: 0, vel_y: 0});
            
            //b.targetsprite.loadTexture("mazewall1");
        
            b.cellx = x;
            b.celly = y;
            b.prevcellx = x;
            b.prevcelly = y;
            b.dno = i;

            //  Make "The Steg" Quick and intelligent

            if (b.dno == 0)
            {
            	b.mazespeed = 100;
            	b.IQ = 50;
            }

            //  and "Dippy" a little Dippy and slow

            if (b.dno == 3)
            {
            	b.mazespeed = 50;
            	b.IQ = 0;
            }
        }

    },


	checkForEndOfGame: function()
	{
		var total = 0;
		var targetsmet = 0;
		for(var i = 0; i< player.cachecount.length; i++)
		{
			total += player.cachecount[i].count;
			if (player.cachecount[i].count >= cachetypetarget)
				targetsmet += 1;
		}


		if(targetsmet == 5 || total >= cachetotaltarget)
		{
			//  the player won!!
			winningdino = -1;
			postback('win');
		}

		for (var d = 0; d< baddies.length; d++)
		{
			var total = 0;
			var targetsmet = 0;
			var dino = baddies.children[d];

			for(var i = 0; i< dino.cachecount.length; i++)
			{
				total += dino.cachecount[i].count;
				if (dino.cachecount[i].count >= cachetypetarget)
					targetsmet += 1;
			}


			if(targetsmet == 5 || total >= cachetotaltarget)
			{
				//  the player won!!
				winningdino = d;
				postback('lose');
			}
		}

	},

	update: function() {
		
		this.checkForEndOfGame();

		//brainfreeze.angle += 1;

		if(pausegame)
	    {
	        //  do we have any swaps going on?

	        var activecountright = 0;
	      
	        for (var i = 0; i<torightcaches.length; i++)
			{
				if (torightcaches[i] == null)
					continue;
				activecountright += 1;
				if(torightcaches[i].sprite.body.velocity.y < 0 && torightcaches[i].sprite.y <= diagy + 40)
				{
					torightcaches[i].sprite.body.velocity.y = 0;
					torightcaches[i].sprite.body.velocity.x = 200;
				}
				
				if(torightcaches[i].sprite.body.velocity.y > 0 && torightcaches[i].sprite.y >= diagy + 126)
				{
					//  finally got there	
					torightcaches[i].sprite.body.velocity.y = 0;
					torightcaches[i].sprite.body.velocity.x = 0;
					torightcaches[i].cc.count = torightcaches[i].cc.count + 1;
					torightcaches[i].sprite.kill();
                    torightcaches[i].cc.text.text = torightcaches[i].cc.count;
					torightcaches[i].cc.textdiag.text = torightcaches[i].cc.count;
	 			    torightcaches[i].obj.totalcellstext.text = 'total: ' + (torightcaches[i].obj.cachecount[0].count + torightcaches[i].obj.cachecount[1].count + torightcaches[i].obj.cachecount[2].count + torightcaches[i].obj.cachecount[3].count + torightcaches[i].obj.cachecount[4].count);
            		torightcaches[i] = null;
            		continue;
				}
				
				if(torightcaches[i].sprite.body.velocity.x > 0 && torightcaches[i].sprite.x >= torightcaches[i].targetx)
				{
					torightcaches[i].sprite.body.velocity.y = 100;
					torightcaches[i].sprite.body.velocity.x = 0;
				}

			}

			var activecountleft = 0;
			for (var i = 0; i<toleftcaches.length; i++)
			{
				if (toleftcaches[i] == null)
					continue;
				activecountleft += 1;

				if(toleftcaches[i].sprite.body.velocity.y < 0 && toleftcaches[i].sprite.y <= diagy + 70)
				{
					toleftcaches[i].sprite.body.velocity.y = 0;
					toleftcaches[i].sprite.body.velocity.x = -200;
				}
				
				if(toleftcaches[i].sprite.body.velocity.y > 0 && toleftcaches[i].sprite.y >= diagy + 126)
				{
					//  finally got there
					toleftcaches[i].sprite.body.velocity.y = 0;
					toleftcaches[i].sprite.body.velocity.x = 0;
					toleftcaches[i].cc.count = toleftcaches[i].cc.count + 1;
					toleftcaches[i].sprite.kill();
					toleftcaches[i].cc.text.text = toleftcaches[i].cc.count;
					toleftcaches[i].cc.textdiag.text = toleftcaches[i].cc.count;
	 			    toleftcaches[i].obj.totalcellstext.text = 'total: ' + (toleftcaches[i].obj.cachecount[0].count + toleftcaches[i].obj.cachecount[1].count + toleftcaches[i].obj.cachecount[2].count + toleftcaches[i].obj.cachecount[3].count + toleftcaches[i].obj.cachecount[4].count);
            		toleftcaches[i] = null;
            		continue;
				}
				
				if(toleftcaches[i].sprite.body.velocity.x < 0 && toleftcaches[i].sprite.x <= toleftcaches[i].targetx)
				{
					toleftcaches[i].sprite.body.velocity.y = 100;
					toleftcaches[i].sprite.body.velocity.x = 0;
				}
		    }

    	    if(activecountright == 0 && activecountleft == 0 )
		    {
		    	//  we have finsihed moving caches so allow continue processing
		    	dialoginstructions.visible = true;

		    //jim	 game.input.onTap.addOnce(function () {           
	        
					dialogtext.visible = false;
					dialoginstructions.visible = false;
					playerbaddiedialog.x = -800;
				    playerbaddiedialog.y = -800;
		        	pausegame = false;
		        	if (psf != null) psf.kill();
		        	if (dsf != null) dsf.kill();
		        	if (snf != null) snf.kill();
		        	if (pst != null) pst.kill();
		        	if (dst != null) dst.kill();
		        	if (snt != null) snt.kill();
		        	
		        	for(var i = 0; i<baddies.length; i++)
					{
						baddies.children[i].body.velocity.x = baddies.children[i].savedvelocityx;
			    		baddies.children[i].body.velocity.y = baddies.children[i].savedvelocityy;

					}

					for(var j = 0; j< player.cachecount.length; j++)
		        	{
		        		if (player.cachecount[j].textdiag != null)
		        		{
			        		player.cachecount[j].textdiag.kill();
							player.cachecount[j].textdiag = null;
	                        player.cachecount[j].spritediag.kill();
							player.cachecount[j].spritediag = null;
						}
		        	}
					
					for (var k = 0; k<baddies.length; k++)
					{
						for(var j = 0; j< baddies.children[k].cachecount.length; j++)
			        	{
			        		if(baddies.children[k].cachecount[j].textdiag != null)
			        		{
			        			baddies.children[k].cachecount[j].textdiag.kill();
								baddies.children[k].cachecount[j].textdiag = null;
								baddies.children[k].cachecount[j].spritediag.kill();
								baddies.children[k].cachecount[j].spritediag = null;
							}
			        	}
			        }

					//  set an interval before this can happen again
						t = new Date();
						t.setSeconds(t.getSeconds() + 5);
		   //jim     });

		    }


	        return;
	    }

	    var now = new Date();
    
    	var stunnedbaddies = 0;
		for(var i = 0; i<baddies.length; i++)
		{
			baddies.children[i].targetsprite.loadTexture("n" + i);
            baddies.children[i].targetsprite.x = baddies.children[i].x + baddies.children[i].width - 10;
            baddies.children[i].targetsprite.y = baddies.children[i].y - 5;

            if(now > baddies.children[i].timeforIQIncrease)
            {
            	if (baddies.children[i].dno != 3 || (baddies.children[i].dno == 3 && Math.floor(Math.random() * 2) == 1))
            		baddies.children[i].IQ += 1;
            	baddies.children[i].timeforIQIncrease = new Date();
    			baddies.children[i].timeforIQIncrease.setSeconds(baddies.children[i].timeforIQIncrease.getSeconds() + 5);
    			baddies.children[i].IQtext.text = 'IQ: ' + baddies.children[i].IQ;
            }

            if(baddies.children[i].stunned && (now > baddies.children[i].stunnedendtime))
            {
                baddies.children[i].body.velocity.x = baddies.children[i].stunnedvelocityx;
				baddies.children[i].body.velocity.y = baddies.children[i].stunnedvelocityy;
				baddies.children[i].stunned = false;
				
			}

            if(baddies.children[i].stunned)
				stunnedbaddies += 1;
		}

		if (stunactive && stunnedbaddies == 0)
		{
			stunactive = false;
		}

        game.physics.arcade.collide(baddies, cells, playState.enterCell, null, this);

        game.physics.arcade.overlap(baddies, goodies, playState.baddiefoundcache, null, this);
	 
        hitPlatform = game.physics.arcade.collide(player, platforms);
       
        game.physics.arcade.collide(player, goodies, playState.playerfoundcache, null, this);

		game.physics.arcade.overlap(player, baddies, playState.baddiehitplayer, null, this);

		game.physics.arcade.overlap(baddies, baddies, playState.baddiehitbaddie, null, this);

		game.physics.arcade.overlap(player, brainfreeze, playState.performbrainfreeze, null, this);

		game.physics.arcade.overlap(player, stungun, playState.performstun, null, this);

		dinfo = '';
		for(var i=0; i<baddies.length;i++)
        {
        	if(baddies.children[i].stunned)
        	{
	        	var timeleft = '' + (baddies.children[i].stunnedendtime - new Date()) / 1000;
				var timeleft1 = timeleft.substring(0,2);
				if (timeleft1.substring(1,2) == '.')
					timeleft1 = timeleft1.substring(0,1);
	    		dinfo += (i + 1) + ' - ' + baddies.children[i].stunned + ' - ' + timeleft1 + ' - ' + timeleft + nl;

	    		baddies.children[i].totalcellstext.text = '**' + timeleft1 + '**';
	    		baddies.children[i].IQtext.visible = false;
	    		
    		}
    		else
    		{
    			baddies.children[i].IQtext.visible = true;
    		    baddies.children[i].totalcellstext.text = 'total: ' + (baddies.children[i].cachecount[0].count + baddies.children[i].cachecount[1].count + baddies.children[i].cachecount[2].count + baddies.children[i].cachecount[3].count + baddies.children[i].cachecount[4].count);
            
    		}
    	}

        this.printdebug(dinfo);

	},

	performbrainfreeze: function (player, bf) 
	{
		for (var i=0; i<baddies.length; i++)
		{
			baddies.children[i].IQ -= Math.floor(Math.random() * 5) + 5;
			if(baddies.children[i].IQ < 0)
				baddies.children[i].IQ = 0;
			baddies.children[i].IQtext.text = 'IQ: ' + baddies.children[i].IQ;

		
		}
		//  relocate braindrain
		var x = 0;
    	var y = 0;
        do 
		{
			x = Math.floor(Math.random() * mazedim.x);
    		y = Math.floor(Math.random() * mazedim.y);
    	}
		while (!this.isCellEmpty(this.getcell(x,y)));

    	var y = Math.floor(Math.random() * mazedim.y);
        var c = converttomaveposition({x: x,y: y}, m, 'baddie');

        brainfreeze.x = c.x;
        brainfreeze.y = c.y;

	
	},



	performstun: function (player, stun) 
	{
		if(pausegame)
			return;

		if(stunactive)
			return;

		for (var i=0; i<baddies.length; i++)
		{
			baddies.children[i].stunnedvelocityx = baddies.children[i].body.velocity.x;
			baddies.children[i].stunnedvelocityy = baddies.children[i].body.velocity.y;
			baddies.children[i].body.velocity.x = 0;
			baddies.children[i].body.velocity.y = 0;
			baddies.children[i].stunnedendtime = new Date();
			baddies.children[i].stunnedendtime.setSeconds(baddies.children[i].stunnedendtime.getSeconds() + (Math.floor(Math.random() * 10) + 10));
			baddies.children[i].stunned = true;

		}
		//  relocate stungun
		var x = 0;
    	var y = 0;
        do 
		{
			x = Math.floor(Math.random() * mazedim.x);
    		y = Math.floor(Math.random() * mazedim.y);
    	}
		while (!this.isCellEmpty(this.getcell(x,y)));



        var c = converttomaveposition({x: x,y: y}, m, 'baddie');

        stungun.x = c.x;
        stungun.y = c.y;
		stunactive = true;
	},

	showdiag: function(from, to, title)
	{
		playerbaddiedialog.x = diagx;
		playerbaddiedialog.y = diagy;
		dialogtext.text = title;
 		dialogtext.visible = true;
 		dialoginstructions.visible = false;
		pausegame = true;
		    	
				
		for(var i = 0; i<baddies.length; i++)
		{
			baddies.children[i].savedvelocityx = baddies.children[i].body.velocity.x;
    		baddies.children[i].savedvelocityy = baddies.children[i].body.velocity.y;
    		baddies.children[i].body.velocity.x = 0;
    		baddies.children[i].body.velocity.y = 0;
		}


 		if(from.objecttype == 'player')
     	{
			psf = game.add.sprite(diagx + 50, diagy + 85, 'dudemaze');
			psf.scale.setTo(2,2);
		}
		else
		{
			dsf = game.add.sprite(diagx + 50, diagy + 85, 'stegmaze');
			dsf.animations.frame = 3;
			dsf.scale.setTo(2,2);
			snf = game.add.sprite(dsf.x + dsf.width, dsf.y - 5, 'm' + from.dno);

		}

		//  some collision score stuff

        for(var j = 0; j< from.cachecount.length; j++)
        {
        	if(from.cachecount[j].spritediag == null)
        	{
	        	from.cachecount[j].spritediag = game.add.sprite(diagx + 50 + (j+0) * 35, diagy + 125, from.cachecount[j].type + 'maze'); 
	        	from.cachecount[j].spritediag.scale.setTo(.75,.75);
	        }
        	else
        	{
				from.cachecount[j].spritediag.visible = true;
			}

        	if(from.cachecount[j].textdiag == null)
        	{
			    from.cachecount[j].textdiag = game.add.text(0, 0, from.cachecount[j].count, styleins);
	            from.cachecount[j].textdiag.setTextBounds(diagx + 67 + (j+0) * 35, diagy + 125, 200, 25);
        	}
        	else
			{
				from.cachecount[j].textdiag.visible = true;
				from.cachecount[j].textdiag.text = from.cachecount[j].count;
			}

		}

		if(to.objecttype == 'player')
     	{
			pst = game.add.sprite(diagx + 410, diagy + 85, 'dudemaze');
			pst.scale.setTo(2,2);
		}
		else
		{
			dst = game.add.sprite(diagx + 410, diagy + 85, 'stegmaze');
			dst.animations.frame = 3;
			dst.scale.setTo(2,2);
			snt = game.add.sprite(dst.x + dst.width, dst.y - 5, 'm' + to.dno);

		}

		for(var j = 0; j< to.cachecount.length; j++)
        {
        	if(to.cachecount[j].spritediag == null)
        	{
	        	to.cachecount[j].spritediag = game.add.sprite(diagx + 290 + (j+0) * 35, diagy + 125, to.cachecount[j].type + 'maze'); 
	        	to.cachecount[j].spritediag.scale.setTo(.75,.75);
        	}
        	else
        	{
				to.cachecount[j].spritediag.visible = true;
			}
        	
        	if(to.cachecount[j].textdiag == null)
        	{
			    to.cachecount[j].textdiag = game.add.text(0, 0, to.cachecount[j].count, styleins);
	            to.cachecount[j].textdiag.setTextBounds(diagx + 307 + (j+0) * 35, diagy + 125, 200, 25);
        	}
        	else
			{
				to.cachecount[j].textdiag.visible = true;
				to.cachecount[j].textdiag.text = to.cachecount[j].count;
			}

		}
	},

	baddiehitplayer: function (player, baddie) {

		if(stunactive)
			return;
    	if(!pausegame)
    	{
    		now = new Date();
    		if(now > t)
    		{
		  //   	pausegame = true;
		  //   	for(var i = 0; i<baddies.length; i++)
				// {
				// 	baddies.children[i].savedvelocityx = baddies.children[i].body.velocity.x;
		  //   		baddies.children[i].savedvelocityy = baddies.children[i].body.velocity.y;
		  //   		baddies.children[i].body.velocity.x = 0;
		  //   		baddies.children[i].body.velocity.y = 0;
				// }

				this.swapcaches("playerbaddie", player, baddie);
			}
		}
	},

	swapcaches: function(mode, from, to) 
	{
		//  swap/pinch some caches
     
     	

		
		//  Phew, thats everything drawn, now lets decide what to do :o)

		this.dotheswap(from, to);

	},

	dotheswap: function(from, to)
	{
		torightcaches = [];
		toleftcaches = [];
		var showing =false;

		if(from.objecttype == 'player')
		{
			//  a one way transfer

			var r = Math.floor(Math.random() * 2);
		
			if ((r == 1 && to.dno != 3) || to.dno == 0)  //  mugged if this is The Steg, and not if it is Dippy
			{
				//  player to baddie
				dialogtext.text = "Oh Noooo!!!";

				for(var i = 0; i< from.cachecount.length; i++)
				{
					if(from.cachecount[i].count >= 1 && Math.floor(Math.random() * 2) == 1)
					{
						// display diaglog if not already
					
						if(!showing)
						{
							if (to.dno != 0)
								this.showdiag(from, to, 'Hand over the caches');
							else
								this.showdiag(from, to, '** Caught by The Steg **');
							

							showing=true;
						}
						//  give up the cache :o(

						var s = game.add.sprite(from.cachecount[i].spritediag.x, from.cachecount[i].spritediag.y - 50, from.cachecount[i].type + 'maze'); 
	                    s.scale.setTo(.75,.75);
	                    game.physics.arcade.enable(s);

	                    torightcaches.push({obj: to, cc: to.cachecount[i], spritetype: from.cachecount[i].type, sprite: s, velocity: 1, targetx: diagx + 290 + (i+0) * 35});
	               
						from.cachecount[i].count = from.cachecount[i].count - 1;
						from.cachecount[i].textdiag.text = from.cachecount[i].count;
		                from.cachecount[i].text.text = from.cachecount[i].count;
		 				from.totalcellstext.text = 'total: ' + (from.cachecount[0].count + from.cachecount[1].count + from.cachecount[2].count + from.cachecount[3].count + from.cachecount[4].count);
            		}
				}
			}
			else
			{
				//baddies to player
				dialogtext.text = "Yippeeeee!!";

				for(var i = 0; i< to.cachecount.length; i++)
				{
					var rn =0;

					//  make Dippy give away slightly less caches to avoid over exploitation
					if (to.dno == 3)
						rn = Math.floor(Math.random() * 5);
					else
						rn = Math.floor(Math.random() * 2);
						
					if(to.cachecount[i].count >= 1 && rn == 1)
					{
						//  give up the cache :o(
						// display diaglog if not already
						
						if(!showing)
						{
							if(to.dno != 3)
								this.showdiag(from, to, "Here's a little help");
							else
								this.showdiag(from, to, '** ' + dinonames[3] + ' helps you out **');
							showing=true;
						}
						
						var s = game.add.sprite(to.cachecount[i].spritediag.x, to.cachecount[i].spritediag.y, to.cachecount[i].type + 'maze'); 
	                    s.scale.setTo(.75,.75);
	                    game.physics.arcade.enable(s);
 						
	                    toleftcaches.push({obj: from, cc: from.cachecount[i], spritetype: to.cachecount[i].type, sprite: s, velocity: 1, targetx: diagx + 50 + (i+0) * 35});
						
						to.cachecount[i].count = to.cachecount[i].count - 1;
						to.cachecount[i].textdiag.text = to.cachecount[i].count;
	                    to.cachecount[i].text.text = to.cachecount[i].count;
	 					to.totalcellstext.text = 'total: ' + (to.cachecount[0].count + to.cachecount[1].count + to.cachecount[2].count + to.cachecount[3].count + to.cachecount[4].count);
            		}
				}
			}
		}
		else
		{
			// two baddies, so share out the caches, OR, jusr transfer extra caches


			for(var i = 0; i< from.cachecount.length; i++)  //  doesnt matter which, length will be the same
			{
				var cachedelta = from.cachecount[i].count - to.cachecount[i].count;
				
				if (cachedelta > 0)
				{
					var transfercount = Math.floor(Math.abs(cachedelta) /2);
					
					

					if(transfercount != 0)
					{
						// display diaglog if not alreadt
						if(!showing)
						{
							this.showdiag(from, to, 'Lets Share Caches');
							showing=true;
						}

						for(var j = 0; j<transfercount; j++)
						{
							var s = game.add.sprite(from.cachecount[i].spritediag.x, from.cachecount[i].spritediag.y, from.cachecount[i].type + 'maze'); 
		                    s.scale.setTo(.75,.75);
		                    game.physics.arcade.enable(s);
		                    torightcaches.push({obj: to, cc: to.cachecount[i], spritetype: from.cachecount[i].type, sprite: s, velocity: j + 1, targetx: diagx + 290 + (i+0) * 35});
		                }

		                from.cachecount[i].count = from.cachecount[i].count - transfercount;
		                from.cachecount[i].textdiag.text = from.cachecount[i].count;
                        from.cachecount[i].text.text = from.cachecount[i].count;
		 				from.totalcellstext.text = 'total: ' + (from.cachecount[0].count + from.cachecount[1].count + from.cachecount[2].count + from.cachecount[3].count + from.cachecount[4].count);
            		}
				}
				else
				if (cachedelta < 0)
				{
					var transfercount = Math.floor(Math.abs(cachedelta) /2);

					if(transfercount != 0)
					{
						// display diaglog if not alreadt
						
						for(var j = 0; j<transfercount; j++)
						{
							if(!showing)
							{
								this.showdiag(from, to, 'Lets Share Caches');
								showing=true;
							}

							var s = game.add.sprite(to.cachecount[i].spritediag.x, to.cachecount[i].spritediag.y, to.cachecount[i].type + 'maze'); 
		                    s.scale.setTo(.75,.75);
		                    game.physics.arcade.enable(s);
 							toleftcaches.push({obj: from, cc: from.cachecount[i], spritetype: to.cachecount[i].type, sprite: s, velocity: j + 1, targetx: diagx + 50 + (i+0) * 35});
						}

						to.cachecount[i].count = to.cachecount[i].count - transfercount;
						to.cachecount[i].textdiag.text = to.cachecount[i].count;
                        to.cachecount[i].text.text = to.cachecount[i].count;
	 					to.totalcellstext.text = 'total: ' + (to.cachecount[0].count + to.cachecount[1].count + to.cachecount[2].count + to.cachecount[3].count + to.cachecount[4].count);
            		
            		}
				}

			}

		}

		//  now start the moves

		for (var i = 0; i<torightcaches.length; i++)
		{
			torightcaches[i].sprite.body.velocity.y = -1 * 100 * torightcaches[i].velocity;
		}

		for (var i = 0; i<toleftcaches.length; i++)
		{
			toleftcaches[i].sprite.body.velocity.y =  -1 * 100 * toleftcaches[i].velocity;;
	    }

	},

	baddiehitbaddie: function (baddie1, baddie2) {


    	if (baddie1 == baddie2)
    		return;
		if(stunactive)
			return;

		if(!pausegame)
    	{
    		now = new Date();
    		if(now > t)
    		{
		    	
		 		this.swapcaches("baddiebaddie", baddie2, baddie1);

			}
		}

	},

    baddiefoundcache: function (baddie, goodie) {

    	//  increase the cache cound for this baddie
    	var updatedcount = false;

        for(var i = 0; i< baddie.cachecount.length; i++)
        {
        	if (baddie.cachecount[i].type == goodie.goodietype)
        	{
				updatedcount = true;
				baddie.cachecount[i].count = baddie.cachecount[i].count + 1;
        	}
		}

		if(!updatedcount)
			baddie.cachecount.push({type: goodie.goodietype, count: 1});
		

        // kill and reinstate the cache

    	goodie.kill();
    	goodies.remove(goodie);
        this.addcaches(1,goodie.goodietype);

        //  clear all baddies memory and target

        for(var i = 0; i< baddies.length; i++)
        {
        	baddies.children[i].cellmemory = [];
        	baddies.children[i].targettype = '';

         	for(var j = 0; j< baddies.children[i].cachecount.length; j++)
		    {
		        baddies.children[i].cachecount[j].text.text = baddies.children[i].cachecount[j].count;
		    }
		    baddies.children[i].totalcellstext.text = 'total: ' + (baddies.children[i].cachecount[0].count + baddies.children[i].cachecount[1].count + baddies.children[i].cachecount[2].count + baddies.children[i].cachecount[3].count + baddies.children[i].cachecount[4].count);
            
		 }

    },

	playerfoundcache: function (player, goodie) {

    	//  increase the cache cound for this baddie
    	var updatedcount = false;

        for(var i = 0; i< player.cachecount.length; i++)
        {
        	if (player.cachecount[i].type == goodie.goodietype)
        	{
				updatedcount = true;
				player.cachecount[i].count = player.cachecount[i].count + 1;
        	}
		}

		if(!updatedcount)
			player.cachecount.push({type: goodie.goodietype, count: 1});
		
        // kill and reinstate the cache

    	goodie.kill();
    	goodies.remove(goodie);
        this.addcaches(1,goodie.goodietype);

      	for(var j = 0; j< player.cachecount.length; j++)
	    {
	        player.cachecount[j].text.text = player.cachecount[j].count;
	    }
	    player.totalcellstext.text = 'total: ' + (player.cachecount[0].count + player.cachecount[1].count + player.cachecount[2].count + player.cachecount[3].count + player.cachecount[4].count);
            
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