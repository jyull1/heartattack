var menuState = {
	preload:function(){
		game.load.image('left', 'Assets/UI/start_screen_left_weapons.png');
		game.load.image('right', 'Assets/UI/start_screen_right_weapons.png');
		game.load.image('background', 'Assets/UI/start_screen_bg.png');
		game.load.image('logo', 'Assets/new_logo_heartattack.png');
		game.load.image('black', 'Assets/UI/black.png');
		game.load.image('button', 'Assets/UI/buttons.png');
	},
 
	create:function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background = game.add.sprite(0,0,'background');

		this.logo = game.add.sprite(350,150,'logo');
		this.logo.scale.setTo(.5,.5);
		
		this.left = game.add.sprite(-475,0,'left');
		game.physics.arcade.enable(this.left);
		this.left.body.velocity.x = 200;

		this.right = game.add.sprite(1280,0,'right');
		game.physics.arcade.enable(this.right);
		this.right.body.velocity.x = -200;

		this.black = game.add.sprite(476,0,'black');
		game.physics.arcade.enable(this.black);
		this.black.visible = false;
		this.black.scale.setTo(.645,2);
    
		
	},

	update:function(){
		game.physics.arcade.overlap(this.left, this.black, this.hitStop, null, this);
        game.physics.arcade.overlap(this.right, this.black, this.hitStop, null, this);
       
        
		//keep that shit updated
	},

	hitStop:function(){
		this.left.body.velocity.x = 0;
		this.right.body.velocity.x = 0;
		this.button = game.add.sprite(490,600,'button');
		game.physics.arcade.enable(this.button);
		this.button.inputEnabled = true;
		this.button.events.onInputDown.add(this.listener, this);

		this.prompt = game.add.text(595, 630, "START", 
            { font: "30px Georgia", fill: "#000000" });
	},

	listener: function(){
		game.state.start('charMenu');
	}

};