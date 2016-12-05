var playerPosX = 0,
	playerPosY = 0;

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
		this.activePlayer;
		this.otherPlayer;
		this.movesChosen = 0;

		this.bg = game.add.image(0, 0, 'background');

		this.player1 = new Person({
			charm: 8,
			wit: 2,
			intel: 8,
			standards: 7,
			affection: 0,
			attacks: ["Locally Sourced", "Conversational Shift", "Ex Pictures"]
		});

		this.player2 = new Person({
			charm: 8,
			wit: 2,
			intel: 8,
			standards: 7,
			affection: 0,
			attacks: ["Locally Sourced", "Conversational Shift", "Ex Pictures"]
		});

		//Make the players "aware" of one another
		this.player2.setOpponent(this.player1);
		this.player1.setOpponent(this.player2);

		//Creates and positions the player sprites.
		this.player1.sprite = game.add.sprite(150, 145, 'hipster');
		this.player1.sprite.scale.setTo(0.8);
		this.player1.sprite.sendToBack();

		this.player2.sprite  = game.add.sprite(125, 92, 'nerd');
		this.player2.sprite.scale.setTo(0.8);
		this.player2.sprite.sendToBack();

		//Keeps the players on the screen one at a time.
		this.otherPlayer = this.player1;
		this.setActivePlayer(this.player2);
	},

	update: function(){

	},

	makeUI: function(player){

		var panelConfig = {
			x: 980,
			y: 0,
			cols: 1,
			buttons: []
		}

		//Fills the player's UI with attack choices based on the player's attack choices.
		for(var i = 0; i< player.attacks.length; i++){
			//OKAY, big comment here. The "let" before buttonConfig is a replacement of "var" and is EXTREMELY hacky.
			//Basically this expression doesn't work with var, because the only attack implemented is the LAST one instantiated (i.e. the last one put into buttonConfig)
			//let changes the enclosing of buttonConfig to the nearest block, meaning that buttonConfig is confined to the state of makeUI, NOT date.
			//If this doesn't make sense, that's great! Just don't touch it with a 10-foot-pole.
			let buttonConfig = {
				func: () => {
					player.nextMove = buttonConfig.attack.use.bind(buttonConfig.attack); //buttonConfig's context must be bound to the attack itself, or using it will fail. Not sure why.
					this.movesChosen++;

					this.setActivePlayer(this.otherPlayer);

					//Checks if it's time for actions to be taken
					if(this.movesChosen >= 2){
						this.movesChosen = 0;
						this.act();
					}
				},
				attack: player.attacks[i],
				context: this,
				text: player.attacks[i].name
			};

			panelConfig.buttons.push(buttonConfig);
		}

		if(this.panel){this.panel.kill();}
		
		this.panel = new Panel(panelConfig);

		this.hpBar();
	},

	setActivePlayer: function(player){
		if(this.activePlayer){
			this.activePlayer.sprite.sendToBack();
			this.otherPlayer = this.activePlayer;
		}
		
		this.activePlayer = player;
		this.activePlayer.sprite.bringToTop();

		this.makeUI(player)
	},

	hpBar: function(){
		this.otherPlayer.hpBar = game.add.group();
		this.otherPlayer.affectionMeter = this.otherPlayer.hpBar.create(450,225, 'therm_right');
		this.otherPlayer.hpBar.create(0,0,'heart_right');
		this.otherPlayer.affectionFill = this.otherPlayer.hpBar.create(445,252, 'meter_right');
		this.otherPlayer.affectionFill.scale.set(this.otherPlayer.affection/1000, 1);
		this.otherPlayer.hpBar.scale.set(0.25,0.25);
	},

	//Causes the players to act upon one another, giving the proper order by wit.
	//Currently does not have timeouts associated with it.
	act: function(){
		if(this.player1.wit > this.player2.wit){
			this.player1.nextMove();
			this.player2.nextMove();
		}
		else if(this.player1.wit < this.player2.wit){
			this.player2.nextMove();
			this.player1.nextMove();
		}
		else{
			var choice = random(0, 1);
			if(choice){
				this.player1.nextMove();
				this.player2.nextMove();
			}
			else{
				this.player2.nextMove();
				this.player1.nextMove();
			}
		}

		this.hpBar();
	}
}