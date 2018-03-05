var playState = {

	 render: function() {

   
    },

    preload: function() {

	},

    create: function() {

        //  Set up the game items and layout here

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky').scale.setTo(2,19);

         //  the pen
      //  pen = game.add.sprite(0, 400, 'ground').scale.setTo(.5,7);
        pen = game.add.sprite(0, 400, 'pen');
        pentext = game.add.text(16, game.world.height - 40, '0', { fontSize: '32px', fill: '#000' });
       
        gate1out = game.add.sprite(500, 200, 'pen');
        gate1out.scale.setTo(1,.25);
        gate1 = game.add.sprite(500, 250, 'pen');
        gate1.scale.setTo(1,.25);
        gate1in = game.add.sprite(500, 300, 'pen');
        gate1in.scale.setTo(1,.25);
        gate1text = game.add.text(gate1.x + gate1.width - 30, gate1.y + 1, gate1count, { fontSize: '16px', fill: '#000' });


        gate2out = game.add.sprite(150, 100, 'pen');
        gate2out.scale.setTo(.25,.75);
        gate2 = game.add.sprite(200, 100, 'pen');
        gate2.scale.setTo(.25,.75);
        gate2in = game.add.sprite(250, 100, 'pen');;
        gate2in.scale.setTo(.25,.75);
        gate2text = game.add.text(gate2.x, gate2.y + 7, gate2count, { fontSize: '16px', fill: '#000' });
        // fences = game.add.group();
        // f = game.add.sprite(0, 400, 'fence_h');
        // f.scale.setTo(2,1);
        // game.physics.arcade.enable(f);
        // fences.add(f);
        // fences.enableBody = true;
        //f.body.immovable = true;


        fences = game.add.group();
       
        //   f = new Fence(game, 0, 400, 'fence_h')
        //  alert(f.orientation);
        fences.add(new Fence(game, 200, 100, 'fence_h', {x: .5, y: 1}));
        fences.add(new Fence(game, 200, 250, 'fence_h', {x: .5, y: 1}));
        fences.add(new Fence(game, 200, 100, 'fence_h', {x: 0.05, y: 1}));
        fences.add(new Fence(game, 245, 100, 'fence_h', {x: 0.05, y: 1}));
        fences.add(new Fence(game, 200, 250, 'fence_h', {x: 0.05, y: 1}));
        fences.add(new Fence(game, 245, 250, 'fence_h', {x: 0.05, y: 1}));

        for(var i = 0; i < 10; i++)
        {
            fences.add(new Fence(game, 500, 250 + i*5, 'fence_h', {x: 0.05, y: 1}, 'v'));
        }
        fences.add(new Fence(game, 500, 250, 'fence_h', {x: 0.05, y: 1}, 'v'));
        fences.add(new Fence(game, 500, 295, 'fence_h', {x: 0.05, y: 1}, 'v'));
      
        for(var i = 0; i < 10; i++)
        {
            fences.add(new Fence(game, 695, 250 + i*5, 'fence_h', {x: 0.05, y: 1}, 'v'));
        }
        fences.add(new Fence(game, 695, 250, 'fence_h', {x: 0.05, y: 1}, 'v'));
        fences.add(new Fence(game, 695, 295, 'fence_h', {x: 0.05, y: 1}, 'v'));

       // fences.create().scale.setTo(2, 1);
      
      //  fences.create(new Fence(game, 0, 400, 'fence_h'));
        
        fences.add(new Fence(game, 0, 400, 'fence_h', {x: 2, y: 1}));
        
        for(var i = 0; i < 10; i++)
        {
            fences.add(new Fence(game, 200, 400 + i*5, 'fence_h', {x: 0.05, y: 1}, 'v'));
        }

        for(var i = 0; i < 10; i++)
        {
            fences.add(new Fence(game, 200, 550 + i*5, 'fence_h', {x: 0.05, y: 1}, 'v'));
        }
        // for(var i = 0; i < 20; i++)
        // {
        //      var f = fences.create(100, 100 + i*5, 'fence_h').scale.setTo(.05, 1);
        //      f.set_orientation('v');
        // }

        game.add.sprite(575, 300, 'arrow1').scale.setTo(1,0.5);
        game.add.sprite(250,150, 'arrow2').scale.setTo(0.5,1); //200, 475
        game.add.sprite(200,475, 'arrow3').scale.setTo(0.5,1); //300, 150

        //  The platforms group contains the ground add the 2 ledges we can jump on
        platforms = game.add.group();
        platforms.enableBody = true;  //  We will enable physics for any object that is created in this group


        // Here we create the ground.
        // addledge( 'ground',  0, game.world.height - 64,  'static', 2, 2);
        
        // //  Now let's create ledges
        // addledge( 'ground',  400, 400,  'static').set_varsize({newminwidth: 200, newside: 'left'});
        // addledge( 'ground',  0, 250,  'static', 5/8, 1).set_varsize({newminwidth: 100, newside: 'right'});
        // addledge( 'ground',  600, 80,  'static', 1/2, 1);
        // addledge( 'ground',  400, 160,  'static', 3/8, 1).set_varsize({newminwidth: 100, newside: 'both'});;
        // addledge( 'ground',  480, 250,  'static', 1/2, 1);

        
        //  now some goodies
         goodies = game.add.group();
        // goodies.enableBody = true; //  We will enable physics for any object that is created in this group

        // //  Here we'll create 12 of them evenly spaced apart
        // for (var i = 0; i < 24; i++)
        // {
        //      addgoodie('cache', i * 33, 0);
        // }
       
        //  now add some baddies
         baddies = game.add.group();  //  not really baddies but hey ho!!
         baddies.enableBody = true;

        
        if (debug) 
            baddiecount = 2;
         for (var i = 0; i < baddiecount; i++)
         {
            //addbaddie('stegsmall', 'roamer' , null, 'pusher', null, {start_y: y, end_y: y, start_x: x, end_x: x, vel_x: 0, vel_y: 0});
           var b = addbaddie('stegsmall', 'roamer' , null, 'pusher', null, {start_y: 0, end_y: 0, start_x: 0, end_x: 0, vel_x: 0, vel_y: 0});
           
           var newplace = {name: 'groundx', revert: 0};

           do
           {
               b.x = Math.floor(Math.random() * 700) + 50;
               b.y = Math.floor(Math.random() * 500) + 50;
               newplace = whereisdino(b);
           } while (newplace.name != 'ground');
         }
         
         //  now associate three other baddies with each baddie so they follow it if it bolts :)
         for (var i = 0; i < baddiecount; i++)
         {
            var b = baddies.children[i];
            var f = i;
            do
            {
                f = Math.floor(Math.random() * baddiecount);
                if (f != i)
                    b.followers[0] = baddies.children[f];
            } while (f == i );

            var g = i;
            do
            {
                g = Math.floor(Math.random() * baddiecount);
                if (g != i && g != f)
                    b.followers[1] = baddies.children[g];
            } while (g == i || g == f);

            var h = i;
            do
            {
                h = Math.floor(Math.random() * baddiecount);
                if (h != i && h != f && h != g) 
                    b.followers[2] = baddies.children[h];
            } while (h == i || h == f|| h == g);

         }


        // addbaddie('steg_angry', 'ledge', platforms.children[1],  'killer');
        // addbaddie('steg', 'ledge', platforms.children[2],  'pusher');}
        // addbaddie('steg_angry', 'ledge', platforms.children[3], 'killer');
        // addbaddie('steg_angry', 'ledge', platforms.children[4], 'killer');
        // addbaddie('steg', 'ledge', platforms.children[5],  'pusher');

        //  Now add the player (in front of everything else dinos)
        this.addPlayer();

        //  and the score
      //  scoreText = game.add.text(16, game.world.height - 34, 'Score: 0', { fontSize: '32px', fill: '#000' });

        // for(var b=0; b<9;b++)
        // {
        //     var absco = {start_x: -64 - (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 10) + 1), start_y: 60 * b, end_x: 0, end_y:  60 * b};
        //     var baddie = new Baddie(game, 0, 0, 'killer', 'rd' + (b + 1) + 'r', null,  'absolute', null, absco);
        //     baddies.add(baddie);
        //     game.physics.arcade.enable(baddie);
        //     baddie.body.velocity.x = 100;
        //     baddie.body.immovable = true;

        //     var absco = {start_x: game.world.width - 64, start_y: 60 * b, end_x: game.world.width + Math.floor(Math.random() * 200), end_y:  60 * b};
        //     var baddie = new Baddie(game, 0, 0, 'killer', 'rd' + (b + 1) + 'l', null, 'absolute', null, absco);
        //     baddie.x = game.world.width;
        //     baddies.add(baddie);
        //     game.physics.arcade.enable(baddie);
        //     baddie.body.velocity.x = -100;
        //     baddie.body.immovable = true;

        // }

        //  practice with an emitter

        //  Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        // emitter = game.add.emitter(game.world.centerX, 200, 200);

        // //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        // emitter.width = 800;

        // emitter.makeParticles('star');

        // emitter.minParticleSpeed.set(0, 300);
        // emitter.maxParticleSpeed.set(0, 400);

        // emitter.setRotation(360, 360);
        // emitter.setAlpha(0.3, 0.8);
        // emitter.setScale(0.5, 0.5, 1, 1);
        // emitter.gravity = -200;

        // //  false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        // //  The 5000 value is the lifespan of each particle before it's killed
        // emitter.start(false, 5000, 100);

        //  activate pen

        

    },

	update: function() {

	 
      	game.physics.arcade.collide(baddies, goodies);
        //  Collide goodies with platforms
        // game.physics.arcade.collide(goodies, platforms);

        // //  Collide goodies with Baddies
        // game.physics.arcade.collide(goodies, baddies);

        // //  Collide goodies with goodies
        // game.physics.arcade.collide(goodies, goodies);

	},

    addPlayer: function() {
         // The player and its settings
        player = new Player(game, game.world.width - 20, game.world.height - 20 - 500, 'roamer');
        game.add.existing(player);
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

       

        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    }
}