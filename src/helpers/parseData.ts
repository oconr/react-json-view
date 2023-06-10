import isArray from "./isArray";
import isComplex from "./isComplex";
import isObject from "./isObject";
import isSameType from "./isSameType";
import parseValue from "./parseValue";

function parseData(oldData: any, newData: any, line: number, returnData: any[]){
    const oldKeys = Object.keys(oldData);
    const newKeys = Object.keys(newData);

    const showIndex = isObject(newData);

    const deletedKeys = oldKeys.filter(key => !newKeys.includes(key));
    const commonKeys = oldKeys.filter(key => newKeys.includes(key));
    const addedKeys = newKeys.filter(key => !oldKeys.includes(key));

    deletedKeys.forEach((key, index) => {
        let comma = true;

        if (commonKeys.length < 1 && addedKeys.length < 1  && index === deletedKeys.length - 1){
            comma = false;
        }

        returnData.push(parseValue(key, oldData[key], showIndex, comma, "deleted", line));
    });

    commonKeys.forEach((key, index) => {
        let comma = true;

        if (addedKeys.length === 0 && index === commonKeys.length - 1){
            comma = false;
        }

        if (oldData[key] === newData[key]){
            returnData.push(parseValue(key, oldData[key], showIndex, comma, "unchanged", line));
        } else if (isSameType(oldData[key], newData[key])){
            if (isComplex(newData[key])){
                const parsedValue = parseValue(key, isArray(oldData[key]) ? [] : {}, showIndex, comma, "unchanged", line);
                returnData.push(parsedValue);

                line -= 1;

                parseData(oldData[key], newData[key], line, parsedValue.value);
                parsedValue.lastLine = line++;
            } else {
                returnData.push(parseValue(key, oldData[key], showIndex, true, "deleted", line));
                returnData.push(parseValue(key, newData[key], showIndex, comma, "added", line));
            }
        } else {
            returnData.push(parseValue(key, oldData[key], showIndex, true, "deleted", line));
            returnData.push(parseValue(key, newData[key], showIndex, comma, "added", line));
        }
    });

    addedKeys.forEach((key, index) => {
        returnData.push(parseValue(key, newData[0], showIndex, index !== addedKeys.length - 1, "added", line));
    });
}

export default parseData;