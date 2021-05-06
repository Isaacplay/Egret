/**
 * 场景管理类
 */
class SceneManager {
    private _stage:egret.DisplayObjectContainer // 设置所有场景所在的舞台(根)

    public home:home //主场景
    public shopsene:shopsene
    public aboutScene:aboutsene //关于场景
    public herosense : herosense
    public battlesense : battlesense
    public E1sense : E1sense
    public battlechoose : battlechoose
    public battle_login : battle_login
    public battle_lobby : battle_lobby
    public bat_match : bat_match
    private cuntPage:any;
    private thisContainer:egret.Sprite;

    constructor() {
        this.home = new home()
        this.shopsene = new shopsene()
        this.aboutScene = new aboutsene()
        this.herosense = new herosense()
        this.battlesense = new battlesense()
        this.E1sense = new E1sense()
        this.battlechoose = new battlechoose()
        this.battle_login = new battle_login()
        this.battle_lobby = new battle_lobby()
        this.bat_match = new bat_match()
    }

    /**
     * 获取实例
     */
    static sceneManager:SceneManager
    static get instance(){
        if(!this.sceneManager) {
            this.sceneManager =  new SceneManager()
        } 
        return this.sceneManager
    }
    /**
     * 设置根场景
     */
    public setStage(s:egret.DisplayObjectContainer) {
        this._stage = s
    }

    /**
     * 删除其他场景
     * @param scene 不需要删除的场景
     */
    private removeOther(scene) {
        //let arr = [this.home, this.heroScene, this.goodsScene, this.aboutScene]
        let arr = [this.home,this.aboutScene,this.shopsene,this.herosense,this.battlesense,this.E1sense,this.battlechoose,this.battle_login,this.battle_lobby,this.bat_match]
        arr.forEach((item)=> {
            if(scene == item) {
                return 
            }
            if(item.parent) {
                this.home.removeChild(item)
                console.log("删除成功");
            }
        })
    }

 static showInfo(arr:string[]) {
        let text:string = '你选择了: '
        if (arr.length === 0) {
            text = '厉害了什么都不选'
        } else {
            text += arr.toString()
        }
        // 新建一个消息背景图
        let img:egret.Bitmap = new egret.Bitmap()
        img.texture = RES.getRes('toast-bg_png')
        SceneManager.instance.shopsene.addChild(img)
        img.x = SceneManager.instance.shopsene.width / 2 - img.width / 2
        img.y = 500
        img.height = 40

        // 新建一个label用来显示
        let label:egret.TextField = new egret.TextField(); 
        label.text = text
        label.size = 20
        SceneManager.instance.shopsene.addChild(label)
        label.x = SceneManager.instance.shopsene.width / 2 - label.width / 2
        label.y = 510
        label.height = 40

        // 创建一个定时器,1000毫秒后删除label
        let timer:egret.Timer = new egret.Timer(3000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            SceneManager.instance.shopsene.removeChild(label)
            SceneManager.instance.shopsene.removeChild(img)
        }, this)
    }


    /**
     * 主场景
     */
    static tohome() {
        let stage:egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        let mainScene = SceneManager.instance.home // 主场景
        this.instance.removeOther(this.instance.home)

        // 判断主场景是否有父级(如果有,说明已经被添加到了场景中)
        if(!mainScene.parent){
            // 未被添加到场景
            // 把主场景添加到之前设置好的根舞台中
            stage.addChild(mainScene)
        } 

        // SceneManager.instance.removeOther(SceneManager.instance.home)
     }
     

    /**
     * 玩家场景
     */
    static tobattleScene() {
        //this.instance.removeOther(this.instance.heroScene)
        // 把玩家场景添加到主场景中
        this.instance.home.addChild(this.instance.battlesense)
    }

    /**
     * 英雄场景
     */
    static toHeroScene() {
        console.log("arrived shopsene");

       // let stage:egret.DisplayObjectContainer = this.instance._stage
        this.instance.home.addChild(this.instance.herosense)
    }

    /**
     * 物品场景
     */
    static toShopSene() {
        console.log("arrived shopsene");

        //let stage:egret.DisplayObjectContainer = this.instance._stage
        this.instance.home.addChild(this.instance.shopsene)
    }

    // /**
    //  * 关于场景
    //  */
    static toAboutSene() {
        console.log("arrived aboutsene");

        //let stage:egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        this.instance.home.addChild(this.instance.aboutScene)
    }
    static tobattlechoose() {
        console.log("arrived aboutsene");

        //let stage:egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        this.instance.home.addChild(this.instance.battlechoose)
    }
    static tobattle_login() {
        console.log("battle_login aboutsene");

        //let stage:egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        this.instance.home.addChild(this.instance.battle_login)
    }
    static tobattlelobby(){
        this.instance.home.addChild(this.instance.battle_lobby)
    }


      static toE1sense() {
        console.log("arrived aboutsene");

        //let stage:egret.DisplayObjectContainer = this.instance._stage // (根) 舞台
        this.instance.home.addChild(this.instance.E1sense)
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