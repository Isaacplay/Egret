class herosense extends eui.Component implements  eui.UIComponent {
	public lis_hero : eui.List;
	public scr_hero:eui.Scroller;
	public tc :eui.Button;
	public btn_sale : eui.Button;



	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);  

	}

	private addToStage(){
		this.change_json()
		this.load_team()
		this.lis_hero.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this)

		

  }
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.tc.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   console.log("return");			   
			   GameSceneView._gameScene.tohome()	
        },this)
		this.btn_sale.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   	   
			   GameSceneView._gameScene.tosalesense()	
        },this)



	
	}

	change_json(){

	
		let jsonData : JSON=RES.getRes("player_json");
		let dataArr:any[] = [];
		for(var i in jsonData["player_card"])
		{
			if(jsonData["player_card"][i]>0){
				console.log('resource/art/hero/'+i+'.png',jsonData["player_card"][i])
				dataArr.push({image:'resource/art/hero/'+i+'.png',num:jsonData["player_card"][i]})
			}
		}
		let euiArr:eui.ArrayCollection = new eui.ArrayCollection(dataArr)
		this.lis_hero.dataProvider = euiArr

	}
	onChange(){

		let jsonData : JSON=RES.getRes("player_json");
		let index:any[] = [];
		for(var i in jsonData["player_card"])
		{
			if(jsonData["player_card"][i]>0){
				index.push(i)
				
			}
		}
	
		if(jsonData["player_card"][index[this.lis_hero.selectedIndex]] >= 0){
			this.select_team(index[this.lis_hero.selectedIndex])
			
		}

		console.log(this.lis_hero.selectedIndex);
		console.log(index[this.lis_hero.selectedIndex]);

	}
	load_team(){
		let jsonData : JSON=RES.getRes("player_json");
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
				}
				}
		}
			

	}
	select_team(name){
		let jsonData : JSON=RES.getRes("player_json");

		for(var i in  jsonData["using"]){
			if(jsonData["using"][i] ==0){
				jsonData["player_card"][name] -=1;
				this.change_json()
				jsonData["using"][i] = 1;
				switch(i){
					case "0": this.set_team1(name); break;
					case "1": this.set_team2(name);break;
					case "2": this.set_team3(name);break;
					case "3": this.set_team4(name);break;
				}
				break;
				
			}

		}

			
		



	}

	set_team1(name){
		var image = new eui.Image();
		let jsonData : JSON=RES.getRes("player_json");
        image.source = 'resource/art/hero/'+name+'.png';
        this.addChild(image);
		jsonData["use_card"]["0"] = name;
        image.x = 228;
        image.y = 77.5;
		console.log("change bankan1");
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("change bankan2");
			jsonData["using"]["0"] = 0;
			this.removeChild(image);
			jsonData["player_card"][name] +=1;
			this.change_json()
        },this);
	
	
	}
	set_team2(name){
		let jsonData : JSON=RES.getRes("player_json");
		var image = new eui.Image();
        image.source = 'resource/art/hero/'+name+'.png';
        this.addChild(image);
		jsonData["use_card"]["1"] = name;
        image.x = 642;
        image.y = 77.5;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("change bankan2");
			jsonData["using"]["1"] = 0;
			this.removeChild(image);
			jsonData["player_card"][name] +=1;
			this.change_json()
        },this);
		
	}
	set_team3(name){
		let jsonData : JSON=RES.getRes("player_json");
		var image = new eui.Image();
        image.source = 'resource/art/hero/'+name+'.png';
        this.addChild(image);
		jsonData["use_card"]["2"] = name;
        image.x = 1061;
        image.y = 77.5;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
		console.log("change bankan2");
		   jsonData["using"]["2"] = 0;
			this.removeChild(image);
			jsonData["player_card"][name] +=1;
			this.change_json()
        },this);
	}
	set_team4(name){
		let jsonData : JSON=RES.getRes("player_json");
		var image = new eui.Image();
        image.source = 'resource/art/hero/'+name+'.png';
        this.addChild(image);
		jsonData["use_card"]["3"] = name;
        image.x = 1479;
        image.y = 77.5;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("change bankan2");
			jsonData["using"]["3"] = 0;
			this.removeChild(image);
			jsonData["player_card"][name] +=1;
			this.change_json()
        },this);
	}
	




}