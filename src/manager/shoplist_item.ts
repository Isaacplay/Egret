// 必须要继承自 eui.ItemRenderer
class shoplist_item extends eui.ItemRenderer{
	// 选择框
	public hero_sel : eui.CheckBox;
	public need :eui.Label;

	public constructor() {

		super()
		// 把这个 类和皮肤 联系起来
		this.skinName = 'resource/skins/skin_items/herolist.exml'
		// 当组件创建完成的时候触发
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this)
	}
	private onComplete() {

		this.hero_sel.addEventListener(eui.UIEvent.CHANGE, (e) => {
			// this.data 就是绑定的数据, 
			this.data.isSelected = this.hero_sel.selected

			
		}, this)
	}
	// 当数据改变时，更新视图
	protected dataChanged() {
		// isSeleted 是我们提供数据的某个字段
		this.hero_sel.selected = this.data.isSelected
		
	}
	
}