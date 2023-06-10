import React, { useEffect, useState } from "react";
import mergeData from "./helpers/mergeData";
import isArray from "./helpers/isArray";
import './styles.scss';
import Tree from "./Tree";

type JsonViewProps = {
    data: any;
    newData?: any;
}

export type LineType = "deleted" | "added" | "unchanged";

export type ParsedValueType = {
    name: string | number;
    line: number;
    value: any;
    type: string | undefined;
    showIndex: boolean;
    comma: boolean;
    lineType: LineType;
    lastLineType: LineType;
    lastLine: number | null;
}

function JsonView({ data, newData }: JsonViewProps){
    const [parsedData, setParsedData] = useState<ParsedValueType[]>([]);

    useEffect(() => {
        setParsedData(mergeData(data, newData ?? {}));
    });

    return (
        <pre className="jsonView">
            <p className="outer">
                { isArray(parsedData) ? '[' : '{' }
            </p>
            {
                parsedData.map((item, index) => <Tree key={index} {...item} />)
            }
            <p className="outer">
                { isArray(parsedData) ? ']' : '}' }
            </p>
        </pre>
    )
}

export default JsonView;