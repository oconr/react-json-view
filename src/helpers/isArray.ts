function isArray(item: any){
    if (item === 'array'){
        return true;
    }

    return Object.prototype.toString.call(item) === '[object Array]';
}

export default isArray;