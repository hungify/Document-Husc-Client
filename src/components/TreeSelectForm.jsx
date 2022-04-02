import { TreeSelect } from "antd";
import React from "react";
export default function TreeSelectForm(props) {
  
  const onHandlerTreeSelect = (value) => {
    props.onTreeSelect(value);
  };

  return <TreeSelect {...props} onSelect={onHandlerTreeSelect} />;
}
