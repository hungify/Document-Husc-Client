import { TreeSelect } from "antd";
import React from "react";
export default function TreeSelectForm(props) {
  console.log('🚀 :: props', props)
  const onHandlerTreeSelect = (value, info) => {
  console.log('🚀 :: value', value)
    console.log("🚀 :: info", info);
    props.onTreeSelect(value);
  };

  return <TreeSelect {...props} onSelect={onHandlerTreeSelect} />;
}
