import { Empty, Table, Transfer } from "antd";
import { difference } from "lodash";

export default function TransferTable({ leftColumns, rightColumns, ...restProps }) {
  return (
    <Transfer {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ _id }) => _id);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ _id }, selected) {
            onItemSelect(_id, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            rowKey={(record) => record._id}
            locale={{
              emptyText: (
                <span>
                  <Empty description="Danh sách trống" />
                </span>
              ),
            }}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
          />
        );
      }}
    </Transfer>
  );
}
