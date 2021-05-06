class battlechoose extends eui.Component implements  eui.UIComponent {
	public tc : eui.Button;
	public bt_pvp :eui.Button;
	public bt_pve :eui.Button;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);   

	}
	private addToStage( ) {



		}      

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);

	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.tc.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   GameSceneView._gameScene.tohome()	
        },this);
		this.bt_pvp.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
				console.log("tobattle_login");
			   GameSceneView._gameScene.tobattle_login()			   
        },this);
		this.bt_pve.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   //console.log("E1 start");
			   GameSceneView._gameScene.tobattleScene()	
        },this);
	}
	
}