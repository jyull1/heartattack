var mainState = {
	preload:function(){
		//put your shit in here
	}

	create:function(){
		var player1 = new player(obj);
		//game.add.existing(player1);
	}

	update:function(){
		//keep that shit updated
	}

}
var game = new Phaser.Game(1010, 660);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');