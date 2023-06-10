import isArray from "./isArray";
import isObject from "./isObject";

function isComplex(data: any){
    return isArray(data) || isObject(data);
}

export default isComplex;