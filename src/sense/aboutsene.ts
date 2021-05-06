class aboutsene extends eui.Component implements  eui.UIComponent {

	public  tc1 : eui.Button; 

	public constructor() {
		super();
		this.$addListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);   
	}

	 private addToStage( ) {

		console.log("nihao");
		 this.tc1.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   console.log("return");
			   GameSceneView._gameScene.tohome()	
        },this);

	 }


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		
	}


	protected childrenCreated():void
	{
		
		super.childrenCreated();

	}
	
}