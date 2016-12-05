class TextBox{
	constructor(){
		this.width = gameWidth;
		this.height = gameHeight;
		//The y-position to which the text box is anchored.
		this.textBoxY = this.height*0.8;
		//The amount to the left text will be positioned.
		this.textBufferX = 32;
		this.fontHeight = 32;
		this.alpha = 0.5;
		this.textAlpha = 1;
		this.characterLimit = 65;
		this.style = { font: `bold ${this.fontHeight}px Arial`, fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" };

		this.writeSpace = game.make.bitmapData(this.width, this.height);
		this.writeSpace.addToWorld();

	}

	draw(){
		this.writeSpace.moveV(this.textBoxY);
	}

	hide(){
		this.writeSpace.clear();
	}

	displayText(string, line){
		this.writeSpace.rect(0,0,this.width, this.height * 0.2, `rgba(0,0,0,${this.alpha})`);
		this.draw();
		line++;
		var stringBuffer = "";
		var stringBroken = string.split(" ");


		while(stringBroken.length > 0){		
			if((stringBuffer + stringBroken[0]).length <= this.characterLimit){
				stringBuffer += stringBroken[0] + " ";
				stringBroken.splice(0, 1);
			}
			else{
				this.writeSpace.text(stringBuffer, this.textBufferX, this.textBoxY + this.fontHeight*line, `${this.fontHeight}px Arial`);
				stringBuffer = "";
				line++;
			}
		}
		this.writeSpace.text(stringBuffer, this.textBufferX, this.textBoxY + this.fontHeight*line, `${this.fontHeight}px Arial`);
	}

	fill(r,g,b){
		this.writeSpace.fill(r,g,b);
	}
}