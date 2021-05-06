class battle_login extends eui.Component implements  eui.UIComponent {

	private txt_gameID:eui.TextInput;
	private txt_appKey:eui.TextInput;
	private txt_secretKey:eui.TextInput;
	private btn_enter:eui.Button;
	private btn_clear:eui.Button;
    private btn_return : eui.Button;
    private lab_clearNote:eui.Group;

	public constructor() {
		super();
		this.addMsResponseListen();
	}
    private getMyChilds(partName:string,instance:any){
		if("txt_gameID" == partName){
			this.txt_gameID = instance;
		}else if("txt_appKey" == partName){
			this.txt_appKey = instance;
		}else if("txt_secretKey" == partName){
			this.txt_secretKey = instance;
		}else if("btn_enter" == partName){
            this.btn_enter = instance;
			this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
				console.log(" environment=" + GameData.DEFAULT_ENV + " gameid=" + GameData.gameID);
				let result = mvs.MsEngine.getInstance.init(GameData.CHANNEL, GameData.DEFAULT_ENV, GameData.gameID, GameData.appkey,);
			}, this);
		}else if("btn_clear" == partName){
			this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearTween, this);
		}else if("btn_return" == partName){
			this.btn_return = instance;
			this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
				 GameSceneView._gameScene.tobattlechoose();
			}, this);
		}
		
	}

	protected partAdded(partName:string,instance:any):void
	{
		this.getMyChilds(partName,instance);
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.txt_gameID.text = GameData.gameID.toString();
		this.txt_appKey.text = GameData.appkey;
		this.txt_secretKey.text = GameData.secretKey;
	}



	private addMsResponseListen(){

        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_INIT_RSP, this.initResponse,this);
        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_REGISTERUSER_RSP, this.registerUserResponse,this);
        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_LOGIN_RSP, this.loginResponse,this);
    }
	 private initResponse(ev:egret.Event) {
        // console.log("initResponse,status:" + ev.data.status);
        if( ev.data.status !== 200){
            console.log("init failed", ev.data.status);
            return;
        }
     
            mvs.MsEngine.getInstance.registerUser();
       
    }

    /**
     * 调用 matchvs 注册接口回调
     */
    private registerUserResponse(ev:egret.Event) {
        let userInfo = ev.data;
        GameData.gameUser.id = userInfo.id;
        GameData.gameUser.name = userInfo.name;
        GameData.gameUser.avatar = userInfo.avatar;
        GameData.gameUser.token = userInfo.token;
        console.log("avatar", userInfo.avatar);
        //登录
        if(userInfo.status == 0){
            mvs.MsEngine.getInstance.login(userInfo.id, userInfo.token);
        }
    }
    /**
     * 调用 matchvs login 接口回调处理
     */
    private loginResponse(ev:egret.Event) {
        MvsHttpApi.TestApi();
        mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_LOGIN_RSP, this.loginResponse,this);
        let login = ev.data;
        console.log("loginResponse, status=" + login.status);
        if (login.status != 200) {
            console.log("登陆失败");
        } else {
            console.log("登陆成功 roomID=" + login.roomID);
            if (login.roomID !== "0") {
                GameData.roomID = login.roomID;
                //重新连接
                GameSceneView._gameScene.reconnectView();
            } else {
                GameSceneView._gameScene.tobattlelobby();
            }
        }
    }

	 
	 private clearTween(event: egret.TouchEvent){
        LocalStore_Clear();
        egret.Tween.get( this.lab_clearNote ).to({alpha:1},500).call(()=>{
                    this.lab_clearNote.visible = true;
                }).wait(500).to({alpha:0},500).call(()=>{
                    this.lab_clearNote.visible = false;
                });
    }


}