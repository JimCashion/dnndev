var playState = {

	 render: function() {

   
    },

    preload: function() {

	},

    create: function() {

        //  Set up the game items and layout here

        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        platforms.enableBody = true; 
        goodies = game.add.group();
        goodies.enableBody = true;
        baddies = game.add.group();
        baddies.enableBody = true;

        //  the ground
        ground = addledge( 'ground',  100, game.world.height - 32,  'static', 7/4, 1);
        
        //  Now let's create ledges (a contracting ledge)
        l1 = addledge( 'ground',  0, game.world.height - 132 ,  'static', 1.25, 1);
        l1.set_varsize({newminwidth: 380, newside: 'left'});  //  we will make it variable after pressing a button
       
        l2 = addledge( 'groundlight',  500, game.world.height - 132,  'soft_lower', .25, 1);
        l2.set_targety(game.world.height - 132 - 35);
        
        l3 = addledge( 'ground',  600, game.world.height - 132 ,  'static', .5, 1);


        l4 = addledge( 'ground',  100, 200 ,  'static', 1.75, 1);
        l4.set_varsize({newminwidth: 100, newside: 'both'}); 
        //l4.ledgetype = 'varsize';

        l5 = addledge( 'ground',  0, 350 ,  'static', 1.75, 1);
        l5.set_varsize({newminwidth: 100, newside: 'both'}); 

        l6 = addledge( 'ground',  0, 100 ,  'static', 1.75, 1);
        l6.set_varsize({newminwidth: 100, newside: 'both'}); 

        l7 = addledge( 'groundlight',  700, 100 ,  'soft_lower', .25, 1);
        l7.set_targety(-32);
        
       



        //  add a button

        b1 = game.add.sprite( game.world.width - 14, game.world.height - 32 - 60, 'buttonleft');
        b1.animations.add('red', [1], 10, true);
        b1.animations.add('green', [0], 10, true);
        b1.animations.play('red');
        game.physics.arcade.enable(b1);
        b1.body.immovable = true;

       
        //  now add some baddies
       
        addbaddie('steg_friendly', 'ledge', ground, 'pusher');
        addbaddie('steg_friendly', 'ledge', l5, 'pusher');
        addbaddie('steg_friendly', 'ledge', l6, 'pusher');
    
        //  and the score
        scoreText = game.add.text(game.world.width - 180, game.world.height - 34, 'Score: 0', { fontSize: '32px', fill: '#000' });

        //  latteral baddies if we want them
        for(var b=0; b<9;b++)
        {
        	if ((Math.floor(Math.random() * 3) == 0))
            {
	            var absco = {start_x: -64 - (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 10) + 1), start_y: 60 * b, end_x: 0, end_y:  60 * b};
	            var baddie = new Baddie(game, 0, 0, 'pusher', 'rd' + (b + 1) + 'r', null,  'absolute', null, absco);
	            baddies.add(baddie);
	            game.physics.arcade.enable(baddie);
	            baddie.body.velocity.x = 100;
	            baddie.body.immovable = true;
            }

        	if ((Math.floor(Math.random() * 3) == 0))
            {
	            var absco = {start_x: game.world.width - 64, start_y: 60 * b, end_x: game.world.width + Math.floor(Math.random() * 200), end_y:  60 * b};
	            var baddie = new Baddie(game, 0, 0, 'pusher', 'rd' + (b + 1) + 'l', null, 'absolute', null, absco);
	            baddie.x = game.world.width;
	            baddies.add(baddie);
	            game.physics.arcade.enable(baddie);
	            baddie.body.velocity.x = -100;
	            baddie.body.immovable = true;
            }
        }

        //  add some goodies
        for (var i = 0; i < 24; i++)
        {
             addgoodie('cache', i * 33, 0);
        }

        //  Now add the player (in front of everything else dinos)
        this.addPlayer();

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
        emitter.start(false, 5000, 100);

       
    },


	update: function() {

	 
      	//  Collide the player and the stars with the platforms
        hitPlatform = game.physics.arcade.collide(player, platforms, playState.headbutt, null, this);
                      

        //  Collide goodies with platforms
        game.physics.arcade.collide(goodies, platforms);

        //  Collide goodies with Baddies
        game.physics.arcade.collide(goodies, baddies);

        //  Collide goodies with goodies
        game.physics.arcade.collide(goodies, goodies);

        //  did the payer fall to the bottom of the game

        if(player.y + player.height == game.world.height)
        {
            player.kill();
            deathtype = 'fall';
            game.state.start('lose');
        }

        //  did the player press a button
        game.physics.arcade.overlap(player, b1, playState.pressbutton, null, this);

        
       

	},
 
    headbutt: function(player, sprite) {

       if (sprite.key == 'groundlight')
       {
            if (sprite.y < player.y )
            {
              //  alert(sprite.y - 5 + ' - ' + sprite.targety);
                if(sprite.y - 5 >= sprite.targety)
                    sprite.y -= 5;
                else
                    sprite.y = sprite.targety;
            }
        }
    },

     pressbutton: function (player, button) {

         if(button.frame==0)
         {
             button.animations.play('red');
             l1.ledgetype = 'static';
         }
         else
         {
             button.animations.play('green');
             l1.ledgetype = 'varsize';
         }

         player.x -= 1;
     },

    collectGoodie: function (player, star) {

        // Removes the star from the screen
        star.kill();

        //  add anther star randomly
        addgoodie('cache', Math.floor(Math.random() * 24) * 33, 0); 

        //  Add and update the score
        score += 1;
        scoreText.text = 'Score: ' + score;

        if(score >= winscore / 4)
        {
           
            l6.ledgetype = 'varsize';
        }

        if(score >= winscore / 2)
        {
           
            l4.ledgetype = 'varsize';
        }

        if(score >= winscore / 4 * 3)
        {
           
            l5.ledgetype = 'varsize';
        }

        if(score >= winscore)
        {
         
            game.state.start('win');
        }
    },

    collectBaddie: function (player, baddie) {


        //  Add and update the score
        if (baddie.baddietype == 'killer')
        {
            player.kill();
            game.state.start('lose');
        }
    },

    addPlayer: function() {
         // The player and its settings
        player = new Player(game, game.world.width / 2 - 300, game.world.height - 150);
        game.add.existing(player);
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    }
}