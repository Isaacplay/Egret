class CKsense extends eui.Component implements  eui.UIComponent {
	public lab_money : eui.Label;
	public btn_banck : eui.Button;
	public btn_start : eui.Button;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);  
		
	}
	 private addToStage(){
		let jsonData : JSON=RES.getRes("player_json");
		this.lab_money.text = "你的金币："+jsonData["money"]



		this.btn_banck.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   console.log("return");			   
			   GameSceneView._gameScene.tohome()	
        },this)
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   console.log("CK start");
			   if(jsonData["money"]>=5000){
				   this.startanimal()
				   jsonData["money"] -= 5000;
				   this.lab_money.text = "你的金币："+jsonData["money"]
			   }else{
				   this.showmessage("金币不够，努力赚钱吧")
			   }
			   	   
			   
        },this)
	 }

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	startanimal(){
		
		let img1 = new eui.Image();
		let img2 = new eui.Image();
		let img3 = new eui.Image();
		let img4 = new eui.Image();

        img1.texture = RES.getRes('back2_png')
		img2.texture = RES.getRes('back2_png')
		img3.texture = RES.getRes('back2_png')
		img4.texture = RES.getRes('back2_png')
        this.addChild(img1)
		this.addChild(img2)
		this.addChild(img3)
		this.addChild(img4)
        img1.x = 828
        img1.y = -297
		img2.x = 828
        img2.y = -297
		img3.x = 828
        img3.y = -297
		img4.x = 828
        img4.y = -297

		egret.Tween.get(img1).to({y:-2.5},1000).to({x:204,y:448},1000)
		egret.Tween.get(img2).to({y:-2.5},1000).to({x:590,y:299},1000)
		egret.Tween.get(img3).to({y:-2.5},1000).to({x:1089,y:299},1000)
		egret.Tween.get(img4).to({y:-2.5},1000).to({x:1496,y:448},1000)

		let timer1:egret.Timer = new egret.Timer(3000, 1)
        timer1.start()
        timer1.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
			let i =this.hero_random()
			console.log("CK1"+i);
			img1.source = 'resource/art/bat/'+i+'.png';
			this.addhero(i)



        }, this)
		let timer2:egret.Timer = new egret.Timer(4000, 1)
        timer2.start()
        timer2.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
			let i =this.hero_random()
			console.log("CK2"+i);
			img2.source = 'resource/art/bat/'+i+'.png';
			this.addhero(i)


        }, this)
		let timer3:egret.Timer = new egret.Timer(5000, 1)
        timer3.start()
        timer3.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
			let i =this.hero_random()
			console.log("CK3"+i);
			img3.source = 'resource/art/bat/'+i+'.png';
			this.addhero(i)

        }, this)
		let timer4:egret.Timer = new egret.Timer(6000, 1)
        timer4.start()
        timer4.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{let i =this.hero_random()
			console.log("CK4"+i);
			img4.source = 'resource/art/bat/'+i+'.png';
			this.addhero(i)

        }, this)

	}

	hero_random(){
		var str= ["eqd","lls","zhende","bb","yz"]
		var i = str.length
		var a = this.randomnum(0,9)
		if( a== 0){
			return str[4]
		}else{
			console.log("random:"+a);
			return str[this.randomnum(0,3)]
		}
		
		
		
		
	}
	randomnum(min:number,max:number){

		switch(arguments.length){ 
        case 1: 
			return Math.round(Math.random()*min+1);
        case 2: 
			return Math.round(Math.random()*(max-min)); 
        default: 
            return 0; 

			}
	
		}
	addhero(hero:string){
		let jsonData : JSON=RES.getRes("player_json");
		jsonData["player_card"][hero] += 1;

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