var playerPosX = 0,
	playerPosY = 0;

var samplePlayer = {
	charm: 5,
	wit: 6,
	intel: 4,
	standards: 7,
	attacks: {},
}

var date = {
	preload: function(){
		game.load.image('background', '/assets/backgrounds/final_bg_left.png');
		game.load.image('button', '/assets/ui/buttons.png');
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');

		this.makeUI();

	},

	update: function(){

	},

	makeUI: function(){
		var buttonObj = {
			x: 500,
			y: 300,
			key: 'button',
			func: () => {console.log("Hello!")},
			context: this,
			text: "Button"
		}

		this.testButton = new Button(buttonObj);
	}
}