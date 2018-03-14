var loadState = {

	preload: function() {

		var loadingLabel = game.add.text(80, 150, 'loading...',
            { font: '30px Courier', fill: '#ffffff' });

        game.load.image('bullet', '../assets/bullet.png');
        game.load.image('enemyBullet', '../assets/enemy-bullet.png');
        // game.load.spritesheet('invader', '../assets/invader32x32x4.png', 32, 32);
        game.load.spritesheet('invader', '../assets/steginvader.png', 32, 27);  //  happy baddie
        game.load.spritesheet('spaceship', '../assets/spaceship.png', 45, 27);  //  happy baddie
        game.load.image('ship', '../assets/player.png');
        game.load.spritesheet('kaboom', '../assets/explode.png', 128, 128);
        game.load.image('starfield', '../assets/starfield.png');
        game.load.image('cachesmall', '../assets/cachesmall.png');    
	},

    create: function() {
		game.state.start('menu');
	}
	
}