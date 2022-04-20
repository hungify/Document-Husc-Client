import { TreeSelect } from "antd";
import React from "react";
export default function TreeSelectForm({ onTreeSelect, onTreeDeSelect, treeData, ...restProps }) {
  return (
    <TreeSelect
      {...restProps}
      treeData={treeData}
      onSelect={onTreeSelect}
      onDeselect={onTreeSelect}
    />
  );
}
