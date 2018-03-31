//  Extended Player 'class'
Player = function (game, x, y, type, sprite) {

    this.objecttype = 'player';
    if (type != null)
    {

        if(sprite == null)
            Phaser.Sprite.call(this, game, x, y, 'dudesmall');
        else
            Phaser.Sprite.call(this, game, x, y, sprite);
        this.type = type;
    }
    else
    {
       
        Phaser.Sprite.call(this, game, x, y, 'dude');
        this.type = 'levelwalker';
    }

    this.cachecount = [];
    this.totalcellstext = '';
    this.cellx = 0;
    this.celly = 0

    this.cachecount.push({type: 'virt', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'trad', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'myst', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'mult', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'lett', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});    
  
   
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

    //  Control Player movement
    cursors = game.input.keyboard.createCursorKeys();
    if(pausegame)
    {
        this.body.velocity.x = 0;   
        this.body.velocity.y = 0;   
        return;
    }

    //  Reset the players velocity (movement)
    this.body.velocity.x = startvelocity_x;
    if (this.type != 'levelwalker')
    {
        this.body.velocity.y = startvelocity_y;

    }
    
    if (cursors.left.isDown || (game.input.pointer1.isDown && touchleft()))
    {
        //  Move to the left
        this.body.velocity.x = -1 * playerspeed;

        this.animations.play('left');
    }
    else 
    if (cursors.right.isDown || (game.input.pointer1.isDown && touchright()))
    {
        //  Move to the right
        this.body.velocity.x = playerspeed;

        this.animations.play('right');
    }
    else
    if (this.type == 'levelwalker')
    {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }
    
    if (this.type == 'roamer')
    {
	    if (cursors.up.isDown || (game.input.pointer1.isDown && touchup()))
	    {
	        //  Move up
	        this.body.velocity.y = -1 * playerspeed
 
	        //this.animations.play('right');
	    }
	    else 
	    if (cursors.down.isDown || (game.input.pointer1.isDown && touchdown()))
	    {
	        //  Move down
	        this.body.velocity.y = playerspeed;
 
	       // this.animations.play('right');
	    }
        if (cursors.left.isDown || (game.input.pointer1.isDown && touchleft()))
        {
            //  Move to the left
            this.body.velocity.x = -1 * playerspeed;

            this.animations.play('left');
        }
        else 
        if (cursors.right.isDown || (game.input.pointer1.isDown && touchright()))
        {
            //  Move to the right
            this.body.velocity.x = playerspeed;

            this.animations.play('right');
        }
	    else
	    {
	        //  Stand still
	        this.animations.stop();

	        this.frame = 4;
	    }
    }
     //Allow the player to jump if they are touching the ground.
    if (this.type == 'levelwalker')
    {
    	
        if ((cursors.up.isDown || (game.input.pointer1.isDown && touchup() ))
            && this.body.touching.down && hitPlatform)
        {
            this.body.velocity.y = -350;
        }
    }

    //  did we bounce off the pen?
    if(this.type=='roamer')
    	checkfences(this);

    //  Collide player with goodies I.E. score a point
    game.physics.arcade.overlap(player, goodies, playState.collectGoodie, null, this);

   
};

function touchup(){
 return (game.input.activePointer.y < player.y && 
 	    game.input.activePointer.x <  player.x + player.width + 10 &&
 	    game.input.activePointer.x >  player.x - 10);

}

function touchdown(){
 return (game.input.activePointer.y > player.y && 
 	    game.input.activePointer.x <  player.x + player.width + 10 &&
 	    game.input.activePointer.x >  player.x - 10);

}

function touchright(){
 return (game.input.activePointer.x > player.x + player.width + 10) ;

}

function touchleft(){
 return (game.input.activePointer.x < player.x - 10);

}


