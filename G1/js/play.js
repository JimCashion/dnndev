var playState = {

	 render: function() {

   
    },

    preload: function() {

	},

    create: function() {

        //  Set up the game items and layout here

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();
        platforms.enableBody = true;  //  We will enable physics for any object that is created in this group


        // Here we create the ground.
        addledge( 'ground',  0, game.world.height - 64,  'static', 2, 2);
        
        //  Now let's create ledges
        addledge( 'ground',  400, 400,  'static').set_varsize({newminwidth: 200, newside: 'left'});
        addledge( 'ground',  0, 250,  'static', 5/8, 1).set_varsize({newminwidth: 100, newside: 'right'});
        addledge( 'ground',  600, 80,  'static', 1/2, 1);
        addledge( 'ground',  400, 160,  'static', 3/8, 1).set_varsize({newminwidth: 100, newside: 'both'});;
        addledge( 'ground',  480, 250,  'static', 1/2, 1);

        
        //  now some goodies
        goodies = game.add.group();
        goodies.enableBody = true; //  We will enable physics for any object that is created in this group

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 24; i++)
        {
             addgoodie('cache', i * 33, 0);
        }
       
        //  now add some baddies
        baddies = game.add.group();

        addbaddie('steg_friendly', 'ledge', platforms.children[0], 'pusher');
        addbaddie('steg_angry', 'ledge', platforms.children[1],  'killer');
        addbaddie('steg', 'ledge', platforms.children[2],  'pusher');
        addbaddie('steg_angry', 'ledge', platforms.children[3], 'killer');
        addbaddie('steg_angry', 'ledge', platforms.children[4], 'killer');
        addbaddie('steg', 'ledge', platforms.children[5],  'pusher');

        //  Now add the player (in front of everything else dinos)
        this.addPlayer();

        //  and the score
        scoreText = game.add.text(16, game.world.height - 34, 'Score: 0', { fontSize: '32px', fill: '#000' });

        for(var b=0; b<9;b++)
        {
            var absco = {start_x: -64 - (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 10) + 1), start_y: 60 * b, end_x: 0, end_y:  60 * b};
            var baddie = new Baddie(game, 0, 0, 'killer', 'rd' + (b + 1) + 'r', null,  'absolute', null, absco);
            baddies.add(baddie);
            game.physics.arcade.enable(baddie);
            baddie.body.velocity.x = 100;
            baddie.body.immovable = true;

            var absco = {start_x: game.world.width - 64, start_y: 60 * b, end_x: game.world.width + Math.floor(Math.random() * 200), end_y:  60 * b};
            var baddie = new Baddie(game, 0, 0, 'killer', 'rd' + (b + 1) + 'l', null, 'absolute', null, absco);
            baddie.x = game.world.width;
            baddies.add(baddie);
            game.physics.arcade.enable(baddie);
            baddie.body.velocity.x = -100;
            baddie.body.immovable = true;

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
        emitter.start(false, 5000, 100);

       
    },


	update: function() {

	 
      	//  Collide the player and the stars with the platforms
        hitPlatform = game.physics.arcade.collide(player, platforms);

        //  Collide goodies with platforms
        game.physics.arcade.collide(goodies, platforms);

        //  Collide goodies with Baddies
        game.physics.arcade.collide(goodies, baddies);

        //  Collide goodies with goodies
        game.physics.arcade.collide(goodies, goodies);

	},

    collectGoodie: function (player, star) {

        // Removes the star from the screen
        star.kill();

        //  add anther star randomly
        addgoodie('cache', Math.floor(Math.random() * 24) * 33, 0); 

        //  Add and update the score
        score += 1;
        scoreText.text = 'Score: ' + score;

        if(score >= winscore)
        {
         
           postback('win');
        }
    },

    collectBaddie: function (player, baddie) {


        //  Add and update the score
        if (baddie.baddietype == 'killer')
        {
            player.kill();
            postback('lose');
        }
    },

    addPlayer: function() {
         // The player and its settings
        player = new Player(game, game.world.width / 2 - 200, game.world.height - 150);
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