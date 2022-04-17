import { Table } from "antd";
import { difference } from "lodash";
import React from "react";

export default function RecipientTable({
  filteredItems,
  onItemSelectAll,
  onItemSelect,
  selectedKeys: listSelectedKeys,
  disabled: listDisabled,
  columns,
}) {
  const rowSelection = {
    getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
    onSelectAll(selected, selectedRows) {
      const treeSelectedKeys = selectedRows.filter((item) => !item.disabled).map(({ key }) => key);
      const diffKeys = selected
        ? difference(treeSelectedKeys, listSelectedKeys)
        : difference(listSelectedKeys, treeSelectedKeys);
      onItemSelectAll(diffKeys, selected);
    },
    onSelect({ key }, selected) {
      onItemSelect(key, selected);
    },
    selectedRowKeys: listSelectedKeys,
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={filteredItems}
      size="small"
      style={{ pointerEvents: listDisabled ? "none" : null }}
    />
  );
}
