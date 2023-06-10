import { LineType } from "..";
import getType from "./getType";
import isComplex from "./isComplex";

function convertObject(item: any, lineType: LineType, line: number){
    let list: any[] = [];

    if (isComplex(item)){
        const showIndex = getType(item) === 'object';
        const keys = Object.keys(item);
        const length = keys.length;

        keys.forEach((key, index) => {
            let type = getType(item[key]);

            list.push({
                name: key,
                line: line++,
                value: convertObject(item[key], lineType, line),
                type,
                showIndex,
                comma: length !== index + 1,
                lineType,
                lastLineType: lineType,
                lastLine: isComplex(item[key]) ? line++ : null
            });
        });

        return list;
    } else {
        switch (getType(item)){
            case 'number':
            case 'boolean':
            case 'regexp':
                return item.toString();
            case 'null':
                return 'null';
            case 'undefined':
                return 'undefined';
            case 'function':
                return ' ƒ() {...}';
            default:
                return `"${item.toString()}"`;
        }
    }
}

export default convertObject;