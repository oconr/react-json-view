import { LineType, ParsedValueType } from "..";
import convertObject from "./convertObject";
import getType from "./getType";
import isComplex from "./isComplex";

function parseValue(key: string | number, value: any, showIndex: boolean, comma: boolean, lineType: LineType, line: number){
    const returnData: ParsedValueType = {
        name: key,
        line: line++,
        value: convertObject(value, lineType, line),
        type: getType(value),
        showIndex,
        comma,
        lineType,
        lastLineType: lineType,
        lastLine: isComplex(value) ? line++ : null
    };

    return returnData;
}

export default parseValue;