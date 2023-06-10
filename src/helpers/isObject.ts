function isObject(item: any){
    return Object.prototype.toString.call(item) === "[object Object]";
}

export default isObject;