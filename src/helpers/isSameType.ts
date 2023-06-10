function isSameType(oldData: any, newData: any){
    return Object.prototype.toString.call(oldData) === Object.prototype.toString.call(newData);
}

export default isSameType;