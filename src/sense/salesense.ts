class salesense extends eui.Component implements  eui.UIComponent {
	public btn_tc :eui.Button;
	public lis_hero : eui.List;
	public scr_hero:eui.Scroller;
	public lab_money : eui.Label;



	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);  

	}
	private addToStage(){
		this.change_json()
		let jsonData : JSON=RES.getRes("player_json");
		this.lab_money.text = "金币："+jsonData["money"]

		this.lis_hero.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this)

		

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

	select_team(name){
		let jsonData : JSON=RES.getRes("player_json");
		jsonData["player_card"][name] -=1;
		this.change_json()
		jsonData["money"] += 500;	
		this.lab_money.text = "金币："+jsonData["money"]
		this.showmessage("您出售了"+name+"获得了500金")
				
			

		}
	

			

	


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.btn_tc.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   console.log("return");			   
			   GameSceneView._gameScene.toHeroScene()	
        },this)
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