class GameUser {

	public id:number = 0;	//用户ID
	public name:string = "";	//名称
	public avatar:string = "resource/art/button/E1_1";
	public token:string = "";			//校验值
	public pValue:number = 0;			//积分
	public tableID:number = 0;
	public isOwner = false;				//房主标记
	public myturn = false;
	public win = false;


	public constructor() {
	}
}