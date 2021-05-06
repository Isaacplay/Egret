class battlesense extends eui.Component implements  eui.UIComponent {
	public tc : eui.Button;
	public E_1 :eui.Button;
	public E_2 :eui.Button;




	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);   
	}


	private addToStage( ) {


        this.add_herolis()



		}      


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.tc.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   //console.log("return");
			   GameSceneView._gameScene.tobattlechoose()	
        },this);

		this.E_1.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   //console.log("E1 start");
			   GameSceneView._gameScene.toE1sense()	
        },this);




	}
	add_herolis(){
		let jsonData : JSON=RES.getRes("player_json");
		let data : JSON=RES.getRes("card_json");
		//console.log(jsonData["using"]["0"]);
		if(jsonData["using"]["0"] !=0){
			let num =0;
			for(var i in jsonData["use_card"]){
				if(jsonData["use_card"][i] != 0){

					switch(i){
					case "0": this.set_team1(jsonData["use_card"][i]); break;
					case "1": this.set_team2(jsonData["use_card"][i]);break;
					case "2": this.set_team3(jsonData["use_card"][i]);break;
					case "3": this.set_team4(jsonData["use_card"][i]);break;
					}
					num = num + data[jsonData["use_card"][i]]["HP"];
				}
			}
			jsonData["HP1"] = num;
			jsonData["HP2"] = num;
		}


	}
	set_team1(name){
		var image = new eui.Image();
        image.source = 'resource/art/char/'+name+'.png';
        this.addChild(image);
        image.x = 84;
        image.y = 810;

	}
	set_team2(name){
		var image = new eui.Image();
        image.source = 'resource/art/char/'+name+'.png';
        this.addChild(image);
        image.x = 156;
        image.y = 810;

	}
	set_team3(name){
		var image = new eui.Image();
        image.source = 'resource/art/char/'+name+'.png';
        this.addChild(image);
        image.x = 228;
        image.y = 810;

	}
	set_team4(name){
		var image = new eui.Image();
        image.source = 'resource/art/char/'+name+'.png';
        this.addChild(image);
        image.x = 300;
        image.y = 810;

	}
	
}