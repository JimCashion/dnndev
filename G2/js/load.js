var loadState = {

	preload: function() {

        gridsize = 4;

        game.load.image('hborder', '../assets/hborder.png');
        game.load.image('vborder', '../assets/vborder.png');
        game.load.image('cborder', '../assets/corner.png');
        game.load.image('star', '../assets/star.png');
        game.load.image('win', '../assets/clickforcoordinates.png');
        game.load.image('cachesmall', '../assets/cachesmall.png');
       

		var loadingLabel = game.add.text(80, 150, 'loading...',
            { font: '30px Courier', fill: '#ffffff' });

        for(var x =0; x<gridsize;x++)
        {
            for(var y =0; y<gridsize;y++)
            {
            	  game.load.image('i' + x + 'x' + y, '../assets/i' + gridsize + '/i' + x + 'x' + y + '.png');

            }

        }
    },

    create: function() {
        //
		game.state.start('menu');
	}
	
}