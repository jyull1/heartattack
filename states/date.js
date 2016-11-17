var date = {
	preload: function(){
		game.load.image('background', '/assets/backgrounds/background_left_(v1).png');
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');
	},

	update: function(){

	}
}