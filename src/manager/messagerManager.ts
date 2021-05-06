class messagerManager {
    private _stage:egret.DisplayObjectContainer // 设置所有场景所在的舞台(根)

    public home:home //主场景
    public shopsene:shopsene
    public aboutScene:aboutsene //关于场景
    public herosense : herosense
    public battlesense : battlesense
    public E1sense : E1sense

    constructor() {
        this.home = new home()
        this.shopsene = new shopsene()
        this.aboutScene = new aboutsene()
        this.herosense = new herosense()
        this.battlesense = new battlesense()
        this.E1sense = new E1sense()
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
        //GameSceneView._gameScene.ShopSene.addChild(img)
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

 static showfaildinE1(name) {
        let text:string = name
     


        // 新建一个消息背景图
        let img:egret.Bitmap = new egret.Bitmap()
        img.texture = RES.getRes('toast-bg_png')
        SceneManager.instance.E1sense.addChild(img)
        img.x = SceneManager.instance.E1sense.width / 2 - img.width / 2
        img.y = 500
        img.height = 40

        // 新建一个label用来显示
        let label:egret.TextField = new egret.TextField(); 
        label.text = text
        label.size = 20
        SceneManager.instance.E1sense.addChild(label)
        label.x = SceneManager.instance.E1sense.width / 2 - label.width / 2
        label.y = 510
        label.height = 40

        // 创建一个定时器,1000毫秒后删除label
        let timer:egret.Timer = new egret.Timer(2000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            SceneManager.instance.E1sense.removeChild(label)
            SceneManager.instance.E1sense.removeChild(img)
        }, this)
    }

     static showfaildinshop(name) {
        let text:string = name
     


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
        let timer:egret.Timer = new egret.Timer(2000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            SceneManager.instance.shopsene.removeChild(label)
            SceneManager.instance.shopsene.removeChild(img)
        }, this)
    }
     static showfaildinbat(name) {
        let text:string = name
     


        // 新建一个消息背景图
        let img:egret.Bitmap = new egret.Bitmap()
        img.texture = RES.getRes('toast-bg_png')
        SceneManager.instance.battlesense.addChild(img)
        img.x = SceneManager.instance.battlesense.width / 2 - img.width / 2
        img.y = 500
        img.height = 40

        // 新建一个label用来显示
        let label:egret.TextField = new egret.TextField(); 
        label.text = text
        label.size = 20
        SceneManager.instance.battlesense.addChild(label)
        label.x = SceneManager.instance.battlesense.width / 2 - label.width / 2
        label.y = 510
        label.height = 40

        // 创建一个定时器,1000毫秒后删除label
        let timer:egret.Timer = new egret.Timer(2000, 1)
        timer.start()
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e)=>{
            SceneManager.instance.battlesense.removeChild(label)
            SceneManager.instance.battlesense.removeChild(img)
        }, this)
    }

 
}