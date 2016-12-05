class Panel {

	//obj is a configuration object with the following keys:
	//x: the x position of the panel.
	//y: the y position of the panel.
	//cols: the number of columns that the panel will support.
	//(optional)key: the image key of the panel's background. Defaults to "panel"
	//(optional)buttons: an array of button objects that fill the panel.
	constructor(obj){
		this.x = obj.x;
		this.y = obj.y;
		this.cols = obj.cols;
		this.key = obj.key ? obj.key : "panel";
		this.buttons = obj.buttons ? obj.buttons : [];

		this.bg = game.add.sprite(this.x, this.y, this.key);

		//Positions every button in the panel.
		var buttonX = this.x+150;
		var buttonY = this.y+75;
		var colCounter = 1;
		for(var i in this.buttons){

			this.buttons[i].x = buttonX;
			this.buttons[i].y = buttonY;
			this.buttons[i] = new Button(this.buttons[i]);

			if(colCounter = this.cols){
				colCounter = 1;
				buttonX = this.x+150;
				buttonY += 60;
			}
			else{
				colCounter++;
				buttonX += 300;
			}
		}
	}

	kill(){
		for(i in this.buttons){
			this.buttons[i].destroy();
		}
	}
}