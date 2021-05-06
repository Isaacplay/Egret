class home extends eui.Component implements  eui.UIComponent {

	


     public   Group_mbtn : eui.Group ;      
     public  btn_gy : eui.ToggleButton ;      
	 public  btn_pz : eui.ToggleButton ;      
	 public  btn_zd : eui.ToggleButton ;      
	 public  btn_sc : eui.ToggleButton ;
	 public  cha : eui.Button; 
	 public lis_button : eui.List;


	  private _source:Array<string> =  [ 
		"resource/art/char/1.png",
        "resource/art/char/2.png",
        "resource/art/char/3.png",
        "resource/art/char/4.png"
    ]; 

	 public  constructor ()   {          
		 super ();
		 this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);      
		}

	 private addToStage( ) {
		GameData.but=0;
		this.lis_button.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this)

		var source:Array<string> = this._source; 
        var img:eui.Image = new eui.Image();
		//var btn:eui.Button = new eui.Button();
		// this.cha.skinName="resource/skins/skin_items/cha.exml";
        img.source = source[1];
        this.addChild(img);
        img.verticalCenter = 0;
        img.y = 0;

		//this.add_herolis()

        this.cha.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("change bankan");
            //var img:eui.Image = <eui.Image>e.target;
            var random = Math.floor(Math.random() * 4);
			///随机指定图片的源。
            img.source = source[random];	
        },this);
		
		this.btn_gy.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("to toAboutSene");
            GameSceneView._gameScene.toAboutSene()	
        },this);

		this.btn_sc.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("to toshopsene");
			this.showbutton()
            
        },this);

		this.btn_pz.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			console.log("to toherosene");
            GameSceneView._gameScene.toHeroScene()
        },this);

		this.btn_zd.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
            GameSceneView._gameScene.tobattlechoose()
        },this);
		


		}      
     protected  partAdded ( partName : string , instance : any ): void      
	 {
		           super.partAdded ( partName , instance );
		          
	}      
	showbutton(){
		let dataArr:any[] = [];
		if(GameData.but == 0){
			dataArr.push({name :"商城"},{name:"抽卡"})
			GameData.but = 1;
		}else{
			GameData.but = 0;
		}

		let euiArr:eui.ArrayCollection = new eui.ArrayCollection(dataArr)
		this.lis_button.dataProvider = euiArr
	}
	onChange(){
		if(this.lis_button.selectedIndex ==0){
			GameSceneView._gameScene.toShopSene()	
		}else{
			GameSceneView._gameScene.tocksense()		
		}
	}

	


}

	/**
	 * 切换按钮
	 * @param btn 参数是eui.ToggleButton的时候切换按钮, 参数是0的时候设置为全部不选中
	 */

				


