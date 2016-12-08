class Attack {
	//Constrcutor takes 2 arguments:
	//A String that corresponds to the attack in the attacks array.
	//A reference to the person object to which the attack belongs.
	constructor(name, player){
		var obj = find(name, templates)
		this.name = obj.name;
		this.effect = obj.effect;
		this.bools = obj.bools;
		this.uses = obj.uses;
		this.desc = obj.desc;
		this.trope = obj.trope;
		this.useText = obj.useText;
		this.player = player;
	}

	use(){
		if(this.uses > 0){
			this.effect();
			this.uses--;
		}
		else{
			date.textbox.displayText("This attack has been used too many times!", 0);
		}

		// if(this.getOpponent().affection >= 1000){
			
		// }
	}
}

//Templates forms an attack database, of sorts. Each attack has the specification as described in the first object:
var templates = [
	{
		//The name of the attack. We will use this for lookup in the game.
		name: "Locally Sourced",
		trope: 'hipster',
		//This carries out the in-game effects of the attack. All of it. It will hook into the player's methods;
		//this.player will be passed in the attack's constructor, so we assume the variable will "be there" when the effect triggers.
		effect: function(){
			var dmg = random(200, 250);
			if(this.player.getOpponent().getStandards() > 4){
				dmg *= 1.2;
			}
			this.player.getOpponent().changeAffection(dmg);
		},
		//Useless for now, don't worry about it.
		bools: {},
		//The amount of times the move can be used. Will be decremented every use.
		uses: 5,
		//Description the player sees when they mouse over the attack's UI element.
		desc: "Talk about all the local brands in your pantry - saving the environment is SO endearing! Deal great affection.",
		useText: "Not only will they love you - they'll love your food!"
	},


	{
		name: "Ex Pictures",
		trope: "nerd",
		effect: function(){
			var heal = random(50, 100);
			this.player.changeAffection(-heal);
		},
		bools: {},
		uses: 10,
		desc: "Remember how they hurt you last time. Lose some affection.",
		useText: "Well, your heart is bleeding now. You're not sure what you expected."
	},

	{
		name: "Dorky Laugh",
		trope: "nerd",
		effect: function(){
			var dmg = random(100, 150);
			this.player.getOpponent().changeAffection(dmg);
		},
		bools: {},
		uses: 8,
		desc: "People have been making fun of your laugh for years, but its kinda cute. Deal moderate affection.",
		useText: "Wow… that was adorable! Their eyes light up! Have you always been that cute?"
	},

	{
		name: "Free IT Advice",
		trope: "nerd",
		effect: function(){
			var chan = random(0,100);
			if (chan <= 50){
				var dmg = random(100, 150);
			}
			else{
				var dmg = random(200, 250);
			}
			this.player.getOpponent().changeAffection(dmg);
			},
		bools: {},
		uses: 5,
		desc: "Your date is having computer issues, so you offer some advice that MIGHT help.",
		useText: "Being helpful is such a great quality in a person!"
	},

	{
		name: "Science Experiment",
		trope: "nerd",
		effect: function(){
			var chan = random(0,100);
			if(chan <= 20){
				this.player.changeAffection(100);
			}
			else{
				var dmg = random(200, 250);
				this.player.getOpponent().changeAffection(dmg);
			}
		},
		bools: {},
		uses: 4,
		desc: "Talk a little too in-depth about your research project. Deals great affection.",
		useText: "Someone who contributes to the greater good of humanity? They'll practically swoon!"
	},

	{
		name: "Clean Glasses",
		trope: "nerd",
		effect: function(){
			var dmg = random(200, 250);
			this.player.getOpponent().changeAffection(dmg);
		},
		bools: {},
		uses: 5,
		desc: "You remove your glasses to clean them and reveal your surprisingly beautiful eyes. Deals great affection on first use.",
		useText: "They blushed! You’re quite the flirt!"
	},

	{
		name: "Robo-Nerd",
		trope: "nerd",
		effect: function(){
			var dmg = random(100, 150);
			this.player.getOpponent().changeAffection(-dmg);
		},
		bools: {},
		uses: 3,
		desc: "You block out all emotion, raising your standards and lowering your affection.",
		useText: "Love? Does not compute."
	},

	{
		name: "Game Talk",
		trope: "nerd",
		effect: function(){
			var dmg = random(100, 150);
			this.player.getOpponent().changeAffection(dmg);
		},
		bools: {},
		uses: 10,
		desc: "You talk about that new game you have been playing recently. Does fair affection.",
		useText: "Nate's sure to love this game..."
	},

	{
		name: "Tell Joke",
		trope: "nerd",
		effect: function(){
			if (this.player.getCharm()  > 5){
				var dmg = random(100,150);
			}
			else{
				var dmg = random(50, 100);
			}
			this.player.getOpponent().changeAffection(dmg);
		},
		bools: {},
		uses: 10,
		desc: "You tell a joke to express your humor. Deals more affection if you have great charm.",
		useText: "Yikes… A for effort, D for execution."
	},
// ---------------------End Nerd Attacks ---------------------------
// --------------------- Hipster Attacks ---------------------------
	{
		name: "Chat",
		trope: "hipster",
		effect: function(){
			var dmg = random(50, 100);
			this.player.getOpponent().changeAffection(dmg);
		},
		bools: {},
		uses: 10,
		desc: "Your small talk is on point!",
		useText: "They're listening. Step one complete."
	},

	{
		name: "Conversational Shift",
		trope: "hipster",
		effect: function(){
			this.player.changeCharm(1);
		},
		bools: {},
		uses: 2,
		desc: "Start talking about an area of your own expertise. Increase charm by 1 stage.",
		useText: "They seem a little off-put, but they're still following."
	},

	{
		name: "Before It Was Cool",
		trope: "hipster",
		effect: function(){
			this.player.changeStandards(1);
			this.player.changeIntel(1);
		},
		bools: {},
		uses: 3,
		desc: "Sit back and evaluate your trendiness. Earn a 20% bonus to your standards.",
		useText: "They're kinda cute, but they don't look like they listen to Porter Robinson."
	},

	{
		name: "Tell Joke",
		trope: "hipster",
		effect: function(){
			var dmg = random(50, 100);
			this.player.changeCharm(1);
			this.player.getOpponent().changeAffection(dmg);

		},
		bools: {},
		uses: 10,
		desc: "You tell a joke to express your humor. Deals more affection if you have great charm.",
		useText: "Haha! Yes! You are so funny. And sexy."
	},

	{
		name: "Vegan",
		trope: "hipster",
		effect: function(){
			this.player.getOpponent.changeCharm(-(thisplayer.getOpponent.getCharm() * 0.10));
		},
		bools: {},
		uses: 2,
		desc: "Make the case of a Vegan diet's numerous benefits. Decrease your opponents Wit by 10%.",
		useText: "Ah, yes; the zoned-out look that comes with daydreaming about vegan food. You know it well."
	},

	{
		name: "Indie Bands",
		trope: "hipster",
		effect: function(){
			var dmg = random(150, 200);
			this.player.getOpponent().changeAffection(dmg);
		},
		bools: {},
		uses: 4,
		desc: "Discuss your collection of indie vinyls. Deal fair affection.",
		useText: "Vinyl just sounds better, okay?!"
	}

// -------------------------- End Hipster Attacks ------------------------------
]


//Miscellaneous functions go here
function random(min, max){
	return Math.random()*(max-min) + min;
}

function find(name, arr){
	for(i in arr){
		if(arr[i].name === name){
			return arr[i];
		}
	}
	return -1;
}

