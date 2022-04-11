import { TreeSelect } from "antd";
import React from "react";
export default function TreeSelectForm(props) {
  const onHandlerTreeSelect = (value, info) => {
    props.onTreeSelect(value, info);
  };

  const onHandlerTreeDeSelect = (value, info) => {
    props.onTreeDeSelect(value, info);
  };

  return (
    <TreeSelect {...props} onSelect={onHandlerTreeSelect} onDeselect={onHandlerTreeDeSelect} />
  );
}
