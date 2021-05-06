class GameData {
    public static CHANNEL = "MatchVS";
    public static DEFAULT_ENV = "alpha";
    public static ENVIRONMENT = { "dev": "alpha", "pro": "release" }
    public static gameID: number = 215927;//201489;
    public static appkey: string = "737202d460014c5ea5ec78c67a53a822#E";//4fb6406305f44f1aad0c40e5946ffe3d
    public static secretKey: string = "c423ff05b5b841478dcafd9d33072f7e";//5035d62b75bd4941b182579f2b8fc12c

    public static gameUser: GameUser = new GameUser();
    public static playerUserIds: Array<GameUser> = [];

    public static matchType: number = 0; //匹配类型
    public static randomMatch: number = 1;//随机匹配
    public static specialMatch: number = 2;//指定房间号匹配
    public static tagsMatch: number = 3; //指定属性匹配
    public static maxPlayerNum: number = 2;
    public static isRoomOwner: boolean = false;
    
    public static gameStartEvent: string = "gameStart";
    public static playerPositionEvent: string = "playerPosition";
    public static reconnectStartEvent: string = "gameReconnectStart";
    public static newStarEvent: string = "newStar";
    public static changeStarEvent: string = "changeStar";
    public static changeTurnEvent: string = "changeTurnEvent";
    public static gameReadyEvent: string = "gameReady";
    public static reconnectReadyEvent: string = "gameReconnectReady";

    public static events = {};
    public static syncFrame: boolean = false;
    public static isGameOver: boolean = false;
	public static my_hp_max:number = 0;			
	public static my_hp_now:number = 0;
    public static my_hp:number = 792;		
	public static emy_hp_max:number = 0;			
	public static emy_hp_now:number = 0;
    public static emy_hp:number = 582;
    public static emy_head:string = "";
    public static my_cost:number = 6;
    public static Stable:boolean = false;
    public static but: number = 0;


    public static frameRate: number = 5;
    public static defaultHeight: number = 400;
    public static roomID: string = "";
    public static intervalList: Array<number> = []; //定时器列表
    public static number1: string = "";
    public static number2: string = "";
    public static width: number;
    public static height: number;
    public static playerTime: number = 0;
    public static createRoomInfo = new MsCreateRoomInfo("MatchvsDemoEgret", 2, 0, 0, 1);

    public static init(){
        this.isGameOver = true;
        this.isRoomOwner = false;
        this.syncFrame = false;
        this.number1 = "";
        this.number2 = "";
        this.roomID = "";
        this.intervalList = [];
        this.playerUserIds = [];
    }

    public static configEnvir(channel, isdebug) {
        GameData.CHANNEL = channel;
        GameData.DEFAULT_ENV = isdebug ? GameData.ENVIRONMENT.dev : GameData.ENVIRONMENT.pro;
        if (channel === "MatchVS") {
            GameData.gameID=201150;
            GameData.appkey="0db8550d9bd345da82b852564f59d2e6";
            GameData.secretKey="15bf7e1bc2454d21b071d67f568e257c";
        }

        if (channel === "MatchVS-Test") {
            GameData.gameID=201170;
            GameData.appkey="a5b937f29a4c480bb6946093105c0565";
            GameData.secretKey="a8c5c84afde44136a5eea6f0ac09887c";
        }

        if (channel === "MatchVS-Test1") {
            GameData.gameID=201078;
            GameData.appkey="938e1ee0db444a079fe0695598677ba0";
            GameData.secretKey="9b11e0eca09141a1961d49d6b6028075";
        }
    }

    /**
     * 获取绑定openID地址
     */
    public static getBindOpenIDAddr(channel:string, platform:string):string{
        if(channel == "MatchVS" || channel == "Matchvs"){
            if(platform == "release"){
                return "http://vsuser.matchvs.com/wc6/thirdBind.do?"
            }else if(platform == "alpha"){
                return "http://alphavsuser.matchvs.com/wc6/thirdBind.do?";
            }
        }else if(channel == "MatchVS-Test1"){
            if(platform == "release"){
                return "http://zwuser.matchvs.com/wc6/thirdBind.do?"
            }else if(platform == "alpha"){
                return "http://alphazwuser.matchvs.com/wc6/thirdBind.do?";
            }
        }
        
    }


    /**
     * 获取签名
     */
    public static getSign(params:string):string{
        let str = GameData.appkey+"&"+params+"&"+GameData.secretKey;
        console.info("待签名："+str);
        let md5Str:string = new MD5().hex_md5(str);
        return md5Str;
    }
}