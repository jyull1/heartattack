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
		game.load.image('heart_left', 'assets/ui/heart_left.png');
		game.load.image('meter_right', 'assets/ui/hpbar_health.png');
		game.load.image('therm_right', 'assets/ui/hp_therm_right.png');
		game.load.image('therm_left', 'assets/ui/hp_therm_left.png');
		game.load.image('background2', 'assets/backgrounds/background_2.png');
	},

	create: function(){
		this.activePlayer;
		this.otherPlayer;
		this.winningPlayer;
		this.display = true;
		//The amount of time each step in the attack sequence takes.
		this.moveTime = 7000;
		this.movesChosen = 0;


		this.player1 = new Person({
			charm: 2,
			wit: 8,
			intel: 4,
			standards: 5,
			affection: 0,
			attacks: player1.attacks
		});
		this.player1.bg = game.add.sprite(0, 0, 'background');

		this.player2 = new Person({
			charm: 8,
			wit: 2,
			intel: 8,
			standards: 7,
			affection: 10,
			attacks: player2.attacks,
		});
		this.player2.bg = game.add.sprite(0, 0,'background2');

		//Make the players "aware" of one another
		this.player2.setOpponent(this.player1);
		this.player1.setOpponent(this.player2);

		//Creates and positions the player sprites.
		if(player2.name === 'Nerd'){
			this.player1.sprite  = game.add.sprite(125, 92, 'nerd');
		}
		else{
			this.player1.sprite = game.add.sprite(150, 145, 'hipster');
		}
		this.player1.sprite.scale.setTo(0.8);
		this.player1.sprite.sendToBack();

		if(player1.name === 'Nerd'){
			this.player2.sprite  = game.add.sprite(125, 92, 'nerd');
		}
		else{
			this.player2.sprite = game.add.sprite(150, 145, 'hipster');
		}
		this.player2.sprite.scale.setTo(0.8);
		this.player2.sprite.sendToBack();

		//Creates the game's text box
		this.textbox = new TextBox();

		//Keeps the players on the screen one at a time.
		this.otherPlayer = this.player1;
		this.setActivePlayer(this.player2);

		this.textbox.displayText("Welcome to the first date! An awkward silence has settled on the room. Choose what to say on the right-hand panel!", 0);
	},

	update: function(){
		//checks for a winner
		if(this.winningPlayer == this.player1){
			this.triggerWin("Player 1");
		}
		else if(this.winningPlayer == this.player2){
			this.triggerWin("Player 2");
		}
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
					player.nextMove = buttonConfig.attack;
					player.nextMove.use = player.nextMove.use.bind(buttonConfig.attack); //buttonConfig's context must be bound to the attack itself, or using it will fail. Not sure why.
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
		this.textbox.hide();
		if(this.activePlayer){
			this.activePlayer.sprite.sendToBack();
			this.activePlayer.bg.sendToBack();
			this.otherPlayer = this.activePlayer;
		}
		
		this.activePlayer = player;
		this.activePlayer.bg.bringToTop();
		this.activePlayer.sprite.bringToTop();

		this.textbox = null;
		this.textbox = new TextBox();

		this.makeUI(player)
	},

	//Sets up and styles the health bars of each player.
	hpBar: function(){
		this.otherPlayer.hpBar = game.add.group();
		this.otherPlayer.affectionMeter = this.otherPlayer.hpBar.create(450,225, 'therm_right');
		this.otherPlayer.hpBar.create(0,0,'heart_right');
		this.otherPlayer.affectionFill = this.otherPlayer.hpBar.create(445,252, 'meter_right');
		this.otherPlayer.affectionFill.scale.set(this.otherPlayer.affection/1000, 1);
		this.otherPlayer.hpBar.scale.set(0.25,0.25);

		this.activePlayer.hpBar = game.add.group();
		this.activePlayer.affectionMeter = this.activePlayer.hpBar.create(1890,1895, 'therm_left');
		this.activePlayer.hpBar.create(3250,1675,'heart_left');
		this.activePlayer.affectionFill = this.activePlayer.hpBar.create(3430, 1926, 'meter_right');
		this.activePlayer.affectionFill.scale.set(this.activePlayer.affection/1000, 1);
		this.activePlayer.affectionFill.x -= this.activePlayer.affectionFill.width;
		this.activePlayer.hpBar.scale.set(0.25,0.25);
	},

	//Causes the players to act upon one another, giving the proper order by wit.
	//Currently does not have timeouts associated with it.
	act: function(){
		if(this.player1.wit > this.player2.wit){
			this.planRound(this.player1, this.player2);
		}
		else if(this.player1.wit < this.player2.wit){
			this.planRound(this.player2, this.player1);
		}
		else{
			var choice = random(0, 1);
			if(choice){
				this.planRound(this.player1, this.player2);
			}
			else{
				this.planRound(this.player2, this.player1);
			}
		}

	},

	//Sets the scheduled timeouts for the moves being made.
	planRound: function(player1, player2){
		this.display = false;
		this.makeNextMove(player1);
		setTimeout(this.makeNextMove.bind(this, player2), this.moveTime);
		setTimeout(() => {
			this.display = true; 
			this.textbox.hide();
				}, this.moveTime*2);
	},

	//Executes a single move
	makeNextMove: function(player){
		this.setActivePlayer(player);
		this.textbox.displayText(`You used ${player.nextMove.name}!`,0);
		setTimeout(this.textbox.displayText.bind(this.textbox, player.nextMove.useText,0), this.moveTime/2);
		this.activePlayer.nextMove.use();
		this.hpBar();
	},

	triggerWin: function(playerString){
		var otherPlayer;
		if(playerString === 'Player 1'){
			otherPlayer = 'Player 2';
		}
		else{
			otherPlayer = 'Player 1'
		}

		this.textbox.displayText(`Oh yeeah! ${playerString} wins the day - and the heart! Oh well ${otherPlayer}, better luck next time!`, 0);
		game.paused = true;
	},

	setWinner: function(player){
		this.winningPlayer = player;
	}
}