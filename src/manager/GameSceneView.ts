class GameSceneView extends egret.Sprite
{
    public static _gameScene:GameSceneView;
    private thisContainer:egret.Sprite;
    private cuntPage:any;
    constructor()
    {
        super();
        GameSceneView._gameScene = this;
        this.initView();
    }
    public static errorResponse(errCode:number, errMsg:string){
        console.log("错误回调：errCode=" + errCode + " errMsg="+errMsg);
        GameSceneView._gameScene.errorView(0,"错误回调：errCode=" + errCode + " errMsg="+errMsg);
    }
    private errorResponses(event:egret.Event){
        //mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_ERROR_RSP, this.errorResponse, this);
        let errcode:number = event.data.errCode;
        let errmsg:string = event.data.errMsg;
        if(errcode == 1001){
            if(errmsg != "" && errmsg.indexOf("hotel") >= 0){
                GameSceneView._gameScene.errorView(1,"错误回调：errCode=" + errcode + " errMsg="+errmsg);
            }else{
                 GameSceneView._gameScene.errorView(0,"错误回调：errCode=" + errcode + " errMsg="+errmsg);
            }
        }
    }
    private initView():void
    {
         mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_ERROR_RSP, this.errorResponses, this);
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.tohome();
        // this.startModel();
    }

    public tohome(){
        this.removeAll();
        let starting:home = new home();
        this.thisContainer.addChild(starting);
    }

    public tobattleScene(){
        this.removeAll();
        var battleview:battlesense = new battlesense();
        this.thisContainer.addChild(battleview);
    }

    public toHeroScene():void
    {
        this.removeAll();
        var heroview:herosense = new herosense();
        this.thisContainer.addChild(heroview);
    }
    public toShopSene():void
    {
        this.removeAll();
        var shopview:shopsene = new shopsene();
        this.thisContainer.addChild(shopview);
    }
    public toAboutSene():void
    {
        this.removeAll();
        var aboutview:aboutsene = new aboutsene();
        this.thisContainer.addChild(aboutview);
    }
     public tobattlechoose():void
    {
        this.removeAll();
        var battlechooseview:battlechoose = new battlechoose();
        this.thisContainer.addChild(battlechooseview);
    }
      public tobattle_login():void
    {
        this.removeAll();
        var battle_loginseview:battle_login = new battle_login();
        this.thisContainer.addChild(battle_loginseview);
    }
     public tobattlelobby():void
    {
        this.removeAll();
        var battle_lobbyseview:battle_lobby = new battle_lobby();
        this.thisContainer.addChild(battle_lobbyseview);

    }
    public toE1sense():void
    {
        this.removeAll();
        var E1senseseview:E1sense = new E1sense();
        this.thisContainer.addChild(E1senseseview);

    }
     public tocksense():void
    {
        this.removeAll();
        var cksenseseview:CKsense = new CKsense();
        this.thisContainer.addChild(cksenseseview);

    }
    public showResult(users:Array<GameUser>, roomID:string):void{
		this.removeAll();
        let resultView:game_results = new game_results();
        resultView.setResult(users, roomID);
        this.thisContainer.addChild(resultView);
	} 
   

    public tobatmatch(tags:number, info?:any):void{
        this.removeAll();
        let match:bat_match = new bat_match();
        match.setJoinParame(tags, info);
        this.thisContainer.addChild(match);
    }
    public tosalesense():void
    {
        this.removeAll();
        var sale:salesense = new salesense();
        this.thisContainer.addChild(sale);

    }


    public play():void{
		this.removeAll();
        let gamePlay:PVPBattle = new PVPBattle();
        this.cuntPage = gamePlay;
        this.thisContainer.addChild(gamePlay);
	}
   public showRoomList(){
        this.removeAll();
        let roomlist:RoomListUI = new RoomListUI();
        this.thisContainer.addChild(roomlist);
        
    }


    public joinRoomSpecial(){
        this.removeAll();
        let joinroom:matchroom = new matchroom();
        this.thisContainer.addChild(joinroom);
    }

    
    /**
     * 创建房间
     */
    public createRoom(roomID ? :string, userPropery ?:string){
        this.removeAll();
        let containt:bat_match = new bat_match();
        // if(!roomID){
        //     //创建房间
        //     containt.doCreateRoom();
        // }else{
        //     //加入指定房间
        //     containt.doJoinRoomSpecial(roomID,userPropery);
        // }
        containt.setJoinParame(bat_match.JOINFLAG.CREATEROOM);
        this.thisContainer.addChild(containt);
    }

    /**
     * 通过房间号加入指定房间
     */
    // public joinRoomSpecial(){
    //     this.removeAll();
    //     let joinroom = new MatchRoomID();
    //     this.thisContainer.addChild(joinroom);
    // }

    public reconnectView(){
        this.removeAll();
        let reconnect = new ReconnectUI();
        this.thisContainer.addChild(reconnect);
    }

    public errorView(pageNo:number,msg:string):void{
        this.removeAll();
        GameData.init();
        let errornote = new error_note();
        errornote.SetErrorMsg(msg);
        // errorView.showReconnect();
        //登录界面
        if(pageNo === 0){
            // errorView.ReturnCallback = ()=>{
            //    this.login();
            // };
        }else if (pageNo === 2){//登录界面游戏大厅界面
            // errorView.ReturnCallback = ()=>{
            //     GameSceneView._gameScene.lobby();
            // };
        }
        
        this.thisContainer.addChild(errornote);
    }

    private removeAll():void
    {
        if(this.cuntPage && this.cuntPage.release){
            console.log("释放");
            this.cuntPage.release();
            this.cuntPage = null;
        }
        this.thisContainer.removeChildren();
    }

    
}