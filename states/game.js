var gameWidth = 1280,
	gameHeight = 720;

var game = new Phaser.Game(gameWidth, gameHeight);

game.state.add('charMenu', charMenu);
game.state.add('date', date);
game.state.add('menu', menuState);

game.state.start('date');