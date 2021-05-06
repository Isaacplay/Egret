class PVPBattle extends eui.Component implements  eui.UIComponent {
	private hpplay = new eui.Rect();
	private hpemy = new  eui.Rect();
	private lab_1:eui.Label;
	private lab_2:eui.Label;
	public over :eui.Button;
	public cost :eui.Label;
	public escape : eui.Button;
	private img_header:eui.Image;

	private _star:egret.Bitmap;
	private _starObject:egret.DisplayObject;
	private _score:number;
	private _scoreLabel:eui.Label;
	private _delayLabel:eui.Label;
	private _minDelayValue:number;
	private _maxDelayValue:number;
	private _receiveCountValue:number;
	private _receiveMsgCountLabel:eui.Label;
	private _countDownLabel:eui.Label;
	private _netWorkNoticeLabel:eui.Label;
	private _roomID:string;
	private _fontSize = 22;
	private _gameTime:number;
	private moveTimeer:egret.Timer = new egret.Timer(100, 0);

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(event:egret.Event){
		GameData.width = this.stage.stageWidth;
		GameData.height = this.stage.stageHeight;

		if (GameData.isRoomOwner == true) {
	
			GameData.gameUser.myturn = true;	
		}

		this.over.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
	
			   
			   GameData.gameUser.myturn = false;
			   
			   	let eventTemp = {
				action: GameData.changeTurnEvent}
				let result = mvs.MsEngine.getInstance.sendEvent(JSON.stringify(eventTemp));	
				this.showmessage("回合结合 现在是他的回合")
				GameData.my_cost += 3;
				this.resh()
				


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
		this.startLoad();
	}
	private startLoad():void {
		



        if (GameData.syncFrame === true && GameData.isRoomOwner === true) {
			let result = mvs.MsEngine.getInstance.setFrameSync(GameData.frameRate);
            if (result !== 0){
				console.log('设置帧同步率失败,错误码:' + result);
			}
        }

		// GameData.userScoreAll = [];
		/**
		 * 游戏结束标记置空
		 */
		GameData.isGameOver = false;
		this._gameTime = GameData.playerTime;
		this._score = 0;
		this._receiveCountValue = 0;



		this.startanimal()
	


		/**
		 * 顶部显示自己的 用户信息
		 */
        let userIdLabel = new eui.Label();
        userIdLabel.textColor = 0xffffff;
        userIdLabel.fontFamily = "Tahoma";  //设置字体
		userIdLabel.text = "用户id:" + GameData.gameUser.id+"["+GameData.gameUser.name+"]";
		userIdLabel.size = this._fontSize;
        userIdLabel.x = 20;
        userIdLabel.y = 20;
        this.addChild(userIdLabel);

		/**
		 * 房间号显示控件
		 */
        let roomIdLabel = new eui.Label();
        roomIdLabel.textColor = 0xffffff;
        roomIdLabel.fontFamily = "Tahoma";  //设置字体
		roomIdLabel.text = "房间号:" + GameData.roomID;
		this._roomID = GameData.roomID;
		roomIdLabel.size = this._fontSize;
        roomIdLabel.x = 20;
        roomIdLabel.y = 60;
        this.addChild(roomIdLabel);

		/**
		 * 所有角色的分数显示控件 
		 */
        let scoreLabel = new eui.Label();
        scoreLabel.textColor = 0xffffff;
        scoreLabel.fontFamily = "Tahoma";  //设置字体
		scoreLabel.size = this._fontSize;
        scoreLabel.x = 20;
        scoreLabel.y = 100;
		this._scoreLabel = scoreLabel;
        this.addChild(this._scoreLabel);

		/**
		 * 当前延迟显示控件
		 */
        let delayLabel = new eui.Label();
        delayLabel.textColor = 0xffffff;
        delayLabel.fontFamily = "Tahoma";  //设置字体
		delayLabel.size = this._fontSize;
        delayLabel.x = 20;
        delayLabel.y = GameData.height - 200;
		this._delayLabel = delayLabel;
        this.addChild(this._delayLabel);		

		/**
		 * 收到消息数量显示控件
		 */
        let receiveMsgCountLabel = new eui.Label();
        receiveMsgCountLabel.textColor = 0xffffff;
        receiveMsgCountLabel.fontFamily = "Tahoma";  //设置字体
		receiveMsgCountLabel.size = this._fontSize;
        receiveMsgCountLabel.x = 20;
        receiveMsgCountLabel.y = GameData.height - 80;
		this._receiveMsgCountLabel = receiveMsgCountLabel;
        this.addChild(this._receiveMsgCountLabel);		

		/**
		 * 计时控件
		 */
        let countDownLabel = new eui.Label();
        countDownLabel.textColor = 0xffffff;
        countDownLabel.fontFamily = "Tahoma";  //设置字体
		countDownLabel.size = this._fontSize;
        countDownLabel.x = GameData.width/2;
        countDownLabel.y = 20;
		countDownLabel.text = "回合："+this._gameTime.toString();
		countDownLabel.size = 60;
		this._countDownLabel = countDownLabel;
        this.addChild(this._countDownLabel);

		/**
		 * 有人离开时提示控件
		 */
		let netWorkNoticeLabel = new eui.Label();
        netWorkNoticeLabel.textColor = 0xff0000;
        netWorkNoticeLabel.fontFamily = "Tahoma";  //设置字体
		netWorkNoticeLabel.size = this._fontSize;
        netWorkNoticeLabel.x = GameData.width/2;
        netWorkNoticeLabel.y = 50;
		netWorkNoticeLabel.text = "";
		this._netWorkNoticeLabel = netWorkNoticeLabel;
        this.addChild(this._netWorkNoticeLabel);	


		/**
		 * 初始化并且设置分数
		 */
		this.inithp();

	

		


		
		//注册matchvs网络监听事件
		this.addMsResponseListen();
	}

/**
	 * 注册 matchvs 组件监听事件
	 */
	private addMsResponseListen(){
		
        //发送消息
        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_SENDEVENT_NTFY, this.sendEventNotify,this);
        //离开房间
        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this.leaveRoomNotify,this);

		mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this.networkStateNotify,this);
    }

    public release(){
        mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_SENDEVENT_NTFY, this.sendEventNotify,this);
        mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this.leaveRoomNotify,this);
		mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this.networkStateNotify,this);

    }





	inithp(){
		let jsonData : JSON=RES.getRes("player_json");
		let data : JSON=RES.getRes("card_json");

		jsonData["cost"] = jsonData["cost_a"];
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
			GameData.my_hp_max = num;
			GameData.my_hp_now = num;
			this.resh()

			let eventTemp = {
				action: GameData.newStarEvent,
				hp: num,
				head: GameData.gameUser.avatar
			}
			let result = mvs.MsEngine.getInstance.sendEvent(JSON.stringify(eventTemp));
			if (!result || result.result !== 0) {
				return console.log('HP发送失败');
			}
			console.log('HP发送成功');
	}
	
}

set_team1(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 162;
        image.y = 347;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{          
			this.add_skill(name)
        },this);
	}
	set_team2(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 538;
        image.y = 347;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{            
			this.add_skill(name)
        },this);
	}
	set_team3(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 162;
        image.y = 713;
		image.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{         
			this.add_skill(name)
        },this);
	}
	set_team4(name){
		var image = new eui.Image();
        image.source = 'resource/art/bat/'+name+'.png';
        this.addChild(image);
        image.x = 538;
        image.y = 713;
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
		back.x = 928;
		back.y = 570;
        skill1.x = 1000;
        skill1.y = 575;
		skill2.x = 1000;
        skill2.y = 745;
		
		skill1.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			if(GameData.gameUser.myturn){
			if(playData["cost"] >= cardData[name]["skill1cost"]){

				playData["cost"] -= cardData[name]["skill1cost"];
				GameData.emy_hp_now -= cardData[name]["ATK"]*cardData[name]["skill1"];
				console.log("emy_hp_now:"+GameData.emy_hp_now);
				GameData.my_cost = playData["cost"];
				let eventTemp = {
				action: GameData.changeStarEvent,
				hp: GameData.emy_hp_now,
				myhp:GameData.my_hp_now,
				id:GameData.gameUser.id}
				let result = mvs.MsEngine.getInstance.sendEvent(JSON.stringify(eventTemp));
				GameData.my_cost = playData["cost"];
				if(GameData.emy_hp_now >0){
					this.resh();
					this.emyhp_reduce(GameData.emy_hp_now/GameData.emy_hp_max)	
				}else{
						let i:number = 0;
					for(i = 0; i < GameData.playerUserIds.length; i++) {
							if (GameData.playerUserIds[i].id == GameData.gameUser.id) {
							GameData.playerUserIds[i].win = true;
							break;
						}}
					GameSceneView._gameScene.showResult(GameData.playerUserIds, this._roomID)	

				}
			}else{
				messagerManager.showfaildinE1("Cost不足")
			}
			}		
        },this);

		skill2.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			if(GameData.gameUser.myturn){
			if(playData["cost"] >= cardData[name]["skill2cost"]){

				playData["cost"] -= cardData[name]["skill2cost"];
				if(name !="eqd"){
					GameData.emy_hp_now -= cardData[name]["ATK"]*cardData[name]["skill2"];
					GameData.my_cost = playData["cost"]
					if(bossData["HP2"] >0){
						this.resh();
						this.emyhp_reduce(GameData.emy_hp_now/GameData.emy_hp_max)	
						}else{
							this.emyhp_reduce(0)
							this.showmessage("战斗胜利")
							playData["money"] += 500;
							let timer:egret.Timer = new egret.Timer(2000, 1)
        					timer.start()
        					timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            					let i:number = 0;
								for(i = 0; i < GameData.playerUserIds.length; i++) {
									if (GameData.playerUserIds[i].id == GameData.gameUser.id) {
										GameData.playerUserIds[i].win = true;
										break;
											}}
										GameSceneView._gameScene.showResult(GameData.playerUserIds, this._roomID)	
       						 }, this)
						}
				}else{
					
					GameData.my_hp_now += cardData[name]["ATK"]*cardData[name]["skill2"];
					this.resh();
					this.myhp_reduce(GameData.my_hp_now/GameData.my_hp_max);
				}
			}
			}
        },this);

		let eventTemp = {
				action: GameData.changeStarEvent,
				hp: GameData.emy_hp_now,
				myhp:GameData.my_hp_now,
				id:GameData.gameUser.id}
				let result = mvs.MsEngine.getInstance.sendEvent(JSON.stringify(eventTemp));
	
	
}


	startanimal(){
		console.log("startanimal");
		this.hpplay.mask = new egret.Rectangle(0,0,28,0);
		egret.Tween.get(this.hpplay.mask).to({height:792},3000);

		this.hpemy.mask = new egret.Rectangle(0,0,26,0);
		egret.Tween.get(this.hpemy.mask).to({height:582},3000);

		
	}
	/**
	 * 收到消息事件
	 */
	private sendEventNotify(event:egret.Event) {
		let sdnotify = event.data;
		if (sdnotify && sdnotify.cpProto) {
            if (sdnotify.cpProto.indexOf(GameData.newStarEvent) >= 0) {
				if(sdnotify.srcUserId != GameData.gameUser.id) {
					//console.log("new star event");
					let info = JSON.parse(sdnotify.cpProto);
					GameData.emy_hp_max = info.hp;
					GameData.emy_hp_now = info.hp;
					GameData.emy_head = info.head;
					this.resh()
					


				}
            } else if(sdnotify.cpProto.indexOf(GameData.changeStarEvent) >= 0){
					let info = JSON.parse(sdnotify.cpProto);
					GameData.my_hp_now = info.hp;
					GameData.emy_hp_now = info.myhp

					if(GameData.my_hp_now <= 0){
						let i:number = 0;
						   for(i = 0; i < GameData.playerUserIds.length; i++) {
							if (GameData.playerUserIds[i].id == info.id) {
							GameData.playerUserIds[i].win = true;
							break;
						}}

						GameSceneView._gameScene.showResult(GameData.playerUserIds, this._roomID)	
					}
					this.resh()
					this.myhp_reduce(GameData.my_hp_now/GameData.my_hp_max)
			}else if(sdnotify.cpProto.indexOf(GameData.changeTurnEvent) >= 0){

				 this.showmessage("你的回合开始")
				 GameData.gameUser.myturn = true;
			}
		}
	}
	resh(){

		this.lab_1.text = GameData.my_hp_now.toString();
		this.lab_2.text = GameData.emy_hp_now.toString();
		this.cost.text = GameData.my_cost.toString()
		this.img_header.source = GameData.emy_head;

	}
	myhp_reduce(num){

		let ad = GameData.my_hp;
		GameData.my_hp = 792*(GameData.my_hp_now/GameData.my_hp_max)
		this.hpplay.mask = new egret.Rectangle(0,0,28,ad);
		egret.Tween.get(this.hpplay.mask).to({height:GameData.my_hp},1000);
		
		

	}
	emyhp_reduce(num){

		let wi = GameData.emy_hp;
		GameData.emy_hp = 582*(GameData.emy_hp_now/GameData.emy_hp_max)
		this.hpemy.mask = new egret.Rectangle(0,0,26,wi);
		egret.Tween.get(this.hpemy.mask).to({height:GameData.emy_hp},1000);
		
		

	}
	

	/**
	 * 离开房间异步回调
	 */
	private leaveRoomNotify(ev:egret.Event) {
		GameData.isGameOver = true;
		this.release();
		console.log("2结束房间ID：",  GameData.roomID, GameData.playerUserIds);
		GameSceneView._gameScene.showResult(GameData.playerUserIds,this._roomID);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

	}

	private networkStateNotify(ev:egret.Event){
		let netnotify = ev.data;
		console.log("玩家："+netnotify.userID+" state:"+netnotify.state);
		if(netnotify.state === 1){
			this._netWorkNoticeLabel.text = "玩家掉线:"+netnotify.userID;
			console.log("玩家掉线:"+netnotify.userID);
		}else if(netnotify.state === 2 ){
			console.log("玩家已经重连进来");
			this._netWorkNoticeLabel.text = "";
		}else{
			console.log("玩家："+ netnotify.userID+" 重新连接失败！离开房间，游戏结束");
			mvs.MsEngine.getInstance.leaveRoom("玩累了");
			this.release();
			GameSceneView._gameScene.tobattlelobby();
			GameData.isGameOver = true;
			GameData.isRoomOwner = false;
			GameData.syncFrame = false;
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