var characters = [];
var character1 = {name: "Nerd", attacks: [templates[1], templates[2]]};
characters.push(character1);
var character2 = {name: "Hipster", attacks: [templates[0]]};
characters.push(character2);
console.log(characters);
var textName;
var textAttacks;
var style;
var leftButt, rightButt;
var curIndex = 0;

function displayChar(charIn){
        textName.setText(charIn.name);
        var printText = "";
        for(var i = 0; i < charIn.attacks.length; i++){
            printText += charIn.attacks[i].name+"\n";
            printText += " ";
        }
        textAttacks.setText(printText);
    
    }    
function charLeft(idx){
    if (idx>0){
        curIndex = idx-1;
        displayChar(characters[idx-1]);
    }else{
        curIndex=characters.length-1;
        displayChar(characters[characters.length-1]);
    }
    
}

function charRight(idx){
    if (idx<characters.length-1){
        curIndex = idx+1;
        displayChar(characters[idx+1]);   
    }else{
        curIndex=0;
        displayChar(characters[0]);
    }
    
}

var charMenu = {
    
	preload: function(){
		game.load.image('background', '/assets/backgrounds/charmenu.png');
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');
        
        style = {font: "bold 32px Arial", fill: "#000"};
        textName = game.add.text(210, 250, "", style);
        textAttacks = game.add.text(500, 180, "", style);
        
        var leftInfo = {
			x: 160,
			y: 600,
			//key: 'button',
			func: () => charLeft(curIndex),
			context: this,
			text: "<"
		}

		leftButt = new Button(leftInfo);
        
        var rightInfo = {
			x: 260,
			y: 600,
			//key: 'button',
			func: () => charRight(curIndex),
			context: this,
			text: ">"
		}

		rightButt = new Button(rightInfo);
        
        displayChar(characters[curIndex]);
	},
    
    

	update: function(){
        
        //displayChar(characters[0]);
	}
    
   
}