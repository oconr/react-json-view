function getType(item: any){
    const itemString = Object.prototype.toString.call(item);
    const regEx = /(?!\[).+(?=\])/g;
    const match = itemString.match(regEx);

    if (match === null){
        return;
    }

    const t = match[0].split(' ')[1];
    return t.toLowerCase();
}

export default getType;