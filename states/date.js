<<<<<<< HEAD
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
		game.load.image('hipster', '/assets/hipster/hipster_1_left_white.png');
		game.load.image('nerd', '/assets/nerd/nerd_1_left_white.png');
		game.load.image('background', '/assets/backgrounds/final_bg_left.png');
		game.load.image('button', '/assets/ui/buttons.png');
		game.load.image('panel', 'assets/ui/command_box_2.png');
=======
var date = {
	preload: function(){
		game.load.image('background', '/assets/backgrounds/final_bg_left.png');
>>>>>>> master
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');
<<<<<<< HEAD

		this.makeUI();

		this.player1 = {};

		this.player2 = {};

		this.player1.sprite = game.add.sprite(170, 145, 'hipster');
		this.player1.sprite.scale.setTo(0.5);

		this.player2.sprite  = game.add.sprite(170, 65, 'nerd');
		this.player2.sprite.scale.setTo(0.5);

		this.player1.sprite.sendToBack();
=======
>>>>>>> master
	},

	update: function(){

<<<<<<< HEAD
	},

	makeUI: function(){

		this.panel = new Panel({
			x: 1280,
			y: 0,
			cols: 1,
			buttons: [
				{
					func: () => {console.log("Hello!")},
					context: this,
					text: "Button1"
				},
				{
					func: () => {console.log("Hello!")},
					context: this,
					text: "Button2"
				},
				{
					func: () => {console.log("Hello!")},
					context: this,
					text: "Button3"
				},
				{
					func: () => {console.log("Hello!")},
					context: this,
					text: "Button4"
				},
				{
					func: () => {console.log("Hello!")},
					context: this,
					text: "Button5"
				},
				{
					func: () => {console.log("Hello!")},
					context: this,
					text: "Button6"
				}
			]
		});
=======
>>>>>>> master
	}
}