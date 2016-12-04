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
		game.load.image('hipster', '/assets/hipster/final_hipster_pose1_right.png');
		game.load.image('nerd', '/assets/nerd/final_nerd_pose1_right.png');
		game.load.image('background', '/assets/backgrounds/background_980x720_flip.png');
		game.load.image('button', '/assets/ui/buttons.png');
		game.load.image('panel', 'assets/ui/command_box_2.png');
		game.load.image('heart_right', 'assets/ui/heart_right.png');
		game.load.image('meter_right', 'assets/ui/hpbar_health.png');
		game.load.image('therm_right', 'assets/ui/hp_therm_right.png');
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');

		this.player1 = {affection: 1000};

		this.player2 = {affection: 389};

		this.player1.sprite = game.add.sprite(150, 145, 'hipster');
		this.player1.sprite.scale.setTo(0.8);

		this.player2.sprite  = game.add.sprite(125, 92, 'nerd');
		this.player2.sprite.scale.setTo(0.8);

		this.player2.sprite.sendToBack();

		this.makeUI();
	},

	update: function(){

	},

	makeUI: function(){

		this.panel = new Panel({
			x: 980,
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

		this.hpBar(this.player1);
	},

	hpBar: function(player){
		player.hpBar = game.add.group();
		player.affectionMeter = player.hpBar.create(450,225, 'therm_right');
		player.hpBar.create(0,0,'heart_right');
		player.affectionFill = player.hpBar.create(445,252, 'meter_right');
		player.affectionFill.scale.set(player.affection/1000, 1);
		player.hpBar.scale.set(0.25,0.25);
	}
}