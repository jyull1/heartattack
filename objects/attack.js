class attack {
	constructor(obj, player){
		this.name = obj.name;
		this.effect = obj.effect;
		this.bools = obj.bools;
		this.uses = obj.uses;
		this.desc = obj.desc;
		this.player = player;
	}
}

var sampleObj = {
	name: "Locally Sourced",
	effect: function(){
		var dmg = Math.random()*(50) + 150;
		if(this.player.getOpp().standards > 4){
			dmg *= 1.2;
		}
		this.player.dealAffection(dmg);
	},
	bools: {},
	uses: 5,
	desc: "Talk about all the local brands in your pantry - saving the environment is SO endearing! Deal great affection."
}

function save(obj, name, type){
	var saveString = JSON.stringify(obj);
	var a = document.createElement('a');
	var file = new Blob([saveString], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}