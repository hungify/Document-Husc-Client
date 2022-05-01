import { TreeSelect } from "antd";
import React from "react";
export default function TreeSelectForm({ treeData, onDeselect, ...restProps }) {
  return <TreeSelect {...restProps} treeData={treeData} />;
}
