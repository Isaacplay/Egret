class shopsene extends eui.Component implements  eui.UIComponent {

	public  tc2 : eui.Button; 
	public scr_shop:eui.Scroller;
	public lis_shop : eui.List;
	public  shop_res : eui.Button; 
	public hero_sel : eui.CheckBox;
	public shop_gouma : eui.Button; 
	public shop_quanxuan : eui.Button; 
    public shop_need : eui.Label;
	public shop_money : eui.Label;


	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);  
		
	}
    private addToStage(){
		this.fresh_money();
		let dataArr:any[] = [
			{image: 'resource/art/hero/bb.png',     name: 'BB', isSelected: false},
			{image: 'resource/art/hero/eqd.png',    name: '恩奇都', isSelected: false},
			{image: 'resource/art/hero/lls.png',    name: '莉莉丝', isSelected: false },
			{image: 'resource/art/hero/zhende.png', name: '贞德', isSelected: false},

		]
		// 转成eui数据
		let euiArr:eui.ArrayCollection = new eui.ArrayCollection(dataArr)
		// 把list_hero数据源设置成euiArr
		this.lis_shop.dataProvider = euiArr
		// 设置list_hero的项呈视器 (这里直接写类名,而不是写实例)
		this.lis_shop.itemRenderer = shoplist_item

	

		 


		// 点击返回按钮,回到主场景
		this.tc2.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{
			   console.log("return");			   
			   GameSceneView._gameScene.tohome()	
        },this)


		this.shop_gouma.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSelect, this)
		
	}

	
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	
	}


		onClickSelect(e) {
		// 拿到数据源
		let dataProvider = this.lis_shop.dataProvider
		let jsonData : JSON=RES.getRes("player_json");
		let arr:string[] = []
		let mon = jsonData["money"]
		let needed = 0;
		// 遍历数据源中所有项
		for(let i = 0; i < dataProvider.length; i ++) {
			let item = dataProvider.getItemAt(i)
			if (item.isSelected) {
				arr.push(item.name)
				needed += 1000
			}
		}
		console.log("money"+mon+"need"+needed);
		if(mon>=needed){
			mon = mon-needed
			jsonData["money"] = mon
			this.shop_money.text = mon
			SceneManager.showInfo(arr)

			for(let i = 0; i < dataProvider.length; i ++) {
			let item = dataProvider.getItemAt(i)
			if (item.isSelected) {
				this.date_change(item.name)
			}

		}


		}else{
			messagerManager.showfaildinshop("金币不够")
		}




		

	}
	   fresh_money(){
		 
        let jsonData : JSON=RES.getRes("player_json");
        for(var item in jsonData){  
         if(item=='money'){  //item 表示Json串中的属性，如'name'  
            var jValue=jsonData[item];//key所对应的value  
            this.shop_money.text = jValue }  }}

		date_change(a){

				switch(a){

					case "BB": this.add_data("bb"); break;
					case "恩奇都": this.add_data("eqd");break;
					case "莉莉丝": this.add_data("lls");break;
					case "贞德": this.add_data("zhende");break;
				}	
		}			

	    add_data(name){
			console.log("add"+name);	
			let jsonData : JSON=RES.getRes("player_json");
			let i = jsonData["player_card"][name]
			i = i+1
			jsonData["player_card"][name] = i
	
		}		

	
}