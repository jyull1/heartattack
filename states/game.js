var gameWidth = 1580,
	gameHeight = 720;

var game = new Phaser.Game(gameWidth, gameHeight);

game.state.add('date', date);

game.state.start('date', date);