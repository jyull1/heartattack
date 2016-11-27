class attack {
	constructor(name, player){
		var obj = find(name, templates)
		this.name = obj.name;
		this.effect = obj.effect;
		this.bools = obj.bools;
		this.uses = obj.uses;
		this.desc = obj.desc;
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
		name: "Conversational Shift",
		effect: function(){
			this.player.changeCharm(1);
		},
		bools: {},
		uses: 2,
		desc: "Start talking about an area of your own expertise. Increase charm by 1 stage."
	},

	{
		name: "Ex Pictures",
		effect: function(){
			var heal = random(50, 100);
			this.player.changeAffection(-dmg);
		},
		bools: {},
		uses: 10,
		desc: "Remember how she hurt you last time. Lose fair affection."
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