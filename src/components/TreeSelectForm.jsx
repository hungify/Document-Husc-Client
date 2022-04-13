import { TreeSelect } from "antd";
import React from "react";
export default function TreeSelectForm(props) {
  const { onTreeSelect, onTreeDeSelect, treeData } = props;

  const handleTreeSelect = (value, info) => {
    onTreeSelect(value, info);
  };

  const handleTreeDeSelect = (value, info) => {
    onTreeDeSelect(value, info);
  };

  return (
    <TreeSelect
      {...props}
      treeData={treeData}
      onSelect={handleTreeSelect}
      onDeselect={handleTreeDeSelect}
    />
  );
}
