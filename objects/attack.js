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
		this.player = player;
	}

	use(){
		if(this.uses > 0){
			this.effect();
			this.uses--;
		}
		else{
			console.log("Attack has already been used too many times!");
		}
	}
}

//Templates forms an attack database, of sorts. Each attack has the specification as described in the first object:
var templates = [
	{
		//The name of the attack. We will use this for lookup in the game.
		name: "Locally Sourced",
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
		desc: "Talk about all the local brands in your pantry - saving the environment is SO endearing! Deal great affection."
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
		desc: "Remember how she hurt you last time. Lose fair affection."
	},

	{
		name: "Dorky Laugh",
		trope: "nerd",
		effect: function(){
			var dmg = random(100, 150);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 8,
		desc: "People have been making fun of your laugh for years, but its kinda cute, Moderate Dammage"
	},

	{
		name: "Free IT Advice",
		trope: "nerd",
		effect: function(){
			var dmg = random(150, 200);
			this.player.changeAffection(dmg);
			// 50-50 chance of the advice working and doing excellent damage
		},
		bools: {},
		uses: 5,
		desc: "Your date is having computer issues, you offer some advice that will help"
	},

	{
		name: "Science Experiment",
		trope: "nerd",
		effect: function(){
			var dmg = random(200, 250);
			this.player.changeAffection(dmg);
			// 20 percent chance of failure and damaging self
		},
		bools: {},
		uses: 4,
		desc: "Talk in depth about your research project, deals great dammage"
	},

	{
		name: "Clean Glasses",
		trope: "nerd",
		effect: function(){
			var dmg = random(200, 250);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 5,
		desc: "You remove your glasses to clean them and reval your beautiful eyes that were once hidden, does great damage on first use"
	},

	{
		name: "Robo-Nerd",
		trope: "nerd",
		effect: function(){
			var dmg = random(100, 150);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 3,
		desc: "Your emotional depth isn't stellar you block out emotion, raises standards by one and lowers your affection"
	},

	{
		name: "Game Talk",
		trope: "nerd",
		effect: function(){
			var dmg = random(100, 150);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 10,
		desc: "you talk about that new game you have been playing recently, does less damage every other move"
	},

	{
		name: "Tell Joke",
		trope: "nerd",
		effect: function(){
			var dmg = random(50, 100);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 10,
		desc: "You tell a joke to express your humor, charm increases by %5, deals poor affection"
	},
// ---------------------End Nerd Attacks ---------------------------
// --------------------- Hipster Attacks ---------------------------
	{
		name: "chat",
		trope: "hipster",
		effect: function(){
			var dmg = random(50, 100);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 10,
		desc: "Your small talk is on point!"
	},

	{
		name: "Conversational Shift",
		trope: "hipster",
		effect: function(){
			this.player.changeCharm(1);
		},
		bools: {},
		uses: 2,
		desc: "Start talking about an area of your own expertise. Increase charm by 1 stage."
	},

	{
		name: "Remember who you are...",
		trope: "hipster",
		effect: function(){
			this.player.changeStandards(+20);
			this.player.changeInteligece(this.player.getInteligence() * 0.2);
		},
		bools: {},
		uses: 3,
		desc: "Sit back and evaluate your trendiness, Earn a 20% bonus to your standards"
	},

	{
		name: "Tell Joke",
		trope: "hipster",
		effect: function(){
			var dmg = random(50, 100);
			this.player.changeCharm(this.player.getCharm()*0.2);
			this.player.changeAffection(dmg);

		},
		bools: {},
		uses: 10,
		desc: "You tell a joke to express your humor, charm increases 5%, you deal poor affection"
	},

	{
		name: "Vegan",
		trope: "hipster",
		effect: function(){
			this.player.changeCharm(this.player.getCharm);
		},
		bools: {},
		uses: 2,
		desc: "Make the case of Vegan diets' numerous benefits. Decrease your opponents Wit by 10%"
	},

	{
		name: "socally Scourced",
		trope: "hipster",
		effect: function(){
			var dmg = random(200, 250);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 5,
		desc: "Talk about all the local brands in your pantry, saving the environment is so endearing! Deals great affection"
	},

	{
		name: "Indie Bands",
		trope: "hipster",
		effect: function(){
			var dmg = random(150, 200);
			this.player.changeAffection(dmg);
		},
		bools: {},
		uses: 4,
		desc: "Discuss your collection of indie vinyls. Deal fair affection"
	}
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