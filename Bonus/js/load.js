var loadState = {

	preload: function() {

            gridsize = 3;
		var loadingLabel = game.add.text(80, 150, 'loading...',
            { font: '30px Courier', fill: '#ffffff' });

            game.load.image('star', '../assets/star.png');

       
            game.load.image('i1', '../assets/cp/1.png');
            game.load.image('i2', '../assets/cp/2.png');
            game.load.image('i3', '../assets/cp/3.png');
            game.load.image('i4', '../assets/cp/4.png');
            game.load.image('i5', '../assets/cp/5.png');
            game.load.image('i6', '../assets/cp/6.png');
            game.load.image('i7', '../assets/cp/7.png');
            game.load.image('i8', '../assets/cp/8.png');
            game.load.image('i9', '../assets/cp/9.png');
            game.load.image('blank1', '../assets/cp/blank1.png');
            game.load.image('blank2', '../assets/cp/blank2.png');
            game.load.image('blank3', '../assets/cp/blank3.png');
            game.load.image('blank4', '../assets/cp/blank4.png');
            game.load.image('blank5', '../assets/cp/blank5.png');
            game.load.image('blank6', '../assets/cp/blank6.png');
            game.load.image('blank7', '../assets/cp/blank7.png');
            game.load.image('blank8', '../assets/cp/blank8.png');
            game.load.image('blank9', '../assets/cp/blank9.png');
            game.load.image('cachesmall', '../assets/cachesmall.png');

    },

    create: function() {
		game.state.start('menu');
	}
	
}