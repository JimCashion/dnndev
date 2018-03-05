var loadState = {

	preload: function() {

		var loadingLabel = game.add.text(80, 150, 'loading...',
            { font: '30px Courier', fill: '#ffffff' });

        game.load.image('sky', '../assets/sky.png');
       
        game.load.image('ground', '../assets/platform.png');
        game.load.image('star', '../assets/star.png');
        game.load.image('cache', '../assets/cache.png');
        game.load.image('cachesmall', '../assets/cachesmall.png');
        game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
        game.load.spritesheet('baddie', '../assets/baddie.png', 32, 48);  //  happy baddie
        game.load.spritesheet('angrybaddie', '../assets/angrybaddie.png', 32, 48);  //  angry baddie
        game.load.spritesheet('steg', '../assets/steg.png', 64, 54);  //  pushy steg
        game.load.spritesheet('steg_angry', '../assets/steg_angry.png', 64, 54);  //  angry steg
        game.load.spritesheet('steg_friendly', '../assets/steg_friendly.png', 64, 54);  //  friendly steg
        game.load.image('diamond', '../assets/diamond.png');
        game.load.image('logo', '../assets/logo1.png');
        LoadBackgroundDinos();
	},

    create: function() {
		game.state.start('menu');
	}
	
}