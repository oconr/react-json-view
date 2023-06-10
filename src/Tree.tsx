import React, { useState } from "react";
import { ParsedValueType } from ".";
import needFormat from "./helpers/needFormat";
import getIndent from "./helpers/getIndent";
import isArray from "./helpers/isArray";
import './styles.scss';

type TreeProps = ParsedValueType & {
    level?: number;
}

function Tree(props: TreeProps){
    if (needFormat(props.type)){
        return <ComplexTree {...props} />
    }

    return <SimpleTree {...props} />
}

function ComplexTree({
    name,
    value,
    type,
    showIndex,
    comma,
    lineType,
    lastLineType,
    level = 1
}: TreeProps){
    const [visible, setVisible] = useState(false);

    function toggleVisibility(){
        setVisible(!visible);
    }

    return (
        <div className="line">
          <p
            className={`p ${lineType}`}
            onClick={toggleVisibility}
            style={getIndent(level)}
          >
            <span className={`typeMark ${lineType}`}></span>
            <span className="jsonContent">
              {showIndex && <span className="jsonKey">{name}: </span>}
              <span className="jsonPt">{isArray(type) ? '[' : '{'}</span>
            </span>
            {!visible && (
              <span className="jsonPt">
                {isArray(type) ? '...]' : '...}'}
                {comma ? ',' : ''}
              </span>
            )}
          </p>
          <div style={{ display: visible ? 'block' : 'none' }}>
            {value.map((item: ParsedValueType, index: number) => (
              <Tree key={index} level={level + 1} {...item} />
            ))}
            <p
              className={`line feet p ${lineType}`}
              style={getIndent(level)}
            >
              {lastLineType && <span className={`${lastLineType}`}></span>}
              <span className="jsonPt">
                {isArray(type) ? ']' : '}'}
                {comma ? ',' : ''}
              </span>
            </p>
          </div>
        </div>
    )
}

function SimpleTree({
    name,
    value,
    showIndex,
    type,
    lineType,
    comma,
    level = 1
}: TreeProps) {
  
    return (
      <p className={`p line ${lineType}`} style={getIndent(level)}>
        <span className={lineType}></span>
        <span className="jsonContent">
          {showIndex && <span className="jsonKey">{name}: </span>}
          <span className={type}>{value}</span>
          <span className="c-json-comma">{comma ? ',' : ''}</span>
        </span>
      </p>
    );
  }

export default Tree;