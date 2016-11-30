class Button {

	//obj is a config object that can contain the following parameters:
	//x: its position (centered) on the x axis.
	//y: its position (centered) on the y axis.
	//(optional)key: the image asset key for the button's texture. Defaults to "button"
	//func: the function to be performed when the button is clicked.
	//(optional) context: the context under which func is run. Defaults to the game context.
	//(optional)text: text to display on the button, centered at its x and y.
	//(optional)scale: a double to set the scale to. For example, 2 will double the button size, 0.5 will halve it.
	constructor(obj){
		this.x = obj.x;
		this.y = obj.y
		this.key = obj.key ? obj.key : "button";
		if(obj.text){this.text = obj.text;}
		this.func = obj.func;
		this.context = obj.context ? obj.context : game;
		this.scale = obj.scale ? obj.scale : 1;

		this.buttonImg = game.add.button(this.x, this.y, this.key, this.func, this.context);
		this.buttonImg.anchor.setTo(0.5,0.5);

		if(this.text){
			this.buttonTxt = game.add.text(this.x, this.y, this.text);
			this.buttonTxt.anchor.setTo(0.5,0.5);
		}
	}
}