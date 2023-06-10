import { ParsedValueType } from "..";
import isComplex from "./isComplex";
import isSameType from "./isSameType";
import parseData from "./parseData";
import parseValue from "./parseValue";

function mergeData(oldData: any, newData?: any){
    let result: ParsedValueType[] = [];
    let start = 1;

    if (isSameType(oldData, newData) && isComplex(newData)){
        parseData(oldData, newData, start, result);
    } else {
        if (newData === undefined || oldData === newData){
            result.push(parseValue(0, oldData, false, false, "unchanged", start));
        } else {
            result.push(parseValue(0, oldData, false, true, "deleted", start));
            result.push(parseValue(1, newData, false, false, "added", start));
        }
    }

    return result;
}

export default mergeData;