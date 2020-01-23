
class Queue{
	constructor(fun){
		this.last = Promise.resolve();
		this.fun = fun;
	}
	
	_append(callback){
		this.last = this.last.then(callback, callback);
	}
	
	/** 
	 * Вызывать переданную функцию
	 */
	appendFun(fun){
		return this._append(()=>fun());
	}
	
	/**
	 * Вызвать стандартную функцию с переданными аргументами
	 */
	appendArg(...args){
		return this._append(()=>this.fun(...args));
	}
	
	//Подписка на опустошение очереди
	empty(){
		return new Promise((resolve)=>{
			let last = this.last;
			const handler = ()=>{
				if(this.last === last){
					resolve();
				}
				else{
					last = this.last;
					last.then(handler, handler);
				}
			}
			last.then(handler, handler);
		});
	}
}


module.exports = Queue;