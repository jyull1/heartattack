var characters = [];
characters.push("Nerd");
characters.push("Hipster");

var textName, textWarn;
var textDesc;
var textAttacks;
var style;
var leftButt, rightButt, doneButt;
var curIndex = 0;
var selectedMoves = ["test","test","test","test","test","test"];
var charPic;

function getChar(){
    var done = true;
    for(var i = 0; i < 6; i++){
        if(selectedMoves[i]=="test" && done == true){
            done = false;
        }
    }

    if(done == false){
        //textWarn.textbox.displayText("Please select 6 attacks.", 0);
        
        textWarn.setText("Please select 6 attacks.", style);
    }else{
        let obj = {
            name:characters[curIndex],
            attacks:selectedMoves
        }
        console.log(obj);
        return obj;
    }
    return;
    
}

function displayChar(charName){
        textName.setText(charName);
        displayMoves(charName);
    console.log(charName);
        if(charName.toLowerCase() == "nerd"){
            charPic.destroy();
            charPic = game.add.image(595,350,'char1');
            charPic.scale.setTo(.1,.1);
        }else if(charName.toLowerCase() == "hipster"){
            charPic.destroy();
            charPic = game.add.image(595,350,'char2');
            charPic.scale.setTo(.1,.1);
        }
}

function displayMoves(charName){
    var tropeList = getTropeList(charName,templates);
    var printText = " ";
    var startX = 230;
    var startY = 150;
        for(var i = 0; i < tropeList.length; i++){
            let newX = startX;
            let newY = startY + (70*i);
            let name = tropeList[i].name;
            let desc = tropeList[i].desc;
            let moveInfo = {
                x: newX,
                y: newY,
                //key: 'button',
                func: () => addToSelectedMoves(name,newX,newY,desc),
                context: this,
                key: "attackButt1",
                text: name,
                desc:desc
		      }
            let butt = new ButtonToggle(moveInfo);
		    //var butt = new ButtonToggle(newX, newY,true,"attack1",name);
        }
    
}

function addToSelectedMoves(attackName, xIn, yIn, descIn){
    game.world.remove(textDesc);
    for(var i = 0; i < selectedMoves.length; i++){
        if(selectedMoves[i] == "test"){
            selectedMoves[i] = attackName;
            
            let moveInfo = {
			x: xIn,
			y: yIn,
			//key: 'button',
			func: () => removeFromSelectedMoves(attackName,xIn,yIn,descIn),
			context: this,
            key: "attackButt2",
			text: attackName,
            desc:descIn
            }
            
            let butt = new ButtonToggle(moveInfo);
            //var butt = new ButtonToggle(xIn, yIn,false,"attack2",attackName);
            return "";
        }
    }
    
    
    return "Maximum six!";
}

function removeFromSelectedMoves(attackName, xIn, yIn, descIn){
    game.world.remove(textDesc);
    for(var i = 0; i < selectedMoves.length; i++){
        
        if(selectedMoves[i] == attackName){
            selectedMoves[i] = "test";
            
            let moveInfo = {
			x: xIn,
			y: yIn,
			//key: 'button',
			func: () => addToSelectedMoves(attackName,xIn,yIn,descIn),
			context: this,
            key: "attackButt1",
			text: attackName,
            desc:descIn
            }
            
            //var butt = new ButtonToggle(xIn, yIn,true,"attack1",attackName);
            let butt = new ButtonToggle(moveInfo);
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
        game.load.image('empty', '/assets/UI/empty.png');
        game.load.image('attackButt1', '/assets/UI/attackButt1.png');
        game.load.image('attackButt2', '/assets/UI/attackButt2.png');
        game.load.image('char2','/assets/UI/character_selection_hipster.png');
        game.load.image('char1','/assets/UI/character_selection_nerd.png');
        
	},

	create: function(){
        charPic = game.add.image(0,0,"char1");
		this.bg = game.add.image(0, 0, 'background');
        
        style = {font: "bold 32px Arial", fill: "#000"};
        textName = game.add.text(600, 250, "", style);
        textAttacks = game.add.text(100, 130, "", style);
        
        textWarn = game.add.text(885, 550, "", style);
        textDesc = game.add.text(900, 150, "", style);
        
        var leftInfo = {
			x: 580,
			y: 600,
			key: 'empty',
			func: () => charLeft(curIndex),
			context: this,
			text: "<"
		}

		leftButt = new Button(leftInfo);
        
        var rightInfo = {
			x: 700,
			y: 600,
			key: 'empty',
			func: () => charRight(curIndex),
			context: this,
			text: ">"
		}

		rightButt = new Button(rightInfo);
        
        this.textbox = new TextBoxCharDesc();
		this.textbox.displayText("", 0);
        
        //this.textWarn = new TextBoxCharDesc();
        //textWarn.textbox.displayText("",0);
        
        var doneChar = {
			x: 1049,
			y: 620,
			key: 'attackButt2',
			func: () => getChar(curIndex),
			context: this,
			text: "Done"
		}

		doneButt = new Button(doneChar);
        
        displayChar(characters[curIndex]);
        
        
	},
    
    

	update: function(){
        //console.log(selectedMoves);
        //displayChar(characters[0]);
	}
    
   
}