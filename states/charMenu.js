var characters = [];
characters.push("Nerd");
characters.push("Hipster");

var textName;
var textAttacks;
var style;
var leftButt, rightButt;
var curIndex = 0;
var selectedMoves = ["test","test","test","test","test","test"]

function displayChar(charName){
        textName.setText(charName);
        displayMoves(charName);
    
}

function displayMoves(charName){
    var tropeList = getTropeList(charName,templates);
    var printText = "";
    var startX = 200;
    var startY = 150;
        for(var i = 0; i < tropeList.length; i++){
            var newX = startX;
            var newY = startY + (70*i);
            var name = tropeList[i].name;
            var moveInfo = {
                x: newX,
                y: newY,
                //key: 'button',
                func: () => addToSelectedMoves(name,newX,newY),
                context: this,
                key: "attackButt1",
                text: name
		      }
            var butt = new ButtonSimple(moveInfo);
		    //var butt = new ButtonToggle(newX, newY,true,"attack1",name);
        }
    
}

function addToSelectedMoves(attackName, xIn, yIn){
    for(var i = 0; i < selectedMoves.length; i++){
        if(selectedMoves[i] == "test"){
            selectedMoves[i] = attackName;
            
            var moveInfo = {
			x: xIn,
			y: yIn,
			//key: 'button',
			func: () => removeFromSelectedMoves(attackName,xIn,yIn),
			context: this,
            key: "attackButt2",
			text: attackName
            }
            
            var butt = new ButtonSimple(moveInfo);
            //var butt = new ButtonToggle(xIn, yIn,false,"attack2",attackName);
            return "";
        }
    }
    
    
    return "Maximum six!";
}

function removeFromSelectedMoves(attackName, xIn, yIn){
    for(var i = 0; i < selectedMoves.length; i++){
        if(selectedMoves[i] == attackName){
            selectedMoves[i] = "test";
            
            var moveInfo = {
			x: xIn,
			y: yIn,
			//key: 'button',
			func: () => addToSelectedMoves(attackName,xIn,yIn),
			context: this,
            key: "attackButt1",
			text: attackName
            }
            
            //var butt = new ButtonToggle(xIn, yIn,true,"attack1",attackName);
            var butt = new ButtonSimple(moveInfo);
            return "";
        }
    }
    
}

function getTropeList(name, arr){
    tropeList = [];
	for(i in arr){
		if(arr[i].trope === name.toLowerCase()){
			tropeList.push(arr[i]);
		}
	}
	return tropeList;
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
		game.load.image('background', '/assets/backgrounds/charSelect.png');
        //game.load.image('attack1', '/assets/UI/attackButt.png');
        game.load.image('attackButt1', '/assets/UI/attackButt1.png');
        game.load.image('attackButt2', '/assets/UI/attackButt2.png');
	},

	create: function(){
		this.bg = game.add.image(0, 0, 'background');
        
        style = {font: "bold 32px Arial", fill: "#000"};
        textName = game.add.text(605, 250, "", style);
        textAttacks = game.add.text(100, 130, "", style);
        
        var leftInfo = {
			x: 580,
			y: 600,
			//key: 'button',
			func: () => charLeft(curIndex),
			context: this,
			text: "<"
		}

		leftButt = new ButtonSimple(leftInfo);
        
        var rightInfo = {
			x: 700,
			y: 600,
			//key: 'button',
			func: () => charRight(curIndex),
			context: this,
			text: ">"
		}

		rightButt = new ButtonSimple(rightInfo);
        
        displayChar(characters[curIndex]);
        
        
	},
    
    

	update: function(){
        //console.log(selectedMoves);
        //displayChar(characters[0]);
	}
    
   
}