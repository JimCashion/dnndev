var bootState = {

	create: function () {

		//game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		game.stage.backgroundColor = "#4488AA";
		game.state.start('load');
		
	}
}