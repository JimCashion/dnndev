var playState = {


create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    this.createAliens();

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '40px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;


    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
},

addship:  function() {
    // Add a spaceship
        ship = game.add.sprite(0, 50,'spaceship');
        game.physics.arcade.enable(ship);
        ship.animations.add('move', [0, 1, 2, 3], 10, true);
        ship.animations.play('move');
        ship.body.velocity.x = 100;
},


createAliens: function  () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = aliens.create(xmargin + x * 48, ymargin + y * 50, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly_left', [ 0, 1], 20, true);
            alien.animations.add('fly_right', [ 3, 4], 20, true);
            alien.play('fly_left');

            alien.body.moves = false;
        }
    }

  
},

setupInvader: function  (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

},

descend: function () {
   // aliens.y += 10;
    for (var cnt = 0; cnt < aliens.length; cnt++)
    {
        aliens.children[cnt].y += 10;   
        if(!aliens_moving_left)
            aliens.children[cnt].play('fly_right');
        else
            aliens.children[cnt].play('fly_left');
    }

    alien_velocity = alien_velocity * -1;
    aliens_moving_left = !aliens_moving_left;
},

movealiens: function() {
    //  move all the aliens

    var boundary_hit = false;

    for (var x = 0; x < 10; x++)
    {
        for (var y = 0; y < 4; y++)
        {
            if(aliens.children[x*4 + y].alive)
            {   
                aliens.children[x*4 + y].x = aliens.children[x*4 + y].x + alien_velocity;
                if ((!aliens_moving_left && aliens.children[x*4 + y].x + aliens.children[x*4 + y].width > game.world.width - xmargin) ||
                    (aliens_moving_left && aliens.children[x*4 + y].x < xmargin))
                {
                    boundary_hit = true;
                }
            }
        }
    }

    if (boundary_hit)
        this.descend();
 },

 update: function () {

    if (aliens_moving)
        this.movealiens();

    //  Sc'\]]]]]]]]]]]]]]]]]]]]]]]]fvroll the background
    starfield.tilePosition.y += 2;

    if (player.alive)
    {
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
        }

        //  Firing?
        if (fireButton.isDown)
        {
            this.fireBullet();
        }

        if (game.time.now > firingTimer)
        {
            if (aliens_moving)
                this.enemyFires();
        }

        //  Run collision
        game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
        game.physics.arcade.overlap(bullets, ship, this.shiphit, null, this);
        game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(aliens, player, this.enemyHitsPlayer, null, this);
    }

},

render: function () {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

},

shiphit: function  (bullet, ship) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();

    //  Increase the score
    score += 200;
    scoreText.text = scoreString + score;
    shipscore += 1;

    if (shipscore == 10)
    {
        nextgamestate = 'win';
        this.restart();
        

    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(ship.body.x, ship.body.y);
    explosion.play('kaboom', 30, false, true);

},

collisionHandler: function  (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        aliens_moving = false;
        stateText.text = " Well Done you cleared them all. \n           Oh! didnt I tell you?\n         You have to shoot 10\n           spaceships to win.\n       So far you have shot "  + shipscore + "\n\n              Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        nextgamestate = 'cleared';
        game.input.onTap.addOnce(this.restart,this);
    }

},

enemyHitsPlayer: function  (player,bullet) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        aliens_moving = false;
        stateText.visible = true;

        //the "click to restart" handler
        nextgamestate = 'lose';
        game.input.onTap.addOnce(this.restart,this);
    }

},

enemyFires: function  () {


    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);
        enemyBullet.body.velocity.y = 100;
        enemyBullet.body.velocity.x = 0;
        //game.physics.arcade.moveToObject(enemyBullet,player,120);
        firingTimer = game.time.now + 2000;
    }

},

fireBullet: function  () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;

            bulletcount++;

            if (bulletcount == bulletmax)
            {
                bulletcount = 0;
                bulletmax = bulletmin;
                this.addship();
            }
        }
    }

},

resetBullet: function  (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

},

restart: function  () {
   


    game.state.start(nextgamestate);
}
}
