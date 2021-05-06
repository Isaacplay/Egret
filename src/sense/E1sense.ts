class E1sense extends eui.Component implements  eui.UIComponent {
	public E1_pachina :eui.Image;
	public over :eui.Button;
	public cost :eui.Label;
	public play_hp :eui.Label;
	public boss_hp :eui.Label;
	public escape : eui.Button;
	public hp_play = new eui.Image();
	public hp_boss = new eui.Image();
	public boss = new eui.Image();

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);   
	

		
	}
	private addToStage(){
		let cardData : JSON=RES.getRes("card_json");
		let bossData : JSON=RES.getRes("boss_json");
		let playData : JSON=RES.getRes("player_json");

		playData["cost"] = playData["cost_a"]
		bossData["HP2"] = bossData["HP1"]
		playData["HP2"] = playData["HP1"]


	
		var turn = true;

 

		this.resh()
		this.add_hero()
	





		this.over.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
	
			   
			   this.bossturn()


        },this);

		this.escape.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
				this.showmessage("逃跑惩罚，扣除500金")
				let timer:egret.Timer = new egret.Timer(2000, 1)
        					timer.start()
        					timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
								let playData : JSON=RES.getRes("player_json");
								playData["money"] -=500;
            					GameSceneView._gameScene.tobattleScene();
       						 }, this)
			  
			   

        },this);


	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	add_hero(){
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
					num++;
				}
			}
		}

	}
	set_team1(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 68;
        image.y = 769;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            
			this.add_skill(name)

        },this);

	}
	set_team2(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 401;
        image.y = 769;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            
			this.add_skill(name)

        },this);


	}
	set_team3(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 734;
        image.y = 769;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            
			this.add_skill(name)

        },this);


	}
	set_team4(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 1067;
        image.y = 769;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            
			this.add_skill(name)

        },this);


	}
	add_skill(name){

		let cardData : JSON=RES.getRes("card_json");
		let bossData : JSON=RES.getRes("boss_json");
		let playData : JSON=RES.getRes("player_json")
	

		var back =new eui.Image();
		var skill1 = new eui.Image();
		var skill2 = new eui.Image();
		back.source = 'resource/art/char/'+name+'.png';
		skill1.source = 'resource/art/skill/'+name+'skill1.png';
        skill2.source = 'resource/art/skill/'+name+'skill2.png';
		this.addChild(back);
		this.addChild(skill1);
		this.addChild(skill2);
		back.x = 1384;
		back.y = 771;
        skill1.x = 1456;
        skill1.y = 771;
		skill2.x = 1456;
        skill2.y = 946;

		skill1.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			if(playData["cost"] >= cardData[name]["skill1cost"]){
				playData["cost"] -= cardData[name]["skill1cost"];
				bossData["HP2"] -= cardData[name]["ATK"]*cardData[name]["skill1"];
				if(bossData["HP2"] >0){
					this.resh();
					this.bosshp_reduce(bossData["HP2"]/bossData["HP1"])	
				}else{
							this.bosshp_reduce(0)
							this.showmessage("战斗胜利 金币加500")
							playData["money"] += 500;
							let timer:egret.Timer = new egret.Timer(2000, 1)
        					timer.start()
        					timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            					GameSceneView._gameScene.tobattleScene();
       						 }, this)
				}
				
			}else{
				messagerManager.showfaildinE1("Cost不足")
			}			
        },this);
		skill2.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			if(playData["cost"] >= cardData[name]["skill2cost"]){
				playData["cost"] -= cardData[name]["skill2cost"];
				if(name !="eqd"){
					bossData["HP2"] -= cardData[name]["ATK"]*cardData[name]["skill2"];
					if(bossData["HP2"] >0){
						this.resh();
						this.bosshp_reduce(bossData["HP2"]/bossData["HP1"])	
						}else{
							this.bosshp_reduce(0)
							this.showmessage("战斗胜利 金币加500")
							playData["money"] += 500;
							let timer:egret.Timer = new egret.Timer(2000, 1)
        					timer.start()
        					timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            					GameSceneView._gameScene.tobattleScene();
       						 }, this)
						}
				}else{
					
					playData["HP2"] += cardData[name]["ATK"]*cardData[name]["skill2"];
					this.resh();
					this.playhp_reduce(playData["HP2"]/playData["HP1"]);
				}
			}


			console.log(name+" skill2");
			
        },this);
	
	



	}

	resh(){
		let cardData : JSON=RES.getRes("card_json");
		let bossData : JSON=RES.getRes("boss_json");
		let playData : JSON=RES.getRes("player_json");


		this.boss_hp.text = bossData["HP2"];
		this.play_hp.text = playData["HP2"];
		this.cost.text = playData["cost"];

	}

	bosshp_reduce(num){
		let playData : JSON=RES.getRes("player_json");
		let wi = playData["boss"];
		playData["boss"] = 500*num;
    
	
		this.hp_boss.mask = new egret.Rectangle(0,0,wi,35);
		egret.Tween.get(this.hp_boss.mask).to({width:500*num},500);
		
		

	}
	playhp_reduce(num){
		let playData : JSON=RES.getRes("player_json");
		let wi = playData["play"];
		playData["play"] = 500*num;
    
	
		this.hp_play.mask = new egret.Rectangle(0,0,wi,35);
		egret.Tween.get(this.hp_play.mask).to({width:500*num},500);
		
		

	}
	bossturn(){
		let bossData : JSON=RES.getRes("boss_json");
		let playData : JSON=RES.getRes("player_json");
		var atk = bossData["ATK"];
		var line = playData["HP2"];
		if(line > atk){
			playData["HP2"] = line -atk;
			egret.Tween.get(this.boss).to({y:0},800).to({y:-168},800);
			this.playhp_reduce(playData["HP2"]/playData["HP1"]);
			messagerManager.showfaildinE1("boss行动结束 cost+3")
			playData["cost"] +=3
			this.resh();

		}else{
			this.playhp_reduce(0)
			messagerManager.showfaildinE1("战斗失败")

		}


		

	}
	 showmessage(name) {
        let text:string = name
     


        // 新建一个消息背景图
        let img:egret.Bitmap = new egret.Bitmap()
        img.texture = RES.getRes('toast-bg_png')
        this.addChild(img)
        img.x = 1920/2 - img.width / 2
        img.y = 500
        img.height = 40

        // 新建一个label用来显示
        let label:egret.TextField = new egret.TextField(); 
        label.text = text
        label.size = 20
        this.addChild(label)
        label.x = 1920/ 2 - label.width / 2
        label.y = 510
        label.height = 40

        // 创建一个定时器,1000毫秒后删除label
        let timer:egret.Timer = new egret.Timer(2000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            this.removeChild(label)
            this.removeChild(img)
        }, this)
    }

     
    


	
}