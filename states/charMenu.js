var characters = [];
var character1 = {name: "Nerd", attacks: [templates[1], templates[2]]};
characters.push(character1);
var character2 = {name: "Hipster", attacks: [templates[0]]};
characters.push(character2);
console.log(characters);
var textName;
var textAttacks;
var style;

var charMenu = {
    
	preload: function(){
		game.load.image('background', '/assets/backgrounds/charmenu.png');
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');
        
        style = {font: "bold 32px Arial", fill: "#000"};
	},

	update: function(){
        
     function displayChar(charIn){
        textName = game.add.text(230, 300, charIn.name, style);
        var printText = "";
        for(var i = 0; i < charIn.attacks.length; i++){
            printText += charIn.attacks[i].name;
            printText += " ";
        }
        textAttacks = game.add.text(0, 100, printText, style);
    
    }    
        
        displayChar(characters[0]);
	}
    
   
}