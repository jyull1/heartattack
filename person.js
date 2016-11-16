class Person {
	constructor(obj){
		// opponent is where this person class will hold the other person class, thus making them aware of each other
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
		this.affecton = obj.affection;
	}

	// this player is given the other player class, maiking it aware of its existence
	setOponnent(op) { this.opponent = op; }
    // stat retrieval
	getCharm(){ return this.charm; }
	getWit(){ return this.wit; }
	getIntel(){ return this.Intel; }
	getStandards(){ return this.standards; }
	getAffection(){ return this.affection; }
	// setting and changing stats
	ChangeCharm(int){ this.charm += int; }
	ChangeWit(int){ this.wit += int; }
	ChangeIntel(int){ this.intel = int; }
	ChangeStandards(int){ this.standards += int; }
	ChangeAffection(int){ this.affection += int; }
}

var obj = {
	opponent: null,
	charm: 7,
	wit: 5,
	intel: 9,
	standards: 7,
	affection: 0,
}