var gameWidth = 1280,
	gameHeight = 720;

var game = new Phaser.Game(gameWidth, gameHeight);

console.log('Tweet');

game.state.add('date', date);

game.state.start('date', date);