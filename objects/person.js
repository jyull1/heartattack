class Person {
	constructor(obj){
		//Reference to the opponent of the player
		this.opponent;
		// charm is a value that can reflect on attacks and prevent less damage from mistakes
		this.charm = obj.charm;
		// wit is a value that if it is higher than the other player it will allow you to make the first move
		this.wit = obj.wit;
		// intel is your players ability to know the other player and make stronger moves
		this.intel = obj.intel;
		// standards will work as defense against the other players attacks
		this.standards = obj.standards;
		// affection will work as your health gauge if it fills up, you lose.
		this.affection = obj.affection;
		//Array of the player's attacks, or rather the string keys that will be used for lookup.
		this.attacks = obj.attacks || [];
		//The quirk object
		this.quirk = obj.quirk || {};

		//Instantiates the player's attacks
		for(var i = 0; i<this.attacks.length; i++){
			this.attacks[i] = new Attack(this.attacks[i], this);
		}
	}

    // stat retrieval
    getOpponent(){return this.opponent;}
	getCharm(){ return this.charm; }
	getWit(){ return this.wit; }
	getIntel(){ return this.intel; }
	getStandards(){ return this.standards; }
	getAffection(){ return this.affection; }
	// setting and changing stats
	setOpponent(player){this.opponent = player}
	changeCharm(int){ this.charm += int; }
	changeWit(int){ this.wit += int; }
	changeIntel(int){ this.intel += int; }
	changeStandards(int){ this.standards += int; }
	changeAffection(int){ this.affection += int; }
}