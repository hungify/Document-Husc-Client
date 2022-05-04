import { Empty, Table, Transfer } from "antd";
import { getPage, getPageSize } from "app/selectors/searchGroup";
import { setPage, setPageSize } from "features/SearchGroup/searchGroupSlice";
import { difference } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TransferTable({ leftColumns, rightColumns, ...restProps }) {
  const page = useSelector(getPage);
  const pageSize = useSelector(getPageSize);
  const dispatch = useDispatch();
  const [pageFilter, setPageFilter] = React.useState(1);
  const [pageSizeFilter, setPageSizeFilter] = React.useState(10);
  const [filter, setFilter] = React.useState([]);

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
            pagination={{
              size: "small",
              pageSize: direction === "left" ? pageSize : pageSizeFilter,
              current: direction === "left" ? page : pageFilter,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kết quả`,
              showSizeChanger: true,
              pageSizeOptions: ["1", "2", "5"],
              onChange: (page) => {
                dispatch(setPage(page));
              },
              onShowSizeChange: (current, size) => {
                dispatch(setPageSize(size));
              },
            }}
            locale={{
              emptyText: <Empty description="Danh sách trống" />,
            }}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
          />
        );
      }}
    </Transfer>
  );
}
