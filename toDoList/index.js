
// var count = 0;

var app = new Vue({
	el: '#app',
	data: {
		count: JSON.parse(localStorage.todos?localStorage.todos:'[]').length,
		todos: JSON.parse(localStorage.todos?localStorage.todos:'[]')/*[
			{tid: 1, type: "undo", content: "大吉大利ff"},
			{tid: 2, type: "done", content: "今晚吃鸡第三方付付付付付付付付付付付付付付付付付付付付付付付付大幅度舒服舒服色法说的是地方士大夫士大夫身份无法威风威风我发我发额访问范围分为非我无法额飞水电费水电费的我发违法我"}
		], //*/,
		types: [
			{type: "all", content: "全部"},
			{type: "done", content: "已完成"},
			{type: "undo", content: "未完成"},
		],
		showType: "all",
		isInsertShow: false,
		newContent: "",
		isSelect: false,
		isAllSelect: true,
		isEditing: false,
		editId: null
		
	},
	methods: {
		finish: function(tid){
			this.todos.forEach((item)=>{
				if (item.tid === tid) {
					item.type = item.type == "done"?"undo":"done";
					return;
				}
			});
			this.updateLocal();
		},
		remove: function(tid){
			this.todos.forEach((item, index)=>{
				if (item.tid === tid) {
					this.todos.splice(index, 1);
					return;
				}
			});
			this.updateLocal();
		},
		addTodo: function(){
			this.isInsertShow = true;
		},
		addNew: function(){
			if (this.isEditing) {
				this.todos.forEach((item)=>{
					if (item.tid == this.editId) {
						item.content = this.newContent;
						this.isEditing = false;
					}
				})
			} else {
				this.todos.unshift({
					tid: ++this.count,
					type: "undo",
					content: this.newContent,
					isSelectThis: false
				});
			}
			
			this.newContent = "";
			this.isInsertShow = false;
			this.updateLocal();
		},
		updateLocal: function(){
			localStorage.todos = JSON.stringify(this.todos);
		},
		selectAll: function(){
			this.todos.forEach((item)=>{
				item.isSelectThis = this.isAllSelect;
			});
			this.isAllSelect = !this.isAllSelect;
		},
		allDone: function(){
			this.todos.forEach((item)=>{
				if (item.isSelectThis) {
					item.type = "done";
				}
			});
		},
		allUndo: function(){
			this.todos.forEach((item)=>{
				if (item.isSelectThis) {
					item.type = "undo";
				}
			});
		},
		allRemove: function(){
			this.todos.forEach((item)=>{
				if (item.isSelectThis) {
					this.todos.splice(this.todos.indexOf(item), 1);
				}
			})
			this.updateLocal();
		},
		editTodo: function(tid){
			this.isInsertShow = true;
			this.todos.forEach((item)=>{
				if (item.tid === tid) {
					this.newContent = item.content;
					this.isEditing = true;
					this.editId = tid;
					return;
				}
			})
			
		}
	},
	computed: {
		doneToDos: function(){
			var arr = [];
			this.todos.forEach((item)=>{
				if (item.type === "done") {
					arr.push(item);
				}
			})
			return arr;
		},
		unDos: function(){
			var arr = [];
			this.todos.forEach((item)=>{
				if (item.type === "undo") {
					arr.push(item);
				}
			})
			return arr;
		},
		showToDos: function(){
			switch(this.showType){
				case "done": return this.doneToDos; break;
				case "undo": return this.unDos; break;
				default: return this.todos;
			}
		}
	},
	watch: {
		isSelectThis: function(){
			console.lg(this.isAllSelect);
			this.isAllSelect = !this.isAllSelect;
		}
	}
		
})